"use server";

import fs from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface Ticket {
  id: number;
  name: string;
  status: string;
  type: string;
}

export async function readfile(): Promise<string> {
  return fs.readFileSync("lib/database.json", "utf-8");
}

export async function writefile(data: string): Promise<void> {
  fs.writeFileSync("lib/database.json", data);
}

export async function getTickets(): Promise<Ticket[]> {
  const data = await readfile();
  return JSON.parse(data);
}

export async function getTicket(id: number): Promise<Ticket | undefined> {
  const tickets = await readfile();
  return JSON.parse(tickets).find((ticket: Ticket) => ticket.id === id);
}

export async function createTicket(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;

  const tickets = await readfile();

  const id = JSON.parse(tickets).length + 1;
  const ticket: Ticket = { id, name, status: "open", type };

  await writefile(JSON.stringify([...JSON.parse(tickets), ticket]));
  redirect("/");
}

export async function updateTicket(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const status = formData.get("status") as string;

  const tickets = await readfile();

  const ticket = JSON.parse(tickets).find((ticket: Ticket) => ticket.id === id);
  if (!ticket) return;

  const updatedTickets = JSON.parse(tickets).map((ticket: Ticket) => {
    if (ticket.id === id) {
      return { ...ticket, name, type, status };
    }
    return ticket;
  });

  await writefile(JSON.stringify(updatedTickets));
}

export async function deleteTicket(id: number) {
  const tickets = await readfile();

  const updatedTickets = JSON.parse(tickets).filter(
    (ticket: Ticket) => ticket.id !== id
  );

  await writefile(JSON.stringify(updatedTickets));
  revalidatePath("/");
}
