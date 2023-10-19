import { PostData } from "@/types/types";
import { postsData } from "@/constants/demo-data";
import { Card, CardContent, CardFooter } from "./card";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: PostData;
}
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link
      href={`/postss/${post.id}`}
      className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg"
    >
      <Card className="rounded-lg border-2">
        <CardContent className="pt-4">
          <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
            <Image
              src={post.thumbnail ? post.thumbnail : ""}
              alt=""
              fill
              className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div>
            <p className="font-semibold text-lg">{post.author}</p>
            <p className="text-sm text-primary/80">{post.category}</p>
            <p className="text-sm text-primary/80">{post.title}</p>
          </div>
          <div className="flex items-center justify-between">
            {post?.content}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
