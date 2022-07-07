import { compare, hash } from "bcryptjs";
import dayjs from "dayjs";
import { createAccessToken, createRefreshToken, prisma } from "../utils";

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

    const accessToken = await createAccessToken(userAlreadyExists.id);

    await prisma.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      },
    });

    const refreshToken = await createRefreshToken(userAlreadyExists.id);

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

    const accessToken = await createAccessToken(refreshToken.userId);

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      const newRefreshToken = await createRefreshToken(refreshToken.userId);

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

    const registeredUser = await prisma.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return registeredUser;
  }
}

export { AuthService };
