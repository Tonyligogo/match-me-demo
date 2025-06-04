"use client";

import { MessageDto } from "@/types";
import React, { useRef } from "react";
import clsx from "clsx";
import { Avatar } from "@nextui-org/react";
import { useEffect } from "react";
import { timeAgo } from "@/lib/util";
import PresenceAvatar from "@/components/PresenceAvatar";

type Props = {
  message: MessageDto;
  currentUserId: string;
};

export default function MessageBox({
  message,
  currentUserId,
}: Props) {
  const isCurrentUserSender =
    message.senderId === currentUserId;

  const messageEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [messageEndRef]);

  const renderAvatar = () => (
    <div className="self-end">
      <PresenceAvatar
        src={message.senderImage}
        userId={message.senderId}
      />
    </div>
  );

  const messageContentClasses = clsx(
    "flex flex-col w-[65%] px-2 py-1",
    {
      "rounded-l-2xl rounded-tr-2xl text-white bg-primaryPurple":
        isCurrentUserSender,
      "rounded-r-2xl rounded-tl-2xl text-gray-900 border-gray-200 bg-white":
        !isCurrentUserSender,
    }
  );

  const renderMessageFooter = () => (
    <div
      className={clsx(
        "flex items-center w-full",
        {
          "justify-between": isCurrentUserSender,
        }
      )}
    >
      <div className="flex">
        <span className={`text-xs ${isCurrentUserSender ? 'text-white' : 'text-gray-500'} ml-2`}>
          {message.created}
        </span>
      </div>
    </div>
  );

  const renderMessageContent = () => {
    return (
      <div className={messageContentClasses}>
        <p className="text-sm py-3 ">
          {message.text}
        </p>
        {renderMessageFooter()}
      </div>
    );
  };

  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right":
            isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
}
