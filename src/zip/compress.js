import { createGzip } from "zlib";
import { pipeline } from "stream";
import { createReadStream, createWriteStream, unlink } from "fs";

const toCompress = new URL("./files/fileToCompress.txt", import.meta.url);
const resultFile = new URL("./files/archive.gz", import.meta.url);

const compress = async () => {
  const gzip = createGzip();
  const source = createReadStream(toCompress);
  const destination = createWriteStream(resultFile);
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    unlink(toCompress, (unlinkErr) => {
      if (unlinkErr) {
        throw unlinkErr;
      }
    });
  });
};

await compress();
