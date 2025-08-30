"use client"

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

type Macro = { label: string; percent: number; color: string }

export function NutritionRing({
  calories,
  macros,
}: {
  calories: number
  macros: Macro[]
}) {
  // Recharts expects numeric values as "value"
  const data = macros.map((m) => ({ name: m.label, value: m.percent, color: m.color }))
  const total = data.reduce((s, d) => s + d.value, 0) || 1

  return (
    <div className="relative h-32 w-32">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={58}
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-semibold leading-none">{calories}</div>
        <div className="text-xs text-muted-foreground">cal</div>
      </div>
    </div>
  )
}
