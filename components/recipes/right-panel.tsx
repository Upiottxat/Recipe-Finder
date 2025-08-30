"use client"

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Download, Share2 } from "lucide-react"
import { TagPill } from "./tag-pill"
import type { Recipe } from "@/lib/recipes-sample"
import { cn } from "@/lib/utils"

export function RightPanel({ recipe, className }: { recipe: Recipe; className?: string }) {
  return (
    <aside className={cn("lg:sticky lg:top-10", className)}>
      <Card className="overflow-hidden bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
        {/* Top image and title */}
        <div className="relative h-40 w-full">
          <Image
            src={recipe.heroImage || "/placeholder.svg?height=160&width=640&query=recipe%20closeup"}
            alt={`${recipe.title} hero image`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <CardContent className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-white">{recipe.title}</h2>
          {recipe.makes && <p className="mt-1 text-sm text-zinc-400">{recipe.makes}</p>}

          {/* Tags */}
          {recipe.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {recipe.tags.map((t) => (
                <TagPill key={t}>{t}</TagPill>
              ))}
            </div>
          ) : null}

          {/* Tabs */}
          <Tabs defaultValue="ingredients" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
              <TabsTrigger value="ingredients" className="data-[state=active]:bg-zinc-700">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="instructions" className="data-[state=active]:bg-zinc-700">
                Instructions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients" className="mt-4">
              <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-100">
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="instructions" className="mt-4">
              <ol className="list-decimal pl-5 space-y-3 text-sm text-zinc-100">
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
