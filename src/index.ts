import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { shouldI } from "./decision-maker";
import { createLiveUpdateLogger, displayResult } from "./printer";

const argv = yargs(hideBin(process.argv)).options({
  chance: {
    alias: "c",
    type: "number",
    default: 50,
    number: true,
    description:
      "Percentage value for decision to success, defaults to 50/50 chance",
  },
  time: {
    alias: "t",
    type: "number",
    default: 1,
    number: true,
    description:
      "Time in minutes for how long chance is randomized and calculated",
  },
}).argv;

clear();
console.log(
  chalk.whiteBright(
    figlet.textSync("Should I realy?", {
      horizontalLayout: "universal smushing",
    })
  )
);

const TIME_IN_MS = argv.time * 60 * 1000;
const ODDS = argv.chance;

async function main() {
  const result = await shouldI(ODDS, TIME_IN_MS);
  displayResult(result);
}

main();
