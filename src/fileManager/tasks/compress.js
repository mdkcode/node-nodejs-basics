import fs from "fs";
import zlib from "zlib";
import path from "path";

export function compressFile(sourcePath, destDir) {
  const sourceFullPath = path.resolve(sourcePath);
  const fileName = path.basename(sourceFullPath);
  const destFullPath = path.join(path.resolve(destDir), fileName);
  const readStream = fs.createReadStream(sourceFullPath);
  const writeStream = fs.createWriteStream(destFullPath);
  const brotli = zlib.createBrotliCompress();
  const stream = readStream.pipe(brotli).pipe(writeStream);
  stream.on("finish", () => {
    console.log("Compressed");
  });
}

export function decompressFile(sourcePath, destDir) {
  const sourceFullPath = path.resolve(sourcePath);
  const fileName = path.basename(sourceFullPath);
  const destFullPath = path.join(path.resolve(destDir), fileName);
  const readStream = fs.createReadStream(sourceFullPath);
  const writeStream = fs.createWriteStream(destFullPath);
  const brotli = zlib.createBrotliDecompress();
  const stream = readStream.pipe(brotli).pipe(writeStream);
  stream.on("finish", () => {
    console.log("Decompressed");
  });
}
