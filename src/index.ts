async function run() {
  var text = (await Deno.readTextFile("data/day00.txt")).trimEnd();

  console.log(text);
}

run();
