import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {
  createBlogSchema,
  updateBlogSchema,
} from "@nitishbakshi/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userid: string;
  };
}>();
// --------------------------------------------
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authentication");

  if (!token) {
    c.status(403);
    return c.json({
      message: "unauthenticated",
    });
  }
  try {
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
    return c.json({ error });
  }
});
// --------------------------------------------

blogRouter.post("/", async (c) => {
  try {
    const authorId = c.get("userid");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const preBody = await c.req.json();
    console.log(preBody);
    const body = createBlogSchema.safeParse(preBody);
    console.log(body.data);
    if (!body.success) {
      c.status(411);
      return c.json({
        message: "invalid blog inputs",
      });
    }

    const createBlog = await prisma.blog.create({
      data: {
        title: body.data.title,
        content: body.data.content,
        authorId: authorId,
      },
    });

    if (!createBlog) {
      return c.json({
        message: "put some valid inputs (post not created)",
      });
    }
    return c.json({
      message: "post created",
      blog: createBlog,
    });
  } catch (error) {
    return c.json({
      error: error,
    });
  }
});
// --------------------------------------------

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

  const preBody = await c.req.json();
  const body = updateBlogSchema.safeParse(preBody);

  if (!body.success) {
    return c.json({
      message: "invalid inputs for updating Blog",
    });
  }
  const response = await prisma.blog.update({
    where: { id: postId },
    data: {
      title: body.data.title,
      content: body.data.content,
    },
  });
  return c.json({
    message: "post updated",
  });
});
// --------------------------------------------

blogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const postId = c.req.query("id");
  const response = await prisma.blog.findUnique({
    where: {
      id: postId,
    },
  });
  if (!response) {
    c.json({
      message: "error in getting posts",
    });
  }
  return c.json({
    post: response,
  });
});
// --------------------------------------------

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const allPosts = await prisma.blog.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!allPosts) {
    return c.json({
      message: "unable to fetch posts",
    });
  }

  return c.json({
    posts: allPosts,
  });
});
