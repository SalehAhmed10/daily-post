# All The Errors I Encountered While Building This Site

## 1: Failed to compile.

```
./app/signin/page.tsx:10:7
Type error: This condition will always return true since this 'Promise<import("/vercel/path0/node_modules/next-auth/core/types").Session | null>' is always defined.
8 |
9 | // if session exists, redirect to dashboard page instead of showing sign in page again

> 10 | if (session) redirect("/dashboard");

     |       ^

11 |
12 | return <SignIn />;
13 |
Error: Command "npm run build" exited with 1
```

### Solution

```
export default async function page() {
  const session = await getServerSession(authOptions);

## if statement should be changed to:

  if (!session) {
    redirect("/auth/signin");
  }


  return (
    <div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        {/* <PostList post={postsData} /> */}
        Dashboard page
      </div>
    </div>
  );
}


```

## 2: Prisma Error : Generate Build

```
PrismaClientInitializationError: Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the `prisma generate` command during the build process.
Learn how: https://pris.ly/d/vercel-build
    at xa (/vercel/path0/node_modules/@prisma/client/runtime/library.js:36:69)
    at new t (/vercel/path0/node_modules/@prisma/client/runtime/library.js:128:2640)
    at 30737 (/vercel/path0/.next/server/chunks/737.js:1:223)
    at __webpack_require__ (/vercel/path0/.next/server/webpack-runtime.js:1:146)
    at 92853 (/vercel/path0/.next/server/app/api/auth/[...nextauth]/route.js:1:1109)
    at __webpack_require__ (/vercel/path0/.next/server/webpack-runtime.js:1:146)
    at __webpack_exec__ (/vercel/path0/.next/server/app/api/auth/[...nextauth]/route.js:1:1647)
    at /vercel/path0/.next/server/app/api/auth/[...nextauth]/route.js:1:1686
    at __webpack_require__.X (/vercel/path0/.next/server/webpack-runtime.js:1:1638)
    at /vercel/path0/.next/server/app/api/auth/[...nextauth]/route.js:1:1660 {
  clientVersion: '5.4.2',
  errorCode: undefined
}
> Build error occurred
Error: Failed to collect page data for /api/auth/[...nextauth]
    at /vercel/path0/node_modules/next/dist/build/utils.js:1171:15
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  type: 'Error'
}
Error: Command "npm run build" exited with 1

```

### Solution

#### 3. Add the following to your Vercel Build Commands

```
npx prisma generate && next build
```

## 3: Error: Component definition is missing display name react/display-name

### You can encounter this error when you use a component that doesn't have a name. i forgot to name my component in the following code:

```
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow ",
      className
    )}
    {...props}
  />
));
CardImage.displayName = "CardImage";
```

### Solution is to add a name to the component

```
CardImage.displayName = "CardImage";
```

## 4: Error: Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error Error: Failed to get session

```
// export const getSession = async () => {
//   try {
//     const session = await getServerSession(authOptions);
//     return session;
//   } catch (error) {
//     throw new Error("Failed to get session");
//   }
// };
```

### Solution

```
export default async function PostCard({ post }: { post: TPost }) {
  // const PostCard = async ({ post }: { post: TPost }) => {

  const session = await getServerSession(authOptions);
  console.log(session);

  const isEditable = session && session?.user?.email === post.authorEmail;

```

### async await
