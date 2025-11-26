import { getEventStatus } from "@/lib/eventUtils";
import { Clock } from "lucide-react";
import { useState } from "react";
import UserInfo from "./UserInfo";

const Success = ({ result, ticketId, handleCheckin, checkedIn, event }) => {
  const [isLoading, setIsLoading] = useState(false);

  const isPastEvent = event
    ? !getEventStatus(event.startDate, event.endDate).isUpcoming &&
      !getEventStatus(event.startDate, event.endDate).isOngoing
    : false;

  const formattedEndDate = event
    ? new Date(event.endDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div>
      <div className="flex justify-center h-full">
        <div className="text-center">
          {checkedIn ? (
            <>
              <svg
                className="mx-auto w-10 h-10 text-theme-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-2xl font-bold text-theme-primary">Success</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Ticket has been checked in successfully!
              </p>
            </>
          ) : (
            <>
              <svg
                className="mx-auto w-10 h-10 text-theme-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-2xl font-bold text-theme-primary">
                Ticket Found
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Please confirm the check in for this ticket
              </p>
            </>
          )}
          <div>
            <hr className="my-5 w-[80vw]" />
            <UserInfo user={result.data.attendee} ticketId={ticketId} />

            {/* Past event warning */}
            {isPastEvent && !checkedIn && (
              <div className="mb-3 flex space-x-2 items-start mx-auto p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-lg w-fit mt-5 max-w-md">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-orange-800 dark:text-orange-200">
                    Past Event Warning
                  </p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    This event ended on {formattedEndDate}. Please confirm you
                    want to proceed with check-in.
                  </p>
                </div>
              </div>
            )}

            {!checkedIn ? (
              <button
                className="btn !bg-theme-primary !hover:bg-theme-primary_dark my-5"
                onClick={async () => {
                  setIsLoading(true);
                  await handleCheckin();
                  setIsLoading(false);
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center" role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div className="flex justify-center" role="status">
                    <svg
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                    </svg>
                    <span>Check In this ticket!</span>
                  </div>
                )}
              </button>
            ) : (
              <button className="btn !bg-green-500 my-5">
                <div className="flex justify-center" role="status">
                  <svg
                    className="w-8 h-8 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span className="sr-only">Done</span>
                </div>
              </button>
            )}

            {result.data.tickets.length > 1 &&
              result.data.tickets.filter((e) => e.status === "Pending").length >
                0 && (
                <div className="mb-3 flex space-x-1 italic items-center mx-auto p-3 bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 rounded w-fit mt-5">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span className="text-blue-700 dark:text-blue-300">
                    This person has{" "}
                    {
                      result.data.tickets.filter((e) => e.status === "Pending")
                        .length
                    }{" "}
                    more available tickets.
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
