import { sleep } from "./helpers";
import { createLiveUpdateLogger } from "./printer";

const compareOdds = (actual: number, passingOdd: number) =>
  actual * 100 > 100 - passingOdd;

export function shouldI(odds: number, runningTime: number): Promise<boolean> {
  const liveUpdater = createLiveUpdateLogger();
  return new Promise(async (res) => {
    let _stop = false;
    let currentOddsValue = Math.random();
    setTimeout(() => {
      _stop = true;
      liveUpdater.finish();
      res(compareOdds(currentOddsValue, odds));
    }, runningTime);
    while (true) {
      if (_stop) {
        break;
      }
      currentOddsValue = (currentOddsValue + Math.random()) / 2;
      liveUpdater.log(compareOdds(currentOddsValue, odds));
      await sleep(100);
      liveUpdater.clear();
    }
  });
}
