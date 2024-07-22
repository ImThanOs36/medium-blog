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

blogRouter.get("/me", authMiddlewre, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  console.log(userId);
  const UserName = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
    },
  });
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
      published: true,
      title: true,
      content: true,
      createAt: true,
      updated: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return c.json({ data, name: UserName?.name });
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
      updated: true,
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
      updated: true,
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
      published: true,
      createAt: true,
      authorId: true,
      updated: true,
    },
  });

  const Findlike = await prisma.like.findFirst({
    where: {
      postId: Number(id),
    },
    select: {
      authorId: true,
    },
  });
  const count = Findlike?.authorId.length;
  if (!blog) {
    return c.json({ message: "invalid blog id" });
  }

  if (blog?.published == false) {
    if (blog.authorId === userId) {
      return c.json(blog);
    } else {
      c.status(404);
      return c.json({ message: "Blog Must Be Private Or Deleted !!" });
    }
  } else {
    return c.json({ ...blog, count: count });
  }
});

blogRouter.post("/blog", authMiddlewre, async (c) => {
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

blogRouter.put("/:id", authMiddlewre, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const userId = c.get("userId");
  const body = await c.req.json();

  const { title, content, published } = body;

  const blog = await prisma.blog.update({
    where: {
      id: Number(id),
      authorId: userId,
    },
    data: {
      title: title,
      published: !published,
      content: content,
      updated: true,
    },
  });

  return c.json({
    id: blog,
  });
});

blogRouter.put("/likes/:id", authMiddlewre, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = Number(c.req.param("id"));
  const userId = c.get("userId");

  if (!userId) {
    return c.json({ Errro: "authorization  Error" });
  }

  const isLiked = await prisma.like.findFirst({
    where: {
      postId: Number(id),
      authorId: {
        has: userId,
      },
    },
  });
  if (isLiked) {
    return c.json({ msg: "liked" });
  }
  const likes = await prisma.like.update({
    where: {
      postId: Number(id),
    },
    data: {
      authorId: {
        push: userId,
      },
    },
  });
  const length = likes.authorId.length;

  return c.json({ message: "sucess" });
});
blogRouter.get("/likes/:id", authMiddlewre, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = Number(c.req.param("id"));
  const userId = c.get("userId");

  const likes = await prisma.like.findFirst({
    where: {
      postId: id,
    },
    select: {
      authorId: true,
    },
  });
  const likeCount = likes?.authorId.length || 0;

  return c.json({
    count: likeCount,
  });
});
blogRouter.post("/likes/:id", authMiddlewre, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = Number(c.req.param("id"));
  const userId = c.get("userId");

  const likes = await prisma.like.create({
    data: {
      postId: id,
      authorId: [userId],
    },
  });
  const likeCount = likes.authorId.length || 0;

  return c.json({
    count: likeCount,
  });
});

blogRouter.delete("/delete/:id", authMiddlewre, async (c) => {
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

blogRouter.post("/comment/:id", authMiddlewre, async (c) => {
  const userId = c.get("userId");
  console.log("userId:" + userId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const postId = c.req.param("id");
  const { comment } = body;
  const comm = await prisma.comment.create({
    data: {
      content: comment,
      postId: Number(postId),
      authorId: userId,
    },
  });
  return c.json({ comment: comm });
});

blogRouter.get("/comment/:id", async (c) => {
  const userId = c.get("userId");
  console.log("userId:" + userId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const postid = c.req.param("id");
  const comm = await prisma.comment.findMany({
    where: {
      postId: Number(postid),
    },
    select: {
      author: {
        select: {
          name: true,
        },
      },
      content: true,
      id: true,
      createdAt: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return c.json({ comments: comm });
});
