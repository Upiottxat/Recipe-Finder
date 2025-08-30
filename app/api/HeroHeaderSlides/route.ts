// app/api/slidingImages/route.ts
import { log } from "console";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const slidingImageData = new Set<string>();
    slidingImageData.add("/images/header-hero.jpg");
    for (let i = 0; i < 4; i++) {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await res.json();
      
      slidingImageData.add(data.meals[0].strMealThumb);

    }
    console.log(slidingImageData);
    

    return Response.json(Array.from(slidingImageData));
  } catch (error) {
    console.log(error);
    
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
