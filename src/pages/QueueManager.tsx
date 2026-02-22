import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Hash, TrendingUp } from "lucide-react";

interface QueueEntry {
  token: string;
  name: string;
  department: string;
  waitMin: number;
  confidence: number;
  status: "waiting" | "in-progress" | "completed";
}

const mockQueue: QueueEntry[] = [
  { token: "A-001", name: "Patient Kumar", department: "Cardiology", waitMin: 8, confidence: 92, status: "in-progress" },
  { token: "A-002", name: "Patient Sharma", department: "Neurology", waitMin: 15, confidence: 85, status: "waiting" },
  { token: "A-003", name: "Patient Patel", department: "General", waitMin: 22, confidence: 78, status: "waiting" },
  { token: "A-004", name: "Patient Gupta", department: "Cardiology", waitMin: 35, confidence: 71, status: "waiting" },
  { token: "A-005", name: "Patient Singh", department: "Orthopedics", waitMin: 42, confidence: 65, status: "waiting" },
];

export default function QueueManager() {
  const [currentToken, setCurrentToken] = useState(1);
  const [queue] = useState(mockQueue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToken((p) => (p < queue.length ? p + 1 : p));
    }, 10000);
    return () => clearInterval(interval);
  }, [queue.length]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">AI Queue Manager</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time token management with predictive wait times</p>
      </div>

      {/* Live Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Hash className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Now Serving</p>
              <p className="text-xl font-display font-bold text-foreground">A-00{currentToken}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">In Queue</p>
              <p className="text-xl font-display font-bold text-foreground">{queue.length - currentToken}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Wait</p>
              <p className="text-xl font-display font-bold text-foreground">18 min</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Throughput</p>
              <p className="text-xl font-display font-bold text-foreground">4.2/hr</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Table */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Live Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {queue.map((entry, i) => (
              <div
                key={entry.token}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  i < currentToken ? "bg-success/5 border-success/20" : "bg-muted/30 border-border/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-foreground w-14">{entry.token}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{entry.name}</p>
                    <p className="text-xs text-muted-foreground">{entry.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{entry.waitMin} min</p>
                    <p className="text-xs text-muted-foreground">±{entry.confidence}% confidence</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      i < currentToken
                        ? "bg-success/10 text-success"
                        : i === currentToken
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < currentToken ? "Done" : i === currentToken ? "In Progress" : "Waiting"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
