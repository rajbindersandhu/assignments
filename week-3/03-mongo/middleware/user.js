const {User} = require("../db/index");
const zod = require("zod");

async function userMiddleware(req, res, next) {
    const userNameSchema = zod.string();
    const userPasswordSchema = zod.string();
    const givenUserName = userNameSchema.safeParse(req.headers.username);
    const givenPassword = userPasswordSchema.safeParse(req.headers.password);

    if(givenUserName.success && givenPassword.success){
        const userObt = {username: req.headers.username, password: req.headers.password};
        const foundUser = await User.find(userObt);
        if(foundUser.length){
            next();
        }else{
            res.status(403).send("Invalid username or password");
        }
    }else{
        res.status(403).send("Invalid username or password format");
        return;
    }

}

module.exports = userMiddleware;