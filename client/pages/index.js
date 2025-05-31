import Link from "next/link";
import buildClient from "../api/build-client"

function LandingPage({ currentUser, tickets }) {
  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Titile</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  )
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
  try {
    const { data } = await client.get("/api/tickets");
    return { tickets: data };
  } catch (err) {
    console.error("Error fetching tickets:", err.response?.data || err.message);
    return { tickets: [] }; // fallback, don't crash
  }
}

export default LandingPage