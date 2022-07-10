import dayjs from "dayjs";
import { prisma } from "./prisma";

const createRefreshToken = async (userId: string) => {
  const expiresIn = dayjs().add(30, "days").unix();

  const refreshToken = await prisma.refreshToken.create({
    data: { userId, expiresIn },
  });

  return refreshToken;
};

export { createRefreshToken };
