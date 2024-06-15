import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";
import { signupInput,signinInput } from '@imthanos/common-app';
export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({message:"invalid inputs"})
    }
    const { email, password ,name} = body;

    // Ensure email and password are provided
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ message: "User created successfully", token }, 201);
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "An error occurred during signup" }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({message:"invalid inputs"})
    }
    const { email, password } = body;

    // Ensure email and password are provided
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      c.status(401)
      return c.json({ message: "User does not exists" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ message: "signin successfully", token }, 201);
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "An error occurred during signin" }, 500);
  }

  return c.text("Hello Hono!");
});
