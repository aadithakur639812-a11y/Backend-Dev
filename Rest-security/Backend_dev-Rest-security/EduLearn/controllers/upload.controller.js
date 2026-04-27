export function uploadFile(req,res){
    res.json({file:req.file});
}