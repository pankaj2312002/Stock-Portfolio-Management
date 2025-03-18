import { ProfileForm } from "@/components/profile-form"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileStats } from "@/components/profile-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ProfileStats />
          <ProfileForm />
        </TabsContent>

        <TabsContent value="settings">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">Settings</h3>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">Security</h3>
            <p className="text-muted-foreground">Manage your security settings and connected devices.</p>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">Notifications</h3>
            <p className="text-muted-foreground">Manage your notification preferences.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

