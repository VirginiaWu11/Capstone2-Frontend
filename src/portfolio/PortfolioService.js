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

export const portfolioCoinData = (coins, portfolioCoinsObj) => {
  let data = new Array(coins[0].sparkline_in_7d.price.length).fill(0);
  for (let coin of coins) {
    data = data.map(
      (el, i) => el + coin.sparkline_in_7d.price[i] * portfolioCoinsObj[coin.id]
    );
  }
  return data;
};

export const addDateToData = (data) => {
  data = data.map((el, i) => [
    new Date().getTime() - new Date().getMinutes() * 60000 * i,
    el,
  ]);
  return data;
};
