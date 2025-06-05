"use client";
import LikeButton from "@/components/LikeButton";
import PresenceDot from "@/components/PresenceDot";
import { calculateAge } from "@/lib/util";
import {
  Card,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  member: Member;
  likeIds: string[];
};

export default function MemberCard({
  member,
  likeIds,
}: Props) {
  const hasLiked = likeIds.includes(
    member.userId
  );

  const preventLinkAction = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Card
      fullWidth
      as={Link}
      href={`/members/${member.userId}`}
      isPressable
    >
      <img src={member.image || "/images/user.png"} alt={member.name} className="object-cover object-top h-[380px] md:h-[295px] w-full" />
      <div onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton
            targetId={member.userId}
            hasLiked={hasLiked}
          />
        </div>
        <div className="absolute top-2 left-3 z-50">
          <PresenceDot member={member} />
        </div>
      </div>
      <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-pink-gradient">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name},{" "}
            {calculateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">
          {member.zodiac} | {member.city}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
