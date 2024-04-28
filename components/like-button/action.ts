"use server";
import db from "@/libs/db.util";
import { getSession } from "@/libs/session.util";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const toggleLike = async (tweetId: number) => {
  try {
    const session = await getSession();
    if (!session.id) return;
    const like = await db.like.findFirst({
      where: {
        tweetId,
        userId: session.id,
      },
    });
    if (like) {
      await db.like.delete({
        where: {
          id: like.id,
        },
      });
    } else {
      await db.like.create({
        data: {
          tweetId,
          userId: session.id,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/");
  return;
};

export const isPressedLike = async (tweetId: number) => {
  const session = await getSession();
  const like = await db.like.findFirst({
    where: {
      tweetId,
      userId: session.id,
    },
  });
  return !!like;
};
