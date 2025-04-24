import fs from "fs";
import crypto from "crypto";

const fileName = new URL("./files/fileToCalculateHashFor.txt", import.meta.url);

const getHash = (path) =>
  new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const rs = fs.createReadStream(path);
    rs.on("error", reject);
    rs.on("data", (chunk) => hash.update(chunk));
    rs.on("end", () => resolve(hash.digest("hex")));
  });

const calculateHash = async () => {
  try {
    const hashValue = await getHash(fileName);
    console.log(hashValue);
  } catch (error) {
    console.error("Error:", error);
  }
};

await calculateHash();
