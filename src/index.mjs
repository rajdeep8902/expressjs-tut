import express from 'express';
import indexRouter from './routes/index.mjs';
const app = express();
app.use(express.json());
app.use(indexRouter)

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(201).send({ msg: "hello" })
})
app.listen(PORT, (req, res) => {
    console.log(`Running on ${PORT}`);
})