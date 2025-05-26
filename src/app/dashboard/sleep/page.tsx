
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BedDouble, TrendingUp, PlusCircle, Zap } from "lucide-react"; // Zap for Energy
import { Progress } from "@/components/ui/progress";
import Link from "next/link"; // For linking to settings

// Placeholder sleep data for the chart
const sleepChartData = [
  { date: "Mon", hours: 7 },
  { date: "Tue", hours: 6.5 },
  { date: "Wed", hours: 8 },
  { date: "Thu", hours: 7 },
  { date: "Fri", hours: 7.5 },
  { date: "Sat", hours: 9 },
  { date: "Sun", hours: 8 },
];

export default function SleepTrackingPage() {
  const sleepQuality = 85; // Example percentage
  const averageSleep = 7.5; // Example hours
  const energyImpact = 70; // Example percentage of how sleep impacts energy

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
         <div>
            <CardTitle className="text-3xl font-bold">Sleep Tracking</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Automatically sync and monitor your sleep patterns from your device for better energy and focus.
            </CardDescription>
          </div>
          {/* Consider linking to settings for device sync management */}
          <Button variant="outline" asChild> 
            <Link href="/dashboard/settings">Sync Settings</Link>
          </Button>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                Connect your favorite sleep tracking device or app in <Link href="/dashboard/settings" className="text-primary hover:underline">Settings</Link> to automatically import your sleep data.
                Manual adjustments can be made if needed.
            </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Average Sleep</CardTitle>
            <BedDouble className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageSleep} <span className="text-sm text-muted-foreground">hours/night</span></div>
            <p className="text-xs text-muted-foreground">Last 7 days average (auto-synced)</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Sleep Quality</CardTitle>
            <TrendingUp className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sleepQuality}%</div>
            <p className="text-xs text-muted-foreground">Based on duration & consistency (auto-analyzed)</p>
            <Progress value={sleepQuality} className="w-full mt-2 h-3" indicatorClassName="bg-primary" />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Energy Impact</CardTitle>
            <Zap className="h-6 w-6 text-primary" /> {/* Changed from text-green-500 */}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{energyImpact}%</div>
            <p className="text-xs text-muted-foreground">Estimated impact of recent sleep on energy levels.</p>
            <Progress value={energyImpact} className="w-full mt-2 h-3" indicatorClassName="bg-primary" /> {/* Changed from bg-green-500 */}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Sleep Patterns (Last 7 Days)</CardTitle>
          <CardDescription>Visualizing your weekly sleep duration, automatically synced from your device.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
           <div className="mt-4 border-2 border-dashed border-muted-foreground/30 rounded-lg p-10 h-full flex items-center justify-center text-muted-foreground">
            Sleep Chart Placeholder (e.g., using ShadCN/Recharts with themed colors)
            {/* Example data structure for chart:
            {JSON.stringify(sleepChartData.map(d => ({ name: d.date, value: d.hours })))} */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Ensure your device is regularly synced for the latest insights.</p>
            <Button size="sm" variant="outline" disabled> {/* Kept disabled as actual logging isn't implemented */}
                <PlusCircle className="mr-2 h-4 w-4" /> Adjust Log
            </Button>
        </CardFooter>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Tips for Better Sleep</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Maintain a consistent sleep schedule, even on weekends.</li>
            <li>Create a restful environment: dark, quiet, and cool.</li>
            <li>Limit exposure to bright screens (phones, computers) an hour before bed.</li>
            <li>Avoid large meals, caffeine, and alcohol close to bedtime.</li>
            <li>Engage in relaxing activities before sleep like reading or light stretching.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
