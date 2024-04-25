"use client";
import { useFormState } from "react-dom";
import { loginAction } from "./action";
import SubmitButton from "@/components/submit-button";

const LoginPage = () => {
  const [state, action] = useFormState(loginAction, null);
  return (
    <div>
      <form action={action}>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" name="email" />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" name="password" />
        <SubmitButton>login</SubmitButton>
      </form>
    </div>
  );
};

export default LoginPage;
