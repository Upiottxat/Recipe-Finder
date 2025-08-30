"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  steps: string[]
}

export default function CookingMode({ open, onOpenChange, title, steps }: Props) {
  const [idx, setIdx] = useState(0)
  const total = steps.length
  const atStart = idx === 0
  const atEnd = idx === total - 1

  const goPrev = () => setIdx((i) => Math.max(0, i - 1))
  const goNext = () => setIdx((i) => Math.min(total - 1, i + 1))

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) setIdx(0)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-pretty">{title} — Cooking Mode</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <p className="text-muted-foreground mb-1 text-sm">
            Step {idx + 1} of {total}
          </p>
          <p className="text-base leading-relaxed">{steps[idx]}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button variant="outline" onClick={goPrev} disabled={atStart}>
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {!atEnd ? (
              <Button onClick={goNext}>Next</Button>
            ) : (
              <Button onClick={() => onOpenChange(false)}>Finish</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
