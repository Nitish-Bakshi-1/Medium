import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

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

app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

// --------------------------------------------------

export default app;
