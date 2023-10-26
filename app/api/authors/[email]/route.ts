import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request, {params} : {params: {email: string}}) {
    
    try{
        const email = params.email 
        const posts = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                posts: {orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: true,
                }
            
            }
                
            }
        })

        if(!posts){
            return NextResponse.json({message : `Error: no author with email ${params.email} was found`} , {status : 500})
        }

        return NextResponse.json(posts)
    }
    catch(error){
        console.log(error)
        return NextResponse.json({message : `Error: an error occured while fetching the author with email ${params.email}`} , {status : 500})
    }
}