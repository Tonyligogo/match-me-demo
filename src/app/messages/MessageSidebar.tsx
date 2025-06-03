"use client";

import useMessageStore from "@/hooks/useMessageStore";
import { Chip, Input } from "@nextui-org/react";
import clsx from "clsx";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

export default function MessageSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const [selected, setSelected] =
    useState<string>(
      searchParams.get("container") || "inbox"
    );

  const items = [
    {
      key: "inbox",
      label: "Inbox",
      icon: GoInbox,
      chip: true,
    },
    {
      key: "outbox",
      label: "Outbox",
      icon: MdOutlineOutbox,
      chip: false,
    },
  ];

  const handleSelect = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set("container", key);
    router.replace(`${pathname}?${params}`);
  };

  const { unreadCount } = useMessageStore(
    (state) => ({
      unreadCount: state.unreadCount,
    })
  );
  const handleSearch = ()=>{}

  return (
    <div className="flex flex-col">
      <Input
      className="max-w-xs"
      value={value} 
      onValueChange={setValue}
      endContent={
        <button
          aria-label="search"
          className="focus:outline-none"
          type="button"
          onClick={handleSearch}
        >
          <IoSearch />
        </button>
      }
      label="Search"
      variant="bordered"
    />
      {items.map(
        ({ key, icon: Icon, label, chip }) => (
          <div
            key={key}
            className={clsx(
              "flex flex-row items-center rounded-t-lg gap-2 p-3",
              {
                "text-default font-semibold":
                  selected === key,
                "text-black hover:text-default/70":
                  selected !== key,
              }
            )}
            onClick={() => handleSelect(key)}
          >
            <Icon size={24} />
            <div className="flex justify-between flex-grow">
              <span>{label}</span>
              {chip && <Chip>{unreadCount}</Chip>}
            </div>
          </div>
        )
      )}
    </div>
  );
}
