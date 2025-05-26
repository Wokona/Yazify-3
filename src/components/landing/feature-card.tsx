import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  dataAiHint?: string;
}

export default function FeatureCard({ icon: Icon, title, description, className, dataAiHint }: FeatureCardProps) {
  return (
    <Card className={cn("text-center shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden feature-card-border", className)} data-ai-hint={dataAiHint}>
      <CardHeader className="items-center">
        <div className="p-3 bg-primary/10 rounded-full mb-4">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
