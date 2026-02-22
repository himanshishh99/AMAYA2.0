import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileLock2,
  FlaskConical,
  Heart,
  Pill,
  User,
  Stethoscope,
  PillBottle,
  Home,
} from "lucide-react";

const dashboards = [
  { title: "Role Select", url: "/", icon: Home },
  { title: "System Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Patient View", url: "/dashboard/patient", icon: User },
  { title: "Doctor View", url: "/dashboard/doctor", icon: Stethoscope },
  { title: "Pharmacist View", url: "/dashboard/pharmacist", icon: PillBottle },
];

const modules = [
  { title: "MedBot AI", url: "/medbot", icon: MessageSquare },
  { title: "Queue Manager", url: "/queue", icon: Users },
  { title: "Secure Vault", url: "/vault", icon: FileLock2 },
  { title: "AI LabLink", url: "/lablink", icon: FlaskConical },
  { title: "AidMatch AI", url: "/aidmatch", icon: Heart },
  { title: "Smart Pill Box", url: "/pillbox", icon: Pill },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-base tracking-tight text-foreground">AMAYA</h1>
            <p className="text-[11px] text-muted-foreground leading-none">Chronic Care Platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground px-5">
            Dashboards
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboards.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-muted-foreground rounded-lg mx-2 transition-colors hover:bg-amaya-50 hover:text-foreground"
                      activeClassName="bg-amaya-50 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground px-5">
            Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-muted-foreground rounded-lg mx-2 transition-colors hover:bg-amaya-50 hover:text-foreground"
                      activeClassName="bg-amaya-50 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
