import dayjs from "dayjs";
import { prisma } from "./prisma";

class CreateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(30, "days").unix();

    const refreshToken = prisma.refreshToken.create({
      data: { userId, expiresIn },
    });

    return refreshToken;
  }
}

export { CreateRefreshToken };
