import { slurp } from "./util";

interface World {
  rules: Map<string, { lo: number; hi: number }[]>;
  mine: number[];
  nearby: number[];
}

function parse(s: string): World {
  let chunks = s.split(/\n\n/);
  console.log(chunks);
  let rules = new Map(
    chunks[0].split(/\n/).map(l => {
      let xs = l.split(/\W+/);
      return [
        xs[0],
        [
          { lo: parseInt(xs[1]), hi: parseInt(xs[2]) },
          { lo: parseInt(xs[4]), hi: parseInt(xs[5]) }
        ]
      ];
    })
  );
  console.log(rules);
  return {
    rules: rules,
    mine: chunks[1]
      .split(/\n/)[1]
      .split(/,/)
      .map(n => parseInt(n)),
    nearby: chunks[2]
      .split(/\n/)[1]
      .split(/,/)
      .map(n => parseInt(n))
  };
}

function solvea(world: World) {
  console.log(world);
}

export async function run() {
  var text: string = await slurp("data/day16.txt");
  var world = parse(text);

  solvea(world);
}
