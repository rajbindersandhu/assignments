const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const zod = require("zod");
const {Admin, Course} = require("../db/index");
const jwt = require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    const usernameGiven = req.body.username;
    const passwordGiven = req.body.password;
    const usernameSchema = zod.string();
    const passwordSchema = zod.string();
    const usernameRes = usernameSchema.safeParse(usernameGiven);
    const passwordRes = passwordSchema.safeParse(passwordGiven);
    if(usernameRes.success && passwordRes.success){
        try{
            const adminExist = await Admin.find({username: usernameGiven, password: passwordGiven});
            if(adminExist.length){
                res.status(409).send("Username already exists")
            }else{
                await Admin.create({username: usernameGiven, password: passwordGiven});
                res.status(200).json({ message: 'Admin created successfully' });
            }
        }catch(err){
            console.log(err);
            res.status(500).send("DB error");
            return;
        }
        
    }else{
        res.status(404).send("Invalid username or passwrod format");
    }
});

router.post('/signin', async (req, res) => {
    const usernameGiven = req.body.username;
    const passwordGiven = req.body.password;
    const usernameSchema = zod.string();
    const passwordSchema = zod.string();
    const usernameRes = usernameSchema.safeParse(usernameGiven);
    const passwordRes = passwordSchema.safeParse(passwordGiven);
    if(usernameRes.success && passwordRes.success){
        const adminExixts = await Admin.find({username: usernameGiven, password: passwordGiven});
        if(adminExixts.length){
            const userObj = {
                username: usernameGiven,
                password: passwordGiven
            }
            try{
                const jwtToken = jwt.sign(userObj, "pass123456");
                res.status(200).json({ token: jwtToken});
            }catch(err){
                caonsole.log(err);
                res.status(500).send("JWT Error");
            }
        }else{
            res.status(403).send("Invlid username or password");
        }       
    }else{
        res.status(404).send("Invalid username or passwrod format");
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const courseObj = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: true
    }

    const courseExists = await Course.find(courseObj);
    if(courseExists.length){
        res.status(409).send("Course already exists");
    }else{
        try{
            const dbRes = await Course.create(courseObj);
            res.status(200).json({ message: 'Course created successfully', courseId: dbRes._id });
        }catch(err){
            console.log(err);
            res.status(500).send("DB error");
        }
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find();
    res.status(200).json({"courses": courses});
});

module.exports = router;