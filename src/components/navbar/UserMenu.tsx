"use client";

import { signOutUser } from "@/app/actions/authActions";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {
  userInfo: {
    name: string | null;
    image: string | null;
  } | null;
  userId: string | null;
};

export default function UserMenu({
  userInfo,
  userId
}: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="default"
          name={userInfo?.name || "user avatar"}
          size="sm"
          src={
            userInfo?.image || "/images/user.png"
          }
        />
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        aria-label="User actions menu"
      >
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
          >
            Signed in as {userInfo?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          as={Link}
          href={`/members/${userId}`}
        >
          View profile
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/members/edit"
        >
          Edit profile
        </DropdownItem>
        <DropdownItem
          color="danger"
          onClick={async () => signOutUser()}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
