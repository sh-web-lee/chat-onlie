import express from "express";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js';
import { connectToMongoDB } from "./db/connect.js";
import { app, server } from "./socket/socket.js"

const port = process.env.SERVER_PORT || 5000

dotEnv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/users", userRoutes);




server.listen(port, () => {
  connectToMongoDB();
  console.log(`server running at ${port}`)
})