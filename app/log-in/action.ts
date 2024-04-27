"use server";

import db from "@/libs/db.util";
import { LoginInput } from "@/typings/auth.type";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession, saveSession } from "@/libs/session.util";
import { redirect } from "next/navigation";
const loginSchema = z
  .object({
    [LoginInput.EMAIL]: z.string().trim(),
    [LoginInput.PASSWORD]: z.string().trim(),
  })
  .superRefine(async ({ email, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    // guard
    if (!user) {
      return ctx.addIssue({
        code: "custom",
        path: [LoginInput.EMAIL],
        message: "존재하지 않는 아이디입니다.",
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return ctx.addIssue({
        code: "custom",
        path: [LoginInput.PASSWORD],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    const session = await getSession();
    saveSession(session, user.id);
  });

export const loginAction = async (prevState: any, formData: FormData) => {
  const data = {
    [LoginInput.EMAIL]: formData.get(LoginInput.EMAIL),
    [LoginInput.PASSWORD]: formData.get(LoginInput.PASSWORD),
  };
  let errorMessage = null;
  const result = await loginSchema.safeParseAsync(data);

  if (!result.success) {
    errorMessage = result.error.flatten();
  } else {
    redirect("/");
  }
  return {
    email: data[LoginInput.EMAIL],
    password: data[LoginInput.PASSWORD],
    errorMessage,
  };
};
