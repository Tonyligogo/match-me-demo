"use client";

import { toggleLikeMember } from "@/app/actions/likeActions";
import { useRouter } from "next/navigation";
import React from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";

type Props = {
  targetId: string;
  hasLiked: boolean;
};

export default function LikeButton({
  targetId,
  hasLiked,
}: Props) {
  const router = useRouter();

  async function toggleLike() {
    await toggleLikeMember(targetId, hasLiked);
    router.refresh();
  }

  return (
    <div
      onClick={toggleLike}
      className="relative bg-pink-400 grid place-content-center size-12 rounded-full hover:opacity-80 transition cursor-pointer"
    >
      
      <AiFillHeart
        size={24}
        className={
          hasLiked
            ? "fill-rose-500"
            : "fill-white"
        }
      />
    </div>
  );
}
