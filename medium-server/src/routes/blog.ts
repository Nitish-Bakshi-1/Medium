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

blogRouter.post("/", (c) => {
  return c.text("post blog");
});

blogRouter.put("/", (c) => {
  return c.text("update blog");
});

blogRouter.get("/", (c) => {
  return c.text("get blog with id");
});

blogRouter.get("/api/v1/blog/bulk", (c) => {
  return c.text("get all blogs");
});
