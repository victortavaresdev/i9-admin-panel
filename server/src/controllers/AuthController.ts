import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";

interface LoginUserData {
  username: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  username: string;
  password: string;
}

class AuthController {
  async LoginUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password }: LoginUserData = req.body;
      const authService = new AuthService();
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
      const authService = new AuthService();
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
      const { name, username, password }: RegisterUserData = req.body;
      const authService = new AuthService();
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
