export function isInstructor(req,res,next){
    if(req.session.role!=="instructor"){
        return res.status(403).json({message:"Forbidden"});
    }
    next();
}