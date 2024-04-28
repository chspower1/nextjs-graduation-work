"use client";
import Image from "next/image";
import { isPressedLike, toggleLike } from "./action";
import { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";

interface LikeButtonProps {
  likeCount: number;
  tweetId: number;
}

const LikeButton = ({ likeCount, tweetId }: LikeButtonProps) => {
  return (
    <button className="flex gap-[4px] items-center" onClick={() => toggleLike(tweetId)}>
      <Image src="./icon/heart.svg" width={24} height={24} alt="chat" />
      <span>{likeCount}</span>
    </button>
  );
};
export default LikeButton;
