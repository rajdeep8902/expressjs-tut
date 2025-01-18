import express from 'express';
import indexRouter from './routes/index.mjs';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(indexRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.cookie('hello', 'world', { maxAge: 60000, signed: true })
    res.status(201).send({ msg: "hello" })
})
app.listen(PORT, (req, res) => {
    console.log(`Running on ${PORT}`);
})