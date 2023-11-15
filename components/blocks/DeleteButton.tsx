"use client";
import { GoTrash } from "react-icons/go";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

export default function DeleteButton({
  id,
  btnVariant,
}: {
  id: string;
  btnVariant?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confimed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confimed) {
      setIsDeleting(true);
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
          setIsDeleting(false);
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <Button
        size="icon"
        variant={btnVariant ? (btnVariant as any) : "default"}
        className={`text-lg ${isDeleting && "opacity-50 cursor-not-allowed"}`}
        onClick={handleDelete}
        disabled={isDeleting}
        tabIndex={-1}
      >
        <GoTrash />
        <span className="sr-only">Edit Post</span>
      </Button>
    </>
  );
}
