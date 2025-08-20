import { useState, useEffect } from "react";
import { Calendar, Clock, User, Video, Info, ChevronRight } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

type Event = {
  id: string;
  title: string;
  description: string;
  duration: number;
  userId: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
};

type Booking = {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  additionalInfo: string;
  startTime: string;
  endTime: string;
  meetLink: string;
  googleEventId: string;
  createdAt: string;
  updatedAt: string;
};

type Coaches = {
  id: string;
  clerkUserId: string;
  username: string;
  name: string;
  imageUrl: string | null;
  clientIds: string[];
  industry: string | null;
  experience: string | null;
  events: Event[];
  bookings: Booking[];
};

const UpcomingEvents = ({ coaches }: { coaches: Coaches[] }) => {
  const [loading, setLoading] = useState(true);
  const {user} = useUser()
  // console.log(coaches);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Helper function to get next booking data
  const getNextBookingData = () => {
    const now = new Date();
    
    // Get all bookings with coach data
    const bookings  = coaches.flatMap(coach => coach.bookings.filter((coaches)=> coaches.email === user?.externalAccounts[0].emailAddress));
    const  allBookings= bookings.map((each)=> ({...each}))
    // console.log(allBookings)
    // Get all events
    const allEvents = coaches.flatMap((coach) => coach.events);
    
    // Filter and sort future bookings
    const futureBookings = allBookings
    .filter((booking) => new Date(booking.startTime) > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
   

    const nextBooking = futureBookings[0];
    
    if (!nextBooking) {
      return { nextBooking: null, matchedEvent: null, timeUntilEvent: '' };
    }

    // Find matching event
    const matchedEvent = allEvents.find((event) => event.id === nextBooking.eventId);
 
    // Calculate time until event
    const timeDiff = new Date(nextBooking.startTime).getTime() - now.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    let timeUntilEvent = '';
    if (days > 0) {
      timeUntilEvent = `${days} day${days > 1 ? 's' : ''} away`;
    } else if (hours > 0) {
      timeUntilEvent = `${hours} hour${hours > 1 ? 's' : ''} away`;
    } else {
      const minutes = Math.floor(timeDiff / (1000 * 60));
      timeUntilEvent = `${minutes} minute${minutes > 1 ? 's' : ''} away`;
    }

    return { nextBooking, matchedEvent, timeUntilEvent };
  };

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      dayMonth: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    };
  };

  // Get the booking data
  const { nextBooking, matchedEvent, timeUntilEvent } = getNextBookingData();

  // Compact loading skeleton
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-20 max-w-2xl mx-auto">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-20"></div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-5">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
                <div className="h-10 w-16 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              </div>
              
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact no upcoming events
  if (!nextBooking || !matchedEvent) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-20 max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              No Upcoming Sessions
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              Your calendar is clear. Scheduled sessions will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const startDateTime = formatDateTime(nextBooking.startTime);
  const endDateTime = formatDateTime(nextBooking.endTime);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-20 max-w-2xl mx-auto">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Next Session
          </h2>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            {timeUntilEvent}
          </span>
        </div>
      </div>

      {/* Compact Main Card */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-5 border border-gray-100 dark:border-gray-600">
        
        {/* Session Title & Duration */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
              {matchedEvent.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              with {nextBooking.name}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-sm ml-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-gray-900 dark:text-white">
              <Clock className="w-3 h-3 text-blue-500" />
              <span className="font-semibold text-sm">{matchedEvent.duration}m</span>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-3 mb-5 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-xs text-blue-600 dark:text-blue-400">
              {startDateTime.dayMonth.split(' ')[1]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
              {startDateTime.date}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {startDateTime.time} - {endDateTime.time}
            </p>
          </div>
        </div>

        {/* Compact Details Grid */}
        <div className="grid grid-cols-1 gap-4 mb-5">
          {/* Attendee & Session Combined */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">
                    Attendee
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-200 font-medium truncate">
                    {nextBooking.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {nextBooking.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">
                    Type
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {matchedEvent.isPrivate ? 'Private' : 'Group'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {matchedEvent.duration} min session
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info (if exists) */}
          {nextBooking.additionalInfo && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-xs mb-1">
                    Notes
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {nextBooking.additionalInfo}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Join Meeting Button */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Video className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Ready to join?
              </span>
            </div>
            <a
              href={nextBooking.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 group text-sm"
            >
              <Video className="w-4 h-4" />
              Join Meeting
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;