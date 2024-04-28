import db from "@/libs/db.util";
import { Tweet, User } from "@prisma/client";
import Image from "next/image";
import ReplyButton from "./reply-button/reply-button";
import LikeButton from "./like-button/like-button";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Link from "next/link";
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
const toggleLike = async () => {};
const TweetCard = async ({ tweet }: TweetCardProps) => {
  const user = await getUser(tweet.userId);
  const { likeCount, replyCount } = await getTweetReplyAndLikeCount(tweet.id);
  return (
    <div className="w-[556px] flex flex-col border-stroke border-[1px] py-[10px] px-[28px] gap-[10px] text-black">
      <div className="flex gap-[10px]">
        <Image
          src={user?.avator!}
          width={40}
          height={40}
          alt="user"
          className="cursor-pointer rounded-full border-gray-100 border-2"
        />
        <div className="flex flex-col gap-[4px]">
          <span className="text-[15px]">{user?.name}</span>
          <span className="text-[11px] text-[#929292]">
            {dayjs(tweet.createAt.toISOString()).format("YYYY년 MM월 DD일")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[4px] px-[50px]">
        <Link href={`/tweet/${tweet.id}`}>
          <p className="w-full max-h-[24px] overflow-ellipsis overflow-hidden whitespace-nowrap">
            {tweet.content}
          </p>
        </Link>
        {/* <div className="w-[300px] h-[175px] bg-gray-300 rounded-md" /> */}
      </div>
      <div className="flex px-[50px]">
        {/* <ReplyButton replyCount={replyCount} /> */}
        <LikeButton likeCount={likeCount} tweetId={tweet.id} />
      </div>
    </div>
  );
};
export default TweetCard;
