import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Droplet, Smile, Zap } from "lucide-react";

export default function WellnessPage() {
  // Placeholder data - in a real app, this would come from state or backend
  const waterIntake = 60; // percentage
  const moodLevel = 75; // percentage
  const energyLevel = 80; // percentage

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Wellness Dashboard</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Track your well-being to stay balanced and focused.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Water Intake</CardTitle>
            <Droplet className="h-6 w-6 text-accent" /> {/* Changed to text-accent (themed blue/other) */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterIntake}%</div>
            <p className="text-xs text-muted-foreground">of daily goal (e.g., 8 glasses)</p>
            <Progress value={waterIntake} className="w-full mt-2 h-3" indicatorClassName="bg-accent" /> {/* Changed to bg-accent */}
            <Button variant="outline" size="sm" className="mt-4">Log Water</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Mood Level</CardTitle>
            <Smile className="h-6 w-6 text-primary" /> {/* Changed to text-primary (themed green) */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodLevel}/100</div>
            <p className="text-xs text-muted-foreground">Current mood rating</p>
            <Progress value={moodLevel} className="w-full mt-2 h-3" indicatorClassName="bg-primary" /> {/* Changed to bg-primary */}
            <Button variant="outline" size="sm" className="mt-4">Log Mood</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Energy Level</CardTitle>
            <Zap className="h-6 w-6 text-primary" /> {/* Changed to text-primary (themed green) */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyLevel}%</div>
            <p className="text-xs text-muted-foreground">Perceived energy level</p>
            <Progress value={energyLevel} className="w-full mt-2 h-3" indicatorClassName="bg-primary" /> {/* Changed to bg-primary */}
            <Button variant="outline" size="sm" className="mt-4">Log Energy</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
            <CardTitle>Mindfulness Practice</CardTitle>
            <CardDescription>Take a moment for a quick mindfulness exercise.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">Feature coming soon: Guided meditation, breathing exercises.</p>
            <Button disabled>Start Exercise</Button>
        </CardContent>
      </Card>
    </div>
  );
}
