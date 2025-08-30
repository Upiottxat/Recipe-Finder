"use client"

import RecipeCard from "./recipe-card"
import type { ScoredRecipe } from "@/lib/match"

type Props = {
  results: ScoredRecipe[]
}


export default function RecipeList({ results }: Props) {

  if (!results.length) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No results yet. Add some ingredients or adjust filters.
      </div>
    )
  }
  console.log("inside the reccipe list "+JSON.stringify(results));
  

  return (
    <div className="grid gap-4 md:grid-cols-2">
     {results.map((r, index) => (
   
  <RecipeCard key={`${r.recipe.id}-${index}`} result={r} />
))}

    </div>
  )
}
