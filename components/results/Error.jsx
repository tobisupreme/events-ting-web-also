const Error = ({ error, statusCode }) => {
  const is404 = statusCode === 404;

  return (
    <div className="flex justify-center items-center h-full py-8">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className={`rounded-full p-4 ${
              is404
                ? "bg-orange-100 dark:bg-orange-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            }`}
          >
            {is404 ? (
              <svg
                className="w-16 h-16 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-16 h-16 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {is404 ? "Ticket Not Found" : "Oops! Something went wrong"}
        </h1>

        {/* Error Message */}
        <div
          className={`rounded-lg p-4 mb-4 ${
            is404
              ? "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <p
            className={`text-sm font-medium ${
              is404
                ? "text-orange-800 dark:text-orange-300"
                : "text-red-800 dark:text-red-300"
            }`}
          >
            {is404
              ? "We couldn't find a ticket matching this ID or email address. Please verify the information and try again."
              : error || "An unexpected error occurred. Please try again."}
          </p>
        </div>

        {/* Help Text */}
        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help? Try the following:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {is404 ? (
              <>
                <li>• Verify the ticket ID or email address is correct</li>
                <li>• Check if the ticket was purchased for this event</li>
                <li>• Contact the ticket holder to confirm details</li>
                <li>• Reach out to event support for assistance</li>
              </>
            ) : (
              <>
                <li>• Double-check the ticket ID or email address</li>
                <li>• Ensure the QR code is clear and not damaged</li>
                <li>• Contact event support if the issue persists</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Error;
