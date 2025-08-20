import { Routes, Route } from "react-router";
import LandingPage from "@/components/LandingPage";
import ClientLayout from "@/client/Clientlayout.tsx";
import ClientDashboard from "@/client/ClientDashboard";
import AiChat from "@/client/AiChat.tsx";
import Onboard from "@/components/Onboard";
import Meeting from "@/client/Meeting";
import PriceList from '@/client/PriceList'
// import CoachSignup from '../coach/CoachSignup';
// import CoachOnboarding from '../coach/CoachOnboarding';
// import CoachDashboard from '../coach/CoachDashboard';
// import CoachLayout from '../coach/CoachLayout';import { useAuth } from '@clerk/clerk-react';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboard" element={<Onboard />} />
        <Route path="/prices" element={<PriceList />} />
      {/* <Route path="/coach-signup" element={<CoachSignup />} /> */}
      {/* <Route path="/coach-onboarding" element={<CoachOnboarding />} /> */}
      <Route path="/client" element={<ClientLayout />}>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="meetings" element={<Meeting />} />
        <Route path="chat/:chatType" element={<AiChat />} />
      </Route>

      {/* <Route path="/coach" element={<CoachLayout />}> */}
      {/* <Route path="dashboard" element={<CoachDashboard />} /> */}
      {/* </Route> */}
    </Routes>
  );
};

export default MainRoutes;
