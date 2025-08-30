import { NextRequest } from "next/server";
import { transformMealDBResponse } from "../utils";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return Response.json({ error: "id is required" }, { status: 400 });
    }

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch from TheMealDB");
    }

    const data = await res.json();
    const recipes = transformMealDBResponse(data);

return Response.json(
     { status: 200, recipe:recipes },
  { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/GetIndividualRecipe error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
