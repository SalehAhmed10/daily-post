import SignIn from "@/components/SignIn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  // check if session is null or not and redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return <SignIn />;
}
