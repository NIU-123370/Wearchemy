---
version: alpha
name: "Wearchemy"
description: "以珍珠、香水玻璃与衣料柔光为灵感的白粉色个人穿搭客户端。"
colors:
  background: "#fffafa"
  surface: "rgba(255, 255, 255, 0.46)"
  text: "#32292f"
  textMuted: "#71656d"
  textFaint: "#a99da5"
  primary: "#c9688b"
  brandSoft: "#e9a9c0"
  success: "#758271"
  focus: "rgba(218, 118, 154, 0.2)"
typography:
  sans:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif"
  display:
    fontFamily: "Noto Serif SC, Songti SC, serif"
rounded:
  DEFAULT: "1.125rem"
  sm: "0.875rem"
  md: "1.125rem"
  lg: "1.625rem"
  xl: "2.125rem"
spacing:
  content-gap: "1.125rem"
  panel-padding: "clamp(2.125rem, 5vw, 4.5rem)"
  page-max: "82.5rem"
components:
  button: {}
  card: {}
  navigation: {}
  toast: {}
  upload: {}
  slider: {}
---

# Wearchemy Design System

## Overview

### Creative North Star

界面像晨光下的珍珠首饰盘：乳白基底、香水瓶般的透明层次、少量樱粉折射。它服务于每天快速挑选衣服的个人用户，首要任务是看清单品、做出选择并自然进入下一步。

- **Audience and primary job:** 中文用户在手机或桌面端整理衣橱、生成搭配、记录状态并试穿。
- **Target markets and evidence:** 当前仓库只提供简体中文产品文案，不推断具体国家或商业市场。
- **Locale and language policy:** `zh-CN` 风格简体中文；动作使用清楚、温和的短句。
- **Usage scene:** 高频个人工具；手机优先兼顾桌面，多数操作应在一次点击或拖动中完成。
- **Register:** 产品界面，品牌表达集中在外壳、玻璃和炼金动效中。
- **Memorable signature:** 右上珍珠光球与层叠液态玻璃共同形成“衣物炼金”的识别点。
- **Restraint:** 表单、导航、反馈和长内容优先稳定与可读，不让粉色和动效抢夺任务焦点。
- **Anti-references:** 不使用霓虹赛博、厚重拟物、通用紫色 SaaS 渐变或无意义的全屏漂浮动画。
- **Token ownership/runtime mapping:** 现有运行时 CSS 为规范值所有者；本文件镜像 `theme.css :root` 的已接受语义值。组件只消费 CSS 变量和共享状态类。

## Colors

`background` 与半透明 `surface` 建立白色层级；`primary` 只用于当前项、主操作和关键选择。正文使用 `text`，辅助层级依次使用 `textMuted` 与 `textFaint`。成功和身心节律使用低饱和鼠尾草色，不以颜色作为唯一状态提示。

## Typography

控件和正文使用 Apple 系统字体、苹方与 Noto Sans SC 回退，保证中文和数字的稳定指标。展示型中文仅在少量配方标题中使用宋体回退。正文保持自然字距和约 1.7–1.8 行高；按钮避免全大写，英文眉题作为短标签例外。

## Layout

桌面端采用 248px 固定导航与自适应内容窗，最大宽度 1320px；760px 以下切换为底部导航。内容区自然滚动，固定导航不得遮挡焦点。卡片网格按 4/3/2 列响应，不隐藏任务或状态。

## Elevation & Depth

玻璃层级由高光边框、背景模糊与低对比粉灰阴影共同产生。只有外壳、导航、任务卡和浮动反馈拥有高程；正文分组不叠加多重阴影。睡眠模式保留同一层级，仅改变语义背景映射。

## Shapes

外壳使用 34px 圆角，内容卡 26px，常规控件 18px，筛选器和主按钮可使用胶囊形。线性图标统一 1.65px 圆角描边，图标不替代文字标签。

## Components

### Foundational visual states

所有可用控件具备默认、hover、focus-visible、active、selected 和 disabled/busy 状态；焦点使用粉色外环且不改变布局。选中状态同时由勾选、文字或 `aria-pressed` 表达。

### Buttons and actions

每个决策区只保留一个高强调粉色主操作；中性操作使用玻璃 outline/ghost。忙碌状态保持原尺寸、禁用重复提交并暴露 `aria-busy`。

### Navigation and data display

桌面侧栏与移动底栏共享同一当前项状态和图标。页面切换更新 `aria-current` 与文档标题。网格选择原位更新，避免重绘导致焦点跳动。

### Forms and overlays

原生时间、日期和文件选择器被明确接受为平台所有的弹层；页面负责标签、外观和反馈。Toast 是统一的 polite live region，稳定置于安全区上方并完整淡入淡出。

### Iconography

使用项目内联线性 SVG，18–20px 为主要尺寸，圆端点、圆连接；不使用表情符号承担核心导航语义。

### Motion

动效像小水滴落在玻璃表面：短、柔和、可打断。退场 120ms，状态反馈 180ms，内容进入 260ms；页面仅做轻微垂直位移和透明度交接。列表只在首次出现或筛选后做最长 168ms 的小幅错峰。减少动态模式关闭位移、循环和错峰动画。

### Content and data visualization

文字从用户动作出发：选择、记录、收藏、试穿。成功提示复述已经完成的动作；失败提示指出下一步。数字与周期信息保持稳定宽度和明确单位。

## Do's and Don'ts

- **Do:** 让透明度、边框和轻阴影共同表达层级。
- **Do:** 保持同类选择、忙碌、成功反馈在所有页面一致。
- **Don't:** 为每次点击添加弹跳、旋转或大幅位移动画。
- **Don't:** 隐藏滚动条、依赖 hover 才能发现操作，或让固定导航遮挡焦点。
