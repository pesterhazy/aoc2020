import { slurp } from "./util";

type Inf = number;

function parse(s: string): Inf {
  return parseInt(s);
}

function solvea(infs: Inf[], windowSize: number): number {
  console.log(infs);
  let win = infs.slice(0, windowSize);
  let nums = infs.slice(windowSize);
  while (nums.length > 0) {
    let num: number = nums.shift()!;

    let valid = false;
    for (let i = 0; i < windowSize; i++) {
      for (let j = 0; j < windowSize; j++) {
        if (i === j) continue;

        if (win[i] + win[j] === num) {
          valid = true;
          break;
        }
      }
      if (valid) break;
    }

    if (!valid) {
      console.log("found", num);
      return num;
    }

    win.push(num);
    win.shift();
  }
  throw ":(";
}

function solveb(infs: Inf[], target: number) {
  let win: number[] = [infs[0]];
  let rest: number[] = infs.slice(1);

  while (true) {
    let n = win.reduce((a: number, b: number) => a + b);

    if (n === target) {
      console.log("found", win[0] + win[win.length - 1]);
      return;
    } else if (n > target) win.shift();
    else if (0 === rest.length) throw "not found";
    else {
      win.push(rest.shift()!);
    }
  }
}

export async function run() {
  var text: string = await slurp("data/day09a.txt");
  var infs = text.split(/\n/).map(parse);

  let k = solvea(infs, 25);
  solveb(infs, k);
}
