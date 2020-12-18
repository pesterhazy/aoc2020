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
  op: "+";
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
      let t = nextToken();
      if (t === undefined) throw "xxx";
      let n = parseInt(t);
      assert(!isNaN(n));
      let a: Expr = { tag: "num", n: n };

      let t2 = nextToken();
      if (t2 === undefined) {
        return a;
      } else {
        assert(t2 === "+");

        let b: Expr = nextExpr();

        return { tag: "op", op: "+", a, b };
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
