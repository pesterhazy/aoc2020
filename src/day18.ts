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

function solvea(infs: Inf[]) {
  for (let inf of infs) {
    if (!inf) continue;
    console.log("INF", inf);
    let tokens = [...inf];
    function nextToken(): string | undefined {
      return tokens.shift();
    }
    function nextExpr(): Expr {
      let a: Expr;

      let t = nextToken();
      if (t === undefined) throw "xxx";
      if (t === "(") {
        a = nextExpr();
      } else {
        let n = parseInt(t);
        assert(!isNaN(n));

        a = { tag: "num", n: n };
      }

      while (true) {
        let t2 = nextToken();
        if (t2 === undefined || t2 === ")") {
          return a;
        }
        if (!(t2 === "+" || t2 === "*")) throw "Unexpected token: " + t2;

        if (t2 === "+") {
          let b: Expr;

          let t3 = nextToken();
          if (t3 === undefined) throw "xxx";
          if (t3 === "(") {
            b = nextExpr();
          } else {
            let n = parseInt(t);
            assert(!isNaN(n));

            b = { tag: "num", n: n };
          }
          a = { tag: "op", op: t2, a, b };
        } else {
          return { tag: "op", op: t2, a, b: nextExpr() };
        }
      }
    }
    let e = nextExpr();
    console.log(e);
  }
}

export async function run() {
  var text: string = await slurp("data/day18y.txt");

  let infs: Inf[] = text.split(/\n/).map(parse);
  solvea(infs);
}
