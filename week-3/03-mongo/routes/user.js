const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db/index");
const zod = require("zod");

// User Routes
router.post('/signup', async (req, res) => {
    const userNameSchema = zod.string();
    const userPasswordSchema = zod.string();
    const givenUserName = userNameSchema.safeParse(req.body.username);
    const givenPassword = userPasswordSchema.safeParse(req.body.password);

    if(givenUserName.success && givenPassword.success){
        const userObj = {username: req.body.username, password: req.body.password}
        const existingUser = await User.find(userObj);
        if(existingUser.length){
            res.status(409).send("User already exixts")
        }else{
            const newUser = new User(userObj);
            await newUser.save();
            res.status(200).json({message: 'User created successfully'});
        }  
    }else{
        res.status(403).send("Invalid username or password format");
    }
});

router.get('/courses', userMiddleware, async (req, res) => {
    const allCourses = await User.find();
    res.status(200).json({courses: allCourses});
    return;
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    let courseId = req.params.courseId;
    courseId = typeof courseId == "number" ? courseId: Number(courseId);
    const course = await Course.find({"id": courseId});
   
    if(course.length){
        const booksPurshased = (await User.find({"username": req.headers.username}))[0]["books"];
        if(booksPurshased.includes(courseId)){
            res.status(409).send("Course is already bought by user");
            return;
        }else{
            booksPurshased.push(courseId)
            const dbres = await User.updateOne({"username": req.headers.username}, {"books": booksPurshased});
            if (dbres.acknowledged){
                res.status(200).json({ message: 'Course purchased successfully' });
            }else{
                res.status(500).send("db error");
            }
        }
        
    }else{
        res.status(404).send("Book id not available");
    }   
    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.find({"username": req.headers.username});
    const books = user[0]["books"];
    const booksPurchased = []
    for (let i=0;i<books.length;i++){
        let course = await Course.find({"id": books[i]});
        if(!course.length){
            res.status(500).send(`Course id ${books[i]} does not exixt on db anymore`);
            return;
        }
        booksPurchased.push(course[0]);
    }
    res.status(200).json({purchasedCourses: booksPurchased});
});

module.exports = router