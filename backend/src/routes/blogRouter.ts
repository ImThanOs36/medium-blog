import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddlewre } from "../middlware/authMiddleware";
import { blogInput } from "@imthanos/common-app";

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

blogRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  console.log(userId);

  const data = await prisma.blog.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      author: {
        select: {
          name: true,
        },
      },
      published:true,
      title: true,
      content: true,
      createAt: true,
      
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return c.json({ data });
});

blogRouter.get("/author/:username", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const username = c.req.param("username");
  const data = await prisma.blog.findMany({
    where: {
      // authorId: Number(id),
      author: {
        name: username,
      },
      published: true,
    },
    select: {
      author: {
        select: {
          name: true,
        },
      },
      title: true,
      content: true,
      createAt: true,
      id: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return c.json({ data });
});

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
      authorId: true,
      createAt: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  const blogs = data.filter((blog) => blog.title !== "" && blog.content !== "");
  return c.json({ blogs: blogs });
});
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const userId = c.get("userId");
  const blog = await prisma.blog.findFirst({
    where: {
      id: Number(id),
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
      authorId: true,
      published: true,
    },
  });
  if (!blog) {
    return c.json({ message: "invalid blog id" });
  }
  if (blog?.published === false) {
    if (blog.authorId === userId) {
      return c.json(blog);
    } else {
      c.status(404);
      return c.json({ message: "Blog Must Be Private Or Deleted !!" });
    }
  } else {
    return c.json(blog);
  }
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

  const publishedStatus = body.published ? false : true;
  console.log(publishedStatus);

  const blog = await prisma.blog.update({
    where: {
      id: Number(id),
      authorId: userId,
    },
    data: {
      published: publishedStatus,
    },
  });

  return c.json({
    id: blog,
  });
});
blogRouter.delete("/delete/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const userId = c.get("userId");

  const blog = await prisma.blog.delete({
    where: {
      id: Number(id),
      authorId: userId,
    },
  });

  if (blog) {
    c.status(200);
  }
  return c.json({ message: "deleted" });
});
