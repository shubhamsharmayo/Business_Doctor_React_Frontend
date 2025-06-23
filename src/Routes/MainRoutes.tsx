import { Routes, Route, useLocation, Navigate } from 'react-router';
import LandingPage from '@/components/LandingPage';
import ClientLayout from '@/client/Clientlayout.tsx';
import ClientDashboard from '@/client/ClientDashboard';
import AiChat from '@/client/AiChat.tsx';
import Onboard from '@/components/Onboard';
import CoachSignup from '../coach/CoachSignup';
import CoachOnboarding from '../coach/CoachOnboarding';
import CoachDashboard from '../coach/CoachDashboard';
import CoachLayout from '../coach/CoachLayout';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { verifyUser } from '../lib/services/verifyUser';




const MainRoutes = () => {
  const { isSignedIn, userId } = useAuth();
  const location = useLocation();
  const [result, setResult] = useState({ allowed: null, redirectTo: '/' });

  

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboard" element={<Onboard />} />
      <Route path="/coach-signup" element={<CoachSignup />} />
      <Route path="/coach-onboarding" element={<CoachOnboarding />} />
      <Route path="/client" element={
       
    <ClientLayout />
  
      }>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="chat" element={<AiChat />} />
      </Route>
      <Route path="/coach" element={<CoachLayout />}>
        <Route path="dashboard" element={<CoachDashboard />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;