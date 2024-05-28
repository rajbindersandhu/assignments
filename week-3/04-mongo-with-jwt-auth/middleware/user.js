const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const authToken = req.get("Authorization");
    if(authToken){
        const jwtString = authToken.replace("Bearer ", "");
        try{
            const jwtRes = jwt.verify(jwtString, "pass123456");
            res.set("username", jwtRes.username);
            next();
        }catch(err){
            conasole.log(err);
            res.status(403).send(err);
        }
    }else{
        res.status(403).send("No token");
    }
}

module.exports = userMiddleware;