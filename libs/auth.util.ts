import db from "./db.util";
import bcrypt from "bcrypt";

export const createUser = async (data: {
  email: string;
  password: string;
  passwordConfirm?: string;
}) => {
  const { email, password } = data;
  const user = await db.user.create({
    data: {
      email,
      password: await hashedPassword(password),
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
