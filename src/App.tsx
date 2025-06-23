import {
  useUser,
} from '@clerk/clerk-react';
import MainRoutes from '@/Routes/MainRoutes.js';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const { user } = useUser();
  console.log(user);

  
  return (
    <div className="">
     <MainRoutes/>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
