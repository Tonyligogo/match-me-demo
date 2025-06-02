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

export default function MinglerCard({
  member,
  likeIds,
}: Props) {
  const hasLiked = likeIds.includes(
    member.userId
  );
  const [aboutOpen, setAboutOpen] = React.useState(false);

  const preventLinkAction = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="sm:bg-white sm:p-4 md:p-6 flex flex-col sm:flex-row gap-2 sm:gap-6 md:gap-10 rounded-xl sm:shadow-md overflow-hidden">
    <Card
      fullWidth
      as={Link}
      href={`/members/${member.userId}`}
      isPressable
      className="flex-1"
    >
      <img src={member.image || "/images/user.png"} alt={member.name} className="object-cover h-[400px] w-full" />
      <div onClick={preventLinkAction}>
        <div className="md:hidden absolute top-3 right-3 z-50">
          <LikeButton
            targetId={member.userId}
            hasLiked={hasLiked}
          />
        </div>
        <div className="absolute top-2 left-3 z-50">
          <PresenceDot member={member} />
        </div>
      </div>
      <CardFooter className="flex justify-start sm:hidden bg-black overflow-hidden absolute bottom-0 z-10 bg-pink-gradient">
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
    <div className="text-primaryBlue flex-1">
      <div className="hidden sm:flex items-center justify-between">
        <h1 className="font-bold text-3xl">{member.name}</h1>
        <LikeButton
            targetId={member.userId}
            hasLiked={hasLiked}
          />
      </div>
        <p className="hidden sm:block mt-2">{member.zodiac} | {calculateAge(member.dateOfBirth)}</p>
        <p className="hidden sm:block">{member.city},{' '}{member.country}</p>
        <div className="sm:mt-4 px-2 sm:px-0">
        <button className="underline sm:hidden" onClick={()=>setAboutOpen(prev=>!prev)}>{aboutOpen ? 'Close':'About'}</button>
        <p className={`${aboutOpen ? 'block':'hidden'} text-lg sm:block`}>{member.description}</p>
        </div>
    </div>
    </div>
  );
}
