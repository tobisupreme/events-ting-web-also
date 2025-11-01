import { useState } from "react";
import AlreadyCheckedIn from "./results/AlreadyCheckedIn";
import Error from "./results/Error";
import NoTicketFound from "./results/NoTicketFound";
import Success from "./results/Success";

const ResultContainer = ({ result, emailOrTicketId }) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmail = emailRegex.test(emailOrTicketId);

  const [checkedIn, setCheckedIn] = useState(false);

  if (result.status === "error") {
    return <Error error={result.error} />;
  }

  const pendingTicket = result.data.tickets.find((e) => e.status === "Pending");
  const ticket = isEmail
    ? pendingTicket
    : result.data.tickets.find((e) => e.ticketId === emailOrTicketId);
  const ticketId = isEmail ? pendingTicket?.ticketId : emailOrTicketId;

  const handleCheckin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/events/${process.env.NEXT_PUBLIC_EVENT_ID}/registrations/${ticketId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Confirmed",
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    setCheckedIn(true);
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
    />
  );
};

export default ResultContainer;
