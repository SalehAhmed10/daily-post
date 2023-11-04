import prisma from "@/lib/prismadb";
import {  NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";

export async function GET() {

    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {email: true , name : true , image : true }
                },
                category: true
            },
            orderBy : {
                createdAt : 'desc'
            }
        })

        return NextResponse.json(posts)
    
    }catch(error ){
        console.log(error)
        return NextResponse.json({message : "Error: an error occured while fetching the posts"} , {status : 500})
    }
}

export async function POST(request: Request){
    const session = await getAuthSession()

    if (!session) {
        return NextResponse.json({ error: "Not authenticated signin to create a post" }, { status: 401 });
      }
    
      const { title, content, links, selectedCategory, imageUrl, publicId } =
        await request.json();
    
      const authorEmail = session?.user?.email as string;
    
      if (!title || !content) {
        return NextResponse.json(
          { error: "Title and content are required." },
          { status: 500 }
        );
      }
    
      try {
        const newPost = await prisma.post.create({
          data: {
            title,
            content,
            links,
            imageUrl,
            publicId,
            categoryName: selectedCategory,
            authorEmail,
          },
        });
    
        console.log("Post created successfully");
        return NextResponse.json(newPost);
      } catch (error) {
        return NextResponse.json({message : "Error: an error occured while creating the post"});
      }
    }
