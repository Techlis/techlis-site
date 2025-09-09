import React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { cn } from "@/lib/utils"

interface LayoutProps {
  className?: string
  children?: React.ReactNode
}

export function Layout({ className, children }: LayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children || <Outlet />}</main>
      <Footer />
    </div>
  )
}
