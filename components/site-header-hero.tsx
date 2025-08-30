"use client"

import type React from "react"

import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSlidingImages } from "@/hooks/useHeroImages";
type Props = {
  title?: string
  subtitle?: string
  imgSrc?: string
  ctaText?: string
  onCtaClick?: () => void
  images?: string[] // optional list of background images
  intervalMs?: number // optional slide interval
}

export default function SiteHeaderHero({
  title = "Discover Delicious Recipes",
  subtitle = "Smart suggestions based on your ingredients",
  imgSrc = "/images/header-hero.jpg",
  ctaText = "Explore recipes",
  onCtaClick,
  images,
  intervalMs = 2000,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const raf = useRef<number | null>(null)

  // Determine slides: prefer explicit images, otherwise combine imgSrc with defaults
  const {slidesImgs}=useSlidingImages();
  const slides = images && images.length > 0 ? images : Array.from(new Set([imgSrc, ...slidesImgs])) // ensure 4-5 images, de-dup if imgSrc is in defaults

  const [current, setCurrent] = useState(0)

  // Preload slides
  useEffect(() => {
    if (typeof window !== "undefined") {
      slides.forEach((src) => {
        const i = new window.Image()
        i.src = src
      })
    }
  }, [slides])

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(
      () => {
        setCurrent((c) => (c + 1) % slides.length)
      },
      Math.max(1200, intervalMs),
    ) // guard too-fast values
    return () => clearInterval(id)
  }, [slides.length, intervalMs])

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => setPos({ x, y }))
  }, [])

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <header
      ref={ref}
      onMouseMove={handleMove}
      className="group relative isolate overflow-hidden rounded-xl border bg-background shadow-sm"
    >
      <div className="relative h-52 w-full sm:h-64 md:h-80 lg:h-[22rem]">
        {/* Crossfade slides */}
        {slides.map((src, idx) => (
          <NextImage
            key={src}
            src={src || "/placeholder.svg?height=400&width=1200&query=food%20hero"}
            alt=""
            aria-hidden="true"
            fill
            priority={idx === 0}
            sizes="100vw"
            className={`absolute inset-0 object-cover transition-opacity duration-700 ease-in-out ${idx === current ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* Darken for readability */}
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl ring-1 ring-white/20 mix-blend-soft-light transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"
          style={{
            left: pos?.x ?? "50%",
            top: pos?.y ?? "50%",
            width: "18rem",
            height: "18rem",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-end sm:items-center">
          <div className="flex w-full flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-end sm:gap-6 sm:p-6">
            <div className="max-w-xl text-white">
              <h1 className="text-pretty text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">{title}</h1>
              <p className="mt-1 text-sm leading-6 opacity-90 sm:text-base">{subtitle}</p>
            </div>
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => onCtaClick?.()}>
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
