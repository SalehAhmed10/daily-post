import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request : Request , {params}: {params: {id: string}}){

    const categoryName = params.id 

    try{
        const posts = await prisma.category.findUnique({
            where: {
                categoryName: categoryName ,
            },
            include : {
                posts: {
                    include: {
                        author: true 
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        return NextResponse.json(posts)
    
    }catch(error){
        console.log(error)
        return NextResponse.json({message : `Error: an error occured while fetching the category with id ${params.id}`} , {status : 500})
    }


}