import { Router } from "express";
const prodRouter = Router();

prodRouter.get('/api/products', (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies)
    if (req.signedCookies.hello && req.signedCookies.hello === 'world') {
        return res.send([
            { prod_id: 1, username: "mobile" },
            { prod_id: 2, username: "laptop" }
        ])
    }
    return res.status(403).send({ msg: "you need correct cookie" })
})

export default prodRouter;