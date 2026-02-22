import { cn } from "@/lib/utils"

type GlowPosition = "top" | "right" | "left"

const positionClasses: Record<GlowPosition, string> = {
  top: "-top-52 left-1/2 -translate-x-1/2 h-[600px] w-[600px]",
  right: "top-1/2 -right-32 -translate-y-1/2 h-[450px] w-[450px]",
  left: "top-1/2 -left-32 -translate-y-1/2 h-[450px] w-[450px]",
}

export function SectionGlow({ position }: { position: GlowPosition }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full bg-primary/12 blur-3xl animate-pulse-glow",
        positionClasses[position]
      )}
    />
  )
}
