import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddlewre } from "../middlware/authMiddleware";
import { blogInput, updateblog } from "@imthanos/common-app";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  varialbles: {
    userId: any;
  };
}>();
blogRouter.use("/*", authMiddlewre);
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const data = await prisma.blog.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
      createAt: true,
    },
  });
  const blogs = data.filter((blog) => blog.title !== "" && blog.content !== "");
  return c.json({ blogs: blogs });
});
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");

  const blog = await prisma.blog.findFirst({
    where: {
      id: Number(id),
      published: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
      createAt: true,
    },
  });
  if (!blog) {
    return c.json({ message: "invalid blog id" });
  }
  return c.json(blog);
});

blogRouter.post("/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = blogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "invalid inputs" });
  }
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({
    id: blog.id,
  });
});
blogRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = updateblog.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "invalid inputs" });
  }
  const blog = await prisma.blog.update({
    where: {
      id: Number(id),
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog,
  });
});
