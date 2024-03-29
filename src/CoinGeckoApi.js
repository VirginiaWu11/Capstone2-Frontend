import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

class CoinGeckoApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("Coin Gecko API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.debug("API Error:", err);
      console.error("API Error:", err);
      throw Array.isArray(err) ? err : [err];
    }
  }

  // Individual API routes

  /** Get details on a coin by id. */
  static async getCoin(id) {
    let res = await this.request(`coins/${id}`);
    console.debug("CoinGeckoApi getCoin", res);
    return res;
  }

  /** Get paginated coins by market cap. */
  static async getCoins(
    page = 1,
    itemsPerPage = 20,
    ids = undefined,
    sparkline = false
  ) {
    const requestObj = {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: itemsPerPage,
      page: page,
      sparkline: sparkline,
      // ids: "bitcoin,tether",
    };
    if (ids) {
      requestObj["ids"] = ids.join(",");
    }
    let res = await this.request(`coins/markets`, requestObj);
    return res;
  }

  static async getCoinMarketChart(id, days) {
    let res = await this.request(`coins/${id}/market_chart`, {
      vs_currency: "usd",
      days: days,
    });
    console.debug("CoinGeckoApi getCoinMarketChart", res);
    return res;
  }

  /** Get top-7 trending coins. */
  static async getTrendingCoins() {
    let res = await this.request(`search/trending`);
    return res;
  }
}

export default CoinGeckoApi;
