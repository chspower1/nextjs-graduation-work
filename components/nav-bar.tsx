import { getSession } from "@/libs/session.util";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
const doLogout = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  revalidatePath("/log-in");
  redirect("/log-in");
};
const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      className={
        "w-[75px] h-[33px] text-center rounded-md text-sm bg-white text-black hover:bg-primary hover:text-white"
      }
    >
      {children}
    </button>
  );
};

const LogoutButton = () => {
  return (
    <form action={doLogout}>
      <div>
        <Button>로그아웃</Button>
      </div>
    </form>
  );
};
const NavBar = (params: any) => {
  const pathname = headers().get("x-pathname") ?? "";

  console.log("nav", pathname);
  return (
    <div className="w-screen flex gap-10 border-b-[1px] border-stroke h-[60px] px-[60px] items-center">
      <Link href="/">
        <Image src="/tweet_logo.svg" width={98} height={29} alt="logo" />
      </Link>

      <div className="w-full flex justify-end items-center">
        {pathname === "/" ? (
          <>
            <Image
              src={"/icon/user.svg"}
              width={44}
              height={44}
              alt="user"
              className="cursor-pointer"
            />
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/log-in">
              <Button>로그인</Button>
            </Link>
            <Link href="/create-account">
              <Button>회원가입</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default NavBar;
