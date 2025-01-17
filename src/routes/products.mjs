import { Router } from "express";
const prodRouter=Router();

prodRouter.get('/api/products', (req, res) => {
    res.send([
        { prod_id: 1, username: "mobile" },
        { prod_id: 2, username: "laptop" }
    ])
})

export default prodRouter;