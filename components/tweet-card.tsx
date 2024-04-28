import db from "@/libs/db.util";
import { Tweet, User } from "@prisma/client";
import Image from "next/image";

interface TweetCardProps {
  tweet: Tweet;
}
const getUser = async (userId: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      avator: true,
    },
  });
  return user;
};

const getTweetReplyAndLikeCount = async (tweetId: number) => {
  const replyCount = await db.reply.count({
    where: {
      tweetId,
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return { replyCount, likeCount };
};

const TweetCard = async ({ tweet }: TweetCardProps) => {
  const user = await getUser(tweet.userId);
  const { likeCount, replyCount } = await getTweetReplyAndLikeCount(tweet.id);
  return (
    <div className="w-[556px] flex flex-col border-stroke border-[1px] py-[10px] px-[28px] gap-[10px] text-black">
      <div className="flex gap-[10px]">
        <div className="rounded-full bg-red-400 size-[40px]"></div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-[15px]">{user?.name}</span>
          <span className="text-[11px] text-[#929292]">{tweet.createAt.getFullYear()}</span>
        </div>
      </div>
      <div className="flex flex-col gap-[4px] px-[50px]">
        <div>{tweet.content}</div>
        <div className="w-[300px] h-[175px] bg-gray-300 rounded-md" />
      </div>
      <div className="flex gap-[21px] px-[50px]">
        <div className="flex gap-[4px] items-center">
          <Image src="./icon/chat.svg" width={24} height={24} alt="chat" />
          <span>{replyCount}</span>
        </div>
        <div className="flex gap-[4px] items-center">
          <Image src="./icon/heart.svg" width={24} height={24} alt="chat" />
          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};
export default TweetCard;
