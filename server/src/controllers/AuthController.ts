import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

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
  async LoginUserController(req: Request, res: Response) {
    const { username, password }: LoginUserData = req.body;

    const authService = new AuthService();

    const token = await authService.LoginUserService({ username, password });

    return res.status(200).json(token);
  }
  async RefreshTokenUserController(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const authService = new AuthService();

    const newToken = await authService.RefreshTokenUserService(refresh_token);

    return res.status(200).json(newToken);
  }
  async RegisterUserController(req: Request, res: Response) {
    const { name, username, password }: RegisterUserData = req.body;

    const authService = new AuthService();

    const registeredUser = await authService.RegisterUserService({
      name,
      username,
      password,
    });

    return res.status(201).json(registeredUser);
  }
}

export { AuthController };
