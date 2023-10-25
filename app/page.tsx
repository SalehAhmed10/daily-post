import PostList from "@/components/PostList";
import CategoriesList from "@/components/blocks/CategoriesList";

import { TPost } from "@/types/types";

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
    <div className="space-y-10 pb-10 ">
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        {/* <ProductList items={products} /> */}

        {posts?.length === 0 && (
          <div>
            <h1>There are no posts yet</h1>
          </div>
        )}
        {posts && <PostList posts={posts} />}
      </div>
    </div>
  );
}
