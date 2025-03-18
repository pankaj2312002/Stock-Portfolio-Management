"use client"

import { useState } from "react"
import { FundAvailable } from "@/components/fund-available"
import { MarketOverview } from "@/components/market-overview"
import { NewIPO } from "@/components/new-ipo"
import { StockChart } from "@/components/stock-chart"
import { TopGainers } from "@/components/top-gainers"
import { TopLosers } from "@/components/top-losers"
import { Watchlist } from "@/components/watchlist"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw } from "lucide-react"
import { toast } from "sonner"

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshKey((prev) => prev + 1)
      setRefreshing(false)
      toast.success("Dashboard refreshed", {
        description: "Latest market data has been loaded",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Market Dashboard</h1>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <MarketOverview key={`market-${refreshKey}`} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Nifty 50</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">16,538.45</span>
                <span className="text-sm text-red-500">-78.00 (-0.49%)</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Tabs defaultValue="1M">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="6M">6M</TabsTrigger>
                    <TabsTrigger value="1Y">1Y</TabsTrigger>
                    <TabsTrigger value="YTD">YTD</TabsTrigger>
                    <TabsTrigger value="ALL">ALL</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="1M" className="h-[300px]">
                  <StockChart key={`chart-1m-${refreshKey}`} symbol="^NSEI" timeframe="1M" />
                </TabsContent>
                <TabsContent value="6M" className="h-[300px]">
                  <StockChart key={`chart-6m-${refreshKey}`} symbol="^NSEI" timeframe="6M" />
                </TabsContent>
                <TabsContent value="1Y" className="h-[300px]">
                  <StockChart key={`chart-1y-${refreshKey}`} symbol="^NSEI" timeframe="1Y" />
                </TabsContent>
                <TabsContent value="YTD" className="h-[300px]">
                  <StockChart key={`chart-ytd-${refreshKey}`} symbol="^NSEI" timeframe="YTD" />
                </TabsContent>
                <TabsContent value="ALL" className="h-[300px]">
                  <StockChart key={`chart-all-${refreshKey}`} symbol="^NSEI" timeframe="ALL" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TopGainers key={`gainers-${refreshKey}`} />
            <TopLosers key={`losers-${refreshKey}`} />
          </div>
        </div>

        <div className="space-y-6">
          <FundAvailable />
          <NewIPO />
          <Watchlist key={`watchlist-${refreshKey}`} />
        </div>
      </div>
    </div>
  )
}

