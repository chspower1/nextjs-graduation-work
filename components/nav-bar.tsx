import db from "@/libs/db.util";
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
const getUser = async () => {
  "use server";
  const session = await getSession();
  if (!session.id) return null;
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });
  return user;
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

const NavBar = async (params: any) => {
  const pathname = headers().get("x-pathname");
  const user = await getUser();
  return (
    <div className="w-screen flex gap-10 border-b-[1px] border-stroke h-[60px] px-[60px] items-center">
      <Link href="/">
        <Image src="/tweet_logo.svg" width={98} height={29} alt="logo" />
      </Link>

      <div className="w-full flex justify-end items-center">
        {user ? (
          <>
            <Image
              src={user?.avator!}
              width={44}
              height={44}
              alt="user"
              className="cursor-pointer rounded-full border-gray-100 border-2"
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
