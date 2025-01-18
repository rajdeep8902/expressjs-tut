import express from 'express';
import indexRouter from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(
    session({
        secret: "raj the dev",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000*60
        }
    }));
app.use(indexRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited=true;
    res.cookie('hello', 'world', { maxAge: 60000, signed: true })
    res.status(201).send({ msg: "hello" })
})
app.listen(PORT, (req, res) => {
    console.log(`Running on ${PORT}`);
})