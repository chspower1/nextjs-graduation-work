import CreateTweetButton from "@/components/create-tweet-button";
import TweetCard from "@/components/tweet-card";
import db from "@/libs/db.util";
import Image from "next/image";
import Link from "next/link";

const getTweets = async () => {
  const tweets = await db.tweet.findMany();
  return tweets;
};
const TweetPage = async () => {
  const tweets = await getTweets();
  return (
    <main className="m-auto flex flex-col items-center text-black">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
      <CreateTweetButton />
    </main>
  );
};
export default TweetPage;
