import PostList from "@/components/PostList";
import CategoriesList from "@/components/blocks/CategoriesList";
import Container from "@/components/ui/container";

import { TPost } from "@/types/types";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Post | Home",
  description: "daily post project by @SalehAhmed10",
  keywords: ["Daily Post", "All Posts", "Posts", "Blogs"],
};

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAPP_URL}/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = await res.json();
      console.log(posts);
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function Home() {
  const posts = await getPosts();

  return (
    // <main className="grid place-items-center h-screen">
    <div className="pb-10 relative h-full">
      <div className="flex flex-col  ">
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
