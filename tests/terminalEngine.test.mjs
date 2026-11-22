import test from "node:test";
import assert from "node:assert/strict";
import { runTerminal } from "../src/components/windows/terminalEngine.ts";

test("navigation reads actual portfolio files", () => {
  const root = runTerminal("ls").lines;
  assert.ok(root.includes("projects/"));
  assert.ok(root.includes("resume.txt"));
  assert.equal(runTerminal("cd projects").cwd, "/projects");
  assert.ok(runTerminal("ls", "/projects").lines.some((name) => name.includes("relay")));
  assert.match(runTerminal("cat about.txt").lines.join(" "), /Shashikiran B S/);
  assert.equal(runTerminal("cd ..", "/projects").cwd, "/");
  assert.equal(runTerminal("cd ~", "/projects").cwd, "/");
  assert.equal(runTerminal("cd ~/skills", "/projects").cwd, "/skills");
});

test("grep searches content and find searches paths", () => {
  assert.ok(runTerminal('grep "Bedrock" projects').lines.some((line) => line.includes("relay")));
  assert.ok(runTerminal("find relay").lines.some((line) => line.includes("relay")));
  assert.deepEqual(runTerminal("grep impossible-word about.txt").lines, ["No matches."]);
});

test("open resolves app targets and real project links", () => {
  assert.equal(runTerminal("open resume").openWindow, "resume");
  assert.equal(runTerminal("open badge").openWindow, "idbadge");
  assert.match(runTerminal("open relay").link.url, /^https:\/\//);
  assert.match(runTerminal("git log").link.url, /github.com\/shashikiranbs2006\/portt/);
});

test("history, echo, clear and errors behave like a shell", () => {
  assert.deepEqual(runTerminal("echo hello world").lines, ["hello world"]);
  assert.deepEqual(runTerminal("history", "/", ["pwd", "history"]).lines, ["  1  pwd", "  2  history"]);
  assert.equal(runTerminal("clear").clear, true);
  assert.match(runTerminal("cat missing.txt").lines[0], /no such file/);
  assert.match(runTerminal("sudo rm -rf ").lines[0], /command not found/);
});
