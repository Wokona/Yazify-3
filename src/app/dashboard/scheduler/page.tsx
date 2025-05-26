
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileClock } from "lucide-react";
import Link from "next/link";

export default function SchedulerPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Smart Study Scheduler</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Generate and manage your personalized study schedules.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="mb-2 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
            <FileClock className="h-6 w-6" />
          </div>
          <CardTitle>Your Study Plan</CardTitle>
          <CardDescription>
            AI-generated schedules based on your classes, commitments, and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your smart study schedule will be displayed here. You can generate a new schedule or view your existing one.
          </p>
          <div className="mt-4 border-2 border-dashed border-muted-foreground/30 rounded-lg p-10 text-center text-muted-foreground h-64 flex items-center justify-center">
            Smart Schedule Display Placeholder
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/dashboard/insights">Generate New Schedule (via AI Insights)</Link>
            </Button>
            <Button variant="outline" disabled>View Current Schedule</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Synchronizes with your MUBAS timetable (once connected in settings).</li>
            <li>Considers your personal commitments and deadlines.</li>
            <li>Learns your study preferences and energy levels (via Wellness & Sleep tracking).</li>
            <li>Suggests optimal study blocks and break times.</li>
            <li>Visit the <Link href="/dashboard/insights" className="text-primary hover:underline">AI Insights</Link> page to generate personalized recommendations.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
