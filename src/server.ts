import { Hono } from "hono";
import { auth } from "./lib/auth"; // path to your auth file
import { logger } from "hono/logger";

const port = process.env.PORT || 5000;

const API_BASE = process.env.API_BASE || "/api/v1";
const app = new Hono();

// Logger middleware
app.use(logger());
app.get("/", (c) => {
  return c.json({ status: "ok", message: "Server is running" });
});

// Auth routes
app.get("/api/auth/*", async (c) => {
  console.log("Auth request received:", c.req.url);
  return auth.handler(c.req.raw);
});

app.post("/api/auth/*", async (c) => {
  console.log("Auth POST request received:", c.req.url);
  return auth.handler(c.req.raw);
});

// Add a catch-all route for debugging
app.all("*", (c) => {
  console.log("Route not found:", c.req.url);
  return c.json({ error: "Not found" }, 404);
});

export default {
  port,
  fetch: app.fetch,
};
