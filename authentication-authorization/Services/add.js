import Todo from "../model/todomodel.js";
import {StatusCodes} from "http-status-codes";

export function addtodo(req,res){
    try {
        const {title,description}=req.body;
        if(!title||!description){
            return res.status(StatusCodes.BAD_REQUEST).json({
                code:StatusCodes.BAD_REQUEST,
                message:StatusCodes.BAD_REQUEST,
                data:null
            });

        }
        const newTodo=new Todo({
            title,
            description
        });
        newTodo.save();
        return res.status(StatusCodes.CREATED).json({
            code:StatusCodes.CREATED,
            message:StatusCodes.CREATED,
            data:newTodo
        });


    } catch (error) {
        console.error("Error adding todo:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:StatusCodes.INTERNAL_SERVER_ERROR,
            data:null

        });

    }
}