export const mockUsers = [
    { id: 1, username: "raj", password: "hello123" },
    { id: 2, username: "deep", password: "hello124" },
    { id: 3, username: "arka", password: "hello12" },
    { id: 4, username: "samya", password: "helo123" },
    { id: 5, username: "logn", password: "heo123" },
    { id: 6, username: "apa", password: "llo123" },
    { id: 7, username: "dana", password: "hello23" },
];
export const resolveUserById = (req, res, next) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();
}