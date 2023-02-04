import express, { json } from "express";
import cors from 'cors';
import 'express-async-errors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json()); // Content-type: application/json

app.listen(3001,'localhost', () => {
    console.log('Listening on http://localhost:3001');
});
