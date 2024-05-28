// Middleware for handling auth
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
    const authToken = (req.get("Authorization"));
    if(authToken){
        const jwtstring = authToken.replace("Bearer ", "");
        try{
            const authRes = jwt.verify(jwtstring, "pass123456");
            next();
        }catch(err){
            res.status(403).send(err);
        }
    }else{
        res.status(403).send("No token");
    }
}

module.exports = adminMiddleware;