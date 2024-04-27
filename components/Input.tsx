import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  id: string;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
}
const Input = ({ id, label, name, errorMessage, type = "text" }: InputProps) => {
  return (
    <>
      <label htmlFor={id} className="text-sm text-black mb-[6px] font-normal">
        {label}
      </label>
      <input
        className="w-full px-3  outline-none ring-2 rounded-[8px] h-[32px] ring-stroke ring-inset focus:ring-primary transition-all ease-out duration-500 text-black"
        id={id}
        type={type}
        name={name}
        placeholder={name}
      />
      <span className="w-full h-[11px] text-[10px] text-warning text-right font-thin">
        {errorMessage}
      </span>
    </>
  );
};
export default Input;
