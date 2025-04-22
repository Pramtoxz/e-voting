import React from "react"
import { Link } from "@inertiajs/react"
import { Flag } from "lucide-react"
import logoJayanusa from "@/assets/jnputih.png"

interface MainLayoutProps {
  children: React.ReactNode
  title: string
}

export default function MainLayout({ children }: MainLayoutProps) {

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-red-700 text-white backdrop-blur supports-[backdrop-filter]:bg-red-700/95">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="relative w-12 h-12">
              <div
                className="absolute inset-0 "
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
              ></div>
              <div
                className="absolute inset-0 bg-red-700"
                style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
              ></div>
              <div className="absolute inset-0 m-1 flex items-center justify-center">
                <div className="w-full flex items-center justify-center">
                  <img src={logoJayanusa} alt="Jayanusa" className="h-24 w-auto object-contain" />
                </div>
              </div>
            </div>
            <span>PEMIRA 2025</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#beranda" className="text-sm font-medium transition-colors hover:text-white hover:underline">
              Beranda
            </Link>
            <Link href="#tentang" className="text-sm font-medium transition-colors hover:text-white hover:underline">
              Tentang
            </Link>
            <Link href="#kandidat" className="text-sm font-medium transition-colors hover:text-white hover:underline">
              Kandidat
            </Link>
          
            <Link href="#faq" className="text-sm font-medium transition-colors hover:text-white hover:underline">
              FAQ
            </Link>
          </nav>
          
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="w-full border-t bg-red-700 text-white py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Flag className="h-5 w-5" />
            <span>PEMIRA 2025</span>
          </div>
         
          <div className="flex gap-4 text-sm text-red-100">
            <Link href="#" className="hover:underline">
              Kontak
            </Link>
            <Link href="#" className="hover:underline">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="hover:underline">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
        <div className="container mt-4 text-center text-xs text-red-100">
          &copy; {new Date().getFullYear()} Created by Rafi Chandra & Pramudito Metra.
        </div>
      </footer>
    </div>
  )
}
