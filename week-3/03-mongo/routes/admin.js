const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index");
const zod = require("zod");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const adminUsernameSchema = zod.string();
    const adminPassSchema = zod.string();
    const usernameRes = adminUsernameSchema.safeParse(req.headers.username);
    const passwordRes = adminPassSchema.safeParse(req.headers.password);

    if(usernameRes.success && passwordRes.success){
        const adminList = await Admin.find({username: req.headers.username});
        if(adminList.length){
            res.status(409).send("User name alreadt exists");
            return;
        }else{
            const admin = new Admin({username: req.headers.username, password: req.headers.password});
            await admin.save();
            res.status(200).json({message: 'Admin created successfully'});
            return;
        }
        
    }else{
        res.status(403).send("Username or password not in correct format");
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const courseData = req.body;
    const allCourse = await Course.find();
    const existingCourseList = await Course.find(courseData);
    if(!existingCourseList.length){
        courseData["id"] = allCourse.length + 1;
        courseData["published"] = true;
        const course = new Course(courseData);
        await course.save();
        res.status(200).json({message: 'Course created successfully', courseId: allCourse.length + 1});
    }else{
        res.status(409).send("Course already exists");
    }
    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const allCourse = await Course.find();
    res.status(200).json({courses: allCourse});
    return;
});

router.use("*", (req, res) => {
    res.status(404).send();
})

module.exports = router;