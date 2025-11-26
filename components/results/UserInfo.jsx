const UserInfo = ({ user, ticketId }) => {
  return (
    <div className="space-y-1">
      <div>
        <small className="text-gray-400 dark:text-gray-500">Name</small>
        <p className="font-bold text-lg text-gray-600 dark:text-gray-400">
          {user.name}
        </p>
      </div>
      <div>
        <small className="text-gray-400 dark:text-gray-500">Email</small>
        <p className="font-bold text-lg text-gray-600 dark:text-gray-400">
          {user.email}
        </p>
      </div>
      {ticketId && (
        <div>
          <small className="text-gray-400 dark:text-gray-500">Ticket ID</small>
          <p className="font-bold text-lg text-gray-600 dark:text-gray-400">
            {ticketId}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
