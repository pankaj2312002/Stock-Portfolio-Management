"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronRight, Home, LineChart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Explore",
    href: "/dashboard/explore",
    icon: Home,
  },
  {
    title: "Investment",
    href: "/dashboard/investment",
    icon: LineChart,
  },
  {
    title: "IPO",
    href: "/dashboard/ipo",
    icon: TrendingUp,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r md:block">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="flex flex-col gap-4 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Markets</h2>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col gap-1 rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Nifty 50</span>
                  <span className="text-sm font-medium">16,538.45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">NSE</span>
                  <span className="text-xs text-red-500">-78.00 (-0.49%)</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">BSE Sensex</span>
                  <span className="text-sm font-medium">57,578.76</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">BSE</span>
                  <span className="text-xs text-red-500">-273.51 (-0.52%)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

