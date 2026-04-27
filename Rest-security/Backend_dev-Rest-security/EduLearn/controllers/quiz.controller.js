import Quiz from "../models/Quiz.js";

export function submitQuiz(req,res){
    Quiz.findById(req.body.id)
    .then(q=>{
        if(q.submitted){
            return res.status(400).json({message:"Already submitted"});
        }
        q.answer=req.body.answer;
        q.submitted=true;
        return q.save();
    })
    .then(()=>res.json({message:"Submitted"}))
    .catch(()=>res.status(500).json({message:"Error"}));
}