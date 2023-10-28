import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
    // return NextResponse.json({ message: "Hello, World!" })
    try {   
       const categories =  await prisma.category.findMany({where: { categoryName: { not: '' } }, include : {posts: true}, orderBy: {posts : {_count: 'desc'}} })
         return NextResponse.json(categories)
    }
    catch(error) {
        console.log(error)
        return NextResponse.json({ message: "Error: an error occured while fetching the categories" }, { status: 500 })
    }
}