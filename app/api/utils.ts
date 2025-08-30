import { Recipe } from "@/lib/recipes"

type MealDBResponse = {
  meals: any[] | null
}

const transformSingleMeal = (meal: any): Recipe => {
  // Extract ingredients (strIngredient1 ... strIngredient20)
  const ingredients: string[] = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure?.trim() || ""} ${ingredient.trim()}`.trim())
    }
  }

  // Extract steps
  const steps = meal.strInstructions
    ? meal.strInstructions
        .split(/[\r\n]+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)
    : []

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    ingredients,
    steps,
    tags: meal.strTags ? meal.strTags.split(",").map((t: string) => t.trim()) : [],
    time: Math.floor(Math.random() * 60) + 10, // fake prep time
    nutrition: {
      calories: Math.floor(Math.random() * 500) + 200,
      protein: Math.floor(Math.random() * 30) + 5,
      carbs: Math.floor(Math.random() * 100) + 20,
    },
    thumbnail: meal.strMealThumb,
  }
}

export const transformMealDBResponse = (response: MealDBResponse): Recipe[] => {
  if (!response.meals) return []

  // handle both single object and array
  if (Array.isArray(response.meals)) {
    return response.meals.map(transformSingleMeal)
  } else {
    return [transformSingleMeal(response.meals)]
  }
}
