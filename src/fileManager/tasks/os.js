import { EOL, cpus, homedir, userInfo } from "os";

export function getOsInfo(command) {
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
