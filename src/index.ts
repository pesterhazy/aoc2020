async function run() {
  var text = await Deno.readTextFile("data/day00.txt");

  console.log(text);
}

run();
