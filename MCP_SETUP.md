# MCP_SETUP.md — thisislohit Project MCP Server

## What this is

A minimal Model Context Protocol (MCP) server that gives Claude structured, read-restricted access to this project's own documentation, so any new Claude Code session can pick up `thisislohit` without prior chat history — and can record its own compressed progress notes back into the project as it works.

It does **not** touch the portfolio implementation itself. It only reads/writes the documentation layer:

```
Stitch Design
      ↓
design.md            (read-only, always)
      ↓
Design Audit / DESIGN_SYSTEM.md   (read-only)
      ↓
MCP Server            ← this
      ↓
Claude (any session)
```

## Environment this was built for

Determined by inspection, not assumed:

| Question | Answer |
|---|---|
| Claude client | **Claude Code** (this session) — Claude Desktop is also installed on this machine but is not the target client for this server |
| OS | macOS 26.5.1, Darwin arm64 |
| Runtime available | Node v25.9.0 / npm 11.12.1 (Python 3.9.6 also present but Node/TypeScript is the natural fit — matches the portfolio's own stack and the official MCP SDK) |
| Config location | Project-scoped `.mcp.json` at the repo root, managed via `claude mcp add`/`claude mcp remove` — not the global `~/.claude.json` and not Claude Desktop's `claude_desktop_config.json` |
| Launch mechanism | stdio subprocess — Claude Code spawns `node mcp-server/dist/index.js` directly, no network port |

## Architecture

- **Language**: TypeScript, compiled to `mcp-server/dist/`.
- **SDK**: `@modelcontextprotocol/sdk` (official) + `zod` for input validation.
- **Transport**: stdio (`StdioServerTransport`) — no HTTP server, no open port, nothing reachable outside the local subprocess Claude Code itself spawns.
- **Location**: `mcp-server/` as a sibling to `src/` (the future portfolio app) — kept separate so the MCP server's own `node_modules`/`package.json` never mix with the Next.js app's dependencies.
- **Files**:
  - `mcp-server/src/project.ts` — all filesystem access, path safety, and markdown parsing logic.
  - `mcp-server/src/index.ts` — MCP server wiring and the 8 tool definitions.

## Available tools

| Tool | Type | Purpose |
|---|---|---|
| `get_project_context` | read | Composed overview: identity, architecture, design source, progress, most recent session-log entry, open tasks, next recommended task. |
| `read_project_file` | read | Read one allowlisted doc file by exact relative path. |
| `list_project_files` | read | List which doc files and `.cursor/rules/*.mdc` files currently exist. |
| `get_design_tokens` | read | Structured tokens parsed from `DESIGN_SYSTEM.md`'s CSS block, plus the color-resolution table and the documented-gaps table (Defined vs. Recommended/derived) — never invents a value. |
| `get_project_memory` | read | Structured pull from `memory.md`: identity, architecture, design/product/development decisions, current progress, most recent session-log entry. |
| `get_current_tasks` | read | `tasks.md` parsed into groups of complete/incomplete items. |
| `update_project_memory` | write | Appends (or merges into today's) a compressed, dated Session Log entry in `memory.md`. Only accepts short bullet arrays — never raw text dumps. |
| `update_task_status` | write | Flips exactly one task checkbox in `tasks.md` by text match. Refuses to guess on zero or multiple matches — nothing changes, the ambiguity is reported back. |

Nothing here is a generic file-read/file-write/shell-exec tool. Every tool maps to one specific, bounded operation this project's workflow actually needs.

## Security model

- **Allowlist, not blocklist.** `resolveAllowedPath()` in `project.ts` only permits the nine named doc files (`README.md`, `scope.md`, `architecture.md`, `design.md`, `DESIGN_SYSTEM.md`, `plan.md`, `tasks.md`, `memory.md`, `CONTRIBUTING.md`, `MCP_SETUP.md`) or `.cursor/rules/*.mdc`. Everything else — including `src/`, `node_modules/`, `.git/`, `.env`, and any file outside the project — is rejected before any filesystem call happens.
- **Path traversal is blocked structurally**: every resolved path is checked to still start with `PROJECT_ROOT` after resolution, not just string-matched. Verified with a live `../../etc/passwd`-style request during testing — rejected with a clear error, no read attempted.
- **`design.md` is never writable** through this server. There is no tool, code path, or parameter combination that writes to it — the writable set is hardcoded to `{memory.md, tasks.md}` only, checked independently of any tool input.
- **No destructive operations.** No delete, no full-file overwrite, no arbitrary write tool. The two write tools are narrow: one appends/merges a dated log entry, the other flips one checkbox it has already uniquely identified.
- **Fails safe on ambiguity or absence**: a missing file returns a clear "does not exist" error, not a crash; `update_task_status` with zero or multiple text matches changes nothing and reports the matches back instead of guessing.
- **No secrets exposure**: the allowlist has no path to `.env`, credentials, or API keys — there is no code path that reads any file outside the nine named docs and the rules directory.

## Installation

```bash
cd /Users/lohit/LohithFlutter/thisislohit/mcp-server
npm install
```

## Build

```bash
npm run build
```

Compiles `src/*.ts` → `dist/*.js`. Re-run this after any change to the server source.

## Run locally (manual check, optional)

```bash
npm start
```

Starts the server on stdio and prints `thisislohit-mcp-server running (project root: ...)` to stderr. It will appear to hang — that's correct, it's waiting for JSON-RPC messages on stdin. `Ctrl+C` to stop. You do not need to run this manually for normal use — Claude Code launches it automatically.

## Connecting to Claude Code

Already done for this machine via:

```bash
claude mcp add thisislohit --scope project -- node "/Users/lohit/LohithFlutter/thisislohit/mcp-server/dist/index.js"
```

This wrote the project-scoped config file, `.mcp.json`, at the repo root:

```json
{
  "mcpServers": {
    "thisislohit": {
      "type": "stdio",
      "command": "node",
      "args": [
        "/Users/lohit/LohithFlutter/thisislohit/mcp-server/dist/index.js"
      ],
      "env": {}
    }
  }
}
```

`--scope project` was chosen (over `local`/`user`) because `.mcp.json` at the repo root is meant to be committed and shared — anyone who clones this repo and runs `claude` inside it gets the same server offered automatically, with no per-machine setup beyond `npm install && npm run build` in `mcp-server/`.

### One remaining manual step: approval

Project-scoped MCP servers require an explicit one-time approval per machine, as a safety gate against a cloned repo silently running an arbitrary subprocess. To approve:

```bash
claude
```

Run this from `/Users/lohit/LohithFlutter/thisislohit` (or any subdirectory). On startup, Claude Code will prompt to approve the `thisislohit` MCP server — approve it. After that it stays approved for this machine/repo until the server config changes.

### Verifying the connection

From a terminal:

```bash
claude mcp list
```

Should show:

```
thisislohit: node /Users/lohit/LohithFlutter/thisislohit/mcp-server/dist/index.js - ✓ Connected
```

(`⏸ Pending approval` means the step above hasn't been done yet; run `claude` and approve.)

From inside a Claude Code session, ask Claude to call `get_project_context` or check the session's active tools/MCP indicator — the eight tools listed above should be available with the `mcp__thisislohit__` prefix.

### Restarting after a code change

Rebuild, then restart the Claude Code session (or the specific MCP connection if your client supports a reload):

```bash
cd /Users/lohit/LohithFlutter/thisislohit/mcp-server
npm run build
```

Claude Code respawns the subprocess on session start, so simply starting a new `claude` session after rebuilding is sufficient — no reinstall or re-`add` needed unless the command/args themselves changed.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `claude mcp list` shows "Pending approval" | One-time approval not yet granted | Run `claude` in the project directory and approve when prompted. |
| `claude mcp list` shows the server missing entirely | `.mcp.json` not present or not in the directory Claude Code was started from | Confirm you're running `claude` from within `/Users/lohit/LohithFlutter/thisislohit` (or a subdirectory); project-scoped servers only load when Claude Code's working directory is inside that project. |
| Tool calls return `Cannot find module` / server won't start | `dist/` missing or stale | `cd mcp-server && npm install && npm run build`. |
| A `read_project_file` call errors "not in the allowed project-file list" | Working as intended — the requested path isn't one of the nine allowlisted docs or a `.cursor/rules/*.mdc` file | Use `list_project_files` to see what's actually available. This is not a bug. |
| `update_task_status` errors with "matches N tasks" | Working as intended — the given text isn't unique enough | Pass a longer, more specific substring of the task line. |
| Node version errors on build | Very old Node | This server was built/tested against Node v25.9.0; any current LTS (≥18) should work given the `NodeNext` module target, but this hasn't been tested below v25 on this machine. |

## Development workflow

1. Edit `mcp-server/src/*.ts`.
2. `npm run build` (or `npm run dev` for `tsc --watch`).
3. Start a fresh `claude` session in the project directory to pick up the rebuilt server.
4. If you add/remove a tool, no `.mcp.json` change is needed — the command/args are unchanged; Claude Code re-queries `tools/list` on each new session.
5. If you change the **command or args** (e.g. move the server), re-run `claude mcp add` (or edit `.mcp.json` directly) and re-approve.

## What this server intentionally does not do

- Does not write, scaffold, or modify anything under `src/` (the future portfolio app) — that's Phase 6+ implementation work, out of scope for this documentation-layer server.
- Does not overwrite `design.md` under any circumstance.
- Does not expose a generic filesystem tool, shell-exec tool, or network fetch tool.
- Does not store or transmit any secret — it has no awareness of `.env` files or credentials at all.
