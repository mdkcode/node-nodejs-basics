import readline from "readline";
import { getFileHash } from "./tasks/hash.js";
import { getOsInfo } from "./tasks/os.js";
import {
  printCurrentDirectory,
  changeDirectory,
  goUpperFromCurrentDirectory,
  listAllFilesAndFolders,
} from "./tasks/navigation.js";
import {
  createNewFile,
  readFileStream,
  copyFile,
  moveFile,
  deleteFile,
  createDirectory,
  renameFile,
} from "./tasks/fileOperations.js";
import { compressFile, decompressFile } from "./tasks/compress.js";

const args = process.argv.slice(2);
let username = "";
args.forEach((arg) => {
  if (arg.startsWith("--username=")) {
    username = arg.split("=")[1];
  }
});

function handleExit() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}

function handleInvalidInput() {
  console.log("Invalid input");
}

function handleOperationError() {
  console.log("Operation failed");
}

function promptUser() {
  printCurrentDirectory();
  rl.question("Type something: ", async (command) => {
    command = command.trim();
    if (command === ".exit") {
      handleExit();
      rl.close();
      return;
    }
    try {
      if (command.startsWith("cd ")) {
        const targetPath = command.slice(3).trim();
        changeDirectory(targetPath);
      } else if (command.startsWith("add ")) {
        await createNewFile(command.slice(4).trim());
      } else if (command.startsWith("mkdir ")) {
        await createDirectory(command.slice(6).trim());
      } else if (command.startsWith("rn ")) {
        const [_, oldPath, newName] = command.split(" ");
        await renameFile(oldPath, newName);
      } else if (command.startsWith("cp ")) {
        const [_, source, dest] = command.split(" ");
        await copyFile(source, dest);
      } else if (command.startsWith("mv ")) {
        const [_, source, dest] = command.split(" ");
        await moveFile(source, dest);
      } else if (command.startsWith("rm ")) {
        await deleteFile(command.slice(3).trim());
      } else if (command.startsWith("cat ")) {
        const filePath = command.slice(4).trim();
        readFileStream(filePath);
      } else if (command.startsWith("hash ")) {
        const filePath = command.slice(5).trim();
        getFileHash(filePath);
      } else if (command.includes("os")) getOsInfo(command);
      else if (command === "ls") {
        await listAllFilesAndFolders();
      } else if (command === "up") {
        goUpperFromCurrentDirectory();
      } else if (command.startsWith("compress ")) {
        const [_, source, dest] = command.split(" ");
        compressFile(source, dest);
      } else if (command.startsWith("decompress ")) {
        const [_, source, dest] = command.split(" ");
        decompressFile(source, dest);
      } else {
        handleInvalidInput();
      }
    } catch (err) {
      handleOperationError();
    }
    promptUser();
  });
}

process.on("SIGINT", handleExit);
process.on("exit", handleExit);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Welcome to the File Manager, ${username}!`);
promptUser();
