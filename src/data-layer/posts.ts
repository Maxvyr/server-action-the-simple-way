import { db } from "../server/db";

export const PostLayer = {
  getPosts: async () => {
    const posts = await db.post.findMany();
    return posts;
  },

  deletePost: async (id: number) => {
    await db.post.delete({ where: { id } });
  },
};
