import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userid: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authentication");

  if (!header) {
    c.status(403);
    return c.json({
      message: "unauthenticated",
    });
  }
  try {
    const token = header.split(" ")[1];

    const verification = (await verify(token, c.env.JWT_SECRET)) as {
      id: string;
    };

    if (!verification) {
      c.status(404);
      return c.json({
        message: "invalid token",
      });
    }
    c.set("userid", verification.id);
    await next();
  } catch (error) {
    c.json({ error });
  }
});

blogRouter.post("/", async (c) => {
  const authorId = c.get("userid");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const createPost = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
      authorId: authorId,
    },
  });
  if (!createPost) {
    return c.json({
      message: "put some valid inputs (post not created)",
    });
  }
  return c.json({
    message: "post created",
    post: createPost,
  });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.query("id");
  if (!postId) {
    c.json({
      error: "post id invalid",
    });
  }
  const body = await c.req.json();

  const response = await prisma.post.update({
    where: { id: postId },
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
    },
  });
  return c.json({
    message: "post updated",
  });
});

blogRouter.get("/", (c) => {
  return c.text("get blog with id");
});

blogRouter.get("/api/v1/blog/bulk", (c) => {
  return c.text("get all blogs");
});
