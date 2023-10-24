import Container from "@/components/ui/container";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  // possible to use TOAST to show error message
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <Container>
      <h1>create post</h1>
    </Container>
  );
}
