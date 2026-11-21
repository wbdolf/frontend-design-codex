# Frontend Design Fusion

一个面向 Agent Skills 客户端的网页设计 skill。它帮助你比较首屏方案、设计场景交互、处理响应式布局，并用浏览器核对实际效果。Codex、Claude Code 和其他兼容客户端使用同一份 [SKILL.md](skills/frontend-design-fusion/SKILL.md) 和参考资料。

[在线试演《月亮失物处》](https://wbdolf.github.io/frontend-design-codex/) · [比较三版首屏](https://wbdolf.github.io/frontend-design-codex/editions.html)

## 安装

下载或克隆本仓库，将整个 [frontend-design-fusion](skills/frontend-design-fusion/) 文件夹复制到下表中的技能目录。复制后的结构应为 `<技能目录>/frontend-design-fusion/SKILL.md`，同级保留 `references/`。`agents/openai.yaml` 只提供 Codex 的展示信息，通用设计流程写在 Markdown 中。

| 客户端 | 项目级目录（相对于目标项目根目录） | 个人级目录 | 在目标项目的新会话中使用 |
| --- | --- | --- | --- |
| Codex | `.agents/skills/` | `~/.agents/skills/` | 输入 `$` 选择 `frontend-design-fusion`，再描述任务 |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` | 输入 `/frontend-design-fusion`，后接任务描述 |
| VS Code 中的 GitHub Copilot | `.github/skills/` | `~/.copilot/skills/` | 在 Copilot 聊天中通过 `/` 选择该 skill |
| 其他支持 Agent Skills 的客户端 | 使用该客户端文档列出的项目技能目录，或使用其导入功能 | 依客户端而定 | 在技能列表确认名称，再用该客户端的方式调用 |

项目级安装适合团队共用，个人级安装适合本机多个项目。目录和调用方式见 [Codex 官方文档](https://developers.openai.com/codex/skills/)、[Claude Code 官方文档](https://code.claude.com/docs/en/skills)、[VS Code 官方文档](https://code.visualstudio.com/docs/agent-customization/agent-skills) 和 [Agent Skills 规范](https://agentskills.io/specification)。

**命令示例（macOS、Linux、Git Bash）**。在存放源码的目录执行：

```sh
git clone https://github.com/wbdolf/frontend-design-codex.git
skill_src="$PWD/frontend-design-codex/skills/frontend-design-fusion"
```

在同一终端切换到要设计网页的目标项目，再按客户端选择一行：

```sh
# Codex
mkdir -p .agents/skills && cp -R "$skill_src" .agents/skills/

# Claude Code
mkdir -p .claude/skills && cp -R "$skill_src" .claude/skills/

# VS Code 中的 GitHub Copilot
mkdir -p .github/skills && cp -R "$skill_src" .github/skills/
```

Windows 也可以用文件管理器将同一个文件夹复制到对应目录。已安装旧版 `frontend-design-codex` 的用户，可先装新版，确认能调用后，将旧目录移出技能搜索路径，并把保存的提示词改用新名称。仓库地址与剧场网址沿用原地址。

## 哪些已经实测

以下结果来自 2026-11-21 的 macOS 项目级安装测试。两个 CLI 都使用独立项目和本地测试端点，以核对显式调用时实际送入模型的内容。

| 对象 | 验证结果 |
| --- | --- |
| Codex CLI 0.169.0 | `skills/list` 从目标项目的 `.agents/skills/` 返回了已启用的 skill 和正确路径。显式选中后，在 Responses 请求输入中核对到了正文中的场景交互和按钮圆角章节。 |
| Claude Code 2.1.330 | 从项目的 `.claude/skills/` 安装后，执行 `/frontend-design-fusion`，在 Messages 请求中核对到了相同的正文章节。 |
| Agent Skills 文件格式 | 官方参考工具 `skills-ref validate skills/frontend-design-fusion` 通过。[校验器版本](https://github.com/agentskills/agentskills/tree/83021e2be457a9b6679148719c1f6074f0ad975e/skills-ref) |
| VS Code 中的 GitHub Copilot 及其他兼容客户端 | 提供文档安装指引，尚未进行客户端实测。 |

本轮实测覆盖技能发现或显式调用、正文加载。个人级安装、模型自动选用和跨模型端到端生成效果仍待验证。下方剧场录像来自已有演示。实际生成素材、浏览器操作和录屏取决于客户端可用的工具与权限。

## 第一次使用

在所选客户端调用 skill 后，可以给它这样一个任务：

> 为互动展览做三版首屏。使用同一套文案和素材，每版采用不同的构图和互动入口。桌面和手机都给我看，我选定方向后再展开整页。

已有明确参考时可直接要求实施。局部修复可指定出错的视口、操作和预期结果。案例复盘见[互动页面](skills/frontend-design-fusion/references/case-review.md)与[港区工作台](skills/frontend-design-fusion/references/port-operations.md)。

## 试演《月亮失物处》

向下拉动金色幕绳，观察吊轨先行、布身跟随、下摆收拢。短拉后松手会合幕，也可以点击或用键盘开幕。点亮灯的七号包厢，镜头会移向台侧楼座。离席后回到进入前的那一幕。节目单可切换两幕，包厢里的信随之改变。

[桌面往返录像](https://wbdolf.github.io/frontend-design-codex/captures/loge-passage-desktop.mp4) · [手机触屏模拟录像](https://wbdolf.github.io/frontend-design-codex/captures/loge-passage-mobile.mp4)

## 本地运行

克隆仓库后执行以下命令，在浏览器打开终端显示的本地地址。

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

剧场使用原生 HTML、CSS、JavaScript 和本地 WebP 舞美素材。主舞台入口是 [docs/index.html](docs/index.html)。

## 来源

Skill 目录保留了原有的 [Apache 2.0 许可证](skills/frontend-design-fusion/LICENSE) 和 [来源声明](skills/frontend-design-fusion/NOTICE)。剧场舞美为该演示生成。
