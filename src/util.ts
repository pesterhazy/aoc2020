import { promises as fs } from "fs";
import { performance } from "perf_hooks";

async function slurp(fname: string): Promise<string> {
  return fs.readFile(fname, "utf-8");
}

export function time(fun: any) {
  let start = performance.now();
  let result = fun();
  let end = performance.now();

  console.log("Elapsed:", end - start);
  return result;
}

export { slurp };
