"use client"

import { Button } from "@/components/ui/button"

export function BottomCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-xl px-4 pb-[env(safe-area-inset-bottom)]"
      role="region"
      aria-label="Primary action"
    >
      <div className="mb-4 rounded-xl bg-white p-3 shadow-md ring-1 ring-black/5 dark:bg-neutral-900">
        <Button className="h-12 w-full text-base" variant="default">
          LOG TO DIARY
        </Button>
      </div>
    </div>
  )
}
