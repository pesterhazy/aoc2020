import { slurp } from "./util";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

interface Inf {
  action: string;
  v: number;
}

interface Point {
  x: number;
  y: number;
}

function add(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

function mul(a: Point, v: number): Point {
  return { x: a.x * v, y: a.y * v };
}

function manh(a: Point) {
  return Math.abs(a.x) + Math.abs(a.y);
}

function parse(s: string): Inf {
  return {
    action: s[0],
    v: parseInt(s.slice(1))
  };
}

const delta: Record<string, Point> = {
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
  N: { y: -1, x: 0 },
  S: { y: 1, x: 0 }
};

const dirs = ["E", "N", "W", "S"];

function turn(dir: string, lr: string, v: number): string {
  let idx = dirs.indexOf(dir);

  idx = mod(idx + (v / 90) * (lr === "L" ? 1 : -1), dirs.length);

  if (idx > dirs.length || idx < 0) throw "boom: " + idx;

  return dirs[idx];
}

function solvea(infs: Inf[]) {
  console.log(infs);
  let dir = "E";
  let pos: Point = { x: 0, y: 0 };

  for (let inf of infs) {
    switch (inf.action) {
      case "F":
        pos = add(pos, mul(delta[dir] as Point, inf.v));
        break;
      case "N":
      case "S":
      case "E":
      case "W":
        pos = add(pos, mul(delta[inf.action], inf.v));
        break;
      case "L":
      case "R":
        dir = turn(dir, inf.action, inf.v);
        break;

      default:
        throw ":(";
    }
  }
  console.log(manh(pos));
}

export async function run() {
  var text: string = await slurp("data/day12a.txt");
  var infs = text.split(/\n/).map(parse);

  solvea(infs);
}
