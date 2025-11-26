import UserInfo from "./UserInfo";

const NoTicketFound = ({ result }) => {
  return (
    <div className="flex justify-center h-full">
      <div className="text-center">
        <div>
          <svg
            className="w-10 h-10 mx-auto text-gray-700 dark:text-gray-300"
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
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            No Ticket Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No pending ticket found on this email address!
          </p>
        </div>
        <hr className="my-5 w-[80vw]" />
        <UserInfo user={result.data.attendee} />

        {result.data.tickets.length > 0 && (
          <div className="border border-dotted border-gray-300 dark:border-gray-600 rounded p-4 !mt-5">
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
                {result.data.tickets.length === 1
                  ? "The ticket associated to the current email address has been checked in."
                  : `All ${result.data.tickets.length} tickets associated to current email address have been checked in.`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoTicketFound;
