"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export type Filters = {
  vegetarian: boolean
  vegan: boolean
  spicy: boolean
  quick: boolean
}

type Props = {
  value: Filters
  onChange: (next: Filters) => void
}

export default function FilterBar({ value, onChange }: Props) {
  function toggle(key: keyof Filters) {
    onChange({ ...value, [key]: !value[key] })
  }

  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg border bg-card p-3 md:flex md:flex-wrap md:items-center">
      <div className="flex items-center gap-2">
        <Switch id="vegan" checked={value.vegan} onCheckedChange={() => toggle("vegan")} />
        <Label htmlFor="vegan">Vegan</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="vegetarian" checked={value.vegetarian} onCheckedChange={() => toggle("vegetarian")} />
        <Label htmlFor="vegetarian">Vegetarian</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="spicy" checked={value.spicy} onCheckedChange={() => toggle("spicy")} />
        <Label htmlFor="spicy">Spicy</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="quick" checked={value.quick} onCheckedChange={() => toggle("quick")} />
        <Label htmlFor="quick">Quick (&lt; 25 min)</Label>
      </div>
    </div>
  )
}
