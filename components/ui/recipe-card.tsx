"use client"

import { useState } from "react"
import type { ScoredRecipe } from "@/lib/match"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CookingMode from "./recipes/cooking-mode"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
  result: ScoredRecipe
}

export default function RecipeCard({ result }: Props) {
  const { recipe, score, matched, missing } = result
  const pct = Math.round(score * 100)
  const isHigh = pct >= 80

  const shoppingList = missing
  const router =useRouter()
console.log("inside the reccipe card "+JSON.stringify(result));
  function openCooking(id: string): void {
    router.push("/recipes/"+id)
  }

  return (
<article className="rounded-lg border bg-card p-4">
  {/* Recipe Image */}
  <div className="mb-3">
  
    {recipe.thumbnail && <img src={recipe.thumbnail} alt="Recipe image"className="w-full h-48 object-cover rounded-md" />}

  </div>

  <div className="flex items-start justify-between">
    <div>
      <h3 className="text-lg font-medium">{recipe.title}</h3>
      <p className="text-muted-foreground text-sm">
        {recipe.time} min • {recipe.tags.join(" • ")}
      </p>
    </div>
    {result.score!=100000?<></>:<Badge
      variant={isHigh ? "default" : "secondary"}
      aria-label={`Match ${pct}%`}
    >
      {pct}% match
    </Badge>}
    
  </div>

  <div className="mt-3">
    <h4 className="text-sm font-medium">Ingredients</h4>
    <div className="mt-1 flex flex-wrap gap-1.5">
      {recipe.ingredients.map((ing) => {
        const have = matched.includes(ing);
        return (
          <Badge key={ing} variant={have ? "secondary" : "outline"}>
            {ing}
          </Badge>
        );
      })}
    </div>
  </div>

  {missing.length > 0 && (
    <div className="mt-3">
      <h4 className="text-sm font-medium">Missing</h4>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {missing.map((m) => (
          <Badge
            key={m}
            className="bg-amber-100 text-amber-900 hover:bg-amber-100"
          >
            {m}
          </Badge>
        ))}
      </div>
    </div>
  )}

  <div className="mt-3">
    <h4 className="text-sm font-medium">Nutrition (per serving)</h4>
    <p className="text-muted-foreground text-sm">
      {recipe.nutrition.calories} kcal • {recipe.nutrition.protein}g protein •{" "}
      {recipe.nutrition.carbs}g carbs
    </p>
  </div>

  <div className="mt-4 flex items-center gap-2">
    <Button onClick={() => openCooking(recipe.id)}>Start Cooking</Button>
    {shoppingList.length > 0 && (
      <Button
        variant="outline"
        onClick={() => downloadList(recipe.title, shoppingList)}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Shopping List
      </Button>
    )}
  </div>

  {/* <CookingMode
    open={open}
    onOpenChange={setOpen}
    title={recipe.title}
    steps={recipe.steps}
  /> */}
</article>


  )
}

function downloadList(title: string, items: string[]) {
  const blob = new Blob([`Shopping List: ${title}\n\n- ${items.join("\n- ")}`], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${slugify(title)}-shopping-list.txt`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
