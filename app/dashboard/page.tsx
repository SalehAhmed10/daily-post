import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Container from "@/components/ui/container";
import PostList from "@/components/PostList";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAPP_URL}/api/authors/${email}`, {
      cache: "no-store",
    });
    const { posts } = await res.json();
    return posts;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default async function page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    redirect("/auth/signin");
  }

  if (email) {
    posts = await getPosts(email);
  }

  return (
    <div className="pb-10 ">
      <div className="flex flex-col  px-4 sm:px-6 lg:px-8">
        {/* <ProductList items={products} /> */}

        {posts && <PostList posts={posts} />}

        {posts?.length === 0 && (
          <Container>
            <h1>There are no posts yet.</h1>
          </Container>
        )}
      </div>
    </div>
  );
}
