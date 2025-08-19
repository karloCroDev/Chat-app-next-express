import express from "express";
import cors from "cors";
import redis from "redis";
import { User } from "@repo/types";
import { Foo } from "@/src/type";

const app = express();
app.use(cors());

// const client = redis.createClient({
//   url:
// })

app.get("/api/health", (req, res) => {
  const user: User = {
    id: "1",
    name: "John",
    email: "john@example.com",
  };
  res.json({ status: "ok", user });
});

app.get("/api/users", (req, res) => {
  const foo: Foo = "TEST";
  res.json({ status: "ok", foo });
});

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
