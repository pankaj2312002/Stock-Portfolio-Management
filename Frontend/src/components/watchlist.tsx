"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowDown, ArrowUp, ChevronDown, Loader2, Plus, Search, X } from "lucide-react"
import { getGlobalQuote, searchSymbol } from "@/lib/alpha-vantage"
import { toast } from "sonner"

type WatchlistItem = {
  name: string
  symbol: string
  exchange: string
  price: string
  change: string
  changePercent: string
  direction: "up" | "down" | "neutral"
}

export function Watchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)

  // Default watchlist symbols
  const defaultSymbols = ["RELIANCE.BSE", "TCS.BSE", "HDFCBANK.BSE"]

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        setLoading(true)
        const watchlistData: WatchlistItem[] = []

        for (const symbol of defaultSymbols) {
          try {
            const response = await getGlobalQuote(symbol)
            const quote = response["Global Quote"]

            if (quote) {
              const price = Number.parseFloat(quote["05. price"]).toFixed(2)
              const change = Number.parseFloat(quote["09. change"]).toFixed(2)
              const changePercent = quote["10. change percent"].trim()
              const direction =
                Number.parseFloat(change) > 0 ? "up" : Number.parseFloat(change) < 0 ? "down" : "neutral"

              // Extract name from symbol (simplified)
              const name = symbol.split(".")[0]

              watchlistData.push({
                name,
                symbol,
                exchange: symbol.includes(".BSE") ? "BSE" : "NSE",
                price: `₹${price}`,
                change: `₹${change}`,
                changePercent,
                direction,
              })
            }
          } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error)
          }
        }

        setWatchlist(watchlistData)
      } catch (error) {
        console.error("Error fetching watchlist:", error)
        toast.error("Failed to load watchlist")

        // Fallback data
        setWatchlist([
          {
            name: "RELIANCE",
            symbol: "RELIANCE.BSE",
            exchange: "BSE",
            price: "₹2,547.95",
            change: "₹21.60",
            changePercent: "+0.85%",
            direction: "up",
          },
          {
            name: "TCS",
            symbol: "TCS.BSE",
            exchange: "BSE",
            price: "₹3,680.35",
            change: "-₹45.10",
            changePercent: "-1.21%",
            direction: "down",
          },
          {
            name: "HDFC BANK",
            symbol: "HDFCBANK.BSE",
            exchange: "BSE",
            price: "₹1,680.75",
            change: "+₹12.45",
            changePercent: "+0.74%",
            direction: "up",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlistData()
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      setSearching(true)
      const response = await searchSymbol(searchQuery)

      if (response.bestMatches && response.bestMatches.length > 0) {
        setSearchResults(response.bestMatches)
      } else {
        setSearchResults([])
        toast.info("No results found", {
          description: `No stocks found matching "${searchQuery}"`,
        })
      }
    } catch (error) {
      console.error("Error searching symbols:", error)
      toast.error("Failed to search stocks")
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  const addToWatchlist = async (result: any) => {
    try {
      const symbol = result["1. symbol"]

      // Check if already in watchlist
      if (watchlist.some((item) => item.symbol === symbol)) {
        toast.info("Already in watchlist", {
          description: `${result["2. name"]} is already in your watchlist`,
        })
        return
      }

      const response = await getGlobalQuote(symbol)
      const quote = response["Global Quote"]

      if (quote) {
        const price = Number.parseFloat(quote["05. price"]).toFixed(2)
        const change = Number.parseFloat(quote["09. change"]).toFixed(2)
        const changePercent = quote["10. change percent"].trim()
        const direction = Number.parseFloat(change) > 0 ? "up" : Number.parseFloat(change) < 0 ? "down" : "neutral"

        const newItem: WatchlistItem = {
          name: result["2. name"],
          symbol,
          exchange: result["4. region"],
          price: `₹${price}`,
          change: `₹${change}`,
          changePercent,
          direction,
        }

        setWatchlist((prev) => [newItem, ...prev])
        setSearchResults([])
        setSearchQuery("")

        toast.success("Added to watchlist", {
          description: `${result["2. name"]} has been added to your watchlist`,
        })
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error)
      toast.error("Failed to add to watchlist")
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol))
    toast.success("Removed from watchlist")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">My Watchlist</CardTitle>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {watchlist.length}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Stock"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button size="sm" onClick={handleSearch} disabled={searching}>
            {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="mb-4 max-h-[200px] overflow-y-auto rounded-md border p-2">
            <h4 className="mb-2 text-sm font-medium">Search Results</h4>
            <div className="space-y-2">
              {searchResults.map((result) => (
                <div key={result["1. symbol"]} className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <div className="font-medium">{result["2. name"]}</div>
                    <div className="text-xs text-muted-foreground">
                      {result["1. symbol"]} | {result["4. region"]}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => addToWatchlist(result)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {loading ? (
            <div className="flex h-[200px] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : watchlist.length > 0 ? (
            watchlist.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between rounded-md border p-2">
                <div>
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-xs text-muted-foreground">{stock.exchange}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-medium">{stock.price}</div>
                    <div
                      className={`flex items-center justify-end gap-1 text-xs ${
                        stock.direction === "up"
                          ? "text-green-500"
                          : stock.direction === "down"
                            ? "text-red-500"
                            : "text-muted-foreground"
                      }`}
                    >
                      {stock.direction === "up" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : stock.direction === "down" ? (
                        <ArrowDown className="h-3 w-3" />
                      ) : null}
                      <span>{stock.changePercent}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromWatchlist(stock.symbol)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-[200px] items-center justify-center text-muted-foreground">
              Your watchlist is empty
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

