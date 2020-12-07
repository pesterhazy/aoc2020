import { promises as fs } from "fs";

async function slurp(fname: string): Promise<string> {
  return fs.readFile(fname, "utf-8");
}

export { slurp };
