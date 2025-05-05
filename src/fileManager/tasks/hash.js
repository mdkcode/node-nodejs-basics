import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function getFileHash(filePath) {
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
