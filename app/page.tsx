import Link from "next/link";
import { deleteTicket, getTickets } from "@/lib/actions";

async function Home() {
  const result = await getTickets();

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-left w-full">Tickets</h1>

      {result.length > 0 ? (
        <ul className="w-full flex gap-5 flex-col">
          {result.map((ticket) => (
            <li
              key={ticket.id}
              className="p-5 rounded-md bg-zinc-100 shadow-md flex gap-5 justify-between w-full"
            >
              <Link href={`/ticket/update/${ticket.id}`} className="flex-1">
                <p>
                  {ticket.name}
                  <br />
                  <span className="text-xs">
                    {ticket.status} - {ticket.type}
                  </span>
                </p>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await deleteTicket(ticket.id);
                }}
              >
                <button type="submit" className="text-red-500">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets</p>
      )}

      <div className="flex gap-5 flex-wrap">
        <Link href="/ticket/create" className="text-blue-700">
          Create a new ticket
        </Link>
        <Link href="/ticket/create/client" className="text-blue-700">
          Create a new ticket (client)
        </Link>
      </div>
    </main>
  );
}

export default Home;
