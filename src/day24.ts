import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import baretest from "baretest";
const test = baretest("aoc");

type Dir = "e" | "se" | "sw" | "w" | "nw" | "ne";

function solve(tiles: Dir[][]) {
  let black = new Set();

  for (let tile of tiles) {
    let x = 0,
      y = 0;

    for (let move of tile) {
      switch (move) {
        case "e":
          x++;
          break;
        case "se":
          y++;
          break;
        case "sw":
          x--;
          y++;
          break;
        case "w":
          x--;
          break;
        case "nw":
          y--;
          break;
        case "ne":
          x++;
          y--;
          break;
        default:
          throw "unknown";
      }
    }
    let key = `${x},${y}`;
    if (black.has(key)) black.delete(key);
    else black.add(key);
  }
  console.log(black.size);
}

function parse(s: string): Dir[][] {
  return s.split(/\n/).map(l => l.match(/e|se|sw|w|nw|ne/g) as Dir[]);
}

export async function run() {
  var text: string = await slurp("data/day24a.txt");
  let tiles = parse(text);

  solve(tiles);
}
