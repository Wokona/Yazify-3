import { CalendarClock, ActivitySquare, Target, BrainCircuit, FileText, BedDouble } from "lucide-react";
import FeatureCard from "./feature-card";

const features = [
  {
    icon: CalendarClock,
    title: "Smart Scheduling",
    description: "Automatically sync with your class timetable and find optimal study slots based on your personal schedule and preferences.",
    dataAiHint: "calendar schedule"
  },
  {
    icon: ActivitySquare,
    title: "Wellness Tracking",
    description: "Monitor your mood, track water intake, practice mindfulness, and maintain a healthy study-life balance.",
    dataAiHint: "yoga meditation"
  },
  {
    icon: Target,
    title: "Personalized Goals",
    description: "Set study goals, track your progress, and celebrate achievements with beautiful animations and rewards.",
    dataAiHint: "target goals"
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations for study timing, break schedules, and wellness activities based on your patterns.",
    dataAiHint: "artificial intelligence"
  },
  {
    icon: FileText,
    title: "Study Notes & Journal",
    description: "Keep track of your thoughts, study notes, and daily reflections all in one organized, beautiful interface.",
    dataAiHint: "notebook journal"
  },
  {
    icon: BedDouble,
    title: "Sleep & Energy Tracking",
    description: "Log your sleep patterns and energy levels to optimize your study schedule for peak performance.",
    dataAiHint: "sleep bed"
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 md:mb-16">
          Everything You Need to Succeed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              dataAiHint={feature.dataAiHint}
              className="bg-card" // Ensuring cards use card background
            />
          ))}
        </div>
      </div>
    </section>
  );
}
