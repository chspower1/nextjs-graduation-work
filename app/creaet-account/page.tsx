import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";
import { createAccountAction } from "./action";

const CreateAccountPage = () => {
  const [state, action] = useFormState(createAccountAction, null);
  return (
    <div>
      <form action={action}>
        <label htmlFor="create-account-email">Email</label>
        <input id="create-account-email" type="email" name="email" />
        <label htmlFor="create-account-password">Password</label>
        <input id="create-account-password" type="password" name="password" />
        <label htmlFor="create-account-password-confirm">Password Confirm</label>
        <input id="create-account-password" type="password" name="password-confirm" />
        <SubmitButton>Create Account</SubmitButton>
      </form>
    </div>
  );
};

export default CreateAccountPage;
