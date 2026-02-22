import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Pill,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Wifi,
  WifiOff,
  Bell,
  FileText,
  FlaskConical,
  Heart,
  Activity,
  ArrowRight,
} from "lucide-react";

/* ── Mock Data ── */
const pillTimeline = [
  { time: "07:00 AM", med: "Metformin", dose: "500mg", status: "taken" as const },
  { time: "08:00 AM", med: "Levothyroxine", dose: "50mcg", status: "taken" as const },
  { time: "01:00 PM", med: "Metformin", dose: "500mg", status: "missed" as const },
  { time: "06:00 PM", med: "Atorvastatin", dose: "10mg", status: "upcoming" as const },
  { time: "09:00 PM", med: "Metformin", dose: "500mg", status: "upcoming" as const },
];

const devices = [
  { name: "Bedroom Dispenser", status: "online" as const, battery: "87%" },
  { name: "Kitchen Dispenser", status: "online" as const, battery: "62%" },
  { name: "Portable Unit", status: "offline" as const, battery: "12%" },
];

const caregiverAlerts = [
  { time: "01:15 PM", msg: "Missed dose: Metformin 500mg", severity: "warning" },
  { time: "11:30 AM", msg: "Portable dispenser battery low", severity: "critical" },
  { time: "08:05 AM", msg: "Morning doses completed on time", severity: "info" },
];

const quickStats = [
  { label: "Today's Adherence", value: "2/5", sub: "40%", color: "text-warning" },
  { label: "Active Prescriptions", value: "4", sub: "2 refills due", color: "text-primary" },
  { label: "Next Appointment", value: "Feb 25", sub: "Dr. Sharma", color: "text-info" },
  { label: "Unread Reports", value: "2", sub: "Lab results", color: "text-success" },
];

const AlertIcon = ({ severity }: { severity: string }) => {
  if (severity === "critical") return <XCircle className="h-3.5 w-3.5 text-danger shrink-0" />;
  if (severity === "warning") return <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0" />;
  return <CheckCircle2 className="h-3.5 w-3.5 text-info shrink-0" />;
};

export default function PatientDashboard() {
  const taken = pillTimeline.filter((t) => t.status === "taken").length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Patient Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Your health overview & medication tracking</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ★ HIGHLIGHTED: Smart Pill Box Section */}
      <Card className="border-2 border-primary/20 bg-amaya-50/30 shadow-sm shadow-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Pill className="h-4 w-4 text-primary" />
              </div>
              Smart Pill Box
              <Badge className="bg-primary/10 text-primary border-0 text-[10px]">★ Featured</Badge>
            </CardTitle>
            <Link to="/pillbox" className="text-xs text-primary flex items-center gap-1 hover:underline">
              Full View <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Today's Pill Intake Timeline
              </p>
              <div className="space-y-1">
                {pillTimeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-card/60">
                    <span className="text-[11px] font-mono text-muted-foreground w-16">{t.time}</span>
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      t.status === "taken" ? "bg-success" : t.status === "missed" ? "bg-danger" : "bg-muted-foreground/30"
                    }`} />
                    <div className="flex-1">
                      <span className="text-sm text-foreground">{t.med}</span>
                      <span className="text-xs text-muted-foreground ml-2">{t.dose}</span>
                    </div>
                    <Badge className={`text-[10px] px-2 py-0 border-0 capitalize ${
                      t.status === "taken" ? "status-low" : t.status === "missed" ? "status-high" : "bg-muted text-muted-foreground"
                    }`}>{t.status}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Status + Alerts */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Device Status</p>
                <div className="space-y-1.5">
                  {devices.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 p-2 rounded-lg bg-card/60">
                      {d.status === "online" ? <Wifi className="h-3.5 w-3.5 text-success" /> : <WifiOff className="h-3.5 w-3.5 text-danger" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground truncate">{d.name}</p>
                        <p className="text-[10px] text-muted-foreground">{d.battery}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Bell className="h-3 w-3" /> Alerts
                </p>
                <div className="space-y-1.5">
                  {caregiverAlerts.map((a, i) => (
                    <div key={i} className="flex items-start gap-2 p-1.5">
                      <AlertIcon severity={a.severity} />
                      <div>
                        <p className="text-[11px] text-foreground leading-tight">{a.msg}</p>
                        <p className="text-[10px] text-muted-foreground">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/lablink">
          <Card className="glass-card hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <FlaskConical className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Lab Results</p>
                <p className="text-xs text-muted-foreground">2 new reports available</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/aidmatch">
          <Card className="glass-card hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">AidMatch</p>
                <p className="text-xs text-muted-foreground">4 programs matched</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/medbot">
          <Card className="glass-card hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <Activity className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">MedBot AI</p>
                <p className="text-xs text-muted-foreground">Symptom checker ready</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
