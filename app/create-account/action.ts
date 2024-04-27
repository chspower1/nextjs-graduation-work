"use server";
import { createUser, isEmailUnique } from "@/libs/auth.util";
import { getSession, saveSession } from "@/libs/session.util";
import { CreateAccountInput } from "@/typings/auth.type";
import { redirect } from "next/navigation";
import { z } from "zod";

const createAccountSchema = z
  .object({
    [CreateAccountInput.EMAIL]: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, "이메일은 3글자 이상 입력해주세요.")
      .email("올바른 이메일 형식이 아닙니다."),
    [CreateAccountInput.PASSWORD]: z.string().trim(),
    [CreateAccountInput.PASSWORD_CONFIRM]: z.string().trim(),
  })
  .refine(
    (data) => data[CreateAccountInput.PASSWORD] === data[CreateAccountInput.PASSWORD_CONFIRM],
    {
      message: "비밀번호가 다릅니다",
      path: [CreateAccountInput.PASSWORD_CONFIRM],
    }
  )
  .refine(async ({ email }) => await isEmailUnique(email), {
    message: "중복된 이메일입니다.",
    path: [CreateAccountInput.EMAIL],
  });

export const createAccountAction = async (prevState: any, formData: FormData) => {
  const data = {
    [CreateAccountInput.EMAIL]: formData.get(CreateAccountInput.EMAIL),
    [CreateAccountInput.PASSWORD]: formData.get(CreateAccountInput.PASSWORD),
    [CreateAccountInput.PASSWORD_CONFIRM]: formData.get(CreateAccountInput.PASSWORD_CONFIRM),
  };

  const result = await createAccountSchema.safeParseAsync(data);
  let errorMessage = null;
  // guard
  if (result.success) {
    const user = await createUser(result.data);
    const session = await getSession();
    saveSession(session, user.id);
    redirect("/");
  } else {
    errorMessage = result.error.flatten();
  }
  //TODO: session 생성 및 저장 로직부터 작성
  console.log({ email: data.email, password: data.password, errorMessage });
  return {
    email: data[CreateAccountInput.EMAIL],
    password: data[CreateAccountInput.PASSWORD],
    errorMessage,
  };
};
