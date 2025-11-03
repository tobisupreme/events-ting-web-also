const UserInfo = ({ user, ticketId }) => {
  return (
    <div className="space-y-1">
      <div>
        <small className="text-gray-400">Name</small>
        <p className="font-bold text-lg text-gray-600">{user.name}</p>
      </div>
      <div>
        <small className="text-gray-400">Email</small>
        <p className="font-bold text-lg text-gray-600">{user.email}</p>
      </div>
      {ticketId && (
        <div>
          <small className="text-gray-400">Ticket ID</small>
          <p className="font-bold text-lg text-gray-600">{ticketId}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
