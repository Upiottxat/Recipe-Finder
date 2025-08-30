import RecipeFinder from "@/components/recipe-finder"
import SiteHeaderHero from "@/components/site-header-hero"

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <SiteHeaderHero
          title="Cooking "
          subtitle="Add what you have on hand—get ranked recipe matches, missing items, nutrition, and a step‑by‑step cooking mode."
          ctaText="Start exploring"
        />
      </div>

      {/* Keep original text for SEO/context, but secondary to hero */}
      <header className="mb-8">
        <h1 className="text-balance text-3xl font-semibold">What can I cook with my ingredients?</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-pretty">
         What's in your Kitchen
        </p>
      </header>
      <RecipeFinder />
    </main>
  )
}
