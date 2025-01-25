import { Hono, Context } from "hono";

const app = new Hono();

app.post("/api/v1/user/signup", (c: Context) => {
  return c.text("signup");
});

app.post("/api/v1/user/signin", (c: Context) => {
  return c.text("signin");
});

app.post("/api/v1/blog", (c: Context) => {
  return c.text("post blog");
});

app.put("/api/v1/blog", (c: Context) => {
  return c.text("update blog");
});

app.get("/api/v1/blog/:id", (c: Context) => {
  return c.text("get blog with id");
});

app.get("/api/v1/blog/bulk", (c: Context) => {
  return c.text("get all blogs");
});

export default app;
