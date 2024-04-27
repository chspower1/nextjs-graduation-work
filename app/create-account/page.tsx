"use client";
import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";
import { createAccountAction } from "./action";
import { CreateAccountInput } from "@/typings/auth.type";
import Input from "@/components/Input";

const CreateAccountPage = () => {
  const [state, action] = useFormState(createAccountAction, null);
  return (
    <div className="w-[288px] m-auto pt-[100px] flex flex-col items-center gap-[30px] text-black">
      <h1 className="text-[32px] font-black ">회원가입</h1>
      <form className="w-full flex flex-col" action={action}>
        <Input
          id="create-account-email"
          label="이메일"
          name={CreateAccountInput.EMAIL}
          type="email"
          errorMessage={state?.errorMessage?.fieldErrors[CreateAccountInput.EMAIL]?.[0]}
        />
        {/* TODO: 비밀번호 마스킹하기 */}
        <Input
          id="create-account-password"
          label="비밀번호"
          name={CreateAccountInput.PASSWORD}
          type="password"
          errorMessage={state?.errorMessage?.fieldErrors[CreateAccountInput.PASSWORD]?.[0]}
        />
        <Input
          id="create-account-password-confirm"
          label="비밀번호 확인"
          name={CreateAccountInput.PASSWORD_CONFIRM}
          type="password"
          errorMessage={state?.errorMessage?.fieldErrors[CreateAccountInput.PASSWORD_CONFIRM]?.[0]}
        />
        <SubmitButton>회원가입</SubmitButton>
      </form>
    </div>
  );
};

export default CreateAccountPage;
