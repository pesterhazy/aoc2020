import { slurp, time } from "./util";
import { strict as assert } from "assert";

type Inf = string[];

// FIXME: learn about /g modifier

function parse(s: string): Inf {
  return s.match(/(\d+|[*+()])/g)!;
}

type Expr = OpExpr | NumExpr;

interface OpExpr {
  tag: "op";
  op: "+" | "*";
  a: Expr;
  b: Expr;
}

interface NumExpr {
  tag: "num";
  n: number;
}

function evalExpr(e: Expr): number {
  if (e.tag === "num") return e.n;

  if (e.op === "+") return evalExpr(e.a) + evalExpr(e.b);
  else if (e.op === "*") return evalExpr(e.a) * evalExpr(e.b);
  throw "Invalid op";
}

function solve(infs: Inf[], lo: string | undefined) {
  let ans = 0;
  for (let inf of infs) {
    if (!inf) continue;
    let tokens = [...inf];
    function nextToken(): string | undefined {
      return tokens.shift();
    }
    function nextNum(): Expr {
      let t = nextToken();
      if (t === undefined) throw "Expected token";
      if (t === "(") {
        return nextExpr();
      } else {
        let n = parseInt(t);
        assert(!isNaN(n));

        return { tag: "num", n: n };
      }
    }
    function nextExpr(): Expr {
      let a = nextNum();

      while (true) {
        let t = nextToken();
        switch (t) {
          case undefined:
          case ")":
            return a;
          case "+":
          case "*":
            if (t === lo) {
              return { tag: "op", op: t, a, b: nextExpr() };
            } else {
              a = { tag: "op", op: t, a, b: nextNum() };
              break;
            }
          default:
            throw "Unexpected token: " + t;
        }
      }
    }
    let e = nextExpr();
    ans += evalExpr(e);
  }
  return ans;
}

export async function run() {
  var text: string = await slurp("data/day18.txt");

  let infs: Inf[] = text.split(/\n/).map(parse);
  assert.equal(solve(infs, undefined), 36382392389406);
  assert.equal(solve(infs, "*"), 381107029777968);
}
