import Todo from "../model/todomodel.js";
import {StatusCodes} from "http-status-codes";

export function gettodo(req,res){
    try{
        Todo.find()
            .then((todo)=>{
                return res.status(StatusCodes.OK).json({
                    code:StatusCodes.OK,
                    message:StatusCodes.OK,
                    data:todo
                });
            })
            .catch((error)=>{
                console.error("Error fetching todos:", error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    code:StatusCodes.INTERNAL_SERVER_ERROR,
                    message:StatusCodes.INTERNAL_SERVER_ERROR,
                    data:null
                });
            });

    } catch(error){
        console.error("Error fetching todos:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:StatusCodes.INTERNAL_SERVER_ERROR,
            data:null
        });
    }
}