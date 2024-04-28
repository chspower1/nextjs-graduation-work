"use client";
import SubmitButton from "@/components/submit-button";
import Link from "next/link";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { createTweet } from "./action";
import { useFormState } from "react-dom";
import { User } from "@prisma/client";
import Image from "next/image";

const Overlay = () => {
  return <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-20 z-10" />;
};

const CreateTweetModal = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [state, action] = useFormState(createTweet, null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      const user = await (await fetch("/user")).json();
      console.log(user);
      setUser(user);
    })();
  }, []);
  return (
    <>
      <Overlay />

      <form
        action={(formData) => {
          action(formData);
          setShowModal(false);
        }}
        className="w-[540px] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20  flex flex-col px-[20px] py-[10px] gap-[10px] rounded-xl items-end"
      >
        <h1 className="font-bold text-[22px] my-[6px] w-full text-center">트윗 만들기</h1>
        <div className="flex gap-3">
          <div>
            <Image
              src={user?.avator!}
              width={40}
              height={40}
              alt="user"
              className="cursor-pointer rounded-full border-gray-100 border-2"
            />
          </div>
          <textarea
            placeholder="하고 싶은 말을 입력해보세요..."
            className="w-[450px] h-[180px] text-start outline-none ring-gray-200 ring-1 focus:ring-primary focus:ring-2 p-2 transition-shadow duration-300 ease-out"
            name="content"
          />
        </div>
        <div className="flex w-40 gap-3">
          <SubmitButton
            onClick={() => {
              setShowModal(false);
            }}
            className="bg-red-500 w-[80px] hover:bg-red-600 active:bg-red-700 text-white "
          >
            취소
          </SubmitButton>
          <SubmitButton className="w-[80px]">작성</SubmitButton>
        </div>
      </form>
    </>
  );
};
export default CreateTweetModal;
