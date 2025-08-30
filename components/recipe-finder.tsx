"use client"
import { useEffect, useMemo, useState } from "react"
import IngredientInput from "./ui/ingredient-input"
import FilterBar, { type Filters } from "./ui/filter-bar"
import RecipeList from "./ui/recipe-list"
import { ScoredRecipe, scoreRecipeMatches } from "@/lib/match"
import { Button } from "@/components/ui/button"
import { useRecipe } from "@/hooks/useRecipe"
import { setEngine } from "crypto"
import { Recipe } from "@/lib/recipes"

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [filters, setFilters] = useState<Filters>({ vegetarian: false, vegan: false, spicy: false, quick: false })
  const {recipesData,loading,findByIngredents}=useRecipe();
  useEffect(()=>{
   console.log("inside the component "+recipesData)

  },[recipesData])
  const [results,setResult] = useState<ScoredRecipe[] | null>(null);
  const sortAndFilter=(data:Recipe[])=>{
      // const filtered = RECIPES.filter((r) => {
    //   if (filters.vegan && !r.tags.includes("vegan")) return false
    //   if (filters.vegetarian && !r.tags.includes("vegetarian")) return false
    //   if (filters.spicy && !r.tags.includes("spicy")) return false
    //   if (filters.quick && r.time > 25) return false
    //   return true
    // })

      const scored = data.map((r) => scoreRecipeMatches(r, ingredients))
      return scored.sort((a, b) => b.score - a.score)
  
  
  }
 
  useEffect(()=>{
   if(ingredients.length>0) findByIngredents(ingredients);
  },[ingredients])
 useEffect(()=>{
  if(recipesData)setResult(sortAndFilter(recipesData));
  },[recipesData])
  const handleClear = () => setIngredients([])

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4">
        <IngredientInput value={ingredients} onChange={setIngredients} />
        <div className="flex items-center gap-2">
          {/* <FilterBar value={filters} onChange={setFilters} /> */}
          {/* <Button variant="secondary" onClick={handleClear} className="ml-auto">
            Clear ingredients
          </Button> */}
        </div>
      </div>
      
      {/* {Loading?<>Loading...</>:<RecipeList results={RecipesData} />} */}
      {results?<RecipeList results={results} />:<>Loading.....</>}
    </section>
  )
}
