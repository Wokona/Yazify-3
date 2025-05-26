import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StudyScheduleAnalysisForm from "@/components/dashboard/ai/study-schedule-analysis-form";
import PersonalizedRecommendationsForm from "@/components/dashboard/ai/personalized-recommendations-form";
import { Separator } from "@/components/ui/separator";

export default function AiInsightsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">AI-Powered Insights</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Leverage AI to optimize your study habits and well-being.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Study Schedule Analysis</CardTitle>
          <CardDescription>
            Input your historical study data to get insights on optimal study times and subject focus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudyScheduleAnalysisForm />
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Personalized Recommendations</CardTitle>
          <CardDescription>
            Provide details about your habits and preferences to receive a tailored study schedule and wellness tips.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalizedRecommendationsForm />
        </CardContent>
      </Card>
    </div>
  );
}
