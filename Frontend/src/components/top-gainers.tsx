"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUp, Loader2 } from "lucide-react"
import { POPULAR_INDIAN_STOCKS, getGlobalQuote } from "@/lib/alpha-vantage"
import { toast } from "sonner"

type StockData = {
  name: string
  symbol: string
  exchange: string
  price: string
  change: string
  changePercent: string
  volume: string
}

export function TopGainers() {
  const [gainers, setGainers] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        setLoading(true)
        const stocksData: StockData[] = []

        // Fetch data for popular stocks
        for (const stock of POPULAR_INDIAN_STOCKS.slice(0, 5)) {
          try {
            const response = await getGlobalQuote(stock.symbol)
            const quote = response["Global Quote"]

            if (quote) {
              const changePercent = quote["10. change percent"].trim()
              const changeValue = Number.parseFloat(quote["09. change"])

              // Only add if it's a gainer (positive change)
              if (changeValue > 0) {
                stocksData.push({
                  name: stock.name,
                  symbol: stock.symbol,
                  exchange: stock.exchange,
                  price: `₹${Number.parseFloat(quote["05. price"]).toFixed(2)}`,
                  change: `₹${changeValue.toFixed(2)}`,
                  changePercent,
                  volume: Number.parseInt(quote["06. volume"]).toLocaleString("en-IN"),
                })
              }
            }
          } catch (error) {
            console.error(`Error fetching data for ${stock.symbol}:`, error)
          }
        }

        // Sort by change percent (descending)
        stocksData.sort((a, b) => {
          const percentA = Number.parseFloat(a.changePercent.replace("%", ""))
          const percentB = Number.parseFloat(b.changePercent.replace("%", ""))
          return percentB - percentA
        })

        setGainers(stocksData.slice(0, 3))
      } catch (error) {
        console.error("Error fetching top gainers:", error)
        toast.error("Failed to load top gainers")

        // Fallback data
        setGainers([
          {
            name: "Reliance Industries",
            symbol: "RELIANCE",
            exchange: "NSE",
            price: "₹2,456.75",
            change: "₹23.45",
            changePercent: "+0.96%",
            volume: "12,34,567",
          },
          {
            name: "HDFC Bank",
            symbol: "HDFCBANK",
            exchange: "NSE",
            price: "₹1,680.95",
            change: "₹16.60",
            changePercent: "+0.91%",
            volume: "8,56,254",
          },
          {
            name: "Infosys",
            symbol: "INFY",
            exchange: "NSE",
            price: "₹1,347.95",
            change: "₹11.60",
            changePercent: "+0.87%",
            volume: "5,26,333",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTopGainers()
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Top Gainers</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : gainers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gainers.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-xs text-muted-foreground">{stock.exchange}</div>
                  </TableCell>
                  <TableCell className="text-right">{stock.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 text-green-500">
                      <ArrowUp className="h-3 w-3" />
                      <span>{stock.changePercent}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">No gainers found today</div>
        )}
      </CardContent>
    </Card>
  )
}

