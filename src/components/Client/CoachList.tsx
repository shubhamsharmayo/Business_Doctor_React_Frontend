// components/CoachList.tsx


import { NEXT_BASE_URL } from '@/lib/api_base_url';
import { useEffect, useState } from 'react';


type Coach = {
  id: string;
  name: string;
  imageUrl: string | null;
  industry: string | null;
  experience: string | null;
  events: { title: string }[];
};

export default function CoachList() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center">Loading coaches...</p>;

  return (
    <div className='my-6'>
         <h2 className="text-2xl font-semibold mb-4">Select Coaches</h2>
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
          <p className="text-sm text-gray-500 mb-1">
            {coach.events[0]?.title || 'No Title'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Industry:</strong> {coach.industry || 'Not specified'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Experience:</strong> {coach.experience || 'Not mentioned'}
          </p>
        </div>
      ))}
    </div>
    </div>
  );
}
