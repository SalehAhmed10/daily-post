import { PostData } from "@/types/types";
import { getAllPosts } from "@/server/action";

export default async function page() {
  const posts = (await getAllPosts()) as PostData[];
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
