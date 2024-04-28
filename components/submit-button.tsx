"use client";
import { clsx } from "clsx";
import { HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
const SubmitButton = ({ children, ...attr }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...attr}
      className={clsx(
        "w-full bg-primary rounded-md py-1 px-2 text-white text-base mt-[30px] hover:bg-[#0C51D8] transition-all duration-300 ease-out active:bg-[#1b2c50]",
        attr.className
      )}
      disabled={pending}
    >
      {children}
    </button>
  );
};
export default SubmitButton;
