import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Wifi, WifiOff, Bell, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface PillSchedule {
  time: string;
  medication: string;
  dose: string;
  status: "taken" | "missed" | "upcoming";
}

interface CaregiverAlert {
  time: string;
  message: string;
  severity: "info" | "warning" | "critical";
}

const timeline: PillSchedule[] = [
  { time: "07:00 AM", medication: "Metformin", dose: "500mg", status: "taken" },
  { time: "08:00 AM", medication: "Levothyroxine", dose: "50mcg", status: "taken" },
  { time: "01:00 PM", medication: "Metformin", dose: "500mg", status: "missed" },
  { time: "06:00 PM", medication: "Atorvastatin", dose: "10mg", status: "upcoming" },
  { time: "09:00 PM", medication: "Metformin", dose: "500mg", status: "upcoming" },
];

const devices = [
  { name: "Pill Dispenser — Bedroom", status: "online" as const, battery: "87%", lastSync: "2 min ago" },
  { name: "Pill Dispenser — Kitchen", status: "online" as const, battery: "62%", lastSync: "5 min ago" },
  { name: "Portable Dispenser", status: "offline" as const, battery: "12%", lastSync: "3 hrs ago" },
];

const alerts: CaregiverAlert[] = [
  { time: "01:15 PM", message: "Missed dose: Metformin 500mg — Patient Kumar", severity: "warning" },
  { time: "11:30 AM", message: "Portable dispenser battery low (12%)", severity: "critical" },
  { time: "08:05 AM", message: "Morning doses completed on time", severity: "info" },
  { time: "07:00 AM", message: "Device sync successful — all units", severity: "info" },
];

const alertStyles: Record<string, string> = {
  info: "text-info",
  warning: "text-warning",
  critical: "text-danger",
};

const AlertIcon = ({ severity }: { severity: string }) => {
  if (severity === "critical") return <XCircle className="h-4 w-4 text-danger" />;
  if (severity === "warning") return <AlertTriangle className="h-4 w-4 text-warning" />;
  return <CheckCircle2 className="h-4 w-4 text-info" />;
};

export default function PillBox() {
  const taken = timeline.filter((t) => t.status === "taken").length;
  const missed = timeline.filter((t) => t.status === "missed").length;

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Smart Pill Box Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">IoT medication adherence tracking & caregiver alerts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Today's Adherence</p>
            <p className="text-2xl font-display font-bold text-foreground">{taken}/{timeline.length}</p>
            <Badge className="mt-1 text-[10px] bg-success/10 text-success border-0">{Math.round((taken / timeline.length) * 100)}%</Badge>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Missed Doses</p>
            <p className="text-2xl font-display font-bold text-danger">{missed}</p>
            <Badge className="mt-1 text-[10px] bg-danger/10 text-danger border-0">Alert sent</Badge>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Devices Online</p>
            <p className="text-2xl font-display font-bold text-foreground">{devices.filter((d) => d.status === "online").length}/{devices.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pill Timeline */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Pill Intake Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30">
                  <span className="text-xs font-mono text-muted-foreground w-16">{t.time}</span>
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    t.status === "taken" ? "bg-success" : t.status === "missed" ? "bg-danger" : "bg-muted-foreground/30"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{t.medication}</p>
                    <p className="text-[11px] text-muted-foreground">{t.dose}</p>
                  </div>
                  <Badge className={`text-[10px] px-2 py-0 border-0 capitalize ${
                    t.status === "taken" ? "status-low" : t.status === "missed" ? "status-high" : "bg-muted text-muted-foreground"
                  }`}>
                    {t.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Status + Alerts */}
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Pill className="h-4 w-4 text-primary" /> Device Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {devices.map((d) => (
                  <div key={d.name} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      {d.status === "online" ? <Wifi className="h-4 w-4 text-success" /> : <WifiOff className="h-4 w-4 text-danger" />}
                      <div>
                        <p className="text-sm text-foreground">{d.name}</p>
                        <p className="text-[11px] text-muted-foreground">Battery: {d.battery} · {d.lastSync}</p>
                      </div>
                    </div>
                    <Badge className={`text-[10px] border-0 ${d.status === "online" ? "status-low" : "status-high"}`}>
                      {d.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Bell className="h-4 w-4 text-warning" /> Caregiver Alert Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alerts.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg">
                    <AlertIcon severity={a.severity} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{a.message}</p>
                      <p className="text-[11px] text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
