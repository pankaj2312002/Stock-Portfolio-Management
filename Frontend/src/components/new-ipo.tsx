import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function NewIPO() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">New IPO</CardTitle>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">3</span>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="IPO Logo"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold">Starbucks</h3>
          <div className="text-sm text-muted-foreground">
            <div>Sep 02, 2021 to Sep 05, 2021</div>
            <div>Allotment: Sep 08, 2021</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Apply
        </Button>
      </CardFooter>
    </Card>
  )
}

