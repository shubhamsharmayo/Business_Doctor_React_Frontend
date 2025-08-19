
import { NEXT_BASE_URL } from "@/lib/api_base_url";
import BookingLists from "@/components/Client/Project Management/BookingLists";
import { useQuery } from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";

const Meeting = () => {
  const {user} = useUser()
  // console.log(user?.id)
  const FetchBookings = async () => {
    try {
      const bookings = await fetch(`${NEXT_BASE_URL}/api/assigned-coach/${user?.id}`);
      const data = await bookings.json();
      // console.log(data)

      return data;
    } catch (error) {
      console.error("Failed to fetch user or coach:", error);
    }
  };

  
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: FetchBookings,
  });
  // console.log(data?.coaches)
  if (error) return <div>Error fetching bookings</div>;
  return (
    <div>
      {isLoading ? (
        <div className="p-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded-lg mt-15">
          <h2 className="text-xl font-semibold mb-4">
            Booked Events
          </h2>

          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto dark:bg-gray-700 bg-gray-200 text-black dark:text-white border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left dark:bg-gray-700 bg-white text-black dark:text-white text-sm">
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                  <th className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-1"></th>
                </tr>
              </thead>
              <tbody>
                {[...Array(4)].map((_, index) => (
                  <tr
                    key={index}
                    className="dark:bg-gray-500 bg-white text-black dark:text-white animate-pulse rounded-md"
                  >
                    {Array(9)
                      .fill(0)
                      .map((_, i) => (
                        <td key={i} className="px-4 py-2">
                          <div className="h-4 dark:bg-gray-700 bg-gray-200 text-black dark:text-white rounded w-24"></div>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-9">
          <BookingLists users={data?.coaches} />
        </div>
      )}
    </div>
  );
};

export default Meeting;
