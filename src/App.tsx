import {
  useUser,
} from '@clerk/clerk-react';
import MainRoutes from '@/Routes/MainRoutes.jsx';


export default function App() {
  const { user } = useUser();
  console.log(user);

  
  return (
    <div className="">
     <MainRoutes/>
    </div>
  );
}
