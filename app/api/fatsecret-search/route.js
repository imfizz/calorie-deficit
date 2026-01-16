import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import axios from "axios";

const oauth = OAuth({
  consumer: {
    key: process.env.FATSECRET_CONSUMER_KEY,
    secret: process.env.FATSECRET_CONSUMER_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  },
});

const baseUrl = "https://platform.fatsecret.com/rest/server.api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  const requestData = {
    url: baseUrl,
    method: "GET",
    data: {
      method: "foods.search",
      search_expression: query,
      format: "json",
    },
  };

  const headers = oauth.toHeader(oauth.authorize(requestData));

  try {
    const response = await axios.get(baseUrl, {
      params: requestData.data,
      headers,
    });

    return new Response(JSON.stringify(response.data.foods.food), { status: 200 });
  } catch (err) {
    console.error("FatSecret search error:", err.message);
    return new Response(JSON.stringify({ error: "Search failed" }), { status: 500 });
  }
}