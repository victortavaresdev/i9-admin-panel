import { compare, hash } from "bcryptjs";
import dayjs from "dayjs";
import { CreateAccessToken } from "../utils/CreateAccessToken";
import { CreateRefreshToken } from "../utils/CreateRefreshToken";
import { prisma } from "../utils/prisma";

interface LoginUserData {
  username: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  username: string;
  password: string;
}

class AuthService {
  async LoginUserService({ username, password }: LoginUserData) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: { username },
    });

    if (!userAlreadyExists) throw new Error("User or password incorrect!");

    const passwordMatch = await compare(password, userAlreadyExists.password);
    if (!passwordMatch) throw new Error("User or password incorrect!");

    const createAccessToken = new CreateAccessToken();
    const accessToken = await createAccessToken.execute(userAlreadyExists.id);

    await prisma.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      },
    });

    const createRefreshToken = new CreateRefreshToken();
    const refreshToken = await createRefreshToken.execute(userAlreadyExists.id);

    return { accessToken, refreshToken };
  }
  async RefreshTokenUserService(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: { id: refresh_token },
    });

    if (!refreshToken) throw new Error("Refresh token invalid");

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const createAccessToken = new CreateAccessToken();
    const accessToken = await createAccessToken.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      const createRefreshToken = new CreateRefreshToken();
      const newRefreshToken = await createRefreshToken.execute(
        refreshToken.userId
      );

      return { accessToken, refreshToken: newRefreshToken };
    }

    return { accessToken };
  }
  async RegisterUserService({ name, username, password }: RegisterUserData) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: { username },
    });

    if (userAlreadyExists) throw new Error("User Already Exists");

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}

export { AuthService };
