async function slurp(fname: string): Promise<string> {
  return Deno.readTextFile(fname);
}

export { slurp };
