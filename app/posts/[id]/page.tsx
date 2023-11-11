import { PostDetail } from "@/components/blocks/PostDetail";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { TPost } from "@/types/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const post = await getPostById(id);
    if (!post) {
      return {
        title: "Post Not Found",
        description: "Post Not Found",
      };
    }
    return {
      title: `${post.title} `,
      description: post.content,
    };
  } catch (error) {
    return {
      title: "Post Not Found  ",
      description: "Post Not Found",
    };
  }
}

const getPostById = async (id: string): Promise<TPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAPP_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const post = await res.json();
      console.log(post);
      return post;
    }
  } catch (error) {
    console.log(error);
  }
  return notFound();
};

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(id);
  console.log(post);

  return (
    <Container>
      {post && (
        <div className="pb-10 ">
          <PostDetail post={post} />
        </div>
      )}
      {!post && (
        <Container>
          <h1>There are no posts yet.</h1>{" "}
          <Button variant="default" className="mt-4" asChild>
            <Link href="/create-post">Create one</Link>
          </Button>
        </Container>
      )}
    </Container>
  );
}
