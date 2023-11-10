"use client";
import { GoTrash } from "react-icons/go";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    const confimed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confimed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          toast({
            title: "Success 🎉",
            description: "Your post has been deleted successfully.",
            className: "success-toast",
          });
          router.refresh();
        }
      } catch (error) {}
    } else {
      return;
    }
  };

  return (
    <>
      <Button
        size="icon"
        variant="default"
        className="text-2xl"
        onClick={handleDelete}
      >
        <GoTrash />
        <span className="sr-only">Edit Post</span>
      </Button>
    </>
  );
}
