import db from "./db.util";
import bcrypt from "bcrypt";

export const createUser = async (data: {
  email: string;
  name: string;
  password: string;
  passwordConfirm?: string;
}) => {
  const { email, password, name } = data;
  const user = await db.user.create({
    data: {
      email,
      name,
      password: await hashedPassword(password),
      avator: `/user_avator/random_profile${Math.floor(Math.random() * 10) + 1}.png`,
    },
    select: {
      id: true,
    },
  });
  return user;
};

export const isEmailUnique = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

export const findUser = async (userId: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

const hashedPassword = async (password: string) => await bcrypt.hash(password, 10);
