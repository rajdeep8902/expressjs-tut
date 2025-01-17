import express from 'express';
const app = express();
app.use(express.json());

const loggingMiddleware=(req,res,next)=>{
    console.log(`${req.method} - ${req.url}`);
    next();
}
// app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;
const mockUsers = [
    { id: 1, username: "raj" },
    { id: 2, username: "deep" },
    { id: 3, username: "arka" },
    { id: 4, username: "samya" },
    { id: 5, username: "logn" },
    { id: 6, username: "apa" },
    { id: 7, username: "dana" },
];

app.get("/",
    (req,res,next)=>{
        console.log("Base URL");
        next();
    }, 
    (req, res) => {
    res.status(201).send({ msg: "hello" })
})
app.get('/api/users', (req, res) => {
    console.log(req.query)
    const { query: { filter, value } } = req;
    if (!filter || !value) return res.send(mockUsers);
    if (filter && value) return res.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
})
app.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad request, Invalid id" });
    const findUser = mockUsers.find((user) => user.id == parsedId);
    if (!findUser) return res.sendStatus(404);
    return res.send(findUser);
})
app.post('/api/users', (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser)
    return res.status(200).send(newUser);
})
app.put('/api/users/:id', (req, res) => {
    const { body,params:{id} } = req;
    const parsedId=parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex=mockUsers.findIndex((user)=>user.id===parsedId);
    if(findUserIndex===-1) return res.sendStatus(404);
    mockUsers[findUserIndex]={
        id:parsedId,
        ...body
    }
    return res.sendStatus(200);
})
app.patch('/api/users/:id', (req, res)=>{
    const { body,params:{id} } = req;
    const parsedId=parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex=mockUsers.findIndex((user)=>user.id===parsedId);
    if(findUserIndex===-1) return res.sendStatus(404);
    mockUsers[findUserIndex]={
        ...mockUsers[findUserIndex],
        ...body
    }
    return res.sendStatus(200);
})
app.delete('/api/users/:id', (req, res)=>{
    const { params:{id} } = req;
    const parsedId=parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex=mockUsers.findIndex((user)=>user.id===parsedId);
    if(findUserIndex===-1) return res.sendStatus(404);
    mockUsers.splice(findUserIndex,1);
    return res.sendStatus(200);
})
app.get('/api/products', (req, res) => {
    res.send([
        { prod_id: 1, username: "mobile" },
        { prod_id: 2, username: "laptop" }
    ])
})
app.listen(PORT, (req, res) => {
    console.log(`Running on ${PORT}`);
})