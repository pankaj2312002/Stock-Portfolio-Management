import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Mail, MapPin, Phone } from "lucide-react"

export function ProfileHeader() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Maria Gibson" />
            <AvatarFallback>MG</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold">Maria Gibson</h2>
              <p className="text-muted-foreground">Active Investor</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <div className="flex items-center justify-center gap-1 md:justify-start">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">maria.gibson@example.com</span>
              </div>
              <div className="flex items-center justify-center gap-1 md:justify-start">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center justify-center gap-1 md:justify-start">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="gap-1">
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

