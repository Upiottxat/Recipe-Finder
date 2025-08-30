"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bookmark, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TagPill } from "@/components/recipes/tag-pill"
import { useEffect, useState } from "react"
import { useCooking } from "@/hooks/useCooking"
import { useParams } from "next/navigation"
import { Recipe } from "@/lib/recipes"

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>()
  const { GetRecipe,recipe, Loading } = useCooking()


useEffect(() => {

    if (params.id) {
      GetRecipe(params.id); 
    }
  }, [params.id]);
  return (
    <main className="mx-auto w-full  px-4 pb-12 pt-4 lg:pt-8 bg-black text-white">
      {/* Top navigation/back */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
          aria-label="Back to list"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Content */}
      {Loading && <div>Loading...</div>}
      {!Loading && recipe ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          {/* Left column */}
          <section>
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
              <Image
                src={recipe.thumbnail || "/placeholder.svg?height=720&width=1280&query=recipe%20video"}
                alt={`${recipe.title} hero`}
                fill
                className="object-cover opacity-90"
                priority
              />
            </div>

            <div className="mt-5">
              <h1 className="text-pretty text-2xl font-semibold md:text-3xl">{recipe.title}</h1>

              {/* Tags */}
              {recipe.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {recipe.tags.map((t) => (
                    <TagPill key={t} variant="dark" size="sm">
                      {t}
                    </TagPill>
                  ))}
                </div>
              ) : null}

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-blue-600 text-white hover:bg-blue-500">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Lesson
                </Button>
                <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
                  Class Guide
                </Button>
                <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Bookmark
                </Button>
              </div>
            </div>
          </section>

          {/* Right column */}
          <aside className="lg:sticky lg:top-8">
            <Card className="overflow-hidden bg-white text-zinc-900">
              <div className="relative h-40 w-full">
                <Image
                  src={recipe.thumbnail || "/placeholder.svg?height=160&width=640&query=recipe%20closeup"}
                  alt={`${recipe.title} closeup`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold md:text-xl">{recipe.title}</h2>

                <Tabs defaultValue="ingredients" className="mt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="ingredients" className="mt-4">
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-800">
                      {recipe.ingredients.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="instructions" className="mt-4">
                    <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-800">
                      {recipe.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </TabsContent>
                </Tabs>

                {/* Bottom toolbar */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <Button variant="secondary" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="secondary" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="secondary" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      ) : null}
    </main>
  )
}
