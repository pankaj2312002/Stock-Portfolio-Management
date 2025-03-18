"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { INDIAN_INDICES, getGlobalQuote } from "@/lib/alpha-vantage"
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react"
import { toast } from "sonner"

type IndexData = {
  symbol: string
  name: string
  exchange: string
  price: string
  change: string
  changePercent: string
  isPositive: boolean
  isLoading: boolean
}

export function MarketOverview() {
  const [indicesData, setIndicesData] = useState<IndexData[]>(
    INDIAN_INDICES.map((index) => ({
      ...index,
      price: "0.00",
      change: "0.00",
      changePercent: "0.00%",
      isPositive: false,
      isLoading: true,
    })),
  )

  useEffect(() => {
    const fetchIndicesData = async () => {
      const updatedData = [...indicesData]

      for (let i = 0; i < INDIAN_INDICES.length; i++) {
        try {
          const response = await getGlobalQuote(INDIAN_INDICES[i].symbol)
          const quote = response["Global Quote"]

          if (quote) {
            const price = Number.parseFloat(quote["05. price"]).toFixed(2)
            const change = Number.parseFloat(quote["09. change"]).toFixed(2)
            const changePercent = quote["10. change percent"].trim()
            const isPositive = Number.parseFloat(change) >= 0

            updatedData[i] = {
              ...updatedData[i],
              price,
              change,
              changePercent,
              isPositive,
              isLoading: false,
            }
          }
        } catch (error) {
          console.error(`Error fetching data for ${INDIAN_INDICES[i].symbol}:`, error)
          toast.error(`Failed to load data for ${INDIAN_INDICES[i].name}`)

          // Set to not loading even if there's an error
          updatedData[i] = {
            ...updatedData[i],
            isLoading: false,
          }
        }
      }

      setIndicesData(updatedData)
    }

    fetchIndicesData()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {indicesData.map((index) => (
        <Card key={index.symbol} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{index.name}</CardTitle>
            <span className="text-xs text-muted-foreground">{index.exchange}</span>
          </CardHeader>
          <CardContent>
            {index.isLoading ? (
              <div className="flex items-center justify-between">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">₹{index.price}</div>
                <div className={`flex items-center gap-1 ${index.isPositive ? "text-green-500" : "text-red-500"}`}>
                  {index.isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span className="text-sm">
                    {index.change} ({index.changePercent})
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

