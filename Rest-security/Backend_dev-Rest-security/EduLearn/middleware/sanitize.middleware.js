import { cleanHTML } from "../utils/sanitizer.js";

export function sanitizeData(req,res,next){
    for(let key in req.body){
        if(typeof req.body[key]==="string"){
            req.body[key]=cleanHTML(req.body[key]);
        }
    }
    next();
}