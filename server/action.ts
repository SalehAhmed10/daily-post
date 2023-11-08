import prisma from "@/lib/prismadb";

export async function getAllPosts() {

    try{
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                category: true,
            }
        })
        if(!posts) {
            return []
        }
        return posts
    }catch(error) {
        return error
    }

}

export async function getAllCategories () {
    try{
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { posts: true }
                }
            },
            orderBy: {
                posts:{
                    _count: 'desc'
                }
            }
        })

        console.log(categories)
        if(!categories) {
            return []
        }
        return categories
    }catch(error) {
        return error
    }
}

