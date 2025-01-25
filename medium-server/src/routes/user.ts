import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
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

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
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
