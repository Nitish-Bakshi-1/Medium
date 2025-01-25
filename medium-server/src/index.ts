import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/user/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const userCreated = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    if (!userCreated) {
      return c.json({
        error: "error in signup",
      });
    }

    const payload = {
      id: userCreated.id,
    };

    const secret = c.env.JWT_SECRET;

    const token = await sign(payload, secret);

    return c.json({ token: token });
  } catch (error) {
    c.json({ error: error });
  }
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
