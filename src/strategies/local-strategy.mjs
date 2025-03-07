import passport, { strategies } from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePass } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
    console.log('Inside serialize')
    console.log(user)
    done(null, user.id);
})

passport.deserializeUser(async(id, done) => {
    console.log("inside deserialize")
    try {
        const findUser = await User.findById(id);
        console.log(`deserialize ${id}`)
        if(!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
})

const passportUse = passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await User.findOne({ username });
            if(!findUser) throw new Error("User not found");
            if(!comparePass(password, findUser.password)) throw new Error("Bad credintials");
            done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    })
)
export default passportUse;