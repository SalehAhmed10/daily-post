"use client";

import { TCategory, TPost } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { Textarea } from "../ui/textarea";
import {
  AiOutlineCloudUpload,
  AiOutlineLink,
  AiOutlinePlus,
} from "react-icons/ai";
import Link from "next/link";
import { GoTrash } from "react-icons/go";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Image from "next/image";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useTheme } from "next-themes";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

// import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

export default function EditPostForm({ post }: { post: TPost }) {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const catNames = await res.json();
        setCategories(catNames);
        console.log(catNames);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCategories();

    const initValue = () => {
      setTitle(post.title);
      setContent(post.content);
      setLinks(post.links || []);
      setSelectedCategory(post.categoryName || "");
      setImageUrl(post.imageUrl || "");
      setPublicId(post.publicId || "");
    };

    initValue();
  }, [
    post.title,
    post.content,
    post.links,
    post.categoryName,
    post.imageUrl,
    post.publicId,
  ]);

  const { theme, setTheme } = useTheme();

  if (theme === "dark") {
    document.documentElement.setAttribute("data-color-mode", "dark");
  }
  if (theme === "light") {
    document.documentElement.setAttribute("data-color-mode", "light");
  }
  const handleImageUpload = (result: CldUploadWidgetResults) => {
    console.log("result: ", result);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("api/removeImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        setImageUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !selectedCategory) {
      const errorMessage = "Title, Content and Category are required";
      toast({
        title: "Error 😢",
        description: errorMessage,
        className: "error-toast",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imageUrl,
          publicId,
        }),
      });

      if (res.ok) {
        toast({
          title: "Success 🎉",
          description: "Your post has been updated successfully",
          className: "success-toast",
        });
        setIsSubmitting(false);
        router.push("/dashboard");
        router.refresh();
      } else {
        toast({
          title: "Error 😢",
          description: "Something went wrong. Please try again",
          className: "error-toast",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-form flex flex-col justify-around px-5 pb-10">
      <div className="h-[100px] flex items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 ">Edit This Post</h2>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            value={title}
          />
          {/* <Textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            value={content}
          ></Textarea> */}
          <div>
            <MDEditor
              value={content}
              onChange={(e) => setContent(e || "")}
              className="min-h-[500px] "
              style={{ whiteSpace: "normal" }}
              maxHeight={1000}
              enableScroll={true}
              previewOptions={{
                rehypePlugins: [rehypeSanitize],
              }}
            />
          </div>

          {links &&
            links.map((link, i) => (
              <div key={i} className="flex items-center gap-4">
                <span>
                  <AiOutlineLink />
                </span>
                <Link className="link" href={link}>
                  {link}
                </Link>
                <span className="cursor-pointer" onClick={() => deleteLink(i)}>
                  <GoTrash />
                </span>
              </div>
            ))}

          <div className="flex gap-2">
            <Input
              className="flex-1"
              type="text"
              onChange={(e) => setLinkInput(e.target.value)}
              value={linkInput}
              placeholder="Paste the link and click on Add"
            />
            <button onClick={addLink} className="btn flex gap-2 items-center">
              <span>
                <AiOutlinePlus />
              </span>
              Add
            </button>
          </div>

          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            className={`h-60 border-2 mt-4 border-dotted grid place-items-center rounded-md relative ${
              imageUrl && "pointer-events-none"
            }`}
            onUpload={handleImageUpload}
          >
            <div className="text-[30px]">
              <AiOutlineCloudUpload />
            </div>

            {imageUrl && (
              <Image
                src={imageUrl}
                fill
                className="absolute object-cover inset-0"
                alt={title}
              />
            )}
          </CldUploadButton>

          {publicId && (
            <button
              onClick={removeImage}
              className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4"
            >
              Remove Image
            </button>
          )}

          {/* <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-3 rounded-md border appearance-none"
              >
                <option value="">Select A Category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
              </select> */}

          <Select
            onValueChange={setSelectedCategory}
            defaultValue={post.categoryName}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="Select A Category"
                defaultValue={post.categoryName}
              />
            </SelectTrigger>
            <SelectContent>
              {categories &&
                categories.map((category) => (
                  <SelectGroup key={category.id}>
                    <SelectItem value={category.categoryName}>
                      {category.categoryName}
                    </SelectItem>
                  </SelectGroup>
                ))}
            </SelectContent>
          </Select>

          <Button
            className={`primary-btn font-bold ${
              isSubmitting && `opacity-50 cursor-not-allowed`
            }`}
            type="submit"
            variant={"default"}
          >
            Edit Post
          </Button>
        </form>
      </div>
    </div>
  );
}
