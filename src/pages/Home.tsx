import React from 'react'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Technologies } from '@/components/sections/Technologies'
import { Testimonials } from '@/components/sections/Testimonials'

export function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Technologies />
      <Testimonials />
    </div>
  )
}