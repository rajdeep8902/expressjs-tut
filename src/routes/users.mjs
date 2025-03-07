import { Router } from "express";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
import { postSchema, getSchema } from "../utils/validationSchema.mjs";
import { mockUsers, resolveUserById } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPass } from "../utils/helpers.mjs";

const userRouter = Router();

userRouter.get('/api/users',
    checkSchema(getSchema),
    (req, res) => {
        // console.log(req.session);
        console.log(req.session.id);
        req.sessionStore.get(req.session.id, (err, sessionData) => {
            if (err) {
                console.log(err);
                throw err;
            }
            // console.log(sessionData);
        })
        const result = validationResult(req);
        // console.log(result)
        console.log(req.query)
        const { query: { filter, value } } = req;
        if (!filter || !value) return res.send(mockUsers);
        if (filter && value) return res.send(
            mockUsers.filter((user) => user[filter].includes(value))
        );
    })
userRouter.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad request, Invalid id" });
    const findUser = mockUsers.find((user) => user.id == parsedId);
    if (!findUser) return res.sendStatus(404);
    return res.send(findUser);
})
userRouter.post('/api/users', checkSchema(postSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    const data = matchedData(req);
    data.password = hashPass(data.password);
    console.log(data);
    const newUser = new User(data);
    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
})
userRouter.put('/api/users/:id', resolveUserById, (req, res) => {
    const { body, params: { id }, findUserIndex } = req;
    mockUsers[findUserIndex] = {
        id: mockUsers[findUserIndex].id,
        ...body
    }
    return res.sendStatus(200);
})
userRouter.patch('/api/users/:id', resolveUserById, (req, res) => {
    const { body, params: { id }, findUserIndex } = req;
    mockUsers[findUserIndex] = {
        ...mockUsers[findUserIndex],
        ...body
    }
    return res.sendStatus(200);
})
userRouter.delete('/api/users/:id', resolveUserById, (req, res) => {
    const { params: { id }, findUserIndex } = req;
    mockUsers.splice(findUserIndex, 1);
    return res.sendStatus(200);
})
export default userRouter;