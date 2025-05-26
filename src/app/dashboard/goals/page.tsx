import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlusCircle, Edit3 } from "lucide-react";

// Placeholder data
const goals = [
  { id: 1, title: "Finish Math Assignment", progress: 75, category: "Academics" },
  { id: 2, title: "Read 2 Chapters of History", progress: 30, category: "Academics" },
  { id: 3, title: "Meditate 15 mins daily", progress: 90, category: "Wellness" },
  { id: 4, title: "Exercise 3 times this week", progress: 66, category: "Wellness" },
];

export default function GoalsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">Your Goals</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Set, track, and achieve your personal and academic objectives.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Goal
          </Button>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => (
          <Card key={goal.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{goal.title}</CardTitle>
                  <CardDescription>{goal.category}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={goal.progress} className="w-full h-3 mb-1" indicatorClassName="bg-primary"/>
              <p className="text-sm text-muted-foreground text-right">{goal.progress}% complete</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Update Progress</Button>
                {goal.progress === 100 && <CheckCircle className="h-5 w-5 text-primary" />} {/* text-green-500 to text-primary */}
            </CardFooter>
          </Card>
        ))}
      </div>

      {goals.length === 0 && (
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">You haven't set any goals yet.</p>
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" /> Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      )}
       <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Achievements & Rewards</CardTitle>
            <CardDescription>Celebrate your progress!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Beautiful animations and rewards for completing goals are coming soon!</p>
            {/* Placeholder for achievements display */}
             <div className="mt-4 p-4 border rounded-md bg-secondary"> {/* Changed bg-muted/50 to bg-secondary */}
                <h4 className="font-semibold">Streak Master</h4>
                <p className="text-sm text-muted-foreground">Completed 5 goals in a row!</p>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
