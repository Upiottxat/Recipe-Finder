"use client"
import type { Recipe } from "@/lib/recipes";
import { useState } from "react";

type IngredientRecipe = {
  status: number;
  recipe: [Recipe];
};

export const useCooking = () => {
  const [Loading, setLoading] = useState(false);
  const [recipe, setRecipeData] = useState<Recipe | null>(null);

  const GetRecipe = async (id: string) => {
    console.log("GetRecipe called with id:", id);
    setLoading(true);
    try {
      const res = await fetch(`/api/GetIndividualRecipe?id=${id}`);
      const data: IngredientRecipe = await res.json();
      console.log(data);
      
      if (data.status === 200) {
        console.log("Fetched recipe from API:", data.recipe[0]);
        setRecipeData(data.recipe[0]);
        return data.recipe; // return fresh data
      } else {
        console.warn("⚠️ No recipes found or error occurred");
        return null;
      }
    } catch (error) {
      console.error("Internal server error", error);
      alert("Internal server error");
      return null;
    } finally {
      setLoading(false);
      console.log("log the final data"+JSON.stringify(recipe));
      
    }
  };

  return { GetRecipe, recipe, Loading };
};
