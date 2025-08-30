"use client"

import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/recipes-sample"
import Image from "next/image"

export function VideoHero({ recipe }: { recipe: Recipe }) {
  return (
    <section>
      <div className="relative w-full aspect-video overflow-hidden rounded-md bg-black">
        {/* Use a poster-like image from public if no real video available */}
        <Image
          src={recipe.heroImage || "/placeholder.svg?height=720&width=1280&query=recipe%20video"}
          alt={`${recipe.title} video placeholder`}
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      <div className="mt-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">{recipe.title}</h1>
        {recipe.description && (
          <p className="mt-2 max-w-prose text-sm md:text-base text-zinc-300">{recipe.description}</p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button className="bg-blue-600 text-white hover:bg-blue-500">Share Lesson</Button>
          <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
            Class Guide
          </Button>
          <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
            Bookmark
          </Button>
        </div>
      </div>
    </section>
  )
}
