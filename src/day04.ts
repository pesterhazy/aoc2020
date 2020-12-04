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

function validate(field: string, s: string): boolean {
  switch (field) {
    case "byr": {
      let n = parseInt(s);

      if (isNaN(n)) return false;

      return n >= 1920 && n <= 2020;
    }
    case "iyr": {
      let n = parseInt(s);

      if (isNaN(n)) return false;

      return n >= 2010 && n <= 2020;
    }
    case "eyr": {
      let n = parseInt(s);

      if (isNaN(n)) return false;

      return n >= 2020 && n <= 2030;
    }
    case "hgt": {
      let matches = s.match(/^(\d+)(cm|in)$/);
      if (!matches) return false;

      let n = parseInt(matches[1]);
      let unit = matches[2];

      if (unit === "cm") return n >= 150 && n <= 193;
      else return n >= 59 && n <= 76;
    }
    case "hcl": {
      let matches = s.match(/^#[0-9a-f]{6}$/);
      return !!matches;
    }

    case "ecl": {
      let matches = s.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
      return !!matches;
    }

    case "pid": {
      let matches = s.match(/^[0-9]{9}$/);
      return !!matches;
    }
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

// 115 is to high

export async function run() {
  var text: string = await slurp("data/day04a.txt");

  var infs = text.split(/\n\n/).map(parse);

  solveb(infs);
}
