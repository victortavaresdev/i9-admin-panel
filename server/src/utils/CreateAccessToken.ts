import { sign } from "jsonwebtoken";

class CreateAccessToken {
  async execute(userId: string) {
    const accessToken = sign({}, "2a8b3b4d-4db4-4991-9f81-08ea50ef81c5", {
      subject: userId,
      expiresIn: "1h",
    });

    return accessToken;
  }
}

export { CreateAccessToken };
