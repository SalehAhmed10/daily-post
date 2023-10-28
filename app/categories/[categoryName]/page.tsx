import React from "react";
import { TPost } from "@/types/types";
import Container from "@/components/ui/container";
import PostList from "@/components/PostList";

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

  console.log(posts);
  return (
    <Container>
      {posts && (
        <div className="pb-10 ">
          {/* <section className="flex flex-col  px-4 sm:px-6 lg:px-8 py-10">
            <h1>All the posts in {decodeURIComponent(category)}</h1>
          </section> */}
          {posts && <PostList posts={posts} />}
        </div>
      )}
      {posts?.length === 0 && (
        <Container>
          <h1>There are no posts yet.</h1>
        </Container>
      )}
    </Container>
  );
}
