"use client"

import { useState } from "react"
import { NutritionRing } from "./nutrition-ring"

type Macro = { label: "Carbs" | "Fat" | "Protein"; grams: number; percent: number; color: string }

export function NutritionSection({
  calories,
  macros,
}: {
  calories: number
  macros: Macro[]
}) {
  const [open, setOpen] = useState(true)

  return (
    <section aria-labelledby="nutrition-heading" className="space-y-4">
      <h2 id="nutrition-heading" className="text-lg font-semibold">
        Nutrition Per Serving
      </h2>

      <div className="flex items-center gap-6">
        <NutritionRing calories={calories} macros={macros} />
        <div className="grid flex-1 grid-cols-3 gap-2">
          {macros.map((m) => (
            <div key={m.label} className="flex flex-col items-start">
              <span className="text-sm font-medium" style={{ color: m.color }}>
                {m.percent}%
              </span>
              <span className="text-sm text-muted-foreground">{m.grams} g</span>
              <span className="text-sm">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline"
        aria-expanded={open}
      >
        {open ? "HIDE NUTRITION" : "SHOW NUTRITION"}
      </button>

      {open ? (
        <div className="rounded-xl border p-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {/* Placeholder extra rows; replace with real micronutrients if available */}
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Sodium</span>
              <span>420 mg</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Fiber</span>
              <span>8 g</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Sugar</span>
              <span>6 g</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Saturated Fat</span>
              <span>3 g</span>
            </li>
          </ul>
        </div>
      ) : null}
    </section>
  )
}
