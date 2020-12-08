import { slurp } from "./util";

interface Inf {
  op: string;
  arg: number;
}

function parse(s: string): Inf {
  let xs = s.split(/ /);
  return {
    op: xs[0],
    arg: parseInt(xs[1])
  };
}

function solvea(infs: Inf[]) {
  let ans = 0;

  let patches: Set<number> = new Set();
  let count = 0;

  while (true) {
    console.log("count:", count, patches.size);
    let seen: Set<number> = new Set();
    let acc = 0;
    let ip = 0;

    let patched = false;
    while (true) {
      if (ip === infs.length) {
        console.log("halted", acc);
        return;
      }

      if (seen.has(ip)) {
        console.log("infinite loop", acc);
        break;
      }
      seen.add(ip);
      let cur = infs[ip];
      let op = cur.op;
      if (count !== 0 && !patched && patches.has(ip)) {
        if (op === "nop") op = "jmp";
        else if (op === "jmp") op = "nop";
        patches.delete(ip);
        patched = true;
      }
      switch (op) {
        case "nop":
          if (count === 0) patches.add(ip);
          ip++;
          break;
        case "acc":
          acc = acc + cur.arg;
          ip++;
          break;
        case "jmp":
          if (count === 0) patches.add(ip);
          ip = ip + cur.arg;
          break;
        default:
          throw "unknown";
      }
    }
    count++;
    if (count > 100) throw ":(";
  }
  console.log(patches);
}

export async function run() {
  var text: string = await slurp("data/day08a.txt");
  var infs = text.split(/\n/).map(parse);

  solvea(infs);
}
