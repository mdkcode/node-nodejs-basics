import os from "os";
import { Worker, isMainThread } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, "worker.js");

const performCalculations = async () => {
  const cpuCount = os.cpus().length;
  if (isMainThread) {
    const promises = [];
    for (let i = 0; i < cpuCount; i++) {
      const numberToSend = 10 + i;
      const promise = new Promise((resolve) => {
        const worker = new Worker(workerPath, {
          workerData: numberToSend,
        });
        worker.on("message", (res) => {
          resolve({ status: "resolved", data: res });
        });
        worker.on("error", () => {
          resolve({ status: "error", data: null });
        });
      });
      promises.push(promise);
    }
    const results = await Promise.all(promises);
    console.log(results);
  }
};

await performCalculations();
