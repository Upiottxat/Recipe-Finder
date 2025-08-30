import { NextRequest } from "next/server";
import { transformMealDBResponse } from "../utils";
export type Recipe = {
  id: string
  title: string
  ingredients: string[]
  steps: string[]
  tags: string[]
  time: number // minutes
  nutrition: { calories: number; protein: number; carbs: number }
  thumbnail: string
}

type MealDBResponse = {
  meals: any[]
}




export async function GET(req: NextRequest) {
  try {
    const urls = Array(7).fill("https://www.themealdb.com/api/json/v1/1/random.php");

    // send 7 requests in parallel
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const jsonData = await Promise.all(responses.map(res => res.json()));

    // transform each meal and flatten results
    const recipes = jsonData.flatMap(data => transformMealDBResponse(data));

    return Response.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
