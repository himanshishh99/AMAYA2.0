import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PillBottle, ClipboardList, AlertTriangle, Package } from "lucide-react";

export default function PharmacistDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center mb-5">
        <PillBottle className="h-8 w-8 text-warning" />
      </div>
      <h1 className="text-2xl font-display font-bold text-foreground">Pharmacist Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-2 mb-6">This module is under development</p>
      <Badge className="bg-warning/10 text-warning border-0 text-sm px-4 py-1">Coming Soon</Badge>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-full max-w-2xl">
        {[
          { icon: ClipboardList, title: "Prescription Queue", desc: "Pending orders & verification" },
          { icon: AlertTriangle, title: "Drug Interactions", desc: "AI-powered safety checks" },
          { icon: Package, title: "Inventory Tracker", desc: "Stock levels & reorder alerts" },
        ].map((item) => (
          <Card key={item.title} className="glass-card opacity-50">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <item.icon className="h-6 w-6 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
