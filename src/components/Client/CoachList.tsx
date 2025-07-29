// components/CoachList.tsx


import { NEXT_BASE_URL, NODE_API_BASE_URL } from '@/lib/api_base_url';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useUser } from '@clerk/clerk-react';


type Coach = {
  id: string;
  name: string;
  imageUrl: string | null;
  industry: string | null;
  experience: string | null;
  events: { title: string }[];
  clerkUserId: string;
};

export default function CoachList({assignedCoach,coachData}) {

  const [selectingId, setSelectingId] = useState<string | null>(null);

  const {isLoaded,user}=useUser();

  console.log("user",user);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("coaches",coaches);


  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch(`${NEXT_BASE_URL}/api/coach`);
        const data = await res.json();
        console.log('res', res);
        setCoaches(data.users || []);
      } catch (err) {
        console.error('Failed to fetch coaches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

   const handleSelectCoach = async (coachId: string) => {
    setSelectingId(coachId);
    try {
      // Step 1: Call your Next.js backend
    const nextRes= await fetch(`${NEXT_BASE_URL}/api/v1/select-coach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coachId,
          clientId: user?.id,
        }),
      });

      const nextData = await nextRes.json();

    if (!nextRes.ok) {
      throw new Error(nextData.error || 'Failed to select coach in Next.js backend');
    }

      console.log('✅ Coach selected in Next backend:', nextData);
     
      // Step 2: Call your Node.js (Mongo) backend to assign coach
    const nodeRes = await fetch(`${NODE_API_BASE_URL}/user/assign-coach`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coachClerkId: coachId,
        clientClerkId: user?.id,
      }),
    });

    const nodeData = await nodeRes.json();

    if (!nodeRes.ok) {
      throw new Error(nodeData.message || 'Failed to assign coach in Node backend');
    }

    console.log('✅ Coach assigned in Node backend:', nodeData);



      // Optional: show a success message or redirect
    } catch (err) {
      console.error('Error selecting coach:', err);
    } finally {
      setSelectingId(null);
    }
  };

  const handleBookSession = async (coachUsername: string) => {
  if (!coachUsername) {
    console.error("Coach username is required");
    return;
  }

  const url = `https://businessdoctor.vercel.app/${coachUsername}`;
  window.open(url, '_blank');
};




  if (loading && !isLoaded) return <p className="text-center my-8">Loading coaches...</p>;

  return (
    <div className='my-6'>
  <h2 className="text-2xl font-semibold mb-4">
    {assignedCoach ? 'Your Assigned Coach' : 'Select Coaches'}
  </h2>

  {/* Case 1: Coach already assigned */}
  {assignedCoach && coachData ? (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto text-center">
      <img
        src={coachData.imageUrl || '/placeholder.jpg'}
        alt={coachData.name}
        className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
      />
      <h2 className="text-lg font-semibold">{coachData.name}</h2>
      <p className="text-sm text-gray-500 mb-1">{coachData.events?.[0]?.title || 'No Title'}</p>
      <p className="text-sm text-gray-600"><strong>Industry:</strong> {coachData.industry || 'Not specified'}</p>
      <p className="text-sm text-gray-600"><strong>Experience:</strong> {coachData.experience || 'Not mentioned'}</p>

      <Button onClick={() => handleBookSession(coachData.username)} className='my-4' >Book Session</Button>
    </div>
  ) : (
    // Case 2: No coach assigned yet
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {coaches.map((coach) => (
        <div
          key={coach.id}
          className="bg-white shadow-md rounded-2xl overflow-hidden p-4 flex flex-col items-center text-center"
        >
          <img
            src={coach.imageUrl || '/placeholder.jpg'}
            alt={coach.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-lg font-semibold">{coach.name}</h2>
          <p className="text-sm text-gray-500 mb-1">{coach.events[0]?.title || 'No Title'}</p>
          <p className="text-sm text-gray-600"><strong>Industry:</strong> {coach.industry || 'Not specified'}</p>
          <p className="text-sm text-gray-600"><strong>Experience:</strong> {coach.experience || 'Not mentioned'}</p>
          <Button
            className="my-4"
            onClick={() => handleSelectCoach(coach.clerkUserId)}
            disabled={selectingId === coach.clerkUserId}
          >
            {selectingId === coach.id ? 'Selecting...' : 'Select Coach'}
          </Button>
        </div>
      ))}
    </div>
  )}
   </div>

  )}
