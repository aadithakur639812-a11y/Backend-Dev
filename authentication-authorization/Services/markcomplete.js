import Todo from "../model/todomodel.js";
import {StatusCodes} from "http-status-codes";

export function markcomplete(req, res) {
  try {
    const {id}=req.params;
    Todo.findByIdAndUpdate(
      id,
      {status:"Completed"},
      {new:true}
    )
      .then((updatedTodo) => {

        if (!updatedTodo) {
          return res.status(StatusCodes.NOT_FOUND).json({
            code:StatusCodes.NOT_FOUND,
            message:StatusCodes.NOT_FOUND,
            data:null
          });
        }

        return res.status(StatusCodes.OK).json({
          code:StatusCodes.OK,
          message:StatusCodes.OK,
          data:updatedTodo
        });

      })
      .catch((error) => {
        console.error("Error marking complete:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code:StatusCodes.INTERNAL_SERVER_ERROR,
          message:StatusCodes.INTERNAL_SERVER_ERROR,
          data:null
        });
      });

  } catch (error) {
    console.error("Outer Error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code:StatusCodes.INTERNAL_SERVER_ERROR,
      message:StatusCodes.INTERNAL_SERVER_ERROR,
      datanull
    });
  }
}