import React from "react";
import { TPost } from "@/types/types";
import Container from "@/components/ui/container";
import PostList from "@/components/PostList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getPostsByCategory = async (
  categoryName: string
): Promise<TPost[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAPP_URL}/api/categories/${categoryName}`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const categories = await res.json();
      const posts = categories.posts;
      console.log(posts);
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function CategoryPosts({
  params,
}: {
  params: { categoryName: string };
}) {
  const category = await params.categoryName;
  const posts = await getPostsByCategory(category);

  // const [category, posts] = await Promise.all([
  //   params.categoryName,
  //   getPostsByCategory(params.categoryName),
  // ]);

  // console.log(posts);
  return (
    <Container>
      <div className="flex flex-col  px-4 sm:px-6 lg:px-8">
        {posts && <PostList posts={posts} />}

        {posts?.length === 0 && (
          <Container>
            <h1>There are no posts yet.</h1>{" "}
            <Button variant="default" className="mt-4" asChild>
              <Link href="/create-post">Create one</Link>
            </Button>
          </Container>
        )}
      </div>
    </Container>
  );
}
