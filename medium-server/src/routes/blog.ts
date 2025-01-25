import { Hono } from "hono";

export const blogRouter = new Hono();

blogRouter.post("/api/v1/blog", (c) => {
  return c.text("post blog");
});

blogRouter.put("/api/v1/blog", (c) => {
  return c.text("update blog");
});

blogRouter.get("/api/v1/blog/:id", (c) => {
  return c.text("get blog with id");
});

blogRouter.get("/api/v1/blog/bulk", (c) => {
  return c.text("get all blogs");
});
