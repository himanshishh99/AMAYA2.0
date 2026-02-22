import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  FileLock2,
  Lock,
  Shield,
  Users,
  FileText,
  FlaskConical,
  MessageSquare,
  Activity,
  ArrowRight,
  Eye,
  UserCheck,
  Clock,
} from "lucide-react";

/* ── Mock Data ── */
const recentDocs = [
  { name: "Blood Work — Patient Kumar", type: "Lab Report", date: "Feb 20", access: ["Doctor", "Patient"], encrypted: true },
  { name: "MRI Scan — Brain", type: "Imaging", date: "Feb 18", access: ["Doctor"], encrypted: true },
  { name: "Discharge Summary — Patel", type: "Clinical Note", date: "Feb 15", access: ["Doctor", "Caregiver"], encrypted: true },
  { name: "Prescription — Metformin", type: "Rx", date: "Feb 15", access: ["Doctor", "Patient", "Caregiver"], encrypted: true },
  { name: "Insurance Claim #4521", type: "Insurance", date: "Feb 10", access: ["Patient"], encrypted: true },
];

const accessColors: Record<string, string> = {
  Doctor: "bg-primary/10 text-primary",
  Patient: "bg-success/10 text-success",
  Caregiver: "bg-warning/10 text-warning",
};

const recentPatients = [
  { name: "Patient Kumar", condition: "Type 2 Diabetes", risk: "Moderate", lastVisit: "2 days ago" },
  { name: "Patient Sharma", condition: "Hypothyroidism", risk: "Low", lastVisit: "5 days ago" },
  { name: "Patient Patel", condition: "Hypertension", risk: "High", lastVisit: "1 week ago" },
];

const riskStyle: Record<string, string> = {
  Low: "status-low",
  Moderate: "status-moderate",
  High: "status-high",
};

const docStats = [
  { label: "Active Patients", value: "48", sub: "3 critical", color: "text-primary" },
  { label: "Pending Reviews", value: "7", sub: "Lab reports", color: "text-warning" },
  { label: "Documents Stored", value: "1,203", sub: "100% encrypted", color: "text-success" },
  { label: "Consultations Today", value: "12", sub: "2 remaining", color: "text-info" },
];

const accessLog = [
  { user: "Dr. Sharma", action: "Viewed", file: "Blood Work — Kumar", time: "10 min ago" },
  { user: "Nurse Patel", action: "Downloaded", file: "Discharge Summary", time: "1 hr ago" },
  { user: "Patient Kumar", action: "Viewed", file: "Prescription — Metformin", time: "3 hrs ago" },
];

export default function DoctorDashboard() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Doctor Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Clinical overview, patient management & secure documents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {docStats.map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ★ HIGHLIGHTED: Secure Document Vault */}
      <Card className="border-2 border-success/20 bg-success/5 shadow-sm shadow-success/5">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <FileLock2 className="h-4 w-4 text-success" />
              </div>
              Secure Document Vault
              <Badge className="bg-success/10 text-success border-0 text-[10px]">★ Featured</Badge>
            </CardTitle>
            <Link to="/vault" className="text-xs text-success flex items-center gap-1 hover:underline">
              Full View <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Document List */}
            <div className="lg:col-span-2 space-y-1.5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <FileText className="h-3 w-3" /> Recent Documents
                </p>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3 w-3 text-success" />
                  <span className="text-[10px] text-success font-medium">AES-256 Encrypted</span>
                </div>
              </div>
              {recentDocs.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-2.5 rounded-lg bg-card/60 border border-border/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm text-foreground truncate">{doc.name}</p>
                        <Badge variant="outline" className="text-[9px] px-1 py-0 gap-0.5 text-success border-success/30 shrink-0">
                          <Lock className="h-2 w-2" /> Encrypted
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{doc.type} · {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {doc.access.map((role) => (
                      <Badge key={role} className={`text-[9px] px-1.5 py-0 border-0 ${accessColors[role]}`}>{role}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Access Log */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <Eye className="h-3 w-3" /> Recent Access Log
              </p>
              <div className="space-y-2">
                {accessLog.map((log, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-card/60 border border-border/30">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">{log.user}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {log.action} "{log.file}"
                    </p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-2.5 w-2.5" /> {log.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Patients */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Recent Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentPatients.map((p) => (
              <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.condition} · Last visit: {p.lastVisit}</p>
                </div>
                <Badge className={`text-[10px] px-2 py-0.5 border-0 ${riskStyle[p.risk]}`}>{p.risk} Risk</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/lablink">
          <Card className="glass-card hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <FlaskConical className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">AI LabLink</p>
                <p className="text-xs text-muted-foreground">7 pending reviews</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/queue">
          <Card className="glass-card hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Queue Manager</p>
                <p className="text-xs text-muted-foreground">4 patients waiting</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/medbot">
          <Card className="glass-card hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">MedBot AI</p>
                <p className="text-xs text-muted-foreground">3 triage requests</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
