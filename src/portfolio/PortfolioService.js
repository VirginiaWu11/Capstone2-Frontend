export const currentTotalPortfolioValue = (coins, portfolioCoinsObj) => {
  let sum = 0;
  for (let coin of coins) {
    console.debug(
      "coin.current_price",
      coins,
      coin.current_price,
      portfolioCoinsObj[coin.id],
      portfolioCoinsObj
    );
    sum += coin.current_price * portfolioCoinsObj[coin.id];
  }
  return sum;
};

export const totalCoinValue = (coin, portfolioCoinsObj) => {
  return coin.current_price * portfolioCoinsObj[coin.id];
};

export const totalPortfolioValueDifference = (
  coins,
  portfolioCoinsObj,
  hours
) => {
  let currentTotal = currentTotalPortfolioValue(coins, portfolioCoinsObj);
  let hoursAgoTotal = 0;

  for (let coin of coins) {
    console.debug(
      "hoursdif sparkline",
      hours,
      coin.sparkline_in_7d.price[hours],
      portfolioCoinsObj[coin.id],
      currentTotal,
      hoursAgoTotal
    );

    hoursAgoTotal +=
      coin.sparkline_in_7d.price[hours] * portfolioCoinsObj[coin.id];
  }
  let percentDifference =
    ((currentTotal - hoursAgoTotal) / hoursAgoTotal) * 100;
  let priceDifference = currentTotal - hoursAgoTotal;
  return { priceDifference, percentDifference };
};

export const arrayToObject = (portfolioCoins) => {
  const obj = {};
  for (let coin of portfolioCoins) {
    obj[coin.coinGeckoId] = coin.quantity;
  }
  return obj;
};
