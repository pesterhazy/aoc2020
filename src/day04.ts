import { slurp } from "./util.ts";

let required = "byr,iyr,eyr,hgt,hcl,ecl,pid".split(/,/);
let optional = ["cid"];

interface Inf {
  m: Map<string, string>;
}

function parse(l: string): Inf {
  let kv = l.split(/\s/);
  let m = new Map();
  for (let [k, v] of kv.map(s => s.split(/:/))) {
    m.set(k, v);
  }
  return { m: m };
}

function validate(field: string, v: string): boolean {
  switch (field) {
    case "byr":
      let n = parseInt(v);

      if (isNaN(n)) return false;

      return n >= 1920 && n <= 2020;
    default:
      return true;
  }
}

function solvea(infs: Inf[]) {
  let count = 0;
  for (let inf of infs) {
    let valid = true;

    for (let field of required) {
      if (!inf.m.get(field)) {
        valid = false;
        break;
      }
    }
    if (valid) count++;
  }
  console.log(count);
}

function solveb(infs: Inf[]) {
  let count = 0;
  for (let inf of infs) {
    let valid = true;

    for (let field of required) {
      let v = inf.m.get(field);
      if (!v || !validate(field, v)) {
        valid = false;
        break;
      }
    }
    if (valid) count++;
  }
  console.log(count);
}

export async function run() {
  var text: string = await slurp("data/day04x.txt");

  var infs = text.split(/\n\n/).map(parse);

  solveb(infs);
}
