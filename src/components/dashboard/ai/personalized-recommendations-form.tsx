
"use client";

import { useState, type FormEvent } from "react";
import { personalizedRecommendations, type PersonalizedRecommendationsOutput } from "@/ai/flows/personalized-recommendations";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function PersonalizedRecommendationsForm() {
  const [studyHabits, setStudyHabits] = useState("");
  const [wellnessData, setWellnessData] = useState("");
  const [energyPatterns, setEnergyPatterns] = useState("");
  const [schedulePreferences, setSchedulePreferences] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const output = await personalizedRecommendations({
        studyHabits,
        wellnessData,
        energyPatterns: energyPatterns || undefined, // Pass as undefined if empty
        schedulePreferences
      });
      setResult(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="studyHabits" className="block text-sm font-medium mb-1">Study Habits</Label>
          <Textarea
            id="studyHabits"
            value={studyHabits}
            onChange={(e) => setStudyHabits(e.target.value)}
            placeholder="e.g., Prefer studying in the morning for 2-hour sessions, find Calculus very challenging, use flashcards for memorization..."
            rows={3}
            required
            className="w-full"
          />
           <p className="text-xs text-muted-foreground mt-1">
            Include preferred times, subjects, their perceived difficulty, and methods.
          </p>
        </div>
        <div>
          <Label htmlFor="wellnessData" className="block text-sm font-medium mb-1">Wellness Data</Label>
          <Textarea
            id="wellnessData"
            value={wellnessData}
            onChange={(e) => setWellnessData(e.target.value)}
            placeholder="e.g., Average 7 hours of sleep, mood is generally good, drink about 1.5L of water daily..."
            rows={3}
            required
            className="w-full"
          />
           <p className="text-xs text-muted-foreground mt-1">
            Include sleep patterns, typical mood, hydration habits, etc.
          </p>
        </div>
        <div>
          <Label htmlFor="energyPatterns" className="block text-sm font-medium mb-1">Typical Energy Patterns (Optional)</Label>
          <Textarea
            id="energyPatterns"
            value={energyPatterns}
            onChange={(e) => setEnergyPatterns(e.target.value)}
            placeholder="e.g., Most alert 9am-12pm, energy dip around 3pm, second wind 6pm-8pm."
            rows={3}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Describe when you generally feel most focused or fatigued during the day.
          </p>
        </div>
        <div>
          <Label htmlFor="schedulePreferences" className="block text-sm font-medium mb-1">Schedule Preferences</Label>
          <Textarea
            id="schedulePreferences"
            value={schedulePreferences}
            onChange={(e) => setSchedulePreferences(e.target.value)}
            placeholder="e.g., Prefer 45-min study blocks with 10-min breaks, enjoy a walk during longer breaks, need evenings free after 7pm..."
            rows={3}
            required
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include desired study duration per session, break frequency/duration, and activities during breaks.
          </p>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Get Recommendations
        </Button>
      </form>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">Recommendation Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Your Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">Suggested Study Schedule:</h4>
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap bg-background/50 p-3 rounded-md">{result.studySchedule}</pre>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Additional Insights & Tips:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
