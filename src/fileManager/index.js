import readline from "readline";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import crypto from "crypto";
import { EOL, cpus, homedir, userInfo } from "os";

const args = process.argv.slice(2);
let username = "";
args.forEach((arg, index) => {
  if (arg === "--username") {
    username = args[index + 1];
  }
});

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();

function getOsInfo(command) {
  switch (command) {
    case "os --EOL":
      console.log("EOL is:", JSON.stringify(EOL));
      break;
    case "os --cpus":
      const allCpus = cpus();
      console.log(`Amount of CPUs: ${allCpus.length}`);
      allCpus.forEach((cpu, index) => {
        const speedGHz = (cpu.speed / 1000).toFixed(2);
        console.log(`${index + 1} - Model: ${cpu.model}`);
        console.log(`Speed: ${speedGHz} GHz\n`);
      });
      break;
    case "os --homedir":
      console.log(homedir());
      break;
    case "os --username":
      console.log(userInfo().username);
      break;
    case "os --architecture":
      console.log(`Architecture: ${process.arch}`);
      break;
  }
}
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

async function calculateFileHash(filePath) {
  try {
    const fullPath = path.resolve(filePath);
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(fullPath);

    stream.on("error", (err) => {
      console.error(err.message);
    });
    stream.on("data", (chunk) => {
      hash.update(chunk);
    });
    stream.on("end", () => {
      const digest = hash.digest("hex");
      console.log(`SHA-256 hash of ${filePath}:\n${digest}`);
    });
  } catch (err) {
    console.log(err);
  }
}

function promptUser() {
  rl.question("Type something: ", async (command) => {
    command = command.trim();
    if (command === ".exit") {
      handleExit();
      rl.close();
      return;
    }
    if (command.startsWith("hash ")) {
      const filePath = command.slice(5).trim();
      calculateFileHash(filePath);
    } else if (command.includes("os")) getOsInfo(command);
    else if (command === "ls") {
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
    const items = await fsPromises.readdir(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = await fsPromises.lstat(fullPath);
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
