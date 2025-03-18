import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Banknote } from "lucide-react"

export function FundAvailable() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Fund Available</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <Banknote className="h-6 w-6 text-primary" />
          </div>
          <div className="text-2xl font-bold">₹2400.00</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Add Funds
        </Button>
      </CardFooter>
    </Card>
  )
}

