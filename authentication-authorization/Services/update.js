import Todo from "../model/todomodel.js";
import {StatusCodes} from "http-status-codes";

export function updatetodo(req, res) {
  try {
    const {id}=req.params;
    const {title,description}=req.body;

    if (!title||!description) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code:StatusCodes.BAD_REQUEST,
        message:StatusCodes.BAD_REQUEST,
        data:null
      });
    }
    Todo.findByIdAndUpdate(id, { title, description }, { new: true })
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
        console.error("Update Error:", error);

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
      data:null
    });
  }
}