import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class. */

class BackendApi {
  // token stored to interact with the backend API.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${BackendApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.msg;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Log in. */
  static async signin(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  /** Sign up. */
  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async get_user_watchlist() {
    let res = await this.request(`watchlist`);
    return res.pins;
  }

  static async pin(coin_gecko_id) {
    await this.request(`users/pin/${coin_gecko_id}`, {}, "post");
    return;
  }

  static async unpin(coin_gecko_id) {
    await this.request(`users/unpin/${coin_gecko_id}`, {}, "post");
    return;
  }

  static async get_user_portfolio() {
    let res = await this.request(`portfolio`);
    console.debug("*******11111", res);
    return res.assets;
  }

  static async addAssets(coin_gecko_id, quantity) {
    await this.request(
      `users/addasset/${coin_gecko_id}/${quantity}`,
      {},
      "post"
    );
    return;
  }

  static async removeAssets(coin_gecko_id) {
    await this.request(`users/removeasset/${coin_gecko_id}`, {}, "post");
    return;
  }

  static async search(searchTerm) {
    let res = await this.request(`coins/search`, { search: searchTerm }, "get");
    return res.coins;
  }
}

export default BackendApi;
