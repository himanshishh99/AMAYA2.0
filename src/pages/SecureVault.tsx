import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Lock, Shield, Eye } from "lucide-react";

interface VaultDoc {
  name: string;
  type: string;
  date: string;
  size: string;
  access: ("Doctor" | "Patient" | "Caregiver")[];
  encrypted: boolean;
}

const docs: VaultDoc[] = [
  { name: "Blood Work Report - Feb 2026", type: "Lab Report", date: "2026-02-20", size: "1.2 MB", access: ["Doctor", "Patient"], encrypted: true },
  { name: "MRI Scan - Brain", type: "Imaging", date: "2026-02-18", size: "45 MB", access: ["Doctor"], encrypted: true },
  { name: "Prescription - Metformin", type: "Prescription", date: "2026-02-15", size: "0.3 MB", access: ["Doctor", "Patient", "Caregiver"], encrypted: true },
  { name: "Insurance Claim #4521", type: "Insurance", date: "2026-02-10", size: "0.8 MB", access: ["Patient"], encrypted: true },
  { name: "Discharge Summary", type: "Clinical Note", date: "2026-02-05", size: "0.5 MB", access: ["Doctor", "Caregiver"], encrypted: true },
];

const accessColors: Record<string, string> = {
  Doctor: "bg-primary/10 text-primary",
  Patient: "bg-success/10 text-success",
  Caregiver: "bg-warning/10 text-warning",
};

export default function SecureVault() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Secure Document Vault</h1>
        <p className="text-sm text-muted-foreground mt-1">AES-256 encrypted document storage with role-based access</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Encryption</p>
              <p className="text-sm font-bold text-foreground">AES-256</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Files</p>
              <p className="text-sm font-bold text-foreground">{docs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <Eye className="h-5 w-5 text-info" />
            <div>
              <p className="text-xs text-muted-foreground">Access Logs</p>
              <p className="text-sm font-bold text-foreground">142</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {docs.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      {doc.encrypted && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-1 text-success border-success/30">
                          <Lock className="h-2.5 w-2.5" /> Encrypted
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{doc.type} · {doc.size} · {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {doc.access.map((role) => (
                    <Badge key={role} className={`text-[10px] px-1.5 py-0 border-0 ${accessColors[role]}`}>
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
