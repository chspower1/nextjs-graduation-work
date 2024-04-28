"use client";
import SubmitButton from "@/components/submit-button";
import Link from "next/link";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { createTweet } from "./action";
import { useFormState } from "react-dom";

const Overlay = () => {
  return <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-20 z-10" />;
};

const CreateTweetModal = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [state, action] = useFormState(createTweet, null);
  return (
    <>
      <Overlay />

      <form
        action={(formData) => {
          action(formData);
          setShowModal(false);
        }}
        className="w-[540px] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20  flex flex-col px-[20px] py-[10px] gap-[10px] rounded-sm"
      >
        <h1 className="font-bold text-[22px] my-[6px] text-center">트윗 만들기</h1>
        <div className="flex gap-3">
          <div className="rounded-full size-[40px] bg-red-300" />
          <textarea
            placeholder="하고 싶은 말을 입력해보세요..."
            className="w-[450px] h-[180px] text-start"
            name="content"
          />
        </div>
        <div className="flex w-full gap-3 justify-end">
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
