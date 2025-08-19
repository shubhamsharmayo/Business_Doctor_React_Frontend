import {
  Calendar,
  Clock,
  User,
  Video,
  Info,
  Shield,
  ShieldCheck,
  ExternalLink,
  FileText,
  Users,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

type Booking = {
  id: string;
  eventId: string;
  startTime: string;
  endTime: string;
  meetLink: string;
  name: string;
  additionalInfo: string;
  email: string;
};

type Event = {
  id: string;
  title: string;
  description: string;
  duration: number;
  isPrivate: boolean;
};

type Users = {
  name: string;
  bookings: Booking[];
  events: Event[];
};

const BookingLists = ({ users }: { users: Users[] }) => {
  const { user } = useUser();
  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };
  console.log(users);
  // console.log(users[0]);

  const allbookings = users.map((book) => book.bookings);
  console.log(allbookings);
 const userbookings = allbookings.flatMap((e)=>e.filter(
      (each) => each.email === user?.externalAccounts[0].emailAddress
    ))
    const bookingAndEvent = [{bookings:userbookings, events:users[0].events, name:users[0].name}]
  console.log(bookingAndEvent)
  // Get upcoming vs past bookings
  const categorizeBookings = (bookings: Booking[]) => {
    const now = new Date();
    const upcoming = bookings.filter((b) => new Date(b.startTime) > now);
    const past = bookings.filter((b) => new Date(b.startTime) <= now);
    return { upcoming, past };
  };

  if (!users || users.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Loading User Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we fetch your booking information...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {bookingAndEvent.map((u) => {
        // Group bookings by eventId
        const bookingsByEvent = u.bookings.reduce((acc, booking) => {
          if (!acc[booking.eventId]) acc[booking.eventId] = [];
          acc[booking.eventId].push(booking);
          return acc;
        }, {} as Record<string, Booking[]>);

        const bookedEvents = u.events?.filter((event) =>
          Object.prototype.hasOwnProperty.call(bookingsByEvent, event.id)
        );

        const totalBookings = u.bookings.length;
        const { upcoming: upcomingBookings } = categorizeBookings(u.bookings);

        return (
          <div
            key={u.name}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {u.name}'s Bookings
                    </h2>
                    <p className="text-blue-100 text-sm">
                      Manage your scheduled sessions
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalBookings}</div>
                    <div className="text-xs text-blue-100">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {upcomingBookings.length}
                    </div>
                    <div className="text-xs text-blue-100">Upcoming</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {bookedEvents && bookedEvents.length > 0 ? (
                <div className="space-y-6">
                  {bookedEvents.map((event) => {
                    const eventBookings = bookingsByEvent[event.id];
                    const { upcoming, past } =
                      categorizeBookings(eventBookings);

                    return (
                      <div
                        key={event.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                      >
                        {/* Event Header */}
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-[1.5rem] font-semibold text-gray-900 dark:text-white">
                                  {event.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                  {event.isPrivate ? (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-xs">
                                      <Shield className="w-3 h-3" />
                                      Private
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                                      <ShieldCheck className="w-3 h-3" />
                                      Public
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                                    <Clock className="w-3 h-3" />
                                    {event.duration} min
                                  </div>
                                </div>
                              </div>
                              {event.description && (
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {event.description}
                                </p>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {eventBookings.length} booking
                                {eventBookings.length !== 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bookings */}
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {/* Upcoming Bookings */}
                          {upcoming.length > 0 && (
                            <>
                              <div className="px-6 py-3 bg-green-50 dark:bg-green-900 bg-opacity-20">
                                <h4 className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  Upcoming Sessions ({upcoming.length})
                                </h4>
                              </div>
                              {upcoming.map((booking) => {
                                const startTime = formatDateTime(
                                  booking.startTime
                                );
                                const endTime = formatDateTime(booking.endTime);

                                return (
                                  <div
                                    key={booking.id}
                                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                          <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                          <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                              {booking.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                              Attendee
                                            </p>
                                          </div>

                                          <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                              {startTime.date}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                              {startTime.time} - {endTime.time}
                                            </p>
                                          </div>

                                          <div className="flex items-center gap-2">
                                            {booking.additionalInfo && (
                                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <Info className="w-3 h-3" />
                                                <span
                                                  className="truncate max-w-32"
                                                  title={booking.additionalInfo}
                                                >
                                                  {booking.additionalInfo}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="ml-4">
                                        <a
                                          href={booking.meetLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium group"
                                        >
                                          <Video className="w-4 h-4" />
                                          Join
                                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}

                          {/* Past Bookings */}
                          {past.length > 0 && (
                            <>
                              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                  <FileText className="w-4 h-4" />
                                  Past Sessions ({past.length})
                                </h4>
                              </div>
                              {past.map((booking) => {
                                const startTime = formatDateTime(
                                  booking.startTime
                                );
                                const endTime = formatDateTime(booking.endTime);

                                return (
                                  <div
                                    key={booking.id}
                                    className="px-6 py-4 opacity-75"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                          <User className="w-6 h-6 text-gray-500" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                          <div>
                                            <p className="font-medium text-gray-600 dark:text-gray-300">
                                              {booking.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                              Completed
                                            </p>
                                          </div>

                                          <div>
                                            <p className="font-medium text-gray-600 dark:text-gray-300">
                                              {startTime.date}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                              {startTime.time} - {endTime.time}
                                            </p>
                                          </div>

                                          <div className="flex items-center gap-2">
                                            {booking.additionalInfo && (
                                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <Info className="w-3 h-3" />
                                                <span
                                                  className="truncate max-w-32"
                                                  title={booking.additionalInfo}
                                                >
                                                  {booking.additionalInfo}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="ml-4">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-sm">
                                          Completed
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Bookings Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You don't have any scheduled sessions yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingLists;
