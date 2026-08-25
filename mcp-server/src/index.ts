#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  PROJECT_ROOT,
  ProjectAccessError,
  readProjectFile,
  listAllowedFiles,
  extractSection,
  extractLastSubsection,
  extractFencedBlock,
  parseCssCustomProperties,
  parseFirstMarkdownTable,
  parseTaskGroups,
  appendMemorySessionLog,
  setTaskStatus,
} from "./project.js";

const server = new McpServer({
  name: "thisislohit-mcp-server",
  version: "0.1.0",
});

function text(payload: unknown) {
  const body = typeof payload === "string" ? payload : JSON.stringify(payload, null, 2);
  return { content: [{ type: "text" as const, text: body }] };
}

function errorText(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
}

// ---------------------------------------------------------------------------
// 1. get_project_context
// ---------------------------------------------------------------------------
server.tool(
  "get_project_context",
  "Concise overview of the thisislohit project: name, purpose, current architecture, design source, current phase, current tasks summary, key decisions, and the next recommended task. Reads README.md, memory.md, architecture.md, and tasks.md.",
  {},
  async () => {
    try {
      const [readme, memory, architecture, tasks] = await Promise.all([
        readProjectFile("README.md"),
        readProjectFile("memory.md"),
        readProjectFile("architecture.md"),
        readProjectFile("tasks.md"),
      ]);

      const identity = extractSection(memory, "Project Identity");
      const currentArch = extractSection(memory, "Current Architecture");
      const designSource = extractSection(memory, "Design Source");
      const progress = extractSection(memory, "Current Progress");
      const sessionLog = extractSection(memory, "Session Log");
      const lastSession = sessionLog ? extractLastSubsection(sessionLog) : null;
      const stackTable = parseFirstMarkdownTable(architecture);
      const taskGroups = parseTaskGroups(tasks);

      const openTasks = taskGroups
        .flatMap((g) => g.incomplete.map((t) => `[${g.group}] ${t}`))
        .slice(0, 10);
      const nextRecommended =
        openTasks.find((t) => t.toLowerCase().includes("review") || t.toLowerCase().includes("approval")) ??
        openTasks[0] ??
        "No open tasks found in tasks.md.";

      return text({
        projectName: "thisislohit",
        purpose: readme.split("\n").slice(0, 6).join("\n").trim(),
        identity,
        currentArchitecture: currentArch,
        stackDecisionTable: stackTable,
        designSource,
        currentProgress: progress,
        mostRecentSessionLogEntry: lastSession,
        openTasksSample: openTasks,
        nextRecommendedTask: nextRecommended,
        note: "Derived from README.md, memory.md, architecture.md, tasks.md — no fields are invented; missing sections come back null.",
      });
    } catch (err) {
      return errorText(err);
    }
  }
);

// ---------------------------------------------------------------------------
// 2. read_project_file
// ---------------------------------------------------------------------------
server.tool(
  "read_project_file",
  "Read one allowlisted project documentation file by exact relative path (README.md, scope.md, architecture.md, design.md, DESIGN_SYSTEM.md, plan.md, tasks.md, memory.md, CONTRIBUTING.md, MCP_SETUP.md, or .cursor/rules/*.mdc). Fails safely with a clear message if the path is not allowed or the file does not exist — never reads outside the project directory.",
  { path: z.string().describe("Project-relative file path, e.g. \"design.md\" or \".cursor/rules/design.mdc\"") },
  async ({ path: relPath }) => {
    try {
      const content = await readProjectFile(relPath);
      return text(content);
    } catch (err) {
      return errorText(err);
    }
  }
);

// ---------------------------------------------------------------------------
// 3. list_project_files
// ---------------------------------------------------------------------------
server.tool(
  "list_project_files",
  "List the project documentation files and .cursor/rules files this server can read. Does not walk arbitrary directories and never lists node_modules, .git, .env, or src/ implementation files.",
  {},
  async () => {
    try {
      const listing = await listAllowedFiles();
      return text({ projectRoot: PROJECT_ROOT, ...listing });
    } catch (err) {
      return errorText(err);
    }
  }
);

// ---------------------------------------------------------------------------
// 4. get_design_tokens
// ---------------------------------------------------------------------------
server.tool(
  "get_design_tokens",
  "Structured design tokens (color, typography, spacing, radius, shadow, breakpoints, motion, z-index) parsed from DESIGN_SYSTEM.md. Distinguishes tokens that are Defined (in the implementation-ready CSS block) from values that are Recommended/derived (documented gaps design.md didn't specify, each with its own reasoning). Never invents a value — if something isn't in DESIGN_SYSTEM.md, it is omitted, not guessed.",
  {},
  async () => {
    try {
      const designSystem = await readProjectFile("DESIGN_SYSTEM.md");
      const cssBlock = extractFencedBlock(designSystem, "css");
      const defined = cssBlock ? parseCssCustomProperties(cssBlock) : {};

      const gapsSection = extractSection(designSystem, "1.7 Documented gaps requiring a technical decision");
      const gapsTable = gapsSection ? parseFirstMarkdownTable(gapsSection) : null;
      const recommended = gapsTable
        ? gapsTable.rows.map((r) => ({
            gap: r[0],
            decision: r[1],
            reasoning: r[2],
          }))
        : [];

      const colorSection = extractSection(designSystem, "1.3 Colors (resolved — see §1.1)");
      const colorTable = colorSection ? parseFirstMarkdownTable(colorSection) : null;

      return text({
        defined,
        colorResolution: colorTable
          ? colorTable.rows.map((r) => ({ token: r[0], value: r[1], source: r[2] }))
          : [],
        recommendedOrDerived: recommended,
        source: "DESIGN_SYSTEM.md (derived from design.md — the Stitch source of truth)",
        note: "design.md itself is never modified or reinterpreted here — this tool only surfaces what DESIGN_SYSTEM.md already resolved.",
      });
    } catch (err) {
      return errorText(err);
    }
  }
);

// ---------------------------------------------------------------------------
// 5. get_project_memory
// ---------------------------------------------------------------------------
server.tool(
  "get_project_memory",
  "Concise, structured project memory from memory.md: current state, architecture, design decisions, product decisions, development decisions, completed/current/next work, and the most recent compressed session-log entry. This is the primary way a new session should re-orient without prior chat history.",
  {},
  async () => {
    try {
      const memory = await readProjectFile("memory.md");
      const sessionLog = extractSection(memory, "Session Log");
      return text({
        identity: extractSection(memory, "Project Identity"),
        currentArchitecture: extractSection(memory, "Current Architecture"),
        designSource: extractSection(memory, "Design Source"),
        designDecisions: extractSection(memory, "Design Decisions"),
        productDecisions: extractSection(memory, "Product Decisions"),
        developmentDecisions: extractSection(memory, "Development Decisions"),
        currentProgress: extractSection(memory, "Current Progress"),
        mostRecentSessionLogEntry: sessionLog ? extractLastSubsection(sessionLog) : null,
      });
    } catch (err) {
      return errorText(err);
    }
  }
);

// ---------------------------------------------------------------------------
// 6. get_current_tasks
// ---------------------------------------------------------------------------
server.tool(
  "get_current_tasks",
  "Structured checklist from tasks.md, grouped by section, split into complete and incomplete items.",
  {},
  async () => {
    try {
      const tasks = await readProjectFile("tasks.md");
      return text(parseTaskGroups(tasks));
    } catch (err) {
      return errorText(err);
    }
  }
);

// ---------------------------------------------------------------------------
// 7. update_project_memory
// ---------------------------------------------------------------------------
server.tool(
  "update_project_memory",
  "Append a compressed, dated Session Log entry to memory.md (or merge into today's existing entry). Accepts only short bullet-point summaries — never raw conversation text. At least one field must be non-empty. Use this to record decisions, completed work, current work, next steps, and important notes at the end of a session.",
  {
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("YYYY-MM-DD; defaults to today if omitted."),
    decisions: z.array(z.string()).optional(),
    completed: z.array(z.string()).optional(),
    current: z.array(z.string()).optional(),
    next: z.array(z.string()).optional(),
    notes: z.array(z.string()).optional(),
  },
  async ({ date, decisions, completed, current, next, notes }) => {
    try {
      const hasContent = [decisions, completed, current, next, notes].some((a) => a && a.length > 0);
      if (!hasContent) {
        throw new ProjectAccessError(
          "At least one of decisions/completed/current/next/notes must contain bullet points."
        );
      }
      const entryDate = date ?? new Date().toISOString().slice(0, 10);
      const result = await appendMemorySessionLog({
        date: entryDate,
        decisions,
        completed,
        current,
        next,
        notes,
      });
      return text({
        ok: true,
        date: entryDate,
        merged: result.merged,
        message: result.merged
          ? `Merged into the existing ${entryDate} Session Log entry in memory.md.`
          : `Appended a new ${entryDate} Session Log entry to memory.md.`,
      });
    } catch (err) {
      return errorText(err);
    }
  }
);

// ---------------------------------------------------------------------------
// 8. update_task_status
// ---------------------------------------------------------------------------
server.tool(
  "update_task_status",
  "Mark exactly one task in tasks.md complete or incomplete by matching its text (case-insensitive substring). Never modifies unrelated tasks. If zero or more than one task matches, nothing is changed and the ambiguity is reported back.",
  {
    item: z.string().describe("Text (or a distinctive substring) of the task line to update."),
    complete: z.boolean().describe("true to check it off, false to mark it incomplete."),
  },
  async ({ item, complete }) => {
    try {
      const result = await setTaskStatus(item, complete);
      return text({ ok: true, ...result });
    } catch (err) {
      return errorText(err);
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`thisislohit-mcp-server running (project root: ${PROJECT_ROOT})`);
}

main().catch((err) => {
  console.error("Fatal error starting thisislohit-mcp-server:", err);
  process.exit(1);
});
