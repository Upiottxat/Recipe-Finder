"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, Plus, X } from "lucide-react"

type Props = {
  value: string[]
  onChange: (next: string[]) => void
}

export default function IngredientInput({ value, onChange }: Props) {
  const [draft, setDraft] = useState("")
  const recRef = useRef<any>(null)

  function addItem(text: string) {
    const parts = text
      .split(/[,\n]/g)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
    if (!parts.length) return
    const next = Array.from(new Set([...value, ...parts]))
    onChange(next)
    setDraft("")
  }

  function removeItem(item: string) {
    onChange(value.filter((v) => v !== item))
  }

  function startVoice() {
    try {
      const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SR) {
        alert("Voice input not supported in this browser.")
        return
      }
      const rec = new SR()
      recRef.current = rec
      rec.lang = "en-US"
      rec.interimResults = false
      rec.onresult = (e: any) => {
        const transcript = e.results?.[0]?.[0]?.transcript || ""
        if (transcript) addItem(transcript)
      }
      rec.onerror = () => {}
      rec.onend = () => {}
      rec.start()
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    return () => {
      recRef.current?.stop?.()
    }
  }, [])

  return (
    <div className="rounded-lg border bg-card p-4">
      <label className="sr-only" htmlFor="ingredient-input">
        Add ingredients
      </label>
      <div className="flex items-center gap-2">
        <Input
          id="ingredient-input"
          placeholder="e.g., eggs, onion, tomato, rice"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addItem(draft)
            }
          }}
        />
        <Button onClick={() => addItem(draft)} aria-label="Add ingredient">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
        {/* <Button variant="outline" onClick={startVoice} aria-label="Voice input">
          <Mic className="mr-2 h-4 w-4" />
          Voice
        </Button> */}
      </div>

      {value.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((item) => (
            <Badge key={item} variant="secondary" className="flex items-center gap-1">
              {item}
              <button
                aria-label={`Remove ${item}`}
                className="ml-1 rounded p-0.5 hover:bg-muted"
                onClick={() => removeItem(item)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-2 text-sm">Tip: separate multiple items with commas.</p>
      )}
    </div>
  )
}
