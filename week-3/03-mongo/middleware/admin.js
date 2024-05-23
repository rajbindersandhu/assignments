// Middleware for handling auth
const {Admin} = require("../db/index");
const zod = require("zod");
const adminUsernameSchema = zod.string();
const adminPassSchema = zod.string();
async function adminMiddleware(req, res, next) {
    const usernameRes = adminUsernameSchema.safeParse(req.headers.username);
    const passwordRes = adminPassSchema.safeParse(req.headers.password);

    if(usernameRes.success && passwordRes.success){
        const dbResp = await Admin.find({username: req.headers.username, password: req.headers.password});
        if(dbResp.length){
            next();
        }else{
            res.status(403).send("Invalid username or password");
            return;
        }
    }else{
        res.status(403).send("Username or password not in correct format");
        return;
    }
}

module.exports = adminMiddleware;