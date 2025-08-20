import express from "express";
import cors from "cors";
import redis from "redis";
import { Foo } from "@/src/type";
import { prisma } from "@/src/lib/prisma";

const app = express();
app.use(cors());

// const client = redis.createClient({
//   url:
// })

app.get("/api/health", async (req, res) => {
  const user = await prisma.user.findFirst();
  res.json({ status: "ok", user });
});

app.get("/api/users", (req, res) => {
  const foo: Foo = "TEST";
  res.json({ status: "ok", foo });
});

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
