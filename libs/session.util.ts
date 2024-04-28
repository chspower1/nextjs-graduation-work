import { IronSession, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = async () => {
  const session = await getIronSession<{ id?: number }>(cookies(), {
    cookieName: "iron-session",
    password: "3Whu9fU5NUBmZ9axTLPLzzvCm7JGwu2MnT66c1x0gU0",
  });
  return session;
};

export const saveSession = async (
  session: IronSession<{
    id?: number;
  }>,
  id: number,
) => {
  session.id = id;
  await session.save();
};
