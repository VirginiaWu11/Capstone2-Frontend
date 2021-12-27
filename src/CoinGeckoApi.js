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
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a coin by id. */
  static async getCoin(id) {
    let res = await this.request(`coins/${id}`);
    console.debug("CoinGeckoApi getCoin", res);
    return res;
  }

  /** Get top-100 coins by market cap. */
  static async getCoins(page = 1) {
    let res = await this.request(`coins/markets`, {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page: page,
      sparkline: false,
    });
    console.debug("CoinGeckoApi getCoins", res);
    return res;
  }

  /** Get top-7 trending coins. */
  static async getTrendingCoins() {
    let res = await this.request(`search/trending`);
    return res;
  }
}

export default CoinGeckoApi;
