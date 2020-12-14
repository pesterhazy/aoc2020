import { slurp } from "./util";
import { strict as assert } from "assert";

type InfMask = {
  type: "mask";
  masks: bigint[];
};

type InfSet = {
  type: "set";
  addr: bigint;
  v: bigint;
};

type Inf = InfMask | InfSet;

function parse(l: string): Inf {
  {
    let matches = l.match(/^mask = (.*)$/);
    if (matches) {
      let a = matches[1].replace(/./g, function(c) {
        if (c === "X") return "0";
        if (c === "0") return "0";
        if (c === "1") return "1";
        throw ":(";
      });
      let b = matches[1].replace(/./g, function(c) {
        if (c === "X") return "1";
        if (c === "0") return "0";
        if (c === "1") return "1";
        throw ":(";
      });
      let c = matches[1].replace(/./g, function(c) {
        if (c === "X") return "1";
        if (c === "0") return "0";
        if (c === "1") return "0";
        throw ":(";
      });
      return {
        type: "mask",
        masks: [BigInt("0b" + a), BigInt("0b" + b), BigInt("0b" + c)]
      };
    }
  }

  {
    let matches = l.match(/^mem\[(.*)\] = (.*)$/);

    if (matches) {
      return {
        type: "set",
        addr: BigInt(matches[1]),
        v: BigInt(matches[2])
      };
    }
  }

  throw ":((";
}

function solvea(infs: Inf[]) {
  let mem: Map<bigint, bigint> = new Map();
  let masks: bigint[] = [];

  for (let inf of infs) {
    if (inf.type === "mask") {
      masks = inf.masks;
    } else if (inf.type === "set") {
      let pairs = [[0n, (1n << 37n) - 1n]]; // or, and
      for (let bit = 0n; bit < 36n; bit++) {
        let b = 1n << bit;
        if (masks[2] & b) {
          let acc = [];
          for (let [or, and] of pairs) {
            acc.push([or | b, and]);
            acc.push([or, and & ~b]);
          }
          pairs = acc;
        }
      }

      for (let [or, and] of pairs) {
        mem.set((inf.addr | masks[0] | or) & and, inf.v);
      }
    }
  }

  return [...mem.values()].reduce((a, b) => a + b);
}

function solveb(infs: Inf[]) {}

export async function run() {
  var text: string = await slurp("data/day14a.txt");

  var infs = text.split(/\n/).map(parse);

  let a = solvea(infs);
  console.log(a);
  assert(a === 3443997590975n);
}
