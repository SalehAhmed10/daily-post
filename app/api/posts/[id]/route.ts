import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request , {params} : {params: {id: string}}) {

    try{
        const id = params.id
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })

        return NextResponse.json(post)
    }
    catch(error) {
        console.log(error)
        return NextResponse.json({message : `Error: an error occured while fetching the post with id ${params.id}`} , {status : 500})
    }
}


export async function PUT(request: Request , {params} : {params: {id: string}}) {
    const {title , content , links , selectedCategory , imageUrl , publicId} = await request.json()
    const id = params.id 

    try{
        const post = await prisma.post.update({
            where: {id : id},
            data: {
                title,
                content,
                links,
                imageUrl,
                publicId,
                categoryName :selectedCategory,
            }
        })

        return NextResponse.json(post)
    }
    catch(error){
        console.log(error)
        return NextResponse.json({message: "Error: an error occured while updating the post"} , {status : 500})
    }
}

export async function DELETE(request: Request , {params} : {params: {id: string}}) {

    const id = params.id
    try{
        const post = await prisma.post.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json(post)
    }
    catch(error){
        console.log(error)
        return NextResponse.json({message: "Error: an error occured while deleting the post"} , {status : 500})
    }
}