import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditPostForm from "@/components/blocks/EditPostForm";
import Container from "@/components/ui/container";
import { TPost } from "@/types/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getPost = async (id: string): Promise<TPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAPP_URL}/api/posts/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const post = await res.json();
      return post;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const post = await getPost(params.id);

  return (
    <>
      <Container>
        {post ? (
          <EditPostForm post={post} />
        ) : (
          <div className="flex justify-center items-center main-tag">
            <h1 className="text-3xl">Post not found</h1>
          </div>
        )}
      </Container>
    </>
  );
}
