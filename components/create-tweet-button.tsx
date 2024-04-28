"use client";
import Image from "next/image";
import { useState } from "react";
import CreateTweetModal from "./modal/create-tweet-modal";

const CreateTweetButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="fixed bottom-10 right-10" onClick={() => setShowModal(true)}>
        <Image src="./icon/plus.svg" width={34} height={34} alt="plus" />
      </button>
      {showModal && <CreateTweetModal setShowModal={setShowModal} />}
    </>
  );
};
export default CreateTweetButton;
