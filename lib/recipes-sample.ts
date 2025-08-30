// Simple sample data to render a single recipe detail page

export type Macro = {
  label: "Carbs" | "Fat" | "Protein"
  grams: number
  percent: number
  color: string
}

export type RecipeDetail = {
  slug: string
  title: string
  serves: number
  tags: string[]
  heroImage: string
  description?: string
  makes?: string
  nutrition: {
    calories: number
    macros: Macro[]
  }
  ingredients: string[]
  instructions: string[]
}

export const sampleRecipe: RecipeDetail = {
  slug: "shawarma-spiced-chickpea-bowls",
  title: "Shawarma-Spiced Chickpea Bowls",
  serves: 2,
  makes: "Makes: 2 bowls",
  tags: ["Dinner", "Lunch", "Vegetarian", "Gluten-free"],
  heroImage: "/images/recipe-hero.png",
  description:
    "Spiced, crispy chickpeas over rice or greens with cool cucumber-tomato salad and tangy yogurt. A quick, satisfying bowl with pantry spices.",
  nutrition: {
    calories: 444,
    macros: [
      { label: "Carbs", percent: 39, grams: 46.3, color: "#14b8a6" }, // teal-500
      { label: "Fat", percent: 43, grams: 22.6, color: "#7c3aed" }, // violet-600 (accent), used sparingly
      { label: "Protein", percent: 17, grams: 20.5, color: "#f59e0b" }, // amber-500
    ],
  },
  ingredients: [
    "1 tablespoon olive oil",
    "1/2 teaspoon ground cumin",
    "1/2 teaspoon garlic powder",
    "1/4 teaspoon ground turmeric",
    "1/4 teaspoon smoked paprika",
    "1 can (15 oz) chickpeas, drained and rinsed",
    "1/2 teaspoon kosher salt",
    "1/4 teaspoon black pepper",
    "1 cup cucumber, diced",
    "1 cup tomato, diced",
    "1/2 cup plain yogurt (or dairy-free alternative)",
    "1 tablespoon lemon juice",
    "Cooked rice or greens, for serving",
  ],
  instructions: [
    "Pat chickpeas dry. Toss with olive oil, cumin, garlic powder, turmeric, paprika, salt, and pepper.",
    "Roast on a sheet pan at 425°F (220°C) for 18–22 minutes, shaking once, until crisp.",
    "Combine cucumber and tomato with a pinch of salt and lemon juice; set aside.",
    "Stir lemon juice into yogurt; season to taste.",
    "Serve bowls over warm rice or greens. Top with crispy chickpeas, salad, and dollops of lemon yogurt.",
  ],
}
