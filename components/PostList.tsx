import { PostData } from "@/types/types";
import { postsData } from "@/constants/demo-data";
import Container from "./ui/container";
import PostCard from "./ui/PostCard";

interface PostCardProps {
  post: PostData[];
}

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

const PostList: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Container>
      <div className="space-y-4 my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {post.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PostList;
