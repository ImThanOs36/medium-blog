import { verify } from "hono/jwt";
import { Context, Next } from "hono";

export async function authMiddlewre(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", payload.id);
  await next();
}
