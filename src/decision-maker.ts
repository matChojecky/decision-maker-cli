import { createLiveUpdateLogger } from "./printer";

const compareOdds = (actual: number, passingOdd: number) =>
  actual * 100 > 100 - passingOdd;

const createOdd = () => Math.random() + 0.001; //using geometric mean to calculate momentary values we cannot have 0s;

export function shouldI(odds: number, runningTime: number): Promise<boolean> {
  const liveUpdater = createLiveUpdateLogger();
  return new Promise(async (res) => {
    let currentOddsValue = createOdd();
    setTimeout(() => {
      clearInterval(outputInterval);
      clearInterval(updateInterval);
      liveUpdater.finish();
      res(compareOdds(currentOddsValue, odds));
    }, runningTime);

    const outputInterval = setInterval(() => {
      liveUpdater.clear();
      liveUpdater.log(compareOdds(currentOddsValue, odds));
    }, 200);

    const updateInterval = setInterval(() => {
      currentOddsValue = Math.sqrt(currentOddsValue * createOdd());
    }, 25);
  });
}
