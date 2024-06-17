import "server-only";
import { PostLayer } from "../data-layer/posts";
import { type Post } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const posts = await PostLayer.getPosts();

  if (posts.length === 0) {
    return <div>No posts</div>;
  }

  return (
    <main>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}

function Post({ post }: { post: Post }) {
  return (
    <div className="flex gap-2 p-4">
      {post.name}

      <form
        action={async () => {
          "use server";

          console.log("deleting post ", post.id);
          await PostLayer.deletePost(post.id);

          revalidatePath("/");
        }}
      >
        <button>X</button>
      </form>
    </div>
  );
}
