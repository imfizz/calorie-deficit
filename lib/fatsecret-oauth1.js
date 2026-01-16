import axios from "axios";

export const searchFood = async (query) => {
  const response = await axios.get("/api/fatsecret-search", {
    params: { q: query },
  });

  return response.data;
};