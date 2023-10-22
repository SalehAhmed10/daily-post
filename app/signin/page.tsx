import SignIn from "@/components/SignIn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default function page() {
  const session = getServerSession(authOptions);

  // if session exists, redirect to dashboard page instead of showing sign in page again
  if (session) redirect("/dashboard");

  return <SignIn />;
}
