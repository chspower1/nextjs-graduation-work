import LikeButton from "@/components/like-button/like-button";
import db from "@/libs/db.util";
import dayjs from "dayjs";
import Image from "next/image";

const getTweet = async (tweetId: number) => {
  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      _count: {
        select: {
          Likes: true,
        },
      },
      user: {
        select: {
          avator: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return tweet;
};

const TweetDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const tweet = await getTweet(Number(id));
  if (!tweet) return <>can not found tweet</>;
  return (
    <div className="w-[556px] flex flex-col mx-auto border-stroke border-[1px] py-[10px] px-[28px] gap-[10px] text-black">
      <div className="flex gap-[10px]">
        <Image
          src={tweet?.user.avator!}
          width={40}
          height={40}
          alt="user"
          className="cursor-pointer rounded-full border-gray-100 border-2"
        />

        <div className="flex flex-col gap-[4px]">
          <span className="text-[15px]">{tweet?.user.name}</span>
          <span className="text-[11px] text-[#929292]">
            {dayjs(tweet.createAt.toISOString()).format("YYYY년 MM월 DD일")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[4px] px-[50px]">
        <p className="w-full">{tweet.content}</p>

        {/* <div className="w-[300px] h-[175px] bg-gray-300 rounded-md" /> */}
      </div>
      <div className="flex px-[50px]">
        {/* <ReplyButton replyCount={replyCount} /> */}
        <LikeButton likeCount={tweet._count.Likes} tweetId={tweet.id} />
      </div>
    </div>
  );
};

export default TweetDetail;
