import { slurp, time } from "./util";
import { strict as assert } from "assert";

type Inf = string[];

// FIXME: learn about /g modifier

function parse(s: string): Inf {
  return s.match(/(\d+|[*+()])/g)!;
}

interface State {
  mode: "num" | "+" | "*";
  acc: number;
}

const INIT: State = { mode: "+", acc: 0 };

function solvea(infs: Inf[]) {
  for (let inf of infs) {
    let stack: State[] = [Object.assign({}, INIT)];

    for (let token of inf) {
      if (token === "(") {
        assert(stack[0].mode === "+" || stack[0].mode === "*");
        stack.unshift(Object.assign({}, INIT));
      } else if (token === "+") {
        assert(stack[0].mode === "num");
        stack[0].mode = "+";
      } else if (token === "*") {
        assert(stack[0].mode === "num");
        stack[0].mode = "*";
      } else {
        let n: number;
        if (token === ")") {
          if (stack.length < 2) throw "boom";
          n = stack.shift()!.acc;
        } else {
          n = parseInt(token);
          assert(!isNaN(n));
        }
        switch (stack[0].mode) {
          case "+":
            stack[0].acc += n;
            break;
          case "*":
            stack[0].acc *= n;
            break;
          default:
            throw ":(";
        }
        stack[0].mode = "num";
      }
    }
    console.log(stack[0].acc);
  }
}

export async function run() {
  var text: string = await slurp("data/day18x.txt");

  let infs: Inf[] = text.split(/\n/).map(parse);
  solvea(infs);
}
