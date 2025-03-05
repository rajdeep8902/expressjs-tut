import { Router } from "express";
import userRouter from "./users.mjs";
import prodRouter from "./products.mjs";
import { mockUsers } from "../utils/constants.mjs";
import passportUse from "../strategies/local-strategy.mjs";
const indexRouter=Router();

indexRouter.use(userRouter);
indexRouter.use(prodRouter);

// indexRouter.post('/api/auth', (req, res) => {
//     const { body: { username, password } } = req;
//     const findUser = mockUsers.find((user) => user.username === username);
//     if (!findUser || findUser.password !== password) return res.status(401).send({ msg: "Bad Credintials" });
//     req.session.user = findUser;
//     return res.status(200).send(findUser);
// })
// indexRouter.get('/api/auth/status', (req, res) => {
//     if (!req.session.user) return res.status(401).send({ msg: "Not auth" });
//     return res.status(200).send(req.session.user);
// })
// indexRouter.post('/api/cart', (req, res) => {
//     if (!req.session.user) return res.sendStatus(401);
//     const { body: item } = req;
//     const { cart } = req.session;
//     if (cart) {
//         cart.push(item);
//     }
//     else {
//         req.session.cart = [item];
//     }
//     return res.status(201).send(item);
// })
// indexRouter.get('/api/cart', (req, res) => {
//     if (!req.session.user) return res.sendStatus(401);
//     return res.send(req.session.cart ?? []);
// })

export default indexRouter;

