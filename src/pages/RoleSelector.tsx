import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { User, Stethoscope, PillBottle } from "lucide-react";

const roles = [
  {
    id: "patient",
    title: "Patient",
    subtitle: "Track medications, view reports & manage health",
    icon: User,
    color: "bg-primary/10 text-primary",
    borderHover: "hover:border-primary/40 hover:shadow-md hover:shadow-primary/5",
    route: "/dashboard/patient",
  },
  {
    id: "doctor",
    title: "Doctor",
    subtitle: "Manage patients, review labs & secure documents",
    icon: Stethoscope,
    color: "bg-success/10 text-success",
    borderHover: "hover:border-success/40 hover:shadow-md hover:shadow-success/5",
    route: "/dashboard/doctor",
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    subtitle: "Prescription management & drug interactions",
    icon: PillBottle,
    color: "bg-warning/10 text-warning",
    borderHover: "hover:border-warning/40 hover:shadow-md hover:shadow-warning/5",
    route: "/dashboard/pharmacist",
    comingSoon: true,
  },
];

export default function RoleSelector() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
          <span className="text-primary-foreground font-display font-bold text-xl">A</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground">Welcome to AMAYA</h1>
        <p className="text-sm text-muted-foreground mt-2">Select your role to access your personalized dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl">
        {roles.map((role) => (
          <Card
            key={role.id}
            onClick={() => !role.comingSoon && navigate(role.route)}
            className={`glass-card cursor-pointer transition-all duration-200 ${role.borderHover} ${
              role.comingSoon ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${role.color} mb-4`}>
                <role.icon className="h-7 w-7" />
              </div>
              <h2 className="font-display font-bold text-foreground text-lg">{role.title}</h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{role.subtitle}</p>
              {role.comingSoon && (
                <Badge variant="secondary" className="mt-3 text-[10px] bg-warning/10 text-warning border-0">
                  Coming Soon
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
