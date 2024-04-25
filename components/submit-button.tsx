import { HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
const SubmitButton = ({ children, ...attr }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button {...attr} disabled={pending}>
      {children}
    </button>
  );
};
export default SubmitButton;
