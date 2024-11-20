"use client";

import { createTicket } from "@/lib/actions";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await createTicket(formData);
    router.push("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-left w-full">
        New Ticket (client)
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <div className="space-y-2">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full h-10 px-3 border border-zinc-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="font-medium">
            Type
          </label>

          <input
            type="text"
            name="type"
            className="w-full h-10 px-3 border border-zinc-400"
          />
        </div>
        <button type="submit" className="text-green-700">
          Submit
        </button>
      </form>
    </main>
  );
}

export default Page;
