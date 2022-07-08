import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) res.status(401).json({ message: "Unauthorized" });

  const [, token] = authToken.split(" ");

  try {
    verify(token, "2a8b3b4d-4db4-4991-9f81-08ea50ef81c5");
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

export { ensureAuthenticated };
