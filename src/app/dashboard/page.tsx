import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lightbulb, ListChecks, TrendingUp } from "lucide-react";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to Yazify!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your personalized study and wellness hub. Let's make this a productive day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Here you can manage your study schedules, track your wellness, set goals, and get AI-powered insights to optimize your learning.</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Wellness Tracker</CardTitle>
            <TrendingUp className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor your mood, hydration, and more.
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/wellness">Go to Wellness</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Goal Setting</CardTitle>
            <ListChecks className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Set and track your academic and personal goals.
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/goals">Manage Goals</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">AI Insights</CardTitle>
            <Lightbulb className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get smart recommendations for your study habits.
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/insights">Discover Insights</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">Not sure where to begin? Try one of these:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><Link href="/dashboard/wellness" className="text-primary hover:underline">Log your mood for today.</Link></li>
            <li><Link href="/dashboard/goals" className="text-primary hover:underline">Set a new study goal.</Link></li>
            <li><Link href="/dashboard/insights" className="text-primary hover:underline">Analyze your study patterns.</Link></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
