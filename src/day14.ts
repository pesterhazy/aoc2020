import { slurp } from "./util";

type InfMask = {
  type: "mask";
  masks: number[];
};

type InfSet = {
  type: "set";
  addr: number;
  v: number;
};

type Inf = InfMask | InfSet;

function parse(l: string): Inf {
  console.log(l);
  {
    let matches = l.match(/^mask = (.*)$/);
    if (matches) {
      return {
        type: "mask",
        masks: [
          parseInt(matches[1].replace(/X/g, "0"), 2),
          parseInt(
            matches[1].replace(/./g, function(c) {
              if (c === "X") return "0";
              if (c === "0") return "1";
              if (c === "1") return "0";
              throw ":(";
            }),
            2
          )
        ]
      };
    }
  }

  {
    let matches = l.match(/^mem\[(.*)\] = (.*)$/);

    if (matches) {
      return {
        type: "set",
        addr: parseInt(matches[1]),
        v: parseInt(matches[2])
      };
    }
  }

  throw ":((";
}

function solvea(infs: Inf[]) {
  console.log(infs);
}

function solveb(infs: Inf[]) {}

export async function run() {
  var text: string = await slurp("data/day14.txt");

  var infs = text.split(/\n/).map(parse);

  solvea(infs);
}
