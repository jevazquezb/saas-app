import { auth } from "@/auth"; // Server side component
import { redirect } from "next/navigation";

export default async function LayoutPrivate({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return children;
}
