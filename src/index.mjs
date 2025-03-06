import express from 'express';
import indexRouter from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { mockUsers } from './utils/constants.mjs';
import passport from 'passport';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/express-tut')
    .then(()=>console.log("connected to database"))
    .catch((err)=>console.log(`Error: ${err}`))

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(
    session({
        secret: "raj the dev",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 30000
        }
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRouter);

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
})
app.get('/api/auth/status',(req,res)=>{
    console.log(req.user);
    console.log(req.session);
    if(req.user) return res.send(req.user);
    return res.sendStatus(401);
})
app.post('/api/auth/logout',(req,res)=>{
    if(!req.user) return res.sendStatus(401);
    req.logOut((err)=>{
        if(err) return res.sendStatus(400);
        res.sendStatus(200);
    })
})

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('hello', 'world', { maxAge: 30000, signed: true })
    res.status(201).send({ msg: "hello" })
})
app.listen(PORT, (req, res) => {
    console.log(`Running on ${PORT}`);
})

