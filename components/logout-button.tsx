"use client";

import { getSession } from "@/libs/session.util";

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      className={
        "w-[75px] h-[33px] text-center rounded-md text-sm bg-white text-black hover:bg-primary hover:text-white"
      }
      onClick={async () => {
        const session = await getSession();
        session.destroy();
      }}
    >
      {children}
    </button>
  );
};
export default LogoutButton;
