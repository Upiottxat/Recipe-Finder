import { NextRequest } from "next/server";
import { transformMealDBResponse } from "../utils";
export type Recipe = {
  id: string
  title: string
  ingredients: string[]
  steps: string[]
  tags: string[] // e.g., vegan, vegetarian, spicy, dessert
  time: number // minutes
  nutrition: { calories: number; protein: number; carbs: number }
  thumbnail: string
}



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ingredient } = body;

    if (!ingredient) {
      return Response.json(
        { error: "Ingredient is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch from TheMealDB");
    }

    const data = await res.json();


    const recipes = transformMealDBResponse(data);

    return Response.json(
     { status: 200, recipes },
  { status: 200 }
    );
  } catch (error) {
    console.error("POST /api error:", error);
    return Response.json(
       { status: 500, error: "Internal server error" },
  { status: 500 }
    );
  }
}