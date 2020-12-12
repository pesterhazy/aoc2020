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

type Vector2 = [number, number];
type Matrix2 = [Vector2, Vector2];

function fromPoint(point: Point): Vector2 {
  return [point.x, point.y];
}

function toPoint(vec: Vector2): Point {
  return { x: vec[0], y: vec[1] };
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

function mulm(m1: number[][], m2: number[][]) {
  var result: number[][] = [];

  for (var i = 0; i < m1.length; i++) {
    result[i] = [];
    for (var j = 0; j < m2[0].length; j++) {
      var sum = 0;
      for (var k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

// 0, 90, 180, 270 deg

const ROT: Matrix2[] = [
  [
    [1, 0],
    [0, 1]
  ],
  [
    [0, -1],
    [1, 0]
  ],

  [
    [-1, 0],
    [0, -1]
  ],
  [
    [0, 1],
    [-1, 0]
  ]
];

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

function turnb(waypoint: Point, lr: string, v: number): Point {
  let p = mulm(
    [fromPoint(waypoint)],
    ROT[mod((v / 90) * (lr === "L" ? 1 : -1), ROT.length)]
  )[0] as Vector2;

  return toPoint(p);
}

function solvea(infs: Inf[]) {
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

function solveb(infs: Inf[]) {
  let pos: Point = { x: 0, y: 0 };
  let waypoint: Point = { x: 10, y: -1 };

  for (let inf of infs) {
    switch (inf.action) {
      case "F":
        pos = add(pos, mul(waypoint, inf.v));
        break;
      case "N":
      case "S":
      case "E":
      case "W":
        waypoint = add(waypoint, mul(delta[inf.action], inf.v));
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
