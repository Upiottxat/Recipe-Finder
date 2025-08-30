export type Recipe = {
  id: string
  title: string
  ingredients: string[]
  steps: string[]
  tags: string[] // e.g., vegan, vegetarian, spicy, dessert
  time: number // minutes
  nutrition: { calories: number; protein: number; carbs: number }
  thumbnail: string,

}