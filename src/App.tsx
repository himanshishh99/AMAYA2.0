import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import RoleSelector from "./pages/RoleSelector";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import MedBot from "./pages/MedBot";
import QueueManager from "./pages/QueueManager";
import SecureVault from "./pages/SecureVault";
import LabLink from "./pages/LabLink";
import AidMatch from "./pages/AidMatch";
import PillBox from "./pages/PillBox";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<RoleSelector />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
            <Route path="/dashboard/pharmacist" element={<PharmacistDashboard />} />
            <Route path="/medbot" element={<MedBot />} />
            <Route path="/queue" element={<QueueManager />} />
            <Route path="/vault" element={<SecureVault />} />
            <Route path="/lablink" element={<LabLink />} />
            <Route path="/aidmatch" element={<AidMatch />} />
            <Route path="/pillbox" element={<PillBox />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
