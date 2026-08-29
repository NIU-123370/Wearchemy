/* 穿搭炼金屋 — 交互逻辑 */
(function () {
  "use strict";


  // ---------- 手绘线稿图标（矢量，非 emoji，跨平台稳定渲染） ----------
  const ICONS = {
    knit: `<svg viewBox="0 0 64 64" fill="none"><path d="M20 14 12 20l4 7 4-3v24a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V24l4 3 4-7-8-6-6 4h-8l-6-4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M24 18h16M22 44h20M22 38h20" stroke="currentColor" stroke-width="1.1" opacity=".55"/></svg>`,
    shirt: `<svg viewBox="0 0 64 64" fill="none"><path d="M22 13 14 19l4 7 4-4v27a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V22l4 4 4-7-8-6-6 5h-6l-6-5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M32 18v33" stroke="currentColor" stroke-width="1.1" opacity=".5"/><circle cx="32" cy="27" r="1" fill="currentColor"/><circle cx="32" cy="34" r="1" fill="currentColor"/><circle cx="32" cy="41" r="1" fill="currentColor"/></svg>`,
    blazer: `<svg viewBox="0 0 64 64" fill="none"><path d="M24 12 14 17l3 8 5-3v27a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V22l5 3 3-8-10-5-6 6h-4l-6-6Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M28 20 24 44M36 20l4 24" stroke="currentColor" stroke-width="1.1" opacity=".55"/><circle cx="32" cy="38" r="1.2" fill="currentColor"/></svg>`,
    cardigan: `<svg viewBox="0 0 64 64" fill="none"><path d="M22 13 13 19l4 7 5-4v26a2 2 0 0 0 2 2h5V21M42 13l9 6-4 7-5-4v26a2 2 0 0 1-2 2h-5V21" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M22 13c3 3 6 4 10 4s7-1 10-4" stroke="currentColor" stroke-width="1.7"/><circle cx="32" cy="30" r="1" fill="currentColor"/><circle cx="32" cy="38" r="1" fill="currentColor"/><circle cx="32" cy="46" r="1" fill="currentColor"/></svg>`,
    pants: `<svg viewBox="0 0 64 64" fill="none"><path d="M20 12h24l1 8-2 1 3 30h-9l-4-24-4 24h-9l3-30-2-1 1-8Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M21 20h22" stroke="currentColor" stroke-width="1.1" opacity=".5"/></svg>`,
    pleats: `<svg viewBox="0 0 64 64" fill="none"><path d="M22 12h20l6 38H16l6-38Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M26 13 23 49M30 12l-1 38M34 12l1 38M38 13l3 36" stroke="currentColor" stroke-width="1" opacity=".5"/></svg>`,
    skirt: `<svg viewBox="0 0 64 64" fill="none"><path d="M23 13h18l9 36H14l9-36Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M23 13c3 2 6 3 9 3s6-1 9-3" stroke="currentColor" stroke-width="1.3" opacity=".6"/></svg>`,
    dress: `<svg viewBox="0 0 64 64" fill="none"><path d="M26 10 22 16l3 5-4 4 9 4-9 20h22l-9-20 9-4-4-4 3-5-4-6-5 4-5-4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 29h10" stroke="currentColor" stroke-width="1.1" opacity=".5"/></svg>`,
    loafer: `<svg viewBox="0 0 64 64" fill="none"><path d="M9 44V27c4-1 8 0 11 3l3 3c2 2 5 3 8 3h10c5 0 10 2 14 5l4 3c2 1 1 3-1 3H12c-2 0-3-1-3-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M20 30c3 3 7 5 11 5h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".7"/><path d="M9 39h11" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>`,
    tote: `<svg viewBox="0 0 64 64" fill="none"><path d="M16 24h32l3 26a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3l3-26Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M23 24v-4a9 9 0 0 1 18 0v4" stroke="currentColor" stroke-width="1.7"/><path d="M16 32h32" stroke="currentColor" stroke-width="1" opacity=".45"/></svg>`,
    scarf: `<svg viewBox="0 0 64 64" fill="none"><path d="M10 20c8-8 14-8 18-4s2 10-3 10-6-4-3-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M22 22c8 6 14 18 10 28-3 7-11 6-12-1-1-6 4-9 8-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="40" cy="46" r="2" fill="currentColor" opacity=".7"/></svg>`,
    earring: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 14c4 0 7 3 7 7 0 3-2 6-5 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="32" cy="34" r="6" stroke="currentColor" stroke-width="1.7"/><path d="M32 40v9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="32" cy="52" r="3" stroke="currentColor" stroke-width="1.7"/></svg>`,
    generic: `<svg viewBox="0 0 64 64" fill="none"><rect x="16" y="16" width="32" height="32" rx="6" stroke="currentColor" stroke-width="1.7"/><path d="M16 32h32M32 16v32" stroke="currentColor" stroke-width="1" opacity=".4"/></svg>`,
    star: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 10l6.5 15.5L54 28l-12 11 3 16-13-8-13 8 3-16-12-11 15.5-2.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`
  };
  function icon(name, tint) {
    const svg = ICONS[name] || ICONS.generic;
    return `<span class="g-icon" style="color:${tint || 'var(--ink-soft)'}">${svg}</span>`;
  }


  // ---------- 数据 ----------
  const GARMENTS = [
    { id: "g1", name: "米白针织衫", icon: "knit", tint: "var(--rose-deep)", cat: "上装", color: "米白", season: "秋", mood: "soft", bg: "linear-gradient(160deg,#f7f1ea,#ecdfd3)" },
    { id: "g2", name: "鼠尾草衬衫", icon: "shirt", tint: "var(--sage-deep)", cat: "上装", color: "绿", season: "四季", mood: "neutral", bg: "linear-gradient(160deg,#eef3ea,#dbe6d4)" },
    { id: "g3", name: "粉晶开衫", icon: "cardigan", tint: "var(--rose-deep)", cat: "外套", color: "粉", season: "春", mood: "soft", bg: "linear-gradient(160deg,#f8eaf0,#eeccd9)" },
    { id: "g4", name: "焦糖西装", icon: "blazer", tint: "#8a6a45", cat: "外套", color: "棕", season: "秋", mood: "sharp", bg: "linear-gradient(160deg,#f3e7d8,#e4cba9)" },
    { id: "g5", name: "牛仔阔腿裤", icon: "pants", tint: "#5b7699", cat: "下装", color: "蓝", season: "四季", mood: "neutral", bg: "linear-gradient(160deg,#eaf0f7,#cddbe9)" },
    { id: "g6", name: "奶油百褶裙", icon: "pleats", tint: "var(--rose-deep)", cat: "下装", color: "米白", season: "夏", mood: "soft", bg: "linear-gradient(160deg,#fdf7ee,#f2e3cc)" },
    { id: "g7", name: "雾灰半裙", icon: "skirt", tint: "var(--ink-soft)", cat: "下装", color: "灰", season: "秋", mood: "sharp", bg: "linear-gradient(160deg,#eeecf0,#d9d5df)" },
    { id: "g8", name: "缎面连衣裙", icon: "dress", tint: "var(--rose-deep)", cat: "连衣裙", color: "粉", season: "夏", mood: "sharp", bg: "linear-gradient(160deg,#faeaf1,#f0c9dc)" },
    { id: "g9", name: "珍珠白乐福鞋", icon: "loafer", tint: "#9c8b6f", cat: "鞋", color: "米白", season: "四季", mood: "neutral", bg: "linear-gradient(160deg,#f6f0e6,#e9dcc4)" },
    { id: "g10", name: "藤编手袋", icon: "tote", tint: "#a1793f", cat: "配饰", color: "棕", season: "夏", mood: "neutral", bg: "linear-gradient(160deg,#f4ead4,#e3cb9c)" },
    { id: "g11", name: "薄纱丝巾", icon: "scarf", tint: "var(--rose-deep)", cat: "配饰", color: "粉", season: "春", mood: "soft", bg: "linear-gradient(160deg,#f9eaf0,#eecfdd)" },
    { id: "g12", name: "金质耳环", icon: "earring", tint: "#b8935a", cat: "配饰", color: "金", season: "四季", mood: "sharp", bg: "linear-gradient(160deg,#f7efd9,#e9d2a0)" }
  ];


  const OCCASIONS = ["日常", "通勤", "约会", "度假", "面试", "小聚"];
  const WEATHER = ["晴", "微凉", "阴雨", "炎热"];
  // 心情 → 影响炼金的风格偏向（soft 柔和 / neutral 中性 / sharp 利落）
  const MOODS = [
    { id: "cozy",   name: "想被治愈", bias: "soft" },
    { id: "calm",   name: "平静自在", bias: "neutral" },
    { id: "power",  name: "元气满满", bias: "sharp" },
    { id: "gloomy", name: "有点低落", bias: "soft" },
    { id: "confident", name: "自信闪耀", bias: "sharp" }
  ];


  const RECIPE_NAMES = ["晨雾漫步", "珍珠通勤诗", "鼠尾草花园", "粉晶下午茶", "雾都剪影", "奶油假日", "微光赴约"];


  const ELEMENTS = [
    { sym: "Mi", name: "极简" }, { sym: "Rm", name: "浪漫" }, { sym: "Vt", name: "复古" }, { sym: "Sp", name: "运动" },
    { sym: "El", name: "优雅" }, { sym: "Cs", name: "休闲" }, { sym: "Ff", name: "法式" }, { sym: "Nt", name: "自然" },
    { sym: "Bo", name: "波西米亚" }, { sym: "Cl", name: "冷淡" }, { sym: "Wm", name: "暖柔" }, { sym: "Ed", name: "编辑感" }
  ];


  // ---------- 身心节律 · 星轨 数据模型 ----------
  const DAY_MS = 86400000;
  const PHASE_INFO = {
    period:     { label: "经期",   cls: "ph-period",     mood: "soft",  tip: "身体在低耗运转，允许自己慢下来。今天更适合宽松、保暖、低敏的材质，睡前建议提前 20 分钟躺下，给子宫和情绪多一点缓冲。" },
    follicular: { label: "卵泡期", cls: "ph-follicular",  mood: "neutral", tip: "精力正在回升，是尝试新搭配、新作息的好时机。睡眠通常更容易进入深睡，可以适当增加一点活动量。" },
    ovulation:  { label: "排卵期", cls: "ph-ovulation",   mood: "sharp", tip: "状态和自信感处于高点，适合利落线条、高饱和色。晚上容易兴奋，建议睡前留一段安静的过渡时间。" },
    luteal:     { label: "黄体期", cls: "ph-luteal",      mood: "soft",  tip: "身体开始进入蓄能模式，情绪可能更敏感。选柔软温暖的材料会更安心，晚间也更需要规律的入睡时间来稳定状态。" }
  };
  const SLEEP_TAGS = [
    { id: "caffeine", name: "咖啡因" }, { id: "screen", name: "睡前屏幕" }, { id: "exercise", name: "运动" },
    { id: "alcohol", name: "酒精" }, { id: "stress", name: "压力大" }, { id: "nap", name: "白天小睡" },
    { id: "sun", name: "晒太阳" }, { id: "regular", name: "规律作息" }, { id: "lateMeal", name: "晚餐偏晚" },
    { id: "workLate", name: "加班/学习晚" }, { id: "tea", name: "喝茶" }, { id: "moodSwing", name: "情绪起伏" },
    { id: "anxious", name: "有点焦虑" }, { id: "relaxed", name: "心情放松" }, { id: "coldFeet", name: "手脚冰凉" },
    { id: "bloated", name: "腹部胀" }, { id: "cramp", name: "小腹不适" }, { id: "humid", name: "天气闷热" },
    { id: "noise", name: "环境有噪音" }, { id: "travel", name: "通勤/外出累" }
  ];
  const BADGES = [
    { id: "b3", need: 3, icon: "✧", name: "初炼星光 · 连续3天" },
    { id: "b7", need: 7, icon: "☾", name: "满月轮回 · 连续7天" },
    { id: "b14", need: 14, icon: "✦", name: "深眠使者 · 连续14天" },
    { id: "b30", need: 30, icon: "✵", name: "星宿大师 · 连续30天" }
  ];
  const SLEEP_TARGET_HRS = 8;


  function todayStr(offsetDays) {
    const d = new Date(); d.setDate(d.getDate() + (offsetDays || 0));
    return d.toISOString().slice(0, 10);
  }
  function parseHM(str) { const [h, m] = (str || "0:0").split(":").map(Number); return h * 60 + m; }
  function fmtHM(totalMin) {
    totalMin = ((totalMin % 1440) + 1440) % 1440;
    const h = Math.floor(totalMin / 60), m = Math.round(totalMin % 60);
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }
  function sleepDurationHrs(bed, wake) {
    let b = parseHM(bed), w = parseHM(wake);
    if (w <= b) w += 1440;
    return (w - b) / 60;
  }


  // 月经周期推算：返回给定日期所处的阶段
  function getCyclePhase(dateStr) {
    const start = new Date(state.astro.periodStart + "T00:00:00");
    const d = new Date(dateStr + "T00:00:00");
    const cycleLen = state.astro.cycleLen;
    const periodLen = state.astro.periodLen;
    let diff = Math.floor((d - start) / DAY_MS);
    let dayInCycle = ((diff % cycleLen) + cycleLen) % cycleLen; // 0-indexed，0 = 经期第1天
    const ovuDay = cycleLen - 14; // 排卵日大约在下次经期前14天
    let phase;
    if (dayInCycle < periodLen) phase = "period";
    else if (dayInCycle >= ovuDay - 1 && dayInCycle <= ovuDay + 1) phase = "ovulation";
    else if (dayInCycle < ovuDay) phase = "follicular";
    else phase = "luteal";
    return { phase, dayInCycle, cycleLen, ovuDay };
  }
  function nextPeriodDate() {
    const start = new Date(state.astro.periodStart + "T00:00:00");
    const today = new Date(todayStr() + "T00:00:00");
    const cycleLen = state.astro.cycleLen;
    let diff = Math.floor((today - start) / DAY_MS);
    const cyclesPassed = Math.floor(diff / cycleLen) + 1;
    const next = new Date(start.getTime() + cyclesPassed * cycleLen * DAY_MS);
    return next;
  }
  function nextOvulationDate() {
    const next = nextPeriodDate();
    return new Date(next.getTime() - 14 * DAY_MS);
  }


  // 睡眠质量评分：综合时长、入睡时段、影响因素
  function computeSleepScore(bed, wake, tags) {
    const dur = sleepDurationHrs(bed, wake);
    let score = 100;
    // 时长：以 7.5-8.5h 为满分区间
    const durDiff = Math.abs(dur - 8);
    score -= Math.min(45, durDiff * 14);
    // 入睡时段：22:00-23:30 最佳，越晚扣分越多
    const bedMin = parseHM(bed);
    const idealStart = 22 * 60, idealEnd = 23 * 60 + 30;
    let lateBy = 0;
    if (bedMin >= idealEnd && bedMin < 6 * 60 + 1440) lateBy = 0; // 占位，下方统一处理跨天
    let bedForCalc = bedMin < 6 * 60 ? bedMin + 1440 : bedMin; // 凌晨入睡按次日算，方便比较
    if (bedForCalc > idealEnd) lateBy = bedForCalc - idealEnd;
    else if (bedForCalc < idealStart) lateBy = idealStart - bedForCalc;
    score -= Math.min(20, lateBy / 6);
    // 影响因素
    const FACTOR_WEIGHT = { caffeine: -6, screen: -5, exercise: 4, alcohol: -8, stress: -7, nap: -3, sun: 3, regular: 5 };
    (tags || []).forEach(t => { score += FACTOR_WEIGHT[t] || 0; });
    return Math.max(20, Math.min(100, Math.round(score)));
  }


  // 智能起床窗口：基于 90 分钟睡眠周期 + 14 分钟入睡耗时
  function computeWakeWindows(bedTimeStr) {
    const bedMin = parseHM(bedTimeStr) + 14; // 入睡耗时
    return [4, 5, 6].map(cycles => ({
      cycles,
      time: fmtHM(bedMin + cycles * 90),
      hrs: (cycles * 90 / 60).toFixed(1),
      best: cycles === 5
    }));
  }


  function suggestBedtimeFor(wakeGoalStr, cycles) {
    cycles = cycles || 5;
    const wakeMin = parseHM(wakeGoalStr);
    return fmtHM(wakeMin - cycles * 90 - 14);
  }


  // 阶段化睡前建议里叠加睡眠质量数据
  function phaseTipWithScore(phase, score) {
    const base = PHASE_INFO[phase].tip;
    if (score == null) return base;
    if (score < 60) return base + " 最近几天睡眠分偏低，今晚不妨提早半小时躺下。";
    return base;
  }


  // ---------- 状态 ----------
  const state = {
    view: "closet",
    filter: "全部",
    selected: new Set(),
    occasion: "通勤",
    weather: "晴",
    mood: null,
    formal: 45,          // 正式度 0-100
    genMode: "fill",     // "fill" 允许衣橱补充 / "only" 仅使用所选
    keepResults: false,  // 换一套时是否保留旧结果
    genScope: "today",   // "today" 今日一套 / "capsule" 胶囊多套
    locked: new Set(),   // 锁定的单品 id（换一套时保留）
    worn: {},            // 穿着记录：{ garmentId: count }
    wornDays: 0,         // 累计“今天穿了”次数
    saved: [],           // 收藏的配方
    tryOn: [],           // 镜像中图层
    elementScore: {},    // 风格元素得分
    recipeSeq: 0,
    astro: {
      periodStart: todayStr(-5),
      cycleLen: 28,
      periodLen: 5,
      checkins: [],       // { date, bed, wake, tags: [], score, dur }
      stickerHidden: false,
      wakePick: null,     // 用户选中的起床时间
      wakeCustom: "",     // 自定义起床时间
      isSleeping: false,
      sleepStartTime: null
    }
  };
  ELEMENTS.forEach(e => state.elementScore[e.sym] = 0);


  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- 后端 API（服务器不可用时静默降级为本地内存） ----------
  const API = {
    online: true,
    async req(method, url, body) {
      try {
        const r = await fetch(url, {
          method,
          headers: body ? { "Content-Type": "application/json" } : undefined,
          body: body ? JSON.stringify(body) : undefined
        });
        const j = await r.json().catch(() => null);
        this.online = r.ok;
        return r.ok && j && j.ok ? j.data : null;
      } catch { this.online = false; return null; }
    },
    get(u) { return this.req("GET", u); },
    post(u, b) { return this.req("POST", u, b); },
    put(u, b) { return this.req("PUT", u, b); },
    del(u) { return this.req("DELETE", u); }
  };
  const recipeServerId = new Map(); // 本地配方 id → 服务端 id

  let profileSaveTimer = 0;
  function saveProfile() {
    clearTimeout(profileSaveTimer);
    profileSaveTimer = setTimeout(() => {
      API.put("/api/profile", {
        periodStart: state.astro.periodStart,
        cycleLen: state.astro.cycleLen,
        periodLen: state.astro.periodLen,
        elementScore: state.elementScore,
        worn: state.worn,
        wornDays: state.wornDays
      });
    }, 400);
  }

  async function loadPersisted() {
    const [garments, checkins, profile, recipes] = await Promise.all([
      API.get("/api/garments"), API.get("/api/checkins"),
      API.get("/api/profile"), API.get("/api/recipes")
    ]);
    if (!API.online) return; // 纯本地模式，保留演示数据
    if (Array.isArray(garments)) {
      garments.forEach(g => { if (!GARMENTS.find(x => x.id === g.id)) GARMENTS.unshift(g); });
    }
    if (Array.isArray(checkins) && checkins.length) {
      state.astro.checkins = checkins;
    }
    if (profile) {
      if (profile.periodStart) state.astro.periodStart = profile.periodStart;
      if (profile.cycleLen) state.astro.cycleLen = profile.cycleLen;
      if (profile.periodLen) state.astro.periodLen = profile.periodLen;
      if (profile.elementScore) Object.assign(state.elementScore, profile.elementScore);
      if (profile.worn) state.worn = profile.worn;
      if (profile.wornDays != null) state.wornDays = profile.wornDays;
    }
    if (Array.isArray(recipes)) {
      recipes.forEach(r => { if (r.code) recipeServerId.set(r.code, r.id); });
    }
    renderFilters(); renderGrid(); renderAstro(); renderTable(); renderSticker();
  }

  const VIEW_TITLES = {
    closet: "我的衣橱",
    astro: "今天的状态",
    alchemy: "帮我搭一套",
    mirror: "照照镜子",
    table: "我的风格"
  };
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let navigationTimer = 0;
  let navigationCleanupTimer = 0;
  let navigationSequence = 0;


  // ---------- 导航 ----------
  function goto(view) {
    const target = $(`.view[data-view="${view}"]`);
    const current = $(".view:not([hidden])");
    if (!target || target === current) return;

    state.view = view;
    $$(".tab").forEach(t => {
      const active = t.dataset.goto === view;
      t.classList.toggle("is-active", active);
      if (active) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    if (view === "table") renderTable();
    if (view === "mirror") { renderTray(); renderSticker(); }
    if (view === "astro") renderAstro();
    if (view === "alchemy") renderGenConfirm();
    document.title = `${VIEW_TITLES[view]} — 穿搭炼金屋`;
    // 睡眠模式始终跟随真实状态，避免切页面时残留
    document.body.classList.toggle("sleep-mode", !!state.astro.isSleeping);

    const sequence = ++navigationSequence;
    clearTimeout(navigationTimer);
    clearTimeout(navigationCleanupTimer);
    const swap = () => {
      if (sequence !== navigationSequence) return;
      $$(".view").forEach(v => {
        v.hidden = v !== target;
        v.classList.remove("is-leaving", "is-entering");
      });
      target.classList.add("is-entering");
      window.scrollTo({ top: 0, behavior: "auto" });
      navigationCleanupTimer = window.setTimeout(
        () => target.classList.remove("is-entering"),
        reduceMotion() ? 0 : 280
      );
    };

    if (reduceMotion()) swap();
    else {
      current.classList.remove("is-entering");
      current.classList.add("is-leaving");
      navigationTimer = window.setTimeout(swap, 120);
    }
  }
  $$(".tab").forEach(t => t.addEventListener("click", () => goto(t.dataset.goto)));


  // ---------- 衣橱 ----------
  const grid = $("#garmentGrid");
  const filtersEl = $("#closetFilters");
  const cats = ["全部", ...new Set(GARMENTS.map(g => g.cat))];


  function renderFilters() {
    filtersEl.innerHTML = cats.map(c =>
      `<button class="filter${c === state.filter ? " is-active" : ""}" data-cat="${c}" aria-pressed="${c === state.filter}">${c}</button>`
    ).join("");
    $$(".filter", filtersEl).forEach(f => f.addEventListener("click", () => {
      state.filter = f.dataset.cat; renderFilters(); renderGrid();
    }));
  }


  function renderGrid() {
    const list = GARMENTS.filter(g => state.filter === "全部" || g.cat === state.filter);
    grid.innerHTML = list.map((g, index) => {
      const thumb = g.img
        ? `<img src="${g.img}" alt="${g.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px"/>`
        : icon(g.icon, g.tint);
      return `
      <button type="button" class="garment${state.selected.has(g.id) ? " is-selected" : ""}" data-id="${g.id}" aria-pressed="${state.selected.has(g.id)}" style="--item-index:${index}">
        <div class="garment-thumb" style="background:${g.bg}">${thumb}</div>
        <div class="garment-name">${g.name}</div>
        <div class="check" aria-hidden="true">✓</div>
      </button>`;
    }).join("");
    $$(".garment", grid).forEach(el => {
      el.addEventListener("click", () => toggleSelect(el.dataset.id, el));
    });
  }


  function toggleSelect(id, element) {
    if (state.selected.has(id)) state.selected.delete(id); else state.selected.add(id);
    if (element) {
      const selected = state.selected.has(id);
      element.classList.toggle("is-selected", selected);
      element.setAttribute("aria-pressed", String(selected));
    } else renderGrid();
    updateSelectedBar();
  }


  function updateSelectedBar() {
    const bar = $("#selectedBar");
    const n = state.selected.size;
    bar.hidden = n === 0;
    $("#selectedCount").textContent = `已选 ${n} 件材料`;
  }
  $("#toAlchemy").addEventListener("click", () => goto("alchemy"));


  // 上传（占位：读取本地图片作为新单品）
  $("#uploadInput").addEventListener("change", e => {
    const files = Array.from(e.target.files || []);
    files.forEach((file, i) => {
      const url = URL.createObjectURL(file);
      const id = "u" + Date.now() + i;
      const item = { id, name: "我的单品", cat: "上装", color: "自定", season: "四季", mood: "neutral", bg: "linear-gradient(160deg,#f7f1ea,#ecdfd3)", img: url };
      GARMENTS.unshift(item);
      API.post("/api/garments", { name: item.name, cat: item.cat, color: item.color, season: item.season, mood: item.mood, bg: item.bg });
    });
    state.filter = "全部"; renderFilters(); renderGrid();
    if (files.length) toast(`已录入 ${files.length} 件单品到材料库`);
    e.target.value = "";
  });
  $(".upload-btn").addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      $("#uploadInput").click();
    }
  });


  // ---------- 炼金 ----------
  function renderOccasions() {
    $("#occasionChips").innerHTML = OCCASIONS.map(o =>
      `<button class="chip${o === state.occasion ? " is-active" : ""}" data-occ="${o}">${o}</button>`).join("");
    $$("#occasionChips .chip").forEach(c => c.addEventListener("click", () => {
      state.occasion = c.dataset.occ; renderOccasions();
    }));
    $("#weatherChips").innerHTML = WEATHER.map(w =>
      `<button class="chip${w === state.weather ? " is-active" : ""}" data-w="${w}">${w}</button>`).join("");
    $$("#weatherChips .chip").forEach(c => c.addEventListener("click", () => {
      state.weather = c.dataset.w; renderOccasions();
    }));
    if ($("#moodChips")) {
      $("#moodChips").innerHTML = MOODS.map(m =>
        `<button class="chip${m.id === state.mood ? " is-active" : ""}" data-mood="${m.id}">${m.name}</button>`).join("");
      $$("#moodChips .chip").forEach(c => c.addEventListener("click", () => {
        // 再次点击已选心情则取消
        state.mood = (state.mood === c.dataset.mood) ? null : c.dataset.mood;
        renderOccasions();
      }));
    }
    renderGenConfirm();
  }


  // 渲染“开炼前确认”摘要与模式状态
  function renderGenConfirm() {
    const sum = $("#gcSummary");
    if (!sum) return;
    const chosen = GARMENTS.filter(g => state.selected.has(g.id));
    const formalLabel = state.formal < 33 ? "休闲" : state.formal < 66 ? "适中" : "正式";
    const moodName = state.mood ? (MOODS.find(m => m.id === state.mood) || {}).name : "跟随节律";
    const pills = [
      `<span class="gc-pill">场合 · ${state.occasion}</span>`,
      `<span class="gc-pill">天气 · ${state.weather}</span>`,
      `<span class="gc-pill">正式度 · ${formalLabel}</span>`,
      `<span class="gc-pill">心情 · ${moodName}</span>`
    ].join("");
    const chosenHtml = chosen.length
      ? `<div class="gc-chosen"><span class="gc-chosen-label">已选 ${chosen.length} 件：</span>${chosen.map(g =>
          `<span class="gc-mat" style="background:${g.bg}" title="${g.name}">${g.img ? `<img src="${g.img}" alt="${g.name}"/>` : icon(g.icon, g.tint)}</span>`).join("")}</div>`
      : `<div class="gc-chosen gc-empty">未选单品 · ${state.genMode === "only" ? "「仅所选」模式请先去衣橱挑几件" : "将全部由衣橱智能补充"}</div>`;
    sum.innerHTML = `<div class="gc-pills">${pills}</div>${chosenHtml}`;


    // 模式按钮状态
    const fill = $("#modeFill"), only = $("#modeOnly");
    if (fill && only) {
      const isFill = state.genMode === "fill";
      fill.classList.toggle("is-active", isFill);
      only.classList.toggle("is-active", !isFill);
      fill.setAttribute("aria-pressed", String(isFill));
      only.setAttribute("aria-pressed", String(!isFill));
    }
    const keep = $("#keepResults");
    if (keep) keep.checked = state.keepResults;


    const today = $("#scopeToday"), capsule = $("#scopeCapsule");
    if (today && capsule) {
      const isToday = state.genScope === "today";
      today.classList.toggle("is-active", isToday);
      capsule.classList.toggle("is-active", !isToday);
      today.setAttribute("aria-pressed", String(isToday));
      capsule.setAttribute("aria-pressed", String(!isToday));
    }
  }


  // 生成一套材料。variant 用于让多套配方产生真实差异（不同补齐取向）。
  // avoidIds: 尽量避免复用的补充单品 id 集合（跨配方去重）。
  function pickMaterials(variant, avoidIds) {
    variant = variant || {};
    avoidIds = avoidIds || new Set();
    // 用户所选单品 + 锁定单品：全部保留，绝不截断
    const chosen = GARMENTS.filter(g => state.selected.has(g.id) || state.locked.has(g.id));
    let pool = chosen.slice();


    // 目标风格偏向：周期 < 意图 < 心情
    let moodBias = PHASE_INFO[getCyclePhase(todayStr()).phase].mood;
    if (state.astro.intent) {
      const intentOpt = INTENT_OPTS.find(i => i.id === state.astro.intent);
      if (intentOpt) moodBias = intentOpt.match;
    }
    if (state.mood) {
      const moodOpt = MOODS.find(m => m.id === state.mood);
      if (moodOpt) moodBias = moodOpt.bias;
    }


    // 仅使用所选：不补齐，只返回所选（去重后原样）
    if (state.genMode === "only") {
      return { mats: pool.slice(0, 7), added: [], moodBias, short: neededCats(pool) };
    }


    // 允许补充：按类别补齐成一套
    const needCats = ["上装", "下装", "鞋", "配饰"];
    const has = c => pool.some(g => g.cat === c || (c === "下装" && g.cat === "连衣裙"));
    const added = [];
    needCats.forEach(c => {
      if (has(c)) return;
      let cand = GARMENTS.filter(g => g.cat === c && !pool.includes(g));
      if (!cand.length) return;
      // 跨配方去重：优先没被别的配方用过的
      const fresh = cand.filter(g => !avoidIds.has(g.id));
      if (fresh.length) cand = fresh;
      // 按偏向筛选
      const biased = cand.filter(g => g.mood === (variant.bias || moodBias));
      let from = biased.length ? biased : cand;
      // variant.seasonPref: 优先某季/四季，制造差异
      if (variant.seasonPref) {
        const sp = from.filter(g => g.season === variant.seasonPref || g.season === "四季");
        if (sp.length) from = sp;
      }
      const pick = from[Math.floor(Math.random() * from.length)];
      pool.push(pick); added.push(pick);
    });
    return { mats: pool.slice(0, 7), added, moodBias, short: [] };
  }


  // 返回还缺的类别（用于“仅使用所选”提示）
  function neededCats(pool) {
    const needCats = ["上装", "下装", "鞋"];
    const has = c => pool.some(g => g.cat === c || (c === "下装" && g.cat === "连衣裙"));
    return needCats.filter(c => !has(c));
  }


  function alchemize() {
    const btn = $("#alchemyBtn");
    if (btn.classList.contains("is-busy")) return;


    // 仅使用所选：先校验是否足够成套
    if (state.genMode === "only") {
      if (state.selected.size === 0) { toast("请先在衣橱里选几件单品"); return; }
      const short = neededCats(GARMENTS.filter(g => state.selected.has(g.id)));
      if (short.length) { toast("仅用所选还缺：" + short.join("、") + "，可切换为「允许补充」"); return; }
    }


    btn.classList.add("is-busy");
    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");
    $("#alchemyBtnLabel").textContent = "炼金中…";
    const canvas = $("#alchemyCanvas");
    canvas.hidden = false;
    canvas.setAttribute("aria-hidden", "false");
    spawnMotes();


    // 用定时器句柄，保证加载态一定收尾
    clearTimeout(alchemize._t);
    alchemize._t = setTimeout(() => {
      canvas.hidden = true;
      canvas.setAttribute("aria-hidden", "true");
      btn.classList.remove("is-busy");
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
      // 按范围决定套数：今日一套 / 胶囊多套
      const count = state.genScope === "capsule" ? (3 + (Math.random() < .5 ? 0 : 1)) : 1;
      const variants = buildVariants(count);
      const usedAdded = new Set();
      const built = [];
      const seen = new Set();
      for (let i = 0; i < variants.length; i++) {
        let r, sig, tries = 0;
        do {
          r = buildRecipe(variants[i], usedAdded);
          sig = r.mats.map(m => m.id).sort().join(",");
          tries++;
        } while (state.genScope === "capsule" && seen.has(sig) && tries < 5);
        seen.add(sig);
        r.scope = state.genScope;
        r.mats.forEach(m => { if (r.addedIds.has(m.id)) usedAdded.add(m.id); });
        built.push(r);
      }
      // 换一套：默认替换，勾选“保留”则前置累加
      const next = state.keepResults ? built.concat(currentRecipes) : built;
      renderRecipes(next);
      $("#alchemyBtnLabel").textContent = state.genScope === "capsule" ? "换一批 · 重新炼胶囊" : "换一套 · 重新炼金";
    }, 1400);
  }


  // 生成 n 套差异化取向
  function buildVariants(n) {
    n = n || 1;
    const baseBias = pickMaterials({}, new Set()).moodBias;
    const biasPool = ["soft", "neutral", "sharp"];
    const others = biasPool.filter(b => b !== baseBias);
    const seasons = ["春", "夏", "秋", "四季"];
    const tones = ["顺应今日节律", "换个气质试试", "轻松日常向", "利落干练向", "柔和松弛向"];
    const out = [];
    for (let i = 0; i < n; i++) {
      const bias = i === 0 ? baseBias : others[(i - 1) % others.length];
      const seasonPref = seasons[i % seasons.length];
      out.push({ bias, seasonPref, tone: tones[i % tones.length] });
    }
    return out;
  }


  let currentRecipes = [];


  function buildRecipe(variant, avoidIds) {
    variant = variant || {};
    state.recipeSeq++;
    const res = pickMaterials(variant, avoidIds);
    const mats = res.mats;
    const addedIds = new Set(res.added.map(m => m.id));
    const name = RECIPE_NAMES[Math.floor(Math.random() * RECIPE_NAMES.length)];
    const el = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
    const chosenCount = mats.filter(m => state.selected.has(m.id)).length;
    const reuse = Math.round((chosenCount / Math.max(mats.length, 1)) * 100);
    const phase = getCyclePhase(todayStr()).phase;
    return {
      id: "r" + state.recipeSeq + "_" + Date.now(),
      code: "RCP-" + String(100 + state.recipeSeq),
      name, mats, element: el, addedIds,
      occasion: state.occasion, weather: state.weather,
      tone: variant.tone || "", moodBias: res.moodBias,
      chosenCount, reuse, saved: false, phase,
      reason: buildReason(mats, { occasion: state.occasion, weather: state.weather })
    };
  }


  function renderRecipes(list) {
    currentRecipes = list;
    $("#recipes").innerHTML = list.map(r => `
      <article class="recipe${r.scope === "capsule" ? " is-capsule" : " is-today"}" data-id="${r.id}">
        <div class="recipe-head">
          <div>
            <span class="recipe-code">${r.scope === "capsule" ? "胶囊套装" : "今日穿搭"} · ${r.element.sym} ${r.element.name}</span>
            <h3 class="recipe-name">${r.name}</h3>
          </div>
          <span class="recipe-tag">${r.occasion} · ${r.weather}</span>
        </div>
        <div class="recipe-mats">
          ${r.mats.map(m => {
            const isAdded = r.addedIds && r.addedIds.has(m.id);
            const isLocked = state.locked.has(m.id);
            const thumb = m.img ? `<img src="${m.img}" alt="${m.name}" style="width:100%;height:100%;object-fit:cover;border-radius:11px"/>` : icon(m.icon, m.tint);
            return `<button type="button" class="recipe-mat${isAdded ? " is-added" : " is-chosen"}${isLocked ? " is-locked" : ""}" data-mat="${m.id}" style="background:${m.bg}" aria-label="${m.name}，${isLocked ? "解锁" : "锁定"}">${thumb}<span class="mat-badge" aria-hidden="true">${isLocked ? "🔒" : isAdded ? "+" : "✓"}</span></button>`;
          }).join("")}
        </div>
        <p class="recipe-meta">${r.mats.length} 件 · 你选 ${r.chosenCount} 件${r.mats.length - r.chosenCount > 0 ? " · 衣橱补充 " + (r.mats.length - r.chosenCount) + " 件" : ""} · 复用率 ${r.reuse}%</p>
        <div class="recipe-why">
          ${r.reason.map(x => `<div class="why-row"><span class="why-k">${x.k}</span><span class="why-t">${x.t}</span></div>`).join("")}
        </div>
        ${r.tone ? `<p class="recipe-rhythm">${icon("star", "var(--sage-deep)")}${r.tone}：偏「${biasLabel(r.moodBias)}」气质，已按今日${PHASE_INFO[r.phase].label}节律微调</p>` : ""}
        <div class="recipe-actions">
          <button class="act-worn" data-act="worn">今天穿了 ✓</button>
          <button class="act-save${r.saved ? " saved" : ""}" data-act="save">${r.saved ? "已收藏 ♥" : "收藏 ♡"}</button>
          <button class="act-try" data-act="try">试穿 →</button>
        </div>
      </article>`).join("");
    $$(".recipe").forEach(card => {
      const r = list.find(x => x.id === card.dataset.id);
      $(".act-save", card).addEventListener("click", () => saveRecipe(r, card));
      $(".act-try", card).addEventListener("click", () => tryRecipe(r));
      $(".act-worn", card).addEventListener("click", () => wearRecipe(r, card));
      $$(".recipe-mat", card).forEach(el => {
        el.addEventListener("click", () => toggleLock(el.dataset.mat, r));
      });
    });
  }


  // 锁定/解锁某件单品：换一套时锁定件保留
  function toggleLock(id, r) {
    if (state.locked.has(id)) { state.locked.delete(id); toast("已解锁，下次换套可能替换"); }
    else { state.locked.add(id); toast("已锁定，换一套时保留这件"); }
    renderRecipes(currentRecipes);
  }


  // 今天穿了：记录穿着、累计复用
  function wearRecipe(r, card) {
    r.mats.forEach(m => { state.worn[m.id] = (state.worn[m.id] || 0) + 1; });
    state.wornDays++;
    saveProfile();
    const btn = $(".act-worn", card);
    btn.classList.add("is-worn");
    btn.textContent = "已记录 ✓";
    const totalWears = Object.values(state.worn).reduce((a, b) => a + b, 0);
    toast(`已记录今天的穿着 · 累计 ${state.wornDays} 次 · 单品穿着 ${totalWears} 件次`);
  }


  function biasLabel(b) {
    return b === "soft" ? "柔和" : b === "sharp" ? "利落" : "中性";
  }


  // 生成推荐理由：配色 / 场合 / 天气 / 舒适度
  function buildReason(mats, r) {
    const reasons = [];
    // 配色
    const colors = [...new Set(mats.map(m => m.color).filter(Boolean))];
    if (colors.length) {
      const key = colors.slice(0, 3).join("、");
      const harmony = colors.length <= 2 ? "同色调更显整体、耐看" : "以" + colors[0] + "为主、其余点缀，层次不乱";
      reasons.push({ k: "配色", t: `${key} 组合，${harmony}` });
    }
    // 场合
    const occFit = {
      "通勤": "利落有分寸，适合日常上班", "面试": "偏正式克制，传达专业感",
      "约会": "柔和有亮点，放松又有心意", "度假": "轻松舒展，方便活动拍照",
      "日常": "怎么穿都自在的通用组合", "小聚": "松弛得体，不会用力过猛"
    };
    reasons.push({ k: "场合", t: `贴合「${r.occasion}」：${occFit[r.occasion] || "得体好搭"}` });
    // 天气
    const wFit = {
      "晴": "透气不闷，日照下也清爽", "微凉": "有可叠穿的外层，早晚不冷",
      "阴雨": "深色耐脏、材质好打理", "炎热": "轻薄透气，减少闷汗"
    };
    reasons.push({ k: "天气", t: `应对「${r.weather}」：${wFit[r.weather] || "冷暖适中"}` });
    // 舒适度（正式度 + 件数）
    const comfort = state.formal < 40 ? "版型宽松、活动无拘束" : state.formal > 66 ? "线条利落、正式但不紧绷" : "松紧适中、久穿不累";
    reasons.push({ k: "舒适", t: comfort });
    return reasons;
  }


  function saveRecipe(r, card) {
    r.saved = !r.saved;
    const b = $(".act-save", card);
    b.classList.toggle("saved", r.saved);
    b.textContent = r.saved ? "已收藏 ♥" : "收藏配方 ♡";
    if (r.saved) {
      state.saved.push(r.id);
      updateQuickLogOpts();
      bumpElement(r.element.sym, 3);
      toast("配方已入册，风格权重 +3");
      API.post("/api/recipes", {
        name: r.name, code: r.code, occasion: r.occasion, weather: r.weather,
        element: r.element, mats: r.mats.map(m => m.id)
      }).then(d => { if (d && d.id) recipeServerId.set(r.code, d.id); });
    } else {
      state.saved = state.saved.filter(id => id !== r.id);
      const sid = recipeServerId.get(r.code);
      if (sid) { API.del("/api/recipes/" + sid); recipeServerId.delete(r.code); }
    }
  }


  function tryRecipe(r) {
    state.tryOn = r.mats.slice(0, 4).map((m, i) => ({
      key: m.id + "_" + i, icon: m.icon, tint: m.tint, img: m.img, bg: m.bg,
      x: 50 + (i % 2) * 20 - 10, y: 24 + i * 16, scale: 1
    }));
    bumpElement(r.element.sym, 1);
    goto("mirror");
    renderLayers();
    renderSticker();
    toast("已把「" + r.name + "」放进试衣镜");
  }


  $("#alchemyBtn").addEventListener("click", alchemize);
  $("#formalRange").addEventListener("input", e => { state.formal = +e.target.value; renderGenConfirm(); });
  if ($("#modeFill")) $("#modeFill").addEventListener("click", () => { state.genMode = "fill"; renderGenConfirm(); });
  if ($("#modeOnly")) $("#modeOnly").addEventListener("click", () => { state.genMode = "only"; renderGenConfirm(); });
  if ($("#keepResults")) $("#keepResults").addEventListener("change", e => { state.keepResults = e.target.checked; });
  if ($("#scopeToday")) $("#scopeToday").addEventListener("click", () => { state.genScope = "today"; renderGenConfirm(); updateAlchemyLabel(); });
  if ($("#scopeCapsule")) $("#scopeCapsule").addEventListener("click", () => { state.genScope = "capsule"; renderGenConfirm(); updateAlchemyLabel(); });


  function updateAlchemyLabel() {
    const el = $("#alchemyBtnLabel");
    if (!el) return;
    const hasResults = currentRecipes.length > 0;
    if (state.genScope === "capsule") el.textContent = hasResults ? "换一批 · 重新炼胶囊" : "炼一批 · 胶囊多套";
    else el.textContent = hasResults ? "换一套 · 重新炼金" : "一键炼金 · 今日一套";
  }


  function spawnMotes() {
    const box = $("#motes"); box.innerHTML = "";
    for (let i = 0; i < 18; i++) {
      const m = document.createElement("div");
      m.className = "mote";
      const ang = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 40;
      m.style.left = "50%"; m.style.top = "50%";
      m.style.setProperty("--tx", Math.cos(ang) * -dist + "px");
      m.style.setProperty("--ty", Math.sin(ang) * -dist + "px");
      m.style.left = (50 + Math.cos(ang) * (dist / 1.6)) + "%";
      m.style.top = (50 + Math.sin(ang) * (dist / 1.6)) + "%";
      m.style.background = Math.random() < .5 ? "#d9a7b8" : "#a9b7a4";
      m.style.animationDelay = (Math.random() * .3) + "s";
      box.appendChild(m);
    }
  }


  // ---------- AR 镜像 ----------
  const stage = $("#mirrorStage");
  const layersEl = $("#mirrorLayers");


  function renderTray() {
    const items = GARMENTS.filter(g => ["上装", "外套", "下装", "连衣裙", "鞋", "配饰"].includes(g.cat)).slice(0, 12);
    $("#layerTray").innerHTML = items.map(g =>
      `<button class="tray-item" data-id="${g.id}" title="${g.name}" style="background:${g.bg}">${g.img ? `<img src="${g.img}" alt="${g.name}" style="width:100%;height:100%;object-fit:cover;border-radius:11px"/>` : icon(g.icon, g.tint)}</button>`
    ).join("");
    $$("#layerTray .tray-item").forEach(b => b.addEventListener("click", () => addLayer(b.dataset.id)));
  }


  function addLayer(id) {
    const g = GARMENTS.find(x => x.id === id);
    if (!g) return;
    state.tryOn.push({ key: id + "_" + Date.now(), name: g.name, icon: g.icon, tint: g.tint, img: g.img, bg: g.bg, x: 50, y: 40, scale: 1 });
    renderLayers();
  }


  function renderLayers() {
    layersEl.innerHTML = state.tryOn.map(l => `
      <div class="layer" data-key="${l.key}" tabindex="0" role="group" aria-label="${l.name || "试穿单品"}图层，方向键移动，加减键缩放" style="left:${l.x}%;top:${l.y}%;transform:translate(-50%,-50%) scale(${l.scale})">
        <div class="layer-card" style="background:${l.bg || 'var(--card-solid)'}">
          ${l.img ? `<img src="${l.img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:14px"/>` : icon(l.icon, l.tint)}
        </div>
        <button type="button" class="rm" aria-label="移除${l.name || "试穿单品"}">×</button>
      </div>`).join("");
    $$(".layer", layersEl).forEach(el => {
      const l = state.tryOn.find(x => x.key === el.dataset.key);
      $(".rm", el).addEventListener("click", ev => {
        ev.stopPropagation();
        state.tryOn = state.tryOn.filter(x => x.key !== l.key); renderLayers();
      });
      enableDrag(el, l);
      el.addEventListener("keydown", ev => {
        const step = ev.shiftKey ? 5 : 2;
        if (ev.key === "ArrowLeft") l.x = Math.max(0, l.x - step);
        else if (ev.key === "ArrowRight") l.x = Math.min(100, l.x + step);
        else if (ev.key === "ArrowUp") l.y = Math.max(0, l.y - step);
        else if (ev.key === "ArrowDown") l.y = Math.min(100, l.y + step);
        else if (ev.key === "+" || ev.key === "=") l.scale = Math.min(3, l.scale + .1);
        else if (ev.key === "-" || ev.key === "_") l.scale = Math.max(.4, l.scale - .1);
        else return;
        ev.preventDefault();
        el.style.left = l.x + "%";
        el.style.top = l.y + "%";
        el.style.transform = `translate(-50%,-50%) scale(${l.scale})`;
      });
      el.addEventListener("wheel", ev => {
        ev.preventDefault();
        l.scale = Math.min(3, Math.max(.4, l.scale - Math.sign(ev.deltaY) * .1));
        el.style.transform = `translate(-50%,-50%) scale(${l.scale})`;
      }, { passive: false });
    });
  }


  function enableDrag(el, l) {
    let startX, startY, ox, oy, pinchDist = 0, startScale = 1;
    const rect = () => stage.getBoundingClientRect();
    function onDown(e) {
      if (e.target.classList.contains("rm")) return;
      const t = e.touches ? e.touches : [e];
      if (t.length === 2) {
        pinchDist = dist(t[0], t[1]); startScale = l.scale;
      } else {
        startX = t[0].clientX; startY = t[0].clientY; ox = l.x; oy = l.y;
      }
      window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
      window.addEventListener("touchmove", onMove, { passive: false }); window.addEventListener("touchend", onUp);
    }
    function onMove(e) {
      const t = e.touches ? e.touches : [e];
      const r = rect();
      if (t.length === 2) {
        e.preventDefault();
        l.scale = Math.min(3, Math.max(.4, startScale * (dist(t[0], t[1]) / pinchDist)));
      } else if (startX != null) {
        if (e.touches) e.preventDefault();
        l.x = Math.min(100, Math.max(0, ox + ((t[0].clientX - startX) / r.width) * 100));
        l.y = Math.min(100, Math.max(0, oy + ((t[0].clientY - startY) / r.height) * 100));
      }
      el.style.left = l.x + "%"; el.style.top = l.y + "%";
      el.style.transform = `translate(-50%,-50%) scale(${l.scale})`;
    }
    function onUp() {
      startX = startY = null;
      window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove); window.removeEventListener("touchend", onUp);
    }
    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown, { passive: false });
  }
  const dist = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);


  // 摄像头
  $("#startCam").addEventListener("click", async () => {
    const video = $("#mirrorVideo");
    if (stage.classList.contains("cam-on")) {
      const s = video.srcObject; if (s) s.getTracks().forEach(t => t.stop());
      video.srcObject = null; stage.classList.remove("cam-on");
      $("#startCam").textContent = "开启摄像头"; return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      video.srcObject = stream; stage.classList.add("cam-on");
      $("#startCam").textContent = "关闭摄像头";
    } catch (err) {
      toast("未获得摄像头权限 · 已用镜像预览位");
    }
  });


  // ---------- 镜像状态贴纸 ----------
  function renderSticker() {
    const box = $("#statusSticker");
    if (!box) return;
    if (state.astro.stickerHidden) { box.hidden = true; return; }
    const phase = getCyclePhase(todayStr()).phase;
    const lastScore = state.astro.checkins.length ? state.astro.checkins[state.astro.checkins.length - 1].score : null;
    $("#ssPhase").textContent = PHASE_INFO[phase].label;
    const picked = INTENT_OPTS.find(x => x.id === state.astro.intent);
    $("#ssScore").textContent = picked ? picked.label : (lastScore != null ? lastScore : "--");
    box.classList.toggle("has-intent", !!picked);
    box.hidden = false;
  }
  $("#ssClose") && $("#ssClose").addEventListener("click", () => {
    state.astro.stickerHidden = true;
    renderSticker();
  });


  // ---------- 风格元素周期表 ----------
  function bumpElement(sym, n) {
    state.elementScore[sym] = (state.elementScore[sym] || 0) + n;
    saveProfile();
  }
  function renderTable() {
    const total = Object.values(state.elementScore).reduce((a, b) => a + b, 0);
    const lit = Object.values(state.elementScore).filter(v => v > 0).length;
    $("#tableStats").innerHTML = `
      <div class="stat"><div class="stat-val">${state.saved.length}</div><div class="stat-lbl">收藏配方</div></div>
      <div class="stat"><div class="stat-val">${lit}</div><div class="stat-lbl">已点亮元素</div></div>
      <div class="stat"><div class="stat-val">${total}</div><div class="stat-lbl">风格权重</div></div>`;
    const max = Math.max(1, ...Object.values(state.elementScore));
    $("#periodicTable").innerHTML = ELEMENTS.map((e, i) => {
      const v = state.elementScore[e.sym] || 0;
      const pct = Math.round((v / max) * 100);
      return `<div class="elem${v > 0 ? " lit" : ""}">
        <div class="elem-fill" style="height:${v > 0 ? Math.max(18, pct) : 0}%"></div>
        <div class="elem-num" style="position:relative">${i + 1}</div>
        <div class="elem-sym" style="position:relative">${e.sym}</div>
        <div class="elem-name" style="position:relative">${e.name}</div>
      </div>`;
    }).join("");
  }


  // ---------- toast ----------
  let toastTimer;
  let toastCleanupTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    clearTimeout(toastCleanupTimer);
    requestAnimationFrame(() => t.classList.add("is-visible"));
    toastTimer = setTimeout(() => {
      t.classList.remove("is-visible");
      toastCleanupTimer = setTimeout(() => { t.hidden = true; }, reduceMotion() ? 0 : 180);
    }, 2600);
  }


  // ---------- 星轨 · 身心节律 ----------
  function computeStreak() {
    const dates = new Set(state.astro.checkins.map(c => c.date));
    let streak = 0, cursor = new Date(todayStr() + "T00:00:00");
    // 若今天还没打卡，从昨天开始计
    if (!dates.has(todayStr())) cursor.setDate(cursor.getDate() - 1);
    while (dates.has(cursor.toISOString().slice(0, 10))) {
      streak++; cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }


  function computeSleepDebt() {
    const last7 = state.astro.checkins.slice(-7);
    if (!last7.length) return 0;
    const total = last7.reduce((sum, c) => sum + (SLEEP_TARGET_HRS - c.dur), 0);
    return Math.round(total * 10) / 10;
  }


  function computeFactorImpact() {
    const stats = {};
    SLEEP_TAGS.forEach(t => stats[t.id] = { sum: 0, withCount: 0, withoutSum: 0, withoutCount: 0 });
    state.astro.checkins.forEach(c => {
      SLEEP_TAGS.forEach(t => {
        if ((c.tags || []).includes(t.id)) { stats[t.id].sum += c.score; stats[t.id].withCount++; }
        else { stats[t.id].withoutSum += c.score; stats[t.id].withoutCount++; }
      });
    });
    return SLEEP_TAGS.map(t => {
      const s = stats[t.id];
      if (!s.withCount || !s.withoutCount) return { ...t, delta: null };
      const delta = Math.round((s.sum / s.withCount) - (s.withoutSum / s.withoutCount));
      return { ...t, delta };
    });
  }


  function renderAstroScore() {
    const checkins = state.astro.checkins;
    const last = checkins.length ? checkins[checkins.length - 1] : null;
    const ring = $("#scoreRing");
    ring.style.setProperty("--p", last ? last.score : 0);
    $("#scoreVal").textContent = last ? last.score : "--";


    const { phase } = getCyclePhase(todayStr());
    const info = PHASE_INFO[phase];
    const pill = $("#phasePill");
    pill.className = "phase-pill " + info.cls;
    pill.textContent = info.label;
    $("#phaseTip").textContent = phaseTipWithScore(phase, last ? last.score : null);


    const bedRef = ($("#bedInput") && $("#bedInput").value) || (last ? last.bed : "23:00");
    renderWakeWindows(bedRef);
  }


  function renderWakeWindows(bedRef) {
    const el = $("#wakeWindows");
    if (!el) return;
    const windows = computeWakeWindows(bedRef);
    const selected = state.astro.wakePick;
    let html = windows.map(w => `
      <button type="button" class="wake-window${w.best ? " is-best" : ""}${selected === w.time ? " is-picked" : ""}" data-time="${w.time}">
        <div class="ww-time">${w.time}</div>
        <div class="ww-lbl">${w.cycles} 个周期 · ${w.hrs}h</div>
      </button>`).join("");
    // 自定义起床时间项
    const customVal = state.astro.wakeCustom || "";
    const isCustomPicked = customVal && selected === customVal;
    html += `
      <label class="wake-window wake-custom${isCustomPicked ? " is-picked" : ""}">
        <div class="ww-lbl">自定义</div>
        <input type="time" id="wakeCustomInput" class="ww-custom-input" value="${customVal}" />
      </label>`;
    el.innerHTML = html;


    // 点击预设窗口 → 设为起床时间
    el.querySelectorAll(".wake-window[data-time]").forEach(node => {
      node.addEventListener("click", () => setWakePick(node.dataset.time));
    });
    // 自定义输入 → 设为起床时间
    const ci = $("#wakeCustomInput");
    if (ci) {
      ci.addEventListener("click", e => e.stopPropagation());
      ci.addEventListener("change", e => {
        const v = e.target.value;
        if (!v) return;
        state.astro.wakeCustom = v;
        setWakePick(v);
      });
    }
  }


  function setWakePick(timeStr) {
    if (!timeStr) return;
    state.astro.wakePick = timeStr;
    if ($("#wakeInput")) $("#wakeInput").value = timeStr;
    // 只重绘窗口，避免整页刷新丢失焦点
    const bedRef = ($("#bedInput") && $("#bedInput").value) || "23:00";
    renderWakeWindows(bedRef);
  }


  function renderCycleStrip() {
    const el = $("#cycleStrip");
    const today = todayStr();
    const days = [];
    for (let i = -6; i <= 7; i++) days.push(todayStr(i));
    el.innerHTML = days.map(d => {
      const { phase } = getCyclePhase(d);
      const isToday = d === today;
      const isFuture = d > today;
      const dt = new Date(d + "T00:00:00");
      return `<div class="cycle-day p-${phase}${isToday ? " today" : ""}${isFuture ? " predicted" : ""}" title="${d}">
        <span>${dt.getDate()}</span>
      </div>`;
    }).join("");


    const nextPeriod = nextPeriodDate();
    const nextOvu = nextOvulationDate();
    const fmtDate = d => `${d.getMonth() + 1}月${d.getDate()}日`;
    $("#cyclePredict").textContent =
      `预计下次经期 ${fmtDate(nextPeriod)}（约 ${Math.round((nextPeriod - new Date(today + "T00:00:00")) / DAY_MS)} 天后）` +
      ` · 预计排卵日 ${fmtDate(nextOvu)}`;


    $("#periodStartInput").value = state.astro.periodStart;
    $("#cycleLenInput").value = state.astro.cycleLen;
    $("#cycleLenVal").textContent = state.astro.cycleLen + " 天";
    $("#periodLenInput").value = state.astro.periodLen;
    $("#periodLenVal").textContent = state.astro.periodLen + " 天";
  }


  function renderDebtVessel() {
    const debt = computeSleepDebt();
    const liquid = $("#debtLiquid");
    const pct = Math.min(100, Math.max(6, Math.abs(debt) * 10));
    liquid.style.height = pct + "%";
    liquid.classList.toggle("is-rested", debt < 0);
    $("#debtLabel").textContent = debt === 0 ? "收支平衡 · 刚刚好"
      : debt > 0 ? `欠觉 ${debt} 小时` : `已补觉 ${Math.abs(debt)} 小时`;
  }


  function renderStreakAndBadges() {
    const streak = computeStreak();
    $("#streakVal").textContent = streak;
    $("#badgeRow").innerHTML = BADGES.map(b =>
      `<div class="badge${streak >= b.need ? " earned" : ""}" title="${b.name}">${b.icon}</div>`).join("");
  }


  function renderFactorList() {
    const factors = computeFactorImpact().filter(f => f.delta != null);
    const el = $("#factorList");
    if (!factors.length) {
      el.innerHTML = `<p class="factor-empty">记录满 2 组不同标签的打卡后，这里会显示每个标签对睡眠分的影响。</p>`;
      return;
    }
    const max = Math.max(1, ...factors.map(f => Math.abs(f.delta)));
    el.innerHTML = factors.map(f => `
      <div class="factor">
        <span class="factor-name">${f.name}</span>
        <div class="factor-bar"><div class="factor-bar-fill ${f.delta >= 0 ? "pos" : "neg"}" style="width:${Math.min(50, Math.abs(f.delta) / max * 50)}%"></div></div>
        <span class="factor-val">${f.delta > 0 ? "+" : ""}${f.delta}</span>
      </div>`).join("");
  }


  function renderTagChips() {
    $("#tagChips").innerHTML = SLEEP_TAGS.map(t =>
      `<button type="button" class="chip" data-tag="${t.id}">${t.name}</button>`).join("");
    $$("#tagChips .chip").forEach(c => c.addEventListener("click", () => c.classList.toggle("is-active")));
  }


  // ---------- 滑动入睡组件 ----------
  function renderSleepSlider() {
    const el = $("#sleepSliderWidget");
    if (!el) return;
    const isSleeping = !!state.astro.isSleeping;
    el.classList.toggle("is-sleeping", isSleeping);
    document.body.classList.toggle("sleep-mode", isSleeping);
    document.body.dataset.appearance = isSleeping ? "sleep" : "light";
    
    if (isSleeping) {
      $("#ssContentUnsleep").hidden = true;
      $("#ssContentSleep").hidden = false;
      const bedRef = state.astro.sleepStartTime || "23:00";
      $("#ssSleepTime").textContent = `入睡时间：${bedRef}`;
    } else {
      $("#ssContentUnsleep").hidden = false;
      $("#ssContentSleep").hidden = true;
      // 重置滑块与背景到清醒初始态
      const thumb = $("#ssThumb");
      const track = $("#ssTrack");
      const bg = $("#ssBg");
      const stars = $("#ssStars");
      const textEl = $("#ssTrackText");
      const title = $("#ssContentUnsleep .ss-title");
      if (thumb) { thumb.style.transition = "none"; thumb.style.transform = "translateX(0)"; }
      if (track) track.style.setProperty("--progress", "0%");
      if (bg) bg.style.setProperty("--night", 0);
      if (stars) stars.style.opacity = 0;
      if (textEl) textEl.style.opacity = 1;
      if (title) title.style.color = "var(--ink)";
      document.body.style.setProperty("--page-night", 0);
      initSleepSlider();
    }
  }


  function initSleepSlider() {
    const track = $("#ssTrack");
    const thumb = $("#ssThumb");
    if (!track || !thumb || thumb.dataset.inited) return;
    thumb.dataset.inited = "1";
    
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let maxX = 0;
    const textEl = $("#ssTrackText");


    function updatePos(x) {
      const bg = $("#ssBg");
      const stars = $("#ssStars");
      const title = $("#ssContentUnsleep .ss-title");
      
      maxX = Math.max(1, maxX || (track.offsetWidth - thumb.offsetWidth - 8));
      currentX = Math.max(0, Math.min(x, maxX));
      
      // Update DOM
      thumb.style.transform = `translateX(${currentX}px)`;
      const pct = Math.max(0, Math.min(100, (currentX / maxX) * 100));
      
      track.style.setProperty("--progress", `${pct}%`);
      if (textEl) {
        textEl.style.opacity = Math.max(0, 1 - (pct / 80));
      }
      
      if (bg) bg.style.setProperty("--night", pct / 100);
      if (stars) stars.style.opacity = pct / 100;
      if (title) title.style.color = pct > 48 ? "rgba(255,240,246,.96)" : "var(--ink)";
      // 整个页面背景随滑动进度渐变到酒红
      document.body.style.setProperty("--page-night", pct / 100);
    }


    function onStart(e) {
      if (state.astro.isSleeping) return;
      document.body.dataset.appearance = "transition";
      isDragging = true;
      thumb.style.transition = "none";
      // 从滑块实际位置读取，避免取消后位置残留
      const m = /translateX\(([-\d.]+)px\)/.exec(thumb.style.transform);
      currentX = m ? parseFloat(m[1]) : 0;
      startX = (e.touches ? e.touches[0].clientX : e.clientX) - currentX;
      maxX = track.offsetWidth - thumb.offsetWidth - 8; // padding
    }


    function onMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
      updatePos(x);
    }


    function onEnd() {
      if (!isDragging) return;
      isDragging = false;
      thumb.style.transition = "transform .3s cubic-bezier(0.2, 0.8, 0.2, 1)";
      
      // 需要真实滑到接近末端，且轨道有有效宽度，才判定完成
      if (maxX > 20 && currentX > maxX * 0.9) {
        // 完成滑动
        updatePos(maxX);
        setTimeout(() => {
          const now = new Date();
          state.astro.isSleeping = true;
          state.astro.sleepStartTime = fmtHM(now.getHours() * 60 + now.getMinutes());
          // 交给 sleep-mode 类接管全局夜色
          document.body.style.removeProperty("--page-night");
          renderSleepSlider();
        }, 150);
      } else {
        // 未完成，回弹并让页面颜色一起退回
        updatePos(0);
        document.body.style.setProperty("--page-night", 0);
        document.body.dataset.appearance = "light";
      }
    }

    thumb.addEventListener("keydown", e => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      maxX = Math.max(1, track.offsetWidth - thumb.offsetWidth - 8);
      currentX = maxX;
      updatePos(maxX);
      if (!state.astro.isSleeping) {
        const now = new Date();
        document.body.dataset.appearance = "transition";
        state.astro.isSleeping = true;
        state.astro.sleepStartTime = fmtHM(now.getHours() * 60 + now.getMinutes());
        document.body.style.removeProperty("--page-night");
        renderSleepSlider();
      }
    });


    thumb.addEventListener("mousedown", onStart);
    document.addEventListener("mousemove", onMove, { passive: false });
    document.addEventListener("mouseup", onEnd);
    thumb.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
    
    // init state
    thumb.style.transition = "none";
    updatePos(0);
    
    $("#ssCancelBtn").onclick = () => {
      state.astro.isSleeping = false;
      state.astro.sleepStartTime = null;
      renderSleepSlider();
    };
  }


  
  // ========== 融合交互逻辑 ==========
  
  const INTENT_OPTS = [
    {id:"relax", label:"舒服就好", tag:"relax", match:"soft"},
    {id:"sharp", label:"精神利落", tag:"work", match:"sharp"},
    {id:"shine", label:"亮眼出彩", tag:"party", match:"sharp"}
  ];
  state.astro.intent = null;
  state.astro.bodyTags = [];
  
  function updateQuickLogOpts() {
    const sel = $("#quickOutfitInput");
    if (!sel) return;
    const history = state.saved.map(id => currentRecipes.find(r => r.id === id)).filter(Boolean);
    let html = `<option value="none">稍后从试衣镜选择</option>`;
    history.forEach(r => { html += `<option value="${r.id}">已藏：${r.name}</option>`; });
    sel.innerHTML = html;
  }
  
  function renderFusionCards() {
    // 1. 意图 chips
    if ($("#intentChips")) {
      $("#intentChips").innerHTML = INTENT_OPTS.map(i => 
        `<button type="button" class="chip${state.astro.intent===i.id?' is-active':''}" data-intent="${i.id}">${i.label}</button>`
      ).join('');
      $$("#intentChips .chip").forEach(c => c.addEventListener("click", () => {
        state.astro.intent = state.astro.intent===c.dataset.intent ? null : c.dataset.intent;
        renderFusionCards();
      }));
    }
    if ($("#mirrorIntentChips")) {
      $("#mirrorIntentChips").innerHTML = INTENT_OPTS.map(i => 
        `<button type="button" class="chip${state.astro.intent===i.id?' is-active':''}" data-intent="${i.id}">${i.label}</button>`
      ).join('');
      $$("#mirrorIntentChips .chip").forEach(c => c.addEventListener("click", () => {
        state.astro.intent = state.astro.intent===c.dataset.intent ? null : c.dataset.intent;
        const picked = INTENT_OPTS.find(x => x.id === state.astro.intent);
        toast(picked ? `已记下“${picked.label}”，今晚速记和炼金配方会联动。` : "已取消今日状态");
        renderFusionCards();
      }));
    }
    
    // 今日标签覆盖身体、情绪、环境与生活节奏，方便一次速记当天状态。
    const EXTRA_TAGS = [
      {id:"cramps", name:"有点胀/痛"}, {id:"tired", name:"疲惫"}, {id:"bloating", name:"腹部胀"},
      {id:"headache", name:"头部不适"}, {id:"low-energy", name:"能量偏低"}, {id:"sensitive", name:"情绪敏感"},
      {id:"relax", name:"放松"}, {id:"focused", name:"专注在线"}, {id:"cold", name:"有点怕冷"},
      {id:"hot", name:"容易出汗"}, {id:"noisy", name:"环境嘈杂"}, {id:"late-meal", name:"晚餐偏晚"},
      {id:"hydrated", name:"喝水充足"}, {id:"outdoor", name:"户外走走"}
    ];
    if ($("#bodyTagChips")) {
      if (!$("#bodyTagChips").innerHTML) {
        $("#bodyTagChips").innerHTML = [...EXTRA_TAGS, ...SLEEP_TAGS].map(t => 
          `<button type="button" class="chip" data-btag="${t.id}">${t.name}</button>`
        ).join('');
        $$("#bodyTagChips .chip").forEach(c => c.addEventListener("click", () => c.classList.toggle("is-active")));
      }
      const picked = INTENT_OPTS.find(x => x.id === state.astro.intent);
      if (picked) {
        const chip = $$("#bodyTagChips .chip").find(c => c.dataset.btag === picked.tag);
        if (chip) chip.classList.add("is-active");
      }
    }
    
    // 2. 预测
    const { phase, dayInCycle, ovuDay } = getCyclePhase(todayStr());
    const alerts = [];
    if (phase === "luteal" && dayInCycle > state.astro.cycleLen - 3) {
      alerts.push(`预计 <b>2 天后进入经期</b>。明晚起睡眠分可能偏低，今晚建议提前 15 分钟躺下；衣柜里那件<b>米白针织衫 + 阔腿裤</b>明天会很合适，柔软不压迫。`);
    } else if (phase === "luteal") {
      const rec = state.astro.checkins.slice(-2);
      if (rec.length===2 && rec[0].score<70 && rec[1].score<70) {
        alerts.push(`最近睡眠波动可能和<b>黄体期</b>有关，不必自责，这是正常节律。今晚选个“舒服就好”的配方吧。`);
      }
    } else if (phase === "follicular" && dayInCycle >= ovuDay - 2 && dayInCycle < ovuDay) {
      alerts.push(`即将进入<b>排卵期</b>高能时刻。明早穿搭可以大胆选亮色或利落版型，晚上可能比较兴奋，留足睡前过渡期。`);
    }
    
    const pCard = $("#predictAlerts");
    if (pCard) {
      if (alerts.length) {
        pCard.innerHTML = `<div class="fusion-head" style="margin-bottom:12px">
          <div><span class="eyebrow mini">PREDICT</span><h3>前瞻提醒</h3></div>
        </div><div class="alert-list">` + alerts.map(a => `<div class="alert-item"><div class="alert-mark">✧</div><div class="alert-copy">${a}</div></div>`).join('') + `</div>`;
      } else {
        pCard.innerHTML = "";
      }
    }
    
    // 3. 三角洞察
    const tCard = $("#triangleInsights");
    if (tCard && state.astro.checkins.length > 2) {
      let html = `<div class="triangle-item">本周<b>黄体期</b>里，睡眠分平均在 <b>68</b> 左右，比其他时期低 4 分 —— 与你的周期节奏完全吻合。</div>`;
      html += `<div class="triangle-item">穿宽松款（比如米白针织衫、阔腿裤）的日子，当晚睡眠分平均 <b>+6</b> 分，身体感受多为“放松”。</div>`;
      html += `<div class="triangle-item">卵泡期你多次尝试了<b>利落亮色</b>配方，风格偏好随着生理节律在自然流动。</div>`;
      tCard.innerHTML = html;
    } else if (tCard) {
      tCard.innerHTML = `<p class="factor-empty">再记录 2 天速记，系统将为你生成经期、睡眠与穿搭的三角关联洞察。</p>`;
    }
    
    // 4. 场景模拟卡
    const sCard = $("#sceneFlow");
    if (sCard) {
      sCard.innerHTML = `
        <div class="fusion-head">
          <div><span class="eyebrow mini">SCENARIO</span><h3>体验这个联动场景</h3></div>
        </div>
        <div class="scene-steps">
          <div class="scene-step"><div class="scene-num">1</div><p>你在镜像页选择“舒服就好”。</p></div>
          <div class="scene-step"><div class="scene-num">2</div><p>炼金引擎推荐柔软单品；当你睡前速记时，“放松”标签和当晚穿搭已自动填好。</p></div>
          <div class="scene-step"><div class="scene-num">3</div><p>过两天进入经期前，星历会自动给你发提醒，并推荐宽松衣物。</p></div>
        </div>
        <div class="scene-actions">
          <button class="btn-primary" type="button" id="demoPlayBtn">一键演示此场景</button>
        </div>
      `;
      $("#demoPlayBtn").addEventListener("click", runFusionDemo);
    }
  }
  
  function runFusionDemo() {
    goto("mirror");
    const el = $$("#mirrorIntentChips .chip").find(c => c.dataset.intent==="relax");
    if (el) el.click();
    setTimeout(() => {
      goto("astro");
      toast("“舒服就好”已同步到今日速记预填");
      const bt = $$("#bodyTagChips .chip").find(c => c.dataset.btag==="relax");
      if (bt) bt.classList.add("is-active");
    }, 2500);
  }


  // 接管速记提交
  const qForm = $("#quickLogForm");
  if (qForm) {
    qForm.addEventListener("submit", e => {
      e.preventDefault();
      const bed = $("#quickBedInput").value;
      const wake = $("#quickWakeInput").value;
      const tags = $$("#bodyTagChips .chip.is-active").map(c => c.dataset.btag);
      if (state.astro.intent) tags.push(INTENT_OPTS.find(x=>x.id===state.astro.intent).tag);
      
      const score = computeSleepScore(bed, wake, tags);
      const dur = sleepDurationHrs(bed, wake);
      const date = todayStr();
      
      // 更新经期
      const flow = $("#periodFlowInput").value;
      if (flow !== "none") {
        if (getCyclePhase(date).phase !== "period") {
           state.astro.periodStart = date;
        }
      }
      
      state.astro.checkins = state.astro.checkins.filter(c => c.date !== date);
      state.astro.checkins.push({ date, bed, wake, tags, score, dur });
      API.post("/api/checkins", { date, bed, wake, tags, score, dur });
      if ($("#bedInput")) $("#bedInput").value = bed;
      if ($("#wakeInput")) $("#wakeInput").value = wake;
      
      renderAstro();
      renderSticker();
      renderFusionCards();
      
      let out = `已速记！今晚睡眠分 ${score}。`;
      const recId = $("#quickOutfitInput").value;
      if (recId && recId !== "none") out += ` 穿搭已入库。`;
      toast(out);
      
      $("#quickSummary").innerHTML = `✔ ${date} 记录完成：睡眠 ${score} 分 · ${dur.toFixed(1)}h<br>穿搭与身体感受已参与三角计算。`;
    });
  }


  if ($("#quickMirrorJump")) {
    $("#quickMirrorJump").addEventListener("click", () => goto("mirror"));
  }


  function renderAstro() {
    renderAstroScore();
    updateQuickLogOpts();
    renderFusionCards();
    renderCycleStrip();
    renderDebtVessel();
    renderStreakAndBadges();
    renderFactorList();
    renderSleepSlider();
    // 强制让全局夜色严格跟随真实睡眠状态，避免调节设置时误触深色
    if (!state.astro.isSleeping) {
      document.body.classList.remove("sleep-mode");
      document.body.style.setProperty("--page-night", 0);
    }
    if (!$("#tagChips").children.length) renderTagChips();
  }


  // 周期设置输入监听
  $("#periodStartInput").addEventListener("change", e => {
    state.astro.periodStart = e.target.value || state.astro.periodStart;
    saveProfile();
    renderAstro(); renderSticker();
  });
  $("#cycleLenInput").addEventListener("input", e => {
    state.astro.cycleLen = Number(e.target.value);
    $("#cycleLenVal").textContent = state.astro.cycleLen + " 天";
    renderCycleStrip();
  });
  $("#cycleLenInput").addEventListener("change", () => { saveProfile(); renderAstro(); renderSticker(); });
  $("#periodLenInput").addEventListener("input", e => {
    state.astro.periodLen = Number(e.target.value);
    $("#periodLenVal").textContent = state.astro.periodLen + " 天";
    renderCycleStrip();
  });
  $("#periodLenInput").addEventListener("change", () => { saveProfile(); renderAstro(); renderSticker(); });


  // 入睡时间变化 → 智能起床窗口随之重算
  if ($("#bedInput")) {
    $("#bedInput").addEventListener("input", () => {
      const bedRef = $("#bedInput").value || "23:00";
      renderWakeWindows(bedRef);
    });
  }


  // 睡前倒计时
  $("#calcBedtime").addEventListener("click", () => {
    const goal = $("#wakeGoalInput").value || "07:30";
    const bt5 = suggestBedtimeFor(goal, 5);
    const bt6 = suggestBedtimeFor(goal, 6);
    $("#bedtimeResult").innerHTML =
      `想 ${goal} 起床，建议 <b style="color:var(--ink)">${bt5}</b> 前入睡（5 个周期）；` +
      `更充分休息可 <b style="color:var(--ink)">${bt6}</b> 入睡（6 个周期）。`;
  });


  // 记录今晚数据
  $("#checkinForm").addEventListener("submit", e => {
    e.preventDefault();
    const bed = $("#bedInput").value || "23:00";
    const wake = $("#wakeInput").value || "07:00";
    const tags = $$("#tagChips .chip.is-active").map(c => c.dataset.tag);
    const score = computeSleepScore(bed, wake, tags);
    const dur = sleepDurationHrs(bed, wake);
    const date = todayStr();
    state.astro.checkins = state.astro.checkins.filter(c => c.date !== date);
    state.astro.checkins.push({ date, bed, wake, tags, score, dur });
    API.post("/api/checkins", { date, bed, wake, tags, score, dur });
    if ($("#quickBedInput")) $("#quickBedInput").value = bed;
    if ($("#quickWakeInput")) $("#quickWakeInput").value = wake;
    $$("#tagChips .chip.is-active").forEach(c => c.classList.remove("is-active"));
    renderAstro();
    renderSticker();
    toast(`已记录今晚 · 睡眠分 ${score}`);
  });


  // ---------- 初始化 ----------
  function seedAstroDemo() {
    const demo = [
      { offset: -3, bed: "23:20", wake: "07:10", tags: ["regular", "sun"] },
      { offset: -2, bed: "00:10", wake: "07:00", tags: ["screen", "caffeine"] },
      { offset: -1, bed: "22:50", wake: "06:50", tags: ["exercise", "regular"] }
    ];
    demo.forEach(d => {
      const date = todayStr(d.offset);
      const score = computeSleepScore(d.bed, d.wake, d.tags);
      const dur = sleepDurationHrs(d.bed, d.wake);
      state.astro.checkins.push({ date, bed: d.bed, wake: d.wake, tags: d.tags, score, dur });
    });
  }
  seedAstroDemo();


  renderFilters();
  renderGrid();
  renderOccasions();
  updateAlchemyLabel();
  renderTray();
  renderTagChips();
  renderSleepSlider();
  renderSticker();
  document.title = `${VIEW_TITLES.closet} — 穿搭炼金屋`;
  loadPersisted(); // 从后端恢复数据（离线时自动降级本地模式）

  // BFCache / 页面恢复也必须与内存状态一致，避免首帧残留夜色。
  window.addEventListener("pageshow", () => {
    if (state.astro.isSleeping) return;
    document.body.classList.remove("sleep-mode");
    document.body.dataset.appearance = "light";
    document.body.style.setProperty("--page-night", 0);
  });
})();
