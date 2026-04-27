import Course from "../models/Course.js";

export function createCourse(req,res){
    const course=new Course({
        title:req.body.title,
        description:req.body.description,
        instructorId:req.session.userId
    });

    course.save()
    .then(c=>res.json(c))
    .catch(()=>res.status(500).json({message:"Error"}));
}