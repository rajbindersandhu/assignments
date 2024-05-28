const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require("zod");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async (req, res) => {
    const usernameGiven = req.body.username;
    const passwordGiven = req.body.password;
    
    const usernameSchema = zod.string();
    const passwordSchema = zod.string();
    const usernameRes = usernameSchema.safeParse(usernameGiven);
    const passwordRes = passwordSchema.safeParse(passwordGiven);

    if(usernameRes.success && passwordRes.success){
        const userObj = {
            username: usernameGiven,
            password: passwordGiven
        }
        const userExists = await User.find(userObj);
        if(userExists.length){
            res.status(409).send("User already exists");
        }else{
            try{
                const dbRes = await User.create(userObj);
                res.status(200).json({ message: 'User created successfully' });
            }catch(err){
                console.log(err);
                res.status(500).send("DB error");
            }
            
        }
    }else{
        res.status(404).send("invalid username or password format");
    }
});

router.post('/signin', async (req, res) => {
    //user02 - "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIwMiIsInBhc3N3b3JkIjoicGFzczQ1NiIsImlhdCI6MTcxNjU5MDc5NX0.k_MLetey8Na1r6jQXUZEZfgXf-Naz8U9I21HR7LX14o"
    //user01 - "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIwMSIsInBhc3N3b3JkIjoiYXNzMTIzIiwiaWF0IjoxNzE2NTkwODUxfQ.OQJC7-feaHwXWbr9ndWKeobixtq2-rPipcBaKH78azE"
    const userObj = {
        username: req.body.username,
        password: req.body.password
    };
    
    const userExists = await User.find(userObj);
    if(userExists.length){
        try{
            const jwtString = jwt.sign(userObj, "pass123456");
            res.status(200).json({"token": jwtString});
        }catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    }else{
        res.status(403).send("Invalid username or password");
    }
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.status(200).json({"courses": courses});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const id = req.params.courseId;
    const courseExists = await Course.find({_id: id});
    if(courseExists.length){
        const dbRes = await User.updateOne({username: res.get("username")}, {"$push": {"books": id}})
        res.status(200).send(dbRes);
    }else{
        res.status(502).send(`No course with id ${id} exists`);
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const userList = await User.find({username: res.get("username")});
    const purchasedCourses = [];
    if(userList.length){
        const courses = userList[0]["books"];
        const dbRes = await Course.find({_id: {$in: courses}});
        res.status(200).json({purchasedCourses: dbRes});
    }
});

module.exports = router