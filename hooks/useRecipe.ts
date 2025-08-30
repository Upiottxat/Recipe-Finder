"use client";

import { Recipe } from "@/lib/recipes";
import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";

// Define the type of a recipe (adjust fields based on your API response)
type IngredientRecipe={
  status :number,
  recipes:Recipe[],

}
export const useRecipe = () => {
  const [recipesData, setRecipesData] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const GetData = async (url?: string) => {
  try {
    setLoading(true);

    // if no url is passed, use default
    const fetchUrl = url ?? "/api/HomeRecipes";

    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error("Failed to fetch recipes");

    const data: Recipe[] = await res.json();

   
    setRecipesData(data);
  } catch (error) {
    console.error("Internal server error", error);
    alert("Internal server error");
  } finally {
    setLoading(false);
  }
};

const findByIngredents = async (ingredients: string[]) => {
  if (ingredients.length === 0) return;

  const ingredientStr = ingredients.join(",");
  try {
    setLoading(true);

    const res = await fetch("/api/RecipeByINgredents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredient: ingredientStr }),
    });

    const data: IngredientRecipe = await res.json();
   

    if (data.status === 200) {
      setRecipesData(data.recipes);
      console.log("✅ Recipes updated");
    } else {
      console.warn("⚠️ No recipes found or error occurred");
    }
  } catch (error) {
    console.error("Internal server error", error);
  } finally {
    setLoading(false);
  }
};




  useEffect(() => {
    GetData();
  }, []);

  return { recipesData, loading,findByIngredents };
};
