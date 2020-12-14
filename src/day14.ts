import { slurp } from "./util";

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
      return {
        type: "mask",
        masks: [BigInt("0b" + a), BigInt("0b" + b)]
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
      let v = inf.v;
      v = v | masks[0];
      v = v & masks[1];
      mem.set(inf.addr, v);
    }
  }
  let ans: bigint = 0n;
  for (let v of mem.values()) {
    ans += v;
  }

  console.log(ans);
}

function solveb(infs: Inf[]) {}

export async function run() {
  var text: string = await slurp("data/day14a.txt");

  var infs = text.split(/\n/).map(parse);

  solvea(infs);
}
