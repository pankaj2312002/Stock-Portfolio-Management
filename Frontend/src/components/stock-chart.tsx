"use client"
import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getTimeSeries } from "@/lib/alpha-vantage"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface StockChartProps {
  symbol: string
  timeframe: "1M" | "6M" | "1Y" | "YTD" | "ALL"
}

type ChartDataPoint = {
  date: string
  value: number
}

export function StockChart({ symbol, timeframe }: StockChartProps) {
  const [data, setData] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get real data from Alpha Vantage
        const response = await getTimeSeries(symbol)

        if (!response || !response["Time Series (Daily)"]) {
          throw new Error("Invalid data received from API")
        }

        const timeSeriesData = response["Time Series (Daily)"]
        const chartData: ChartDataPoint[] = []

        // Calculate date range based on timeframe
        const today = new Date()
        let startDate = new Date()

        if (timeframe === "1M") {
          startDate.setMonth(today.getMonth() - 1)
        } else if (timeframe === "6M") {
          startDate.setMonth(today.getMonth() - 6)
        } else if (timeframe === "1Y") {
          startDate.setFullYear(today.getFullYear() - 1)
        } else if (timeframe === "YTD") {
          startDate = new Date(today.getFullYear(), 0, 1) // January 1st of current year
        } else {
          // ALL - use all available data
          startDate = new Date(0) // Beginning of time
        }

        // Process the data
        for (const [dateStr, values] of Object.entries(timeSeriesData)) {
          const date = new Date(dateStr)
          if (date >= startDate) {
            chartData.push({
              date: dateStr,
              value: Number.parseFloat(values["4. close"]),
            })
          }
        }

        // Sort by date ascending
        chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        setData(chartData)
      } catch (err) {
        console.error("Error fetching chart data:", err)
        setError("Failed to load chart data")
        toast.error("Failed to load chart data", {
          description: err instanceof Error ? err.message : "Unknown error",
        })

        // Fallback to mock data if API fails
        generateMockData()
      } finally {
        setLoading(false)
      }
    }

    const generateMockData = () => {
      // Mock data as fallback
      const mockData: ChartDataPoint[] = []
      const today = new Date()
      const startDate = new Date()

      // Set start date based on timeframe
      if (timeframe === "1M") {
        startDate.setMonth(today.getMonth() - 1)
      } else if (timeframe === "6M") {
        startDate.setMonth(today.getMonth() - 6)
      } else if (timeframe === "1Y") {
        startDate.setFullYear(today.getFullYear() - 1)
      } else if (timeframe === "YTD") {
        startDate.setMonth(0)
        startDate.setDate(1)
      } else {
        startDate.setFullYear(today.getFullYear() - 5)
      }

      // Generate mock data points
      const currentDate = new Date(startDate)
      let baseValue = 16000

      while (currentDate <= today) {
        const randomChange = (Math.random() - 0.48) * 100
        baseValue += randomChange

        mockData.push({
          date: currentDate.toISOString().split("T")[0],
          value: baseValue,
        })

        currentDate.setDate(currentDate.getDate() + 1)
      }

      setData(mockData)
      toast.warning("Using mock data", {
        description: "Could not fetch real data, showing simulated chart",
      })
    }

    fetchData()
  }, [symbol, timeframe])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(tick) => {
            const date = new Date(tick)
            return `${date.getDate()}/${date.getMonth() + 1}`
          }}
          tick={{ fontSize: 12 }}
          tickCount={5}
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{ fontSize: 12 }}
          tickCount={5}
          width={40}
          tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}k`}
        />
        <Tooltip
          formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString("en-IN")
          }}
          contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorValue)"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

