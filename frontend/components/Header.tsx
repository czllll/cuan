'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()
  
  const navItems = [
    {
      label: "配置推荐",
      href: "/",
      active: pathname === "/"
    },
    {
      label: "硬件大全",
      href: "/hardware",
      active: pathname.startsWith("/hardware")
    },
    {
      label: "配置方案",
      href: "/builds",
      active: pathname.startsWith("/builds")
    }
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              <span className="text-xl font-bold">Cuan</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 py-4 text-base font-medium transition-colors
                    ${item.active 
                      ? "text-primary font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-primary after:rounded-t-full" 
                      : "text-muted-foreground hover:text-foreground hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-1 hover:after:bg-muted hover:after:rounded-t-full"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="lg" className="font-medium">
              开始组装
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}