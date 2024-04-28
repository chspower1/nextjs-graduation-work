"use server";
import db from "@/libs/db.util";
import { getSession } from "@/libs/session.util";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const tweetSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const createTweet = async (prevState: any, formData: FormData) => {
  const content = formData.get("content");
  const session = await getSession();

  const loggedinUser = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      name: true,
    },
  });
  if (!loggedinUser) return;
  await db.tweet.create({
    data: {
      title: "title",
      content: String(content),
      userId: loggedinUser.id,
    },
  });
  revalidatePath("/");
};
