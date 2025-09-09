import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { About } from "@/components/sections/About"
import { Technologies } from "@/components/sections/Technologies"
import { CTA } from "@/components/sections/CTA"
import type { JSX } from "react"

export function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Technologies />
      <CTA />
    </>
  )
}
