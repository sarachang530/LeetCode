/* First, I wanna know how much money I could have made yesterday if I'd been trading Apple stocks all day.

So I grabbed Apple's stock prices from yesterday and put them in an array called stockPrices, where:

The indices are the time (in minutes) past trade opening time, which was 9:30am local time.
The values are the price (in US dollars) of one share of Apple stock at that time.
So if the stock cost $500 at 10:30am, that means stockPrices[60] = 500.

Write an efficient function that takes stockPrices and returns the best profit I could have made from one purchase and one sale of one share of Apple stock yesterday.

*/
const stockPrices = [10, 7, 5, 8, 11, 9];

function getMaxProfit(stockPrices) {
  let maxProfit = 0;

  // Go through every price and time
  for (let earlierTime = 0; earlierTime < stockPrices.length; earlierTime++) {
    const earlierPrice = stockPrices[earlierTime];

    // And go through all the LATER prices
    for (let laterTime = earlierTime + 1; laterTime < stockPrices.length; laterTime++) {
      const laterPrice = stockPrices[laterTime];

      // See what our profit would be if we bought at the
      // min price and sold at the current price
      const potentialProfit = laterPrice - earlierPrice;

      // Update maxProfit if we can do better
      maxProfit = Math.max(maxProfit, potentialProfit);
    }
  }

  return maxProfit;
}