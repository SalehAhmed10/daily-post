import PostList from "@/components/PostList";
import React from "react";
import { postsData } from "@/constants/demo-data";

export default function page() {
  return (
    <div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <PostList post={postsData} />
      </div>
    </div>
  );
}
