import { NextFunction, Request, Response } from "express";
import { LoginUserBody, RegisterUserBody } from "../interfaces";
import { AuthService } from "../services";

const authService = new AuthService();

class AuthController {
  async LoginUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password }: LoginUserBody = req.body;
      const token = await authService.LoginUserService({ username, password });

      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
  async RefreshTokenUserController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { refresh_token } = req.body;
      const newToken = await authService.RefreshTokenUserService(refresh_token);

      return res.status(200).json(newToken);
    } catch (error) {
      next(error);
    }
  }
  async RegisterUserController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, username, password }: RegisterUserBody = req.body;
      const registeredUser = await authService.RegisterUserService({
        name,
        username,
        password,
      });

      return res.status(201).json(registeredUser);
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController };
