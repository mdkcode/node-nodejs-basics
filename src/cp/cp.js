import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["sdkjbd", "wefkjlh"]);
