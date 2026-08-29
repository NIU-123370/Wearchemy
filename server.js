/**
 * 穿搭炼金屋 · 后端服务
 * 零依赖 Node.js 服务：静态托管 PWA + REST API + JSON 文件持久化
 * 运行：node server.js  （默认 http://127.0.0.1:8787 ，PORT 环境变量可改）
 */
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

// ---------- 数据层 ----------
const DEFAULT_DB = {
  garments: [],   // 衣橱单品 { id, name, cat, color, season, mood, icon, tint, bg, img? }
  recipes: [],    // 收藏配方 { id, name, code, occasion, weather, mats, element, savedAt }
  checkins: [],   // 睡眠打卡 { date, bed, wake, tags, score, dur }
  profile: {      // 周期设置与风格画像
    periodStart: null, cycleLen: 28, periodLen: 5,
    elementScore: {}, worn: {}, wornDays: 0
  }
};

let db = null;
function loadDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    db = Object.assign({}, DEFAULT_DB, JSON.parse(raw));
    db.profile = Object.assign({}, DEFAULT_DB.profile, db.profile);
  } catch {
    db = JSON.parse(JSON.stringify(DEFAULT_DB));
    saveDB();
  }
}
let saveTimer = null;
function saveDB() {
  // 防抖写入，避免高频请求下反复写盘
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const tmp = DB_FILE + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(db, null, 2), "utf8");
    fs.renameSync(tmp, DB_FILE);
  }, 120);
}

const uid = () => crypto.randomBytes(6).toString("hex");

// ---------- 工具 ----------
function send(res, status, data, headers = {}) {
  const body = data === undefined ? "" : JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  res.end(body);
}
const ok = (res, data) => send(res, 200, { ok: true, data });
const fail = (res, status, message) => send(res, status, { ok: false, error: message });

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    let size = 0;
    req.on("data", chunk => {
      size += chunk.length;
      if (size > 1024 * 1024) { reject(new Error("payload too large")); req.destroy(); return; }
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch { reject(new Error("invalid JSON body")); }
    });
    req.on("error", reject);
  });
}

const str = (v, max = 200) => (typeof v === "string" ? v.slice(0, max) : null);
const num = (v, min, max, dft) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return dft;
  return Math.min(max, Math.max(min, n));
};
const arrOfStr = v => (Array.isArray(v) ? v.filter(x => typeof x === "string").slice(0, 40) : []);

// ---------- 路由 ----------
const routes = [
  // 健康检查
  { method: "GET", pattern: /^\/api\/health$/, handler: async () => ({ status: "up", time: new Date().toISOString() }) },

  // ---- 衣橱 ----
  { method: "GET", pattern: /^\/api\/garments$/, handler: async () => db.garments },
  {
    method: "POST", pattern: /^\/api\/garments$/, handler: async (req, res, body) => {
      const name = str(body.name, 60);
      const cat = str(body.cat, 20);
      if (!name || !cat) return fail(res, 400, "name 与 cat 必填");
      const item = {
        id: uid(), name, cat,
        color: str(body.color, 20) || "自定",
        season: str(body.season, 10) || "四季",
        mood: str(body.mood, 20) || "neutral",
        icon: str(body.icon, 30) || "generic",
        tint: str(body.tint, 60) || null,
        bg: str(body.bg, 120) || null,
        img: str(body.img, 400) || null,
        createdAt: new Date().toISOString()
      };
      db.garments.unshift(item);
      saveDB();
      return send(res, 201, { ok: true, data: item });
    }
  },
  {
    method: "DELETE", pattern: /^\/api\/garments\/([\w-]+)$/, handler: async (req, res, body, m) => {
      const i = db.garments.findIndex(g => g.id === m[1]);
      if (i < 0) return fail(res, 404, "单品不存在");
      const [removed] = db.garments.splice(i, 1);
      saveDB();
      return removed;
    }
  },

  // ---- 收藏配方 ----
  { method: "GET", pattern: /^\/api\/recipes$/, handler: async () => db.recipes },
  {
    method: "POST", pattern: /^\/api\/recipes$/, handler: async (req, res, body) => {
      const name = str(body.name, 60);
      if (!name) return fail(res, 400, "name 必填");
      const recipe = {
        id: uid(), name,
        code: str(body.code, 30) || null,
        occasion: str(body.occasion, 20) || null,
        weather: str(body.weather, 20) || null,
        element: body.element && typeof body.element === "object"
          ? { sym: str(body.element.sym, 8), name: str(body.element.name, 20) } : null,
        mats: arrOfStr(body.mats),
        savedAt: new Date().toISOString()
      };
      db.recipes.unshift(recipe);
      saveDB();
      return send(res, 201, { ok: true, data: recipe });
    }
  },
  {
    method: "DELETE", pattern: /^\/api\/recipes\/([\w-]+)$/, handler: async (req, res, body, m) => {
      const i = db.recipes.findIndex(r => r.id === m[1]);
      if (i < 0) return fail(res, 404, "配方不存在");
      const [removed] = db.recipes.splice(i, 1);
      saveDB();
      return removed;
    }
  },

  // ---- 睡眠打卡（按日期 upsert）----
  { method: "GET", pattern: /^\/api\/checkins$/, handler: async () => db.checkins },
  {
    method: "POST", pattern: /^\/api\/checkins$/, handler: async (req, res, body) => {
      const date = str(body.date, 10);
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return fail(res, 400, "date 需为 YYYY-MM-DD");
      const record = {
        date,
        bed: str(body.bed, 5) || "23:00",
        wake: str(body.wake, 5) || "07:00",
        tags: arrOfStr(body.tags),
        score: num(body.score, 0, 100, null),
        dur: num(body.dur, 0, 24, null)
      };
      db.checkins = db.checkins.filter(c => c.date !== date);
      db.checkins.push(record);
      db.checkins.sort((a, b) => a.date.localeCompare(b.date));
      saveDB();
      return send(res, 201, { ok: true, data: record });
    }
  },
  {
    method: "DELETE", pattern: /^\/api\/checkins\/(\d{4}-\d{2}-\d{2})$/, handler: async (req, res, body, m) => {
      const before = db.checkins.length;
      db.checkins = db.checkins.filter(c => c.date !== m[1]);
      if (db.checkins.length === before) return fail(res, 404, "该日期无打卡");
      saveDB();
      return { date: m[1] };
    }
  },

  // ---- 个人画像（周期设置 / 风格元素 / 穿着记录）----
  { method: "GET", pattern: /^\/api\/profile$/, handler: async () => db.profile },
  {
    method: "PUT", pattern: /^\/api\/profile$/, handler: async (req, res, body) => {
      const p = db.profile;
      if (body.periodStart !== undefined) p.periodStart = str(body.periodStart, 10);
      if (body.cycleLen !== undefined) p.cycleLen = num(body.cycleLen, 21, 35, p.cycleLen);
      if (body.periodLen !== undefined) p.periodLen = num(body.periodLen, 2, 8, p.periodLen);
      if (body.elementScore && typeof body.elementScore === "object") {
        for (const [k, v] of Object.entries(body.elementScore)) {
          if (typeof k === "string" && Number.isFinite(Number(v))) p.elementScore[k.slice(0, 8)] = Number(v);
        }
      }
      if (body.worn && typeof body.worn === "object") p.worn = body.worn;
      if (body.wornDays !== undefined) p.wornDays = num(body.wornDays, 0, 100000, p.wornDays);
      saveDB();
      return p;
    }
  }
];

// ---------- 静态托管 ----------
function serveStatic(req, res, pathname) {
  if (pathname === "/" || pathname === "") pathname = "/index.html";
  const file = path.normalize(path.join(ROOT, pathname));
  if (!file.startsWith(ROOT)) return fail(res, 403, "forbidden");
  fs.readFile(file, (err, data) => {
    if (err) return fail(res, 404, "not found");
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Service-Worker-Allowed": "./"
    });
    res.end(data);
  });
}

// ---------- 入口 ----------
loadDB();
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname.startsWith("/api/")) {
    try {
      for (const r of routes) {
        if (r.method !== req.method) continue;
        const m = r.pattern.exec(pathname);
        if (!m) continue;
        const body = ["POST", "PUT", "PATCH"].includes(req.method) ? await readBody(req) : {};
        const result = await r.handler(req, res, body, m);
        if (!res.writableEnded) ok(res, result === undefined ? null : result);
        return;
      }
      return fail(res, 404, "接口不存在");
    } catch (e) {
      return fail(res, e.message === "invalid JSON body" || e.message === "payload too large" ? 400 : 500, e.message);
    }
  }
  if (req.method !== "GET" && req.method !== "HEAD") return fail(res, 405, "method not allowed");
  serveStatic(req, res, pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`穿搭炼金屋服务已启动: http://${HOST}:${PORT}`);
  console.log(`API 前缀: http://${HOST}:${PORT}/api/  (health / garments / recipes / checkins / profile)`);
});
