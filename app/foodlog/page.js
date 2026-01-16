"use client";

import { useState } from "react";
import { searchFood } from "../../lib/fatsecret-oauth1";

export default function FoodLogPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const foods = await searchFood(query);
      setResults(foods || []);
    } catch (err) {
      console.error("Food search error:", err);
    }
  };

  return (
    <div>
      <h2>Food Log (OAuth 1.0)</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search food..."
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((food) => (
          <div key={food.food_id}>
            <p>{food.food_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}