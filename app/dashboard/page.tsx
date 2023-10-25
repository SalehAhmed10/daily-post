import PostList from "@/components/PostList";
import React from "react";
import { postsData } from "@/constants/demo-data";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        {/* <PostList post={postsData} /> */}
        Dashboard page
      </div>
    </div>
  );
}
