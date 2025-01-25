import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
// --------------------------------------------------

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  try {
    const payload = (await verify(token, c.env.JWT_SECRET)) as { id: string };
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
});

// --------------------------------------------------
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

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userExists = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
    select: {
      id: true,
    },
  });

  if (!userExists) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: userExists.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

// --------------------------------------------------

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
