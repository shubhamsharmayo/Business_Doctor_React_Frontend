import { useMemo, useState, useEffect } from "react";
import { Calendar, Clock, User, Video, Info, ChevronRight } from "lucide-react";

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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const now = new Date();

  // Get next upcoming booking
  const { nextBooking, matchedEvent, timeUntilEvent } = useMemo(() => {
    const allBookings = coaches.flatMap((coach) => coach.bookings);
    const allEvents = coaches.flatMap((coach) => coach.events);
    
    const futureBookings = allBookings
      .filter((booking) => new Date(booking.startTime) > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    const nextBooking = futureBookings[0];
    const matchedEvent = nextBooking 
      ? allEvents.find((event) => event.id === nextBooking.eventId)
      : null;

    let timeUntilEvent = '';
    if (nextBooking) {
      const timeDiff = new Date(nextBooking.startTime).getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      
      if (days > 0) {
        timeUntilEvent = `in ${days} day${days > 1 ? 's' : ''}`;
      } else if (hours > 0) {
        timeUntilEvent = `in ${hours} hour${hours > 1 ? 's' : ''}`;
      } else {
        const minutes = Math.floor(timeDiff / (1000 * 60));
        timeUntilEvent = `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
    }

    return { nextBooking, matchedEvent, timeUntilEvent };
  }, [coaches, now]);

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
      })
    };
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-2xl mx-auto">
        <div className="animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="h-8 bg-gray-300 dark:bg-gray-500 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/2"></div>
              </div>
              <div className="h-12 w-20 bg-gray-300 dark:bg-gray-500 rounded-lg"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-3/4"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-full"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-500 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No upcoming events
  if (!nextBooking || !matchedEvent) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Upcoming Bookings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You don't have any scheduled sessions at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const startDateTime = formatDateTime(nextBooking.startTime);
  const endDateTime = formatDateTime(nextBooking.endTime);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-15 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Next Upcoming Session
        </h2>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium ml-auto">
          {timeUntilEvent}
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 hover:shadow-md transition-all duration-300">
        {/* Title and Duration */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {matchedEvent.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Session with {nextBooking.name}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center gap-1 text-gray-900 dark:text-white">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{matchedEvent.duration}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">min</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Attendee</p>
                <p className="text-gray-600 dark:text-gray-300">{nextBooking.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{nextBooking.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Date & Time</p>
                <p className="text-gray-600 dark:text-gray-300">{startDateTime.date}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {startDateTime.time} - {endDateTime.time}
                </p>
              </div>
            </div>

            {nextBooking.additionalInfo && (
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Additional Info</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {nextBooking.additionalInfo}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Ready to join?
                </p>
                <a
                  href={nextBooking.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 group"
                >
                  <Video className="w-4 h-4" />
                  Join Meeting
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {matchedEvent.description && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Session Details
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {matchedEvent.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;