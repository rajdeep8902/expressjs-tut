export const mockUsers = [
    { id: 1, username: "raj" },
    { id: 2, username: "deep" },
    { id: 3, username: "arka" },
    { id: 4, username: "samya" },
    { id: 5, username: "logn" },
    { id: 6, username: "apa" },
    { id: 7, username: "dana" },
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