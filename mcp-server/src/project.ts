import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * PROJECT_ROOT is the thisislohit repo root — two levels above this file
 * once compiled (mcp-server/dist/project.js -> mcp-server -> thisislohit).
 * Every file operation in this module is confined to this directory.
 */
export const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

/** Documentation files Claude is allowed to read directly by name. */
const ALLOWED_DOC_FILES = [
  "README.md",
  "scope.md",
  "architecture.md",
  "design.md",
  "DESIGN_SYSTEM.md",
  "plan.md",
  "tasks.md",
  "memory.md",
  "CONTRIBUTING.md",
  "MCP_SETUP.md",
] as const;

/** design.md is the Stitch source of truth — never writable through this server. */
const READ_ONLY_ALWAYS = new Set(["design.md"]);

/** The only files this server is ever allowed to write. */
const WRITABLE_FILES = new Set(["memory.md", "tasks.md"]);

export class ProjectAccessError extends Error {}

/**
 * Resolves a project-relative path and guarantees it stays inside
 * PROJECT_ROOT and matches the allowlist. Throws ProjectAccessError
 * instead of touching the filesystem on any violation.
 */
function resolveAllowedPath(relPath: string): string {
  const normalized = relPath.replace(/^\/+/, "");
  const isRule = normalized.startsWith(".cursor/rules/") && normalized.endsWith(".mdc");
  const isDoc = (ALLOWED_DOC_FILES as readonly string[]).includes(normalized);

  if (!isRule && !isDoc) {
    throw new ProjectAccessError(
      `"${relPath}" is not in the allowed project-file list. Allowed: ${ALLOWED_DOC_FILES.join(", ")}, or .cursor/rules/*.mdc`
    );
  }

  const resolved = path.resolve(PROJECT_ROOT, normalized);
  const rootWithSep = PROJECT_ROOT + path.sep;
  if (resolved !== PROJECT_ROOT && !resolved.startsWith(rootWithSep)) {
    throw new ProjectAccessError(`"${relPath}" resolves outside the project directory.`);
  }
  return resolved;
}

export async function readProjectFile(relPath: string): Promise<string> {
  const abs = resolveAllowedPath(relPath);
  try {
    return await fs.readFile(abs, "utf-8");
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      throw new ProjectAccessError(`"${relPath}" does not exist in the project yet.`);
    }
    throw err;
  }
}

async function writeProjectFile(relPath: string, content: string): Promise<void> {
  if (!WRITABLE_FILES.has(relPath)) {
    throw new ProjectAccessError(
      `"${relPath}" is not writable through this server. Writable files: ${[...WRITABLE_FILES].join(", ")}.`
    );
  }
  if (READ_ONLY_ALWAYS.has(relPath)) {
    // Defensive: can never actually happen given WRITABLE_FILES above, kept as an explicit guard.
    throw new ProjectAccessError(`"${relPath}" is the Stitch design source and is never overwritten by this server.`);
  }
  const abs = resolveAllowedPath(relPath);
  await fs.writeFile(abs, content, "utf-8");
}

export async function listAllowedFiles(): Promise<{ docs: string[]; rules: string[] }> {
  const docs: string[] = [];
  for (const f of ALLOWED_DOC_FILES) {
    try {
      await fs.access(path.join(PROJECT_ROOT, f));
      docs.push(f);
    } catch {
      // file not present yet — omit rather than error, per fail-safe rule
    }
  }
  let rules: string[] = [];
  try {
    const entries = await fs.readdir(path.join(PROJECT_ROOT, ".cursor", "rules"));
    rules = entries.filter((e) => e.endsWith(".mdc")).map((e) => `.cursor/rules/${e}`);
  } catch {
    // .cursor/rules may not exist — fail safe, return empty
  }
  return { docs, rules };
}

// ---------------------------------------------------------------------------
// Markdown extraction helpers (no invented content — pure structural parsing)
// ---------------------------------------------------------------------------

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Extracts the body text under a heading, up to the next heading of equal-or-shallower depth. */
export function extractSection(md: string, headingText: string): string | null {
  const lines = md.split("\n");
  const headingRegex = new RegExp(
    "^(#{1,6})\\s+" + escapeRegex(headingText).replace(/\s+/g, "\\s+") + "\\s*$",
    "i"
  );
  let startIdx = -1;
  let level = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(headingRegex);
    if (m) {
      startIdx = i;
      level = m[1].length;
      break;
    }
  }
  if (startIdx === -1) return null;
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const hm = lines[i].match(/^(#{1,6})\s+/);
    if (hm && hm[1].length <= level) {
      endIdx = i;
      break;
    }
  }
  return lines.slice(startIdx + 1, endIdx).join("\n").trim();
}

/** Extracts the last "### <heading>" subsection within a larger section body. */
export function extractLastSubsection(sectionBody: string): { heading: string; body: string } | null {
  const lines = sectionBody.split("\n");
  const subheadingIdxs: { idx: number; heading: string }[] = [];
  lines.forEach((line, idx) => {
    const m = line.match(/^###\s+(.+?)\s*$/);
    if (m) subheadingIdxs.push({ idx, heading: m[1] });
  });
  if (subheadingIdxs.length === 0) return null;
  const last = subheadingIdxs[subheadingIdxs.length - 1];
  const nextIdx = lines.length;
  const body = lines.slice(last.idx + 1, nextIdx).join("\n").trim();
  return { heading: last.heading, body };
}

/** Parses a fenced code block of the given language into raw text. */
export function extractFencedBlock(md: string, lang: string): string | null {
  const fence = "```" + lang;
  const start = md.indexOf(fence);
  if (start === -1) return null;
  const contentStart = start + fence.length;
  const end = md.indexOf("```", contentStart);
  if (end === -1) return null;
  return md.slice(contentStart, end).trim();
}

/** Parses `--token: value;` lines out of a CSS block into a plain object, ignoring comments/blank lines. */
export function parseCssCustomProperties(cssBlock: string): Record<string, string> {
  const out: Record<string, string> = {};
  const propRegex = /^\s*(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/gm;
  let m: RegExpExecArray | null;
  while ((m = propRegex.exec(cssBlock)) !== null) {
    out[m[1]] = m[2].trim();
  }
  return out;
}

/** Parses the first Markdown table found in a text block into header/rows. */
export function parseFirstMarkdownTable(md: string): { headers: string[]; rows: string[][] } | null {
  const lines = md.split("\n");
  let headerIdx = -1;
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].trim().startsWith("|") && /^\|?\s*-{2,}/.test(lines[i + 1].replace(/\|/g, "").trim() ? lines[i + 1] : "")) {
      // lines[i+1] should look like separator row: |---|---|
    }
    if (lines[i].trim().startsWith("|") && lines[i + 1] && /^\|?\s*:?-{2,}/.test(lines[i + 1].trim())) {
      headerIdx = i;
      break;
    }
  }
  if (headerIdx === -1) return null;
  const splitRow = (row: string) =>
    row
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
  const headers = splitRow(lines[headerIdx]);
  const rows: string[][] = [];
  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim().startsWith("|")) break;
    rows.push(splitRow(line));
  }
  return { headers, rows };
}

/** Parses `- [ ] text` / `- [x] text` lines under `## ` group headings. */
export function parseTaskGroups(
  md: string
): { group: string; complete: string[]; incomplete: string[] }[] {
  const lines = md.split("\n");
  const groups: { group: string; complete: string[]; incomplete: string[] }[] = [];
  let current: { group: string; complete: string[]; incomplete: string[] } | null = null;
  for (const line of lines) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      current = { group: h[1], complete: [], incomplete: [] };
      groups.push(current);
      continue;
    }
    const task = line.match(/^\s*-\s*\[( |x|X)\]\s*(.+?)\s*$/);
    if (task && current) {
      if (task[1].toLowerCase() === "x") current.complete.push(task[2]);
      else current.incomplete.push(task[2]);
    }
  }
  return groups;
}

// ---------------------------------------------------------------------------
// memory.md — Session Log append (compressed, no raw chat dumps)
// ---------------------------------------------------------------------------

export interface SessionLogEntry {
  date: string; // YYYY-MM-DD
  decisions?: string[];
  completed?: string[];
  current?: string[];
  next?: string[];
  notes?: string[];
}

function renderBulletBlock(label: string, items: string[] | undefined): string {
  if (!items || items.length === 0) return "";
  return `${label}:\n${items.map((i) => `- ${i}`).join("\n")}\n`;
}

function renderEntryBlock(entry: SessionLogEntry): string {
  const parts = [
    renderBulletBlock("Decision", entry.decisions),
    renderBulletBlock("Completed", entry.completed),
    renderBulletBlock("Current", entry.current),
    renderBulletBlock("Next", entry.next),
    renderBulletBlock("Notes", entry.notes),
  ].filter(Boolean);
  return `### ${entry.date}\n\n${parts.join("\n")}`.trim() + "\n";
}

/**
 * Appends (or merges into an existing same-date entry) a compressed Session
 * Log entry in memory.md. Never rewrites earlier entries, never accepts raw
 * conversation text — callers must pass already-compressed bullet points.
 */
export async function appendMemorySessionLog(entry: SessionLogEntry): Promise<{ merged: boolean }> {
  const relPath = "memory.md";
  const content = await readProjectFile(relPath);
  const heading = "## Session Log";
  const headingIdx = content.indexOf(heading);
  if (headingIdx === -1) {
    throw new ProjectAccessError(`memory.md has no "## Session Log" heading — refusing to guess where to insert.`);
  }

  const dateHeading = `### ${entry.date}`;
  const dateIdx = content.indexOf(dateHeading, headingIdx);

  if (dateIdx !== -1) {
    // Merge into the existing same-date section: append new bullets to each present label,
    // creating the label block if this date's section didn't have it yet.
    const afterDateIdx = dateIdx + dateHeading.length;
    let nextSectionIdx = content.length;
    const nextHeadingMatch = content.slice(afterDateIdx).match(/\n#{1,6}\s+/);
    if (nextHeadingMatch && nextHeadingMatch.index !== undefined) {
      nextSectionIdx = afterDateIdx + nextHeadingMatch.index;
    }
    let sectionBody = content.slice(afterDateIdx, nextSectionIdx);

    const mergeLabel = (label: string, items: string[] | undefined) => {
      if (!items || items.length === 0) return;
      const labelRegex = new RegExp(`(${label}:\\n(?:- .*\\n?)*)`);
      const newBullets = items.map((i) => `- ${i}`).join("\n") + "\n";
      if (labelRegex.test(sectionBody)) {
        sectionBody = sectionBody.replace(labelRegex, (m) => m.trimEnd() + "\n" + newBullets);
      } else {
        sectionBody = sectionBody.trimEnd() + `\n\n${label}:\n${newBullets}`;
      }
    };
    mergeLabel("Decision", entry.decisions);
    mergeLabel("Completed", entry.completed);
    mergeLabel("Current", entry.current);
    mergeLabel("Next", entry.next);
    mergeLabel("Notes", entry.notes);

    const newContent =
      content.slice(0, afterDateIdx) + "\n\n" + sectionBody.trim() + "\n\n" + content.slice(nextSectionIdx).trimStart();
    await writeProjectFile(relPath, newContent.replace(/\n{3,}/g, "\n\n\n"));
    return { merged: true };
  }

  // No entry for this date yet — append a new dated block at the end of the file.
  const trimmed = content.replace(/\n+$/, "");
  const newBlock = "\n\n" + renderEntryBlock(entry);
  await writeProjectFile(relPath, trimmed + newBlock);
  return { merged: false };
}

// ---------------------------------------------------------------------------
// tasks.md — single checkbox toggle by text match (fails safe on ambiguity)
// ---------------------------------------------------------------------------

export interface TaskToggleResult {
  matchedLine: string;
  group: string | null;
  previousState: "complete" | "incomplete";
  newState: "complete" | "incomplete";
}

export async function setTaskStatus(
  itemText: string,
  complete: boolean
): Promise<TaskToggleResult> {
  const relPath = "tasks.md";
  const content = await readProjectFile(relPath);
  const lines = content.split("\n");
  const needle = itemText.trim().toLowerCase();

  const matches: number[] = [];
  let currentGroup: string | null = null;
  const lineGroups: (string | null)[] = [];
  for (const line of lines) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) currentGroup = h[1];
    lineGroups.push(currentGroup);
  }

  lines.forEach((line, idx) => {
    const task = line.match(/^(\s*-\s*\[)( |x|X)(\]\s*)(.+?)\s*$/);
    if (task && task[4].toLowerCase().includes(needle)) matches.push(idx);
  });

  if (matches.length === 0) {
    throw new ProjectAccessError(
      `No task in tasks.md matches "${itemText}". Nothing was changed.`
    );
  }
  if (matches.length > 1) {
    const preview = matches
      .slice(0, 5)
      .map((idx) => `- "${lines[idx].replace(/^\s*-\s*\[.\]\s*/, "")}"`)
      .join("\n");
    throw new ProjectAccessError(
      `"${itemText}" matches ${matches.length} tasks — refusing to guess. Be more specific. Matches:\n${preview}`
    );
  }

  const idx = matches[0];
  const m = lines[idx].match(/^(\s*-\s*\[)( |x|X)(\]\s*)(.+?)\s*$/)!;
  const previousState: "complete" | "incomplete" = m[2].toLowerCase() === "x" ? "complete" : "incomplete";
  const newMarker = complete ? "x" : " ";
  lines[idx] = `${m[1]}${newMarker}${m[3]}${m[4]}`;

  await writeProjectFile(relPath, lines.join("\n"));

  return {
    matchedLine: m[4],
    group: lineGroups[idx],
    previousState,
    newState: complete ? "complete" : "incomplete",
  };
}
