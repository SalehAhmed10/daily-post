// sitemap for https://daily-post-app.vercel.app/ app

import { getAllCategories, getAllPosts } from "@/server/action"
import { PostData, TCategory, TPost } from "@/types/types"

export default async function sitemap(){
    const baseUrl = `https://daily-post-app.vercel.app`

    const posts = (await getAllPosts()) as TPost[];
    const postsUrls = posts?.map((post) => {
        return {
            url: `${baseUrl}/posts/${post.id}`,
            lastModified: new Date(post.updatedAt)
        }
    }) ?? []
    console.log(getAllPosts())

    

    // Get all Categories
    const categories = (await getAllCategories()) as TCategory[];
    const categoriesUrls = categories?.map((category) => {
        return {
            url: `${baseUrl}/categories/${category.categorySlug}`,
            lastModified: new Date()
        }
    }) ?? []
    console.log(categories)

    return [
        {
            url : baseUrl,
            // date format DD-MM-YYYY
            lastModified: new Date().toISOString()
        },
        ...postsUrls,
        ...categoriesUrls

    ]
}