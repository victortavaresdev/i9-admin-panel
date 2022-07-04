import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    status: "Error",
    message: error.message,
  });
};

export { errorHandler };
