import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LabResult {
  test: string;
  value: string;
  unit: string;
  range: string;
  trend: "up" | "down" | "stable";
  status: "normal" | "borderline" | "abnormal";
}

const results: LabResult[] = [
  { test: "HbA1c", value: "6.8", unit: "%", range: "4.0-5.6", trend: "down", status: "borderline" },
  { test: "Fasting Glucose", value: "110", unit: "mg/dL", range: "70-100", trend: "up", status: "borderline" },
  { test: "Total Cholesterol", value: "185", unit: "mg/dL", range: "<200", trend: "down", status: "normal" },
  { test: "Creatinine", value: "1.1", unit: "mg/dL", range: "0.7-1.3", trend: "stable", status: "normal" },
  { test: "TSH", value: "5.2", unit: "mIU/L", range: "0.4-4.0", trend: "up", status: "abnormal" },
];

const statusStyle: Record<string, string> = {
  normal: "status-low",
  borderline: "status-moderate",
  abnormal: "status-high",
};

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-danger" />;
  if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-success" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
};

export default function LabLink() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">AI LabLink</h1>
        <p className="text-sm text-muted-foreground mt-1">Intelligent lab result interpretation & trend analysis</p>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display">Latest Results — Feb 20, 2026</CardTitle>
            <Badge variant="secondary" className="bg-amaya-50 text-primary border-0">AI Analyzed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {results.map((r) => (
              <div key={r.test} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.test}</p>
                    <p className="text-xs text-muted-foreground">Ref: {r.range} {r.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <TrendIcon trend={r.trend} />
                    <span className="text-sm font-mono font-bold text-foreground">{r.value}</span>
                    <span className="text-xs text-muted-foreground">{r.unit}</span>
                  </div>
                  <Badge className={`text-[10px] px-2 py-0.5 border-0 capitalize ${statusStyle[r.status]}`}>
                    {r.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">AI Interpretation</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-foreground space-y-2">
          <p><strong>Thyroid:</strong> Elevated TSH suggests subclinical hypothyroidism. Recommend free T4 follow-up.</p>
          <p><strong>Glucose:</strong> HbA1c trending down (positive), but fasting glucose slightly elevated. Continue monitoring.</p>
          <p><strong>Overall:</strong> Metabolic panel within acceptable range. No urgent intervention needed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
