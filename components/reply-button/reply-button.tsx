"use client";
import Image from "next/image";

const ReplyButton = ({ replyCount }: { replyCount: number }) => {
  return (
    <button className="flex gap-[4px] items-center">
      <Image src="./icon/chat.svg" width={24} height={24} alt="chat" />
      <span>{replyCount}</span>
    </button>
  );
};
export default ReplyButton;
