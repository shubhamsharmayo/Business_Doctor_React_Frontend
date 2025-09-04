import { Routes, Route } from "react-router";
import LandingPage from "@/components/LandingPage";
import ClientLayout from "@/client/Clientlayout.tsx";
import ClientDashboard from "@/client/ClientDashboard";
import AiChat from "@/client/AiChat.tsx";
import Onboard from "@/components/Onboard";
import Meeting from "@/client/Meeting";
import PricePage from '@/client/PricePage'
import Success from '@/components/Success'
import  Cancel  from "@/components/Cancel";
import NotFound from "@/client/NotFound";
import Coaches from "@/client/Coaches";
// import CoachSignup from '../coach/CoachSignup';
// import CoachOnboarding from '../coach/CoachOnboarding';
// import CoachDashboard from '../coach/CoachDashboard';
// import CoachLayout from '../coach/CoachLayout';import { useAuth } from '@clerk/clerk-react';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound/>} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboard" element={<Onboard />} />
        <Route path="/prices" element={<PricePage />} />
      {/* <Route path="/coach-signup" element={<CoachSignup />} /> */}
      {/* <Route path="/coach-onboarding" element={<CoachOnboarding />} /> */}
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/client" element={<ClientLayout />}>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="meetings" element={<Meeting />} />
        <Route path="coach" element={<Coaches />} />

        <Route path="chat/:chatType" element={<AiChat />} />
      </Route>

      {/* <Route path="/coach" element={<CoachLayout />}> */}
      {/* <Route path="dashboard" element={<CoachDashboard />} /> */}
      {/* </Route> */}
    </Routes>
  );
};

export default MainRoutes;
