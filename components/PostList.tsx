import CategoriesList from "./blocks/CategoriesList";
import PostCard from "./blocks/PostCard";
import Container from "./ui/container";
import { TPost } from "@/types/types";

const PostList = ({ posts }: { posts: TPost[] | null }) => {
  return (
    <Container>
      <div>
        {/* scroll x if not on single line  */}
        <div className="flex flex-row overflow-x-auto my-5 overflow-y-hidden md:no-scrollbar ">
          <CategoriesList />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-5 gap-y-16 md:gap-y-10 px-5">
          {posts && posts.map((post) => <PostCard post={post} key={post.id} />)}
        </div>
      </div>
    </Container>
  );
};

export default PostList;
