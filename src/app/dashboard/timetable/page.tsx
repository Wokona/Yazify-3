
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export default function TimetablePage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Class Timetable</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            View your synchronized MUBAS class schedule.
          </CardDescription>
        </CardHeader>
      </Card>

      <Alert>
        <CalendarDays className="h-4 w-4" />
        <AlertTitle>Timetable Sync</AlertTitle>
        <AlertDescription>
          To view your timetable, please first sync your MUBAS account in <Button variant="link" className="p-0 h-auto text-base" asChild><Link href="/dashboard/settings">Settings</Link></Button>.
        </AlertDescription>
      </Alert>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Weekly View</CardTitle>
          <CardDescription>Your schedule for the current week.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Timetable display will appear here once synced. This will include a grid view of your classes and other scheduled events for the week.</p>
          {/* Placeholder for timetable grid */}
          <div className="mt-4 border-2 border-dashed border-muted-foreground/30 rounded-lg p-10 text-center text-muted-foreground h-64 flex items-center justify-center">
            Timetable Grid Placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
