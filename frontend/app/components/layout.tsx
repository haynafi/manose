'use client'

import Header from './header'
import Footer from './footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
