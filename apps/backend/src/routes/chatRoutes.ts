import express from "express";
import { Router } from "express";
import { settings } from "@/src/controllers/chat/settings";
import { listUsers } from "@/src/controllers/chat/list-users";
import { sendRequest } from "@/src/controllers/chat/send-request";
import { listRequests } from "@/src/controllers/chat/list-requests";
import { listFriends } from "@/src/controllers/chat/list-friends";
import { accpetRequest } from "@/src/controllers/chat/accept-request";
import { rejectRequest } from "@/src/controllers/chat/reject-request";
import { listChat } from "@/src/controllers/chat/list-chat";
import { addChat } from "@/src/controllers/chat/add-chat";

export const chatRoutes = Router();

chatRoutes.use(express.json());

chatRoutes.patch("/settings", settings);
chatRoutes.post("/list-users", listUsers);
chatRoutes.get("/list-requests", listRequests);
chatRoutes.post("/send-request", sendRequest);
chatRoutes.get("/list-friends", listFriends);
chatRoutes.post("/accept-request", accpetRequest);
chatRoutes.post("/reject-request", rejectRequest);
chatRoutes.get("/list-chat", listChat);
chatRoutes.post("/add-chat", addChat);
