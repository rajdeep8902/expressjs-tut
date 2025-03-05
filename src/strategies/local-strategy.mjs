import passport, { strategies } from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
    console.log('Inside serialize')
    console.log(user)
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    console.log("inside deserialize")
    try {
        const findUser = mockUsers.find((user) => user.id === id);
        if (!findUser) throw new Error("User not found")
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
})

const passportUse = passport.use(
    new Strategy((username, password, done) => {
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
        try {
            const findUser = mockUsers.find((user) => user.username === username)
            if (!findUser) throw new Error('User not found');
            if (findUser.password !== password) throw new Error('Invalid credintials');
            done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    })
)
export default passportUse;