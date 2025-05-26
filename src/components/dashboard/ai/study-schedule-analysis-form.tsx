
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "genkit"; // Import Zod
import { analyzeStudySchedule, type StudyScheduleAnalysisOutput, type StudyScheduleAnalysisInput } from "@/ai/flows/study-schedule-analysis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const peakFocusTimes = ['Morning (8am-12pm)', 'Afternoon (1pm-5pm)', 'Evening (6pm-9pm)', 'Night (10pm onwards)'] as const;
const lowFocusTimes = ['Morning (8am-12pm)', 'Afternoon (1pm-5pm)', 'Evening (6pm-9pm)', 'Night (10pm onwards)', 'Varies'] as const;
const sessionDurations = ['Less than 30 min', '30-60 min', '1-2 hours', 'More than 2 hours'] as const;
const postSessionFeelings = ['Generally Focused', 'Often Tired', 'Usually Energized', 'Often Drained', 'It Varies'] as const;

// Define the Zod schema for client-side validation
const StudyScheduleAnalysisInputSchema = z.object({
  peakFocusTime: z
    .enum(['Morning (8am-12pm)', 'Afternoon (1pm-5pm)', 'Evening (6pm-9pm)', 'Night (10pm onwards)'])
    .describe('The time of day when the user generally feels most focused.'),
  lowFocusTime: z
    .enum(['Morning (8am-12pm)', 'Afternoon (1pm-5pm)', 'Evening (6pm-9pm)', 'Night (10pm onwards)', 'Varies'])
    .describe('The time of day when the user generally feels least focused or energy dips.'),
  challengingSubjects: z
    .string()
    .optional()
    .describe('A comma-separated list of subjects the user finds most challenging.'),
  easySubjects: z
    .string()
    .optional()
    .describe('A comma-separated list of subjects the user finds easiest.'),
  typicalSessionDuration: z
    .enum(['Less than 30 min', '30-60 min', '1-2 hours', 'More than 2 hours'])
    .describe('The typical length of a study session for the user.'),
  postSessionFeeling: z
    .enum(['Generally Focused', 'Often Tired', 'Usually Energized', 'Often Drained', 'It Varies'])
    .optional()
    .describe('How the user typically feels after a long study session.'),
});


export default function StudyScheduleAnalysisForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StudyScheduleAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<StudyScheduleAnalysisInput>({
    resolver: zodResolver(StudyScheduleAnalysisInputSchema), // Use the locally defined schema
    defaultValues: {
      challengingSubjects: "",
      easySubjects: "",
    },
  });

  async function onSubmit(values: StudyScheduleAnalysisInput) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const output = await analyzeStudySchedule(values);
      setResult(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="peakFocusTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>When do you feel MOST focused?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select a time" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {peakFocusTimes.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lowFocusTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>When do you feel LEAST focused or experience energy dips?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select a time" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lowFocusTimes.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="challengingSubjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Challenging Subjects (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Calculus, Organic Chemistry" {...field} />
                </FormControl>
                <FormDescription>List subjects you find difficult, separated by commas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="easySubjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Easy Subjects (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Intro to Psychology, History 101" {...field} />
                </FormControl>
                <FormDescription>List subjects you find relatively easy, separated by commas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typicalSessionDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typical Study Session Duration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sessionDurations.map(duration => <SelectItem key={duration} value={duration}>{duration}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postSessionFeeling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How do you usually feel after a long study session? (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select a feeling" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {postSessionFeelings.map(feeling => <SelectItem key={feeling} value={feeling}>{feeling}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Analyze My Study Preferences
          </Button>
        </form>
      </Form>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">Analysis Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Your Study Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">Optimal Study Times:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.optimalStudyTimes}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Subject-Specific Strategies:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.subjectSpecificStrategies}</p>
            </div>
             <div>
              <h4 className="font-semibold text-lg">Load Balancing Suggestions:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.loadBalancingSuggestions}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Overall Insights:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.insights}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
