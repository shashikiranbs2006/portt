import { portfolioData } from "../../data/portfolioData.ts";
import type { WindowId } from "../../types/os.ts";

export type TerminalResult = { lines: string[]; cwd?: string; clear?: boolean; link?: { label: string; url: string }; openWindow?: WindowId };
type VirtualFiles = Record<string, string>;

const files: VirtualFiles = {
  "/about.txt": [portfolioData.user.name, portfolioData.user.role, "", ...portfolioData.user.bio].join("\n"),
  "/resume.txt": [portfolioData.user.name, portfolioData.user.role, portfolioData.user.education, `CGPA: ${portfolioData.user.cgpa}`, "", ...portfolioData.experience.flatMap((item) => [`${item.role} — ${item.company} (${item.period})`, ...item.highlights]), "", `PDF: ${portfolioData.contact.resumeUrl}`].join("\n"),
  "/contact.txt": [`Email: ${portfolioData.contact.email}`, `GitHub: ${portfolioData.contact.github}`, `LinkedIn: ${portfolioData.contact.linkedin}`, `Location: ${portfolioData.contact.location}`].join("\n"),
  "/README.md": "SHASHI★ OS — interactive portfolio\nExplore projects/, skills/, experience/, and the résumé with familiar shell commands.\nThis is a read-only portfolio filesystem in your browser. Type help for commands.",
  ...Object.fromEntries(portfolioData.projects.map((project) => [`/projects/${project.id}.txt`, [project.title, project.category, project.description, `Stack: ${project.tech.join(", ")}`, `Demo: ${project.demoUrl ?? "—"}`, `Source: ${project.githubUrl ?? "—"}`].join("\n")])),
  ...Object.fromEntries(portfolioData.skills.map((group) => [`/skills/${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`, `${group.category}\n${group.items.join(" · ")}`])),
  ...Object.fromEntries(portfolioData.experience.map((item) => [`/experience/${item.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`, [item.role, item.company, item.location, item.period, "", ...item.highlights].join("\n")])),
};

const directories = new Set(["/", "/projects", "/skills", "/experience"]);
export const COMMANDS = ["help", "pwd", "ls", "dir", "cd", "cat", "grep", "find", "echo", "history", "date", "whoami", "open", "git", "neofetch", "clear"];

function tokens(input: string): string[] {
  return [...input.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map((match) => match[1] ?? match[2] ?? match[3]);
}

function resolve(cwd: string, path = ".") {
  if (path === "~") return "/";
  if (path.startsWith("~/")) path = path.slice(1);
  const parts = (path.startsWith("/") ? path : `${cwd}/${path}`).split("/");
  const output: string[] = [];
  for (const part of parts) {
    if (!part || part === "." || part === "~") continue;
    if (part === "..") output.pop();
    else output.push(part);
  }
  return `/${output.join("/")}`;
}

function entries(directory: string) {
  const prefix = directory === "/" ? "/" : `${directory}/`;
  return [...directories, ...Object.keys(files)].filter((path) => path.startsWith(prefix) && path !== directory && !path.slice(prefix.length).includes("/")).map((path) => `${path.slice(prefix.length)}${directories.has(path) ? "/" : ""}`).sort();
}

export function runTerminal(input: string, cwd = "/", commandHistory: string[] = [], now = new Date()): TerminalResult {
  const [command, ...args] = tokens(input.trim());
  if (!command) return { lines: [] };
  const missing = (usage: string) => ({ lines: [`Usage: ${usage}`] });
  switch (command.toLowerCase()) {
    case "help": return { lines: ["WORKING COMMANDS", "  pwd                 Current folder", "  ls [path]           List files and folders (dir also works)", "  cd <folder>         Change folder; cd .. goes back", "  cat <file>          Read a portfolio file", "  grep <text> [path]  Search file contents", "  find [text]         Find file paths", "  echo <text>         Print text", "  history             Commands used in this session", "  date / whoami       Local date and visitor identity", "  open <target>       Open résumé, about, projects, badge, arcade, or a project", "  git log             Link to the real portfolio commit history", "  neofetch            Portfolio summary", "  clear               Clear the screen", "", "This shell reads the portfolio's files. It does not run system programs."] };
    case "pwd": return { lines: [cwd] };
    case "ls":
    case "dir": {
      const path = resolve(cwd, args.find((arg) => !arg.startsWith("-")) || ".");
      if (files[path]) return { lines: [path.split("/").pop()!] };
      return directories.has(path) ? { lines: entries(path).length ? entries(path) : ["(empty)"] } : { lines: [`ls: ${path}: no such file or directory`] };
    }
    case "cd": {
      const path = resolve(cwd, args[0] || "/");
      return directories.has(path) ? { lines: [], cwd: path } : { lines: [`cd: ${path}: no such directory`] };
    }
    case "cat": {
      if (!args.length) return missing("cat <file>");
      const path = resolve(cwd, args[0]);
      return { lines: files[path]?.split("\n") ?? [`cat: ${path}: no such file`] };
    }
    case "grep": {
      if (!args[0]) return missing("grep <text> [file-or-folder]");
      const base = resolve(cwd, args[1] || ".");
      const paths = files[base] ? [base] : directories.has(base) ? Object.keys(files).filter((path) => path.startsWith(base === "/" ? "/" : `${base}/`)) : [];
      if (!paths.length) return { lines: [`grep: ${base}: no such file or folder`] };
      const found = paths.flatMap((path) => files[path].split("\n").filter((line) => line.toLowerCase().includes(args[0].toLowerCase())).map((line) => `${path}: ${line}`));
      return { lines: found.length ? found : ["No matches."] };
    }
    case "find": {
      const term = args.join(" ").toLowerCase();
      const matches = Object.keys(files).filter((path) => path.toLowerCase().includes(term));
      return { lines: matches.length ? matches : ["No matching files."] };
    }
    case "echo": return { lines: [args.join(" ")] };
    case "history": return { lines: commandHistory.length ? commandHistory.map((item, index) => `${String(index + 1).padStart(3)}  ${item}`) : ["No commands yet."] };
    case "date": return { lines: [now.toLocaleString()] };
    case "whoami": return { lines: ["visitor"] };
    case "neofetch": return { lines: ["SHASHI★ OS", `Name: ${portfolioData.user.name}`, `Role: ${portfolioData.user.role}`, `Location: ${portfolioData.user.location}`, `Education: ${portfolioData.user.education}`, `Projects: ${portfolioData.projects.length} published here`, `Skills: ${portfolioData.skills.map((group) => group.items.slice(0, 2).join(", ")).join(" · ")}`] };
    case "open": {
      if (!args[0]) return missing("open <resume|about|projects|badge|arcade|project-id|github|linkedin>");
      const target = args[0].toLowerCase();
      const windowTargets: Record<string, WindowId> = { resume: "resume", about: "about", projects: "projects", badge: "idbadge", arcade: "arcade", paint: "paint" };
      if (windowTargets[target]) return { lines: [`Opening ${target}…`], openWindow: windowTargets[target] };
      if (target === "resume.pdf") return { lines: ["Opening résumé…"], openWindow: "resume" };
      if (target === "contact") return { lines: ["Email:"], link: { label: portfolioData.contact.email, url: `mailto:${portfolioData.contact.email}` } };
      if (target === "github") return { lines: ["GitHub profile:"], link: { label: portfolioData.contact.github, url: portfolioData.contact.github } };
      if (target === "linkedin") return { lines: ["LinkedIn profile:"], link: { label: portfolioData.contact.linkedin, url: portfolioData.contact.linkedin } };
      const project = portfolioData.projects.find((item) => item.id === target || item.id === `proj-${target}` || item.id.includes(target));
      return project?.demoUrl ? { lines: [`${project.title} demo:`], link: { label: project.demoUrl, url: project.demoUrl } } : { lines: [`open: ${target}: unknown target. Try ls projects/`] };
    }
    case "git": return args[0] === "log" ? { lines: ["Live commit history for this portfolio:"], link: { label: "Open GitHub commits ↗", url: "https://github.com/shashikiranbs2006/portt/commits/main/" } } : missing("git log");
    case "clear": return { lines: [], clear: true };
    default: return { lines: [`${command}: command not found. Type help to see available commands.`] };
  }
}
