import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name,
      posts: body.posts,
    },
  });

  return c.text("signup");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("signin");
});

app.post("/api/v1/blog", (c) => {
  return c.text("post blog");
});

app.put("/api/v1/blog", (c) => {
  return c.text("update blog");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("get blog with id");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("get all blogs");
});

export default app;
