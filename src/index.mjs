import express from 'express';
import indexRouter from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { mockUsers } from './utils/constants.mjs';

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(
    session({
        secret: "raj the dev",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000
        }
    }));
app.use(indexRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('hello', 'world', { maxAge: 10000, signed: true })
    res.status(201).send({ msg: "hello" })
})
app.listen(PORT, (req, res) => {
    console.log(`Running on ${PORT}`);
})

app.post('/api/auth', (req, res) => {
    const { body: { username, password } } = req;
    const findUser = mockUsers.find((user) => user.username === username);
    if (!findUser || findUser.password !== password) return res.status(401).send({ msg: "Bad Credintials" });
    req.session.user = findUser;
    return res.status(200).send(findUser);
})
app.get('/api/auth/status', (req, res) => {
    if (!req.session.user) return res.status(401).send({ msg: "Not auth" });
    return res.status(200).send(req.session.user);
})
app.post('/api/cart', (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    const { body: item } = req;
    const { cart } = req.session;
    if (cart) {
        cart.push(item);
    }
    else {
        req.session.cart = [item];
    }
    return res.status(201).send(item);
})
app.get('/api/cart', (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    return res.send(req.session.cart ?? []);
})