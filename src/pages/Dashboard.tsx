import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ShieldCheck,
  Cpu,
  MessageSquare,
  Users,
  FlaskConical,
  Heart,
  FileLock2,
  Pill,
  Wifi,
  WifiOff,
  Activity,
} from "lucide-react";

const layers = [
  {
    title: "Intelligence Layer",
    description: "AI-powered clinical decision support",
    icon: Brain,
    color: "bg-primary/10 text-primary",
    modules: [
      { name: "MedBot AI", desc: "Symptom triage & risk classification", icon: MessageSquare },
      { name: "AI LabLink", desc: "Lab result interpretation", icon: FlaskConical },
      { name: "AidMatch AI", desc: "Treatment & aid matching", icon: Heart },
      { name: "Queue Manager", desc: "Predictive queue optimization", icon: Users },
    ],
  },
  {
    title: "Secure Infrastructure Layer",
    description: "Encrypted data management & access control",
    icon: ShieldCheck,
    color: "bg-success/10 text-success",
    modules: [
      { name: "Document Vault", desc: "AES-256 encrypted storage", icon: FileLock2 },
      { name: "Access Control", desc: "Role-based permissions", icon: ShieldCheck },
    ],
  },
  {
    title: "IoT Hardware Layer",
    description: "Connected device monitoring & alerts",
    icon: Cpu,
    color: "bg-info/10 text-info",
    modules: [
      { name: "Smart Pill Box", desc: "Medication adherence tracking", icon: Pill },
      { name: "Device Monitor", desc: "Real-time device status", icon: Activity },
    ],
  },
];

const stats = [
  { label: "Active Patients", value: "1,248", change: "+12%" },
  { label: "AI Consultations", value: "3,891", change: "+28%" },
  { label: "Devices Online", value: "847", change: "98.2%" },
  { label: "Encrypted Files", value: "12,403", change: "100%" },
];

const deviceStatus = [
  { name: "Pill Dispenser #A1", status: "online" },
  { name: "Pill Dispenser #A2", status: "online" },
  { name: "Pill Dispenser #B3", status: "offline" },
  { name: "BP Monitor #C1", status: "online" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">System Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">AMAYA Interdisciplinary Chronic Care Architecture</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">{s.value}</p>
              <Badge variant="secondary" className="mt-2 text-xs bg-amaya-50 text-primary border-0">
                {s.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Architecture Layers */}
      <div className="space-y-4">
        <h2 className="text-lg font-display font-semibold text-foreground">System Architecture</h2>
        {layers.map((layer, i) => (
          <Card key={layer.title} className="glass-card" style={{ animationDelay: `${i * 100}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${layer.color}`}>
                  <layer.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-display">{layer.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{layer.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {layer.modules.map((mod) => (
                  <div
                    key={mod.name}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <mod.icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{mod.name}</p>
                      <p className="text-xs text-muted-foreground">{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Device Status */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Device Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {deviceStatus.map((d) => (
              <div key={d.name} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                {d.status === "online" ? (
                  <Wifi className="h-4 w-4 text-success" />
                ) : (
                  <WifiOff className="h-4 w-4 text-danger" />
                )}
                <div>
                  <p className="text-xs font-medium text-foreground">{d.name}</p>
                  <p className={`text-[11px] ${d.status === "online" ? "text-success" : "text-danger"}`}>
                    {d.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
