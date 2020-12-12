import { slurp } from "./util";
import { vec2, mat2 } from "gl-matrix";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

interface Inf {
  action: string;
  v: number;
}

function manh(a: vec2) {
  return Math.abs(a[0]) + Math.abs(a[1]);
}

const ROT: [number, number, number, number][] = [
  [1, 0, 0, 1],
  [0, -1, 1, 0],
  [-1, 0, 0, -1],
  [0, 1, -1, 0]
];

function parse(s: string): Inf {
  return {
    action: s[0],
    v: parseInt(s.slice(1))
  };
}

const delta: Record<string, vec2> = {
  E: [1, 0],
  W: [-1, 0],
  N: [0, -1],
  S: [0, 1]
};

const dirs = ["E", "N", "W", "S"];

function turn(dir: string, lr: string, v: number): string {
  let idx = dirs.indexOf(dir);

  idx = mod(idx + (v / 90) * (lr === "L" ? 1 : -1), dirs.length);

  if (idx > dirs.length || idx < 0) throw "boom: " + idx;

  return dirs[idx];
}

function turnb(waypoint: vec2, lr: string, v: number): vec2 {
  let idx = mod((v / 90) * (lr === "L" ? 1 : -1), ROT.length);
  return vec2.transformMat2(
    vec2.create(),
    waypoint,
    mat2.fromValues(...ROT[idx])
  );
}

function solvea(infs: Inf[]) {
  let dir = "E";
  let pos: vec2 = [0, 0];

  for (let inf of infs) {
    switch (inf.action) {
      case "F":
        pos = vec2.add(
          vec2.create(),
          pos,
          vec2.scale(vec2.create(), delta[dir], inf.v)
        );
        break;
      case "N":
      case "S":
      case "E":
      case "W":
        pos = vec2.add(
          vec2.create(),
          pos,
          vec2.scale(vec2.create(), delta[inf.action], inf.v)
        );
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

function solveb(infs: Inf[]) {
  let pos: vec2 = [0, 0];
  let waypoint: vec2 = [10, -1];

  for (let inf of infs) {
    switch (inf.action) {
      case "F":
        pos = vec2.add(
          vec2.create(),
          pos,
          vec2.scale(vec2.create(), waypoint, inf.v)
        );
        break;
      case "N":
      case "S":
      case "E":
      case "W":
        waypoint = vec2.add(
          vec2.create(),
          waypoint,
          vec2.scale(vec2.create(), delta[inf.action], inf.v)
        );
        break;
      case "L":
      case "R":
        waypoint = turnb(waypoint, inf.action, inf.v);
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
  solveb(infs);
}
