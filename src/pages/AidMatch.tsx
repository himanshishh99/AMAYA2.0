import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Phone, DollarSign } from "lucide-react";

interface AidProgram {
  name: string;
  org: string;
  type: string;
  match: number;
  location: string;
  contact: string;
  coverage: string;
}

const programs: AidProgram[] = [
  { name: "Diabetes Care Subsidy", org: "National Health Fund", type: "Financial Aid", match: 95, location: "Nationwide", contact: "1-800-CARE", coverage: "Up to ₹50,000/yr" },
  { name: "Chronic Care Rehab", org: "Apollo Foundation", type: "Rehabilitation", match: 88, location: "Metro Cities", contact: "apollo.org", coverage: "Free sessions" },
  { name: "Medication Assistance", org: "PharmaCare Trust", type: "Medication", match: 82, location: "All States", contact: "pharmacare.in", coverage: "70% drug cost" },
  { name: "Home Care Support", org: "CareGivers India", type: "Home Care", match: 74, location: "Tier-1 Cities", contact: "caregivers.in", coverage: "Partial coverage" },
];

export default function AidMatch() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">AidMatch AI</h1>
        <p className="text-sm text-muted-foreground mt-1">Intelligent matching to aid programs based on patient profile</p>
      </div>

      <div className="space-y-3">
        {programs.map((p) => (
          <Card key={p.name} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                      <Badge variant="secondary" className="text-[10px] bg-amaya-50 text-primary border-0">{p.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.org}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{p.contact}</span>
                      <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{p.coverage}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-bold text-primary">{p.match}%</p>
                  <p className="text-[10px] text-muted-foreground">Match Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
