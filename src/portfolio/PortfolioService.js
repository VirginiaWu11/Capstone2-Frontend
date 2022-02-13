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
      coin.sparkline_in_7d.price.reverse()[hours] * portfolioCoinsObj[coin.id];
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

export const addDateToData = (data, coins, portfolioCoinsObj) => {
  let currentTotalValue = currentTotalPortfolioValue(coins, portfolioCoinsObj);
  let d = new Date();
  data.reverse();
  data = data.map((el, i) => {
    d.setHours(d.getHours() - 1);
    return [d.getTime(), el];
  });
  data.reverse();
  data.push([new Date(), currentTotalValue]);
  return data;
};

export const portfolioDonutData = (coins, portfolioCoinsObj) => {
  let resultsObj = [];
  let threeDataPoints = [];
  let otherVal;
  for (let coin of coins) {
    const obj = {};
    obj["id"] = coin.id;
    obj["logo"] = coin.image;
    obj["name"] = coin.name;
    obj["currentPrice"] = coin.current_price;
    obj["quantity"] = portfolioCoinsObj[coin.id];
    obj["value"] = portfolioCoinsObj[coin.id] * coin.current_price;
    resultsObj.push(obj);
  }
  resultsObj.sort(dynamicSort("value"));
  console.debug("resultsObj", resultsObj);
  threeDataPoints.push(resultsObj[0], resultsObj[1]);
  otherVal = resultsObj
    .slice(2)
    .reduce((acc, nextVal) => acc + nextVal.value, 0);
  threeDataPoints.push({
    name: "other",
    id: "other",
    value: otherVal,
    logo: "https://cdn.icon-icons.com/icons2/1570/PNG/512/3507738-account-balance-cash-iconoteka-money-payment-wallet_107677.png",
  });
  return threeDataPoints;
};
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
