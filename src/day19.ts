import { slurp } from "./util";
import { strict as assert } from "assert";

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

interface Job {
  s: string;
  rids: number[];
}

function matches(
  ruleset: Ruleset,
  initialRid: number,
  initialS: string
): boolean {
  let jobs: Job[] = [{ s: initialS, rids: [initialRid] }];

  // depth-first search with stack
  while (jobs.length > 0) {
    let job = jobs.shift()!;

    if (job.rids.length === 0) {
      if (job.s.length === 0) return true;
    } else {
      let rule = ruleset.get(job.rids[0]);
      if (rule === undefined) throw "not found";
      if (rule.type == "char") {
        if (rule.char === job.s[0]) {
          jobs.push({ s: job.s.substring(1), rids: job.rids.slice(1) });
        }
      } else {
        // alt
        for (let alt of rule.alts) {
          jobs.push({ s: job.s, rids: [...alt, ...job.rids.slice(1)] });
        }
      }
    }
  }
  return false;
}

function solve(world: World) {
  console.log(world.samples.filter(s => matches(world.rules, 0, s)).length);
}

export async function run() {
  var text: string = patch(await slurp("data/day19a.txt"));

  let ruleset: Ruleset = new Map();

  ruleset.set(0, { type: "char", char: "a" });
  ruleset.set(1, { type: "char", char: "b" });
  ruleset.set(2, { type: "alt", alts: [[0], [1]] });
  ruleset.set(3, { type: "alt", alts: [[0, 1]] });
  assert.equal(matches(ruleset, 0, "a"), true);
  assert.equal(matches(ruleset, 1, "a"), false);
  assert.equal(matches(ruleset, 2, "a"), true);
  assert.equal(matches(ruleset, 2, "b"), true);
  assert.equal(matches(ruleset, 2, "c"), false);
  assert.equal(matches(ruleset, 3, "ab"), true);
  assert.equal(matches(ruleset, 3, "ba"), false);

  solve(parse(text));
}
