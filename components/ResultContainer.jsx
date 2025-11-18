import api from "@/lib/api";
import { useState } from "react";
import AlreadyCheckedIn from "./results/AlreadyCheckedIn";
import Error from "./results/Error";
import NoTicketFound from "./results/NoTicketFound";
import Success from "./results/Success";

const ResultContainer = ({ result, emailOrTicketId, eventId, event }) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmail = emailRegex.test(emailOrTicketId);

  const [checkedIn, setCheckedIn] = useState(false);

  if (result.status === "error") {
    return <Error error={result.error} statusCode={result.statusCode} />;
  }

  const pendingTicket = result.data.tickets.find((e) => e.status === "Pending");
  const ticket = isEmail
    ? pendingTicket
    : result.data.tickets.find((e) => e.ticketId === emailOrTicketId);
  const ticketId = isEmail ? pendingTicket?.ticketId : emailOrTicketId;

  const handleCheckin = async () => {
    try {
      await api.post(`/api/registrations/${eventId}/${ticketId}`);
      setCheckedIn(true);
    } catch (error) {
      console.error("Check-in failed:", error);
    }
  };

  if ((isEmail && !pendingTicket) || !ticket) {
    return <NoTicketFound result={result} />;
  }

  if (!isEmail && ticket.status === "Confirmed") {
    return (
      <AlreadyCheckedIn
        result={result}
        ticketId={ticketId}
        handleCheckin={handleCheckin}
        checkedIn={checkedIn}
      />
    );
  }

  return (
    <Success
      result={result}
      ticketId={ticketId}
      handleCheckin={handleCheckin}
      checkedIn={checkedIn}
      event={event}
    />
  );
};

export default ResultContainer;
