import { slurp } from "./util.ts";

function solvea(xs: number[]) {
  for (var i = 0; i < xs.length; i++) {
    for (var j = 0; j < xs.length; j++) {
      if (j === i) break;
      if (xs[i] + xs[j] === 2020) {
        console.log(xs[i] * xs[j]);
        return;
      }
    }
  }
}

function solveb(xs: number[]) {
  for (var i = 0; i < xs.length; i++) {
    for (var j = 0; j < xs.length; j++) {
      for (var k = 0; k < xs.length; k++) {
        if (j === i || k === j || i === k) break;
        if (xs[i] + xs[j] + xs[k] === 2020) {
          console.log(xs[i] * xs[j] * xs[k]);
          return;
        }
      }
    }
  }
}

async function run() {
  var text: string = await slurp("data/day01a.txt");
  var xs = text.split(/\n/).map(n => parseInt(n));

  console.log(xs);

  solvea(xs);
  solveb(xs);
}

run();
