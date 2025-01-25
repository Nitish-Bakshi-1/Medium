import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().min(5).max(50).email().trim(),
  password: z.string().min(8).max(50).trim(),
  name: z.string().optional(),
});
type userSchema = z.infer<typeof userSchema>;

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

    const preBody = await c.req.json();
    const body = userSchema.safeParse(preBody);
    if (!body.success) {
      return c.json({
        message: "invalid credentials",
      });
    }
    console.log(body);
    const userCreated = await prisma.user.create({
      data: {
        email: body.data.email,
        password: body.data.password,
      },
    });

    const payload = {
      id: userCreated.id,
    };
    const secret = c.env.JWT_SECRET;

    const token = await sign(payload, secret);

    return c.json({ token: token });
  } catch (error) {
    return c.json({ error: error });
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const preBody = await c.req.json();
    const body = userSchema.safeParse(preBody);
    if (!body.success) {
      return c.json({
        message: "invalid credentials",
      });
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: body.data.email,
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
  } catch (error) {
    return c.json({
      error: error,
    });
  }
});
