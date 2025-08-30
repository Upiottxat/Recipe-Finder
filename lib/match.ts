import type { Recipe } from "./recipes"

const SYNONYMS: Record<string, string[]> = {
  scallion: ["green onion", "spring onion"],
  cilantro: ["coriander"],
  chili: ["chilli", "chile", "red pepper flakes", "chili flakes"],
  oil: ["vegetable oil", "canola oil", "olive oil"],
  tomato: ["tinned tomato", "tomato sauce"],
  onion: ["yellow onion", "red onion", "white onion"],
  pepper: ["black pepper"],
  egg: ["eggs"],
  rice: ["cooked rice", "leftover rice"],
  garlic: ["garlic clove", "garlic cloves"],
}

export type ScoredRecipe = {
  recipe: Recipe
  score: number 
  matched: string[]
  missing:string []
}

function normalize(s: string) {
  return s.toLowerCase().trim()
}

function expandUserIngredients(userIngredients: string[]): Set<string> {
  const set = new Set<string>()
  for (const raw of userIngredients) {
    const key = normalize(raw)
    set.add(key)
    for (const [canonical, alts] of Object.entries(SYNONYMS)) {
      if (key === canonical || alts.includes(key)) {
        set.add(canonical)
        for (const alt of alts) set.add(alt)
      }
    }
  }
  return set
}

export function scoreRecipeMatches(recipe: Recipe, userIngredients: string[]): ScoredRecipe {
  const userSet = expandUserIngredients(userIngredients);
  const ing = recipe.ingredients.map(normalize);
  const matched: string[] = [];
  const missing: string[] = [];

  // Case: no user ingredients given
  if (userIngredients.length === 0) {
    return {
      recipe,
      score: 1000, // special score
      matched: [],
      missing: [],
    };
  }

  // Iterate through all ingredients
  for (const item of ing) {
    const candidates = new Set([item, ...(SYNONYMS[item] ?? [])]);
    const hit = Array.from(candidates).some((c) => userSet.has(c));

    if (hit) matched.push(item);
    else missing.push(item);
  }

  // Score = matched / total
  const score = ing.length ? matched.length / ing.length : 0;

  return {
    recipe,
    score,
    matched,
    missing,
  };
}

