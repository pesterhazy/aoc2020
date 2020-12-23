import { run } from "./day22";

async function main() {
  try {
    await run();
  } catch (e) {
    console.error("FAILED");
    console.error(e);
    process.exit(1);
  }
}

main();
