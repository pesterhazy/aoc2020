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

type Ruleset = Map<number, Rule>;

interface World {
  rules: Ruleset;
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

function patch(text: string): string {
  return text
    .replace(/^8:.*$/m, "8: 42 | 42 8")
    .replace(/^11:.*$/m, "11: 42 31 | 42 11 31");
}

function matches(ruleset: Ruleset, s: string): boolean {
  return false;
}

export async function run() {
  var text: string = patch(await slurp("data/day19x.txt"));
}
