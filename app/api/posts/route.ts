import prisma from "@/lib/prismadb";
import {  NextResponse } from "next/server";

export async function GET() {

    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {email: true , name : true , image : true }
                }
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
    const {title , content , links , selectedCategory , imageUrl , publicId} = await request.json() 
    const authorEmail = 'lm.ahmed1010@gmail.com'

    if(!title || !content ) {
        return NextResponse.json({message : "Title and Content are required"} , {status : 500})
    }

    try{
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                links,
                imageUrl,
                publicId,
                categoryName :selectedCategory ,
                authorEmail: authorEmail
            }
        })

        console.log("Post created successfully")
        return NextResponse.json(newPost)
    }
    catch(error) {
        console.log(error)
        NextResponse.json({message : "Error: an error occured while creating the post"} , {status : 500})
    }
}