"use client";

import { TCategory } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { BiImageAdd } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AiOutlineCloudUpload,
  AiOutlineLink,
  AiOutlinePlus,
} from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function CreatePostForm() {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("api/categories");
      const catNames = await res.json();
      setCategories(catNames);
    };

    fetchAllCategories();
  }, []);

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
      const errorMessage = "Title and content and category are required";
      toast({
        title: errorMessage,
        description: "Please fill in all the required fields",
        className: "bg-red-500 text-white",
      });
      return;
    }

    try {
      const res = await fetch("api/posts/", {
        method: "POST",
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
          title: "Post created successfully",
          description: "Your post has been created successfully",
          className: "bg-green-500 text-white",
        });
        router.push("/dashboard");
        router.refresh();
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          className: "bg-red-500 text-white",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-form flex flex-col justify-around ">
      <div className="h-[100px] flex items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 ">Create Post</h2>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          ></Textarea>

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
            className={`h-48 border-2 mt-4 border-dotted grid place-items-center rounded-md relative ${
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

          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select A Category" />
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

          <Button className="primary-btn" type="submit" variant={"default"}>
            Create Post
          </Button>
        </form>
      </div>
    </div>
  );
}
