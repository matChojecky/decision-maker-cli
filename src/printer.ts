import chalk from "chalk";
import figlet from "figlet";

export function displayResult(isSuccessfull: boolean): void {
  const print = isSuccessfull ? success : failure;
  const logger = loggerFactory(console.log);
  print((...args) => logger(...args, true));
}

function loggerFactory(log: typeof console.log | typeof process.stdout.write) {
  return function logger(
    text: string,
    colorizer: chalk.Chalk,
    useFiglet = false
  ) {
    const figle = useFiglet
      ? (txt: string) => figlet.textSync(txt)
      : (txt: string) => txt;

    log(colorizer(figle(text)));
  };
}

function success(log: (...args: [string, chalk.Chalk]) => void): void {
  log("Yes, yes, you should!", chalk.greenBright);
}

function failure(log: (...args: [string, chalk.Chalk]) => void): void {
  log("Fuck no!", chalk.redBright);
}

export function createLiveUpdateLogger() {
  const success = ["Yes", chalk.green] as const;
  const fail = ["No", chalk.red] as const;
  const logger = loggerFactory((text: string) => {
    const dotsAmount = Math.round(Math.random() * 5);
    const createChars = (char: string, amount: number) =>
      Array(amount).fill(char).join("");
    process.stdout.write(
      `Making decision. Possible outcome${createChars(
        ".",
        dotsAmount
      )}${createChars(" ", 6 - dotsAmount)} ${text}\t`
    );
  });
  return {
    log(isCurrentChanceSuccessful: boolean): void {
      const args = isCurrentChanceSuccessful ? success : fail;
      logger(args[0], args[1]);
    },
    clear() {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    },
    finish() {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write("\n");
    },
  };
}
