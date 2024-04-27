"use client";
import { useFormState } from "react-dom";
import { loginAction } from "./action";
import SubmitButton from "@/components/submit-button";
import { LoginInput } from "@/typings/auth.type";
import Input from "@/components/Input";

const LoginPage = () => {
  const [state, action] = useFormState(loginAction, null);
  return (
    <div className="w-[288px] m-auto pt-[100px] flex flex-col items-center gap-[30px] text-black">
      <h1 className="text-[32px] font-black ">로그인</h1>
      <form className="w-full flex flex-col" action={action}>
        <Input
          id="create-account-email"
          label="이메일"
          name={LoginInput.EMAIL}
          type="email"
          errorMessage={state?.errorMessage?.fieldErrors[LoginInput.EMAIL]?.[0]}
        />
        {/* TODO: 비밀번호 마스킹하기 */}
        <Input
          id="create-account-password"
          label="비밀번호"
          name={LoginInput.PASSWORD}
          type="password"
          errorMessage={state?.errorMessage?.fieldErrors[LoginInput.PASSWORD]?.[0]}
        />

        <SubmitButton>로그인</SubmitButton>
      </form>
    </div>
  );
};

export default LoginPage;
