import { slurp } from "./util";
import { inspect } from "util";

interface CharRule {
  type: "char";
  char: string;
}

interface AltRule {
  type: "alt";
  alts: number[][];
}

type Rule = CharRule | AltRule;

interface World {
  rules: Map<number, Rule>;
  samples: string[];
}

function parse(s: string): World {
  let rules: Map<number, Rule> = new Map();
  let ss = s.split(/\n\n/);
  for (let l of ss[0].split(/\n/)) {
    let [idx, ll] = l.split(/:/);

    let m = ll.match(/"(.)"/);
    if (m) {
      rules.set(parseInt(idx), { type: "char", char: m[1] });
    } else {
      let parts = ll.split(/\|/);

      let alts = parts.map(part => {
        let matches = part.match(/\d+/g);
        if (!matches) throw ":(";
        return matches.map(n => parseInt(n));
      });
      rules.set(parseInt(idx), { type: "alt", alts });
    }
  }
  let samples = ss[1].split(/\n/);
  return { rules, samples };
}

function matches(world: World, s: string, ridx: number): number {
  let rule = world.rules.get(ridx);
  if (!rule) {
    throw "Not found";
  }
  if (rule.type === "char") {
    if (s[0] === rule.char) return 1;
    else return -1;
  } else {
    for (let alt of rule.alts) {
      let valid = true;
      let pos = 0;
      for (let idx of alt) {
        let r = matches(world, s.substring(pos), idx);
        if (r === -1) {
          valid = false;
          break;
        }
        pos += r;
      }
      if (valid) return pos;
    }
    return -1;
  }
}

function solvea(world: World) {
  // console.log(inspect(world, { showHidden: false, depth: null }));
  let valid = 0;
  for (let sample of world.samples) {
    let r = matches(world, sample, 0);
    if (r === sample.length) valid++;
  }
  console.log(valid);
}

function patch(text: string): string {
  return text
    .replace(/^8:.*$/m, "8: 42 | 42 8")
    .replace(/^11:.*$/m, "11: 42 31 | 42 11 31");
}

export async function run() {
  var text: string = await slurp("data/day19x.txt");
  solvea(parse(text));
  solvea(parse(patch(text)));
}
