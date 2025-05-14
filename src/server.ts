import { Hono } from "hono";
import auth from "./libs/auth"; // path to your auth file
import { logger } from "hono/logger";
import { compress } from "hono/compress";

const port = process.env.PORT || 5000;

const API_BASE = process.env.API_BASE || "/api/v1";
const app = new Hono();

// Logger middleware
app.use(logger());

// Compress middleware
app.use(compress({ encoding: "gzip" }));

app.all("/api/auth/**", (c) => auth.handler(c.req.raw));

export default {
  port,
  fetch: app.fetch,
};
