import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT;

const server = express();
server.use(cors());
server.use(express.json());
server.use(cookieParser());

// Routers session
server.use(userRouter);

server.listen(PORT, () => {
    console.log(`It's alive on port ${PORT}`);
})