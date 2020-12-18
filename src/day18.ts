import { slurp, time } from "./util";
import { strict as assert } from "assert";

type Inf = string[];

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
      if (t === undefined) throw "Premature end of file";
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

// Dijkstra's shunting yard algorithm

function evalRPN(es: string[]): number {
  let stack: number[] = [];
  for (let e of es) {
    if (e === "+") {
      let a = stack.shift();
      if (a === undefined) throw "err";
      let b = stack.shift();
      if (b === undefined) throw "err";
      stack.unshift(a + b);
    } else if (e === "*") {
      let a = stack.shift();
      if (a === undefined) throw "err";
      let b = stack.shift();
      if (b === undefined) throw "err";
      stack.unshift(a * b);
    } else {
      let v = parseInt(e);
      assert(!isNaN(v));
      stack.unshift(v);
    }
  }
  assert(stack.length === 1);
  return stack[0];
}

function solve2(infs: Inf[], lo: string | undefined): number {
  let ans = 0;
  for (let inf of infs) {
    if (!inf) continue;

    let ops: string[] = [];
    let q: string[] = [];

    let tokens = [...inf];
    function nextToken(): string | undefined {
      return tokens.shift();
    }

    const isHigher = (a: string, b: string) => {
      if (lo === undefined) return true;
      else return b === lo && a !== lo;
    };

    while (true) {
      let t = nextToken();

      if (t === undefined) break;

      if (/^\d+$/.test(t)) {
        q.push(t);
      } else if (t === "+" || t === "*") {
        while (ops.length > 0 && ops[0] !== "(" && isHigher(ops[0], t)) {
          let op = ops.shift();
          if (op === undefined) throw "err";
          if (op !== "(") q.push(op);
        }
        ops.unshift(t);
      } else if (t === "(") {
        ops.unshift(t);
      } else if (t === ")") {
        while (ops[0] !== "(") {
          let op = ops.shift();
          if (op === undefined) throw "err!?";
          q.push(op);
        }
        ops.shift();
      } else throw "Invalid token";
    }
    while (ops.length > 0) {
      let op = ops.shift();
      if (op === undefined) throw "err";
      q.push(op);
    }
    let result = evalRPN(q);
    ans += result;
  }
  return ans;
}

export async function run() {
  var text: string = await slurp("data/day18.txt");

  let infs: Inf[] = text.split(/\n/).map(parse);
  assert.equal(solve2(infs, undefined), 36382392389406);
  assert.equal(solve2(infs, "*"), 381107029777968);
}
