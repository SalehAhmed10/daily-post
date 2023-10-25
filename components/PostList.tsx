import CategoriesList from "./blocks/CategoriesList";
import PostCard from "./blocks/PostCard";
import Container from "./ui/container";
import { TPost } from "@/types/types";

// interface PostCardProps {
//   post: PostData[];
// }

// const PostList : React.FC<PostCardProps> = ({posts}) {
//     return (
//         <Container>
//         <div className="space-y-4 my-5">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
//             {posts.map((post) => (
//               <PostCard posts={post} key={post.id} />
//             ))}
//           </div>
//         </div>
//       </Container>
//     );
//   };

// export default PostList;

const PostList = ({ posts }: { posts: TPost[] | null }) => {
  return (
    <Container>
      <div className="space-y-4 my-5">
        {/* scroll x if not on single line  */}

        <div className="flex flex-row overflow-x-auto  overflow-y-hidden md:no-scrollbar ">
          <CategoriesList />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {posts && posts.map((post) => <PostCard post={post} key={post.id} />)}
        </div>
      </div>
    </Container>
  );
};

export default PostList;
