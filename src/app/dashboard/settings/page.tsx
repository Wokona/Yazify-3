import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Settings</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Manage your account and application preferences.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Your Name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="your.email@example.com" />
          </div>
          <Button>Update Profile</Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="study-reminders" className="flex flex-col gap-1">
              <span>Study Reminders</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive notifications for upcoming study sessions.
              </span>
            </Label>
            <Switch id="study-reminders" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="wellness-prompts" className="flex flex-col gap-1">
              <span>Wellness Prompts</span>
               <span className="font-normal leading-snug text-muted-foreground">
                Get reminders for water intake, breaks, etc.
              </span>
            </Label>
            <Switch id="wellness-prompts" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Timetable Sync</CardTitle>
          <CardDescription>Connect to your MUBAS timetable.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">Feature coming soon: Seamlessly sync your class schedule.</p>
            <Button disabled>Connect to MUBAS</Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
           <Button variant="outline">Change Password</Button>
           <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
