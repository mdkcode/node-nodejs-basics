import readline from "readline";
import path from "path";
import fs from "fs/promises";

const args = process.argv.slice(2);
let username = "";
args.forEach((arg, index) => {
  if (arg === "--username") {
    username = args[index + 1];
  }
});

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();

function changeDirectory(targetPath) {
  try {
    const absolutePath = path.resolve(targetPath);
    process.chdir(absolutePath);
  } catch (err) {
    console.error(`Failed to change directory: ${err.message}`);
  }
}

function handleExit() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}

function printCurrentDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}

function handleInvalidInput() {
  console.log(`Invalid input`);
}

function goUpperFromCurrentDirectory() {
  const currentDir = process.cwd();
  const rootDir = path.parse(currentDir).root;
  if (currentDir === rootDir) return;
  const parentDir = path.resolve(currentDir, "..");
  process.chdir(parentDir);
}

function promptUser() {
  rl.question("Type something: ", async (command) => {
    command = command.trim();
    if (command === ".exit") {
      handleExit();
      rl.close();
      return;
    }
    if (command === "ls") {
      await listAllFilesAndFolders();
    } else if (command === "up") {
      goUpperFromCurrentDirectory();
    } else {
      handleInvalidInput();
    }

    printCurrentDirectory();
    promptUser();
  });
}

async function listAllFilesAndFolders() {
  const currentDir = process.cwd();
  let list = [];
  try {
    const items = await fs.readdir(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = await fs.lstat(fullPath);
      if (item.startsWith(".")) continue;
      list.push({
        Name: item,
        Type: stat.isDirectory() ? "Directory" : "File",
      });
    }
    list = list.sort((a, b) => {
      if (a.Type === "Directory" && b.Type === "File") return -1;
      if (a.Type === "File" && b.Type === "Directory") return 1;
      return 0;
    });
    console.table(list);
  } catch (err) {
    console.error("Error reading directory:", err.message);
  }
}

process.on("SIGINT", handleExit);
process.on("exit", handleExit);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

promptUser();
