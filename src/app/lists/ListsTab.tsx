"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useTransition } from "react";
import { Key } from "react";
import MemberCard from "../members/MemberCard";
import Loading from "../loading";

type Props = {
  members: Member[];
  likeIds: string[];
};

export default function ListsTab({
  members,
  likeIds,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    {
      id: "source",
      label: "I like",
    },
    {
      id: "target",
      label: "Likes me",
    },
    { id: "mutual", label: "Potential" },
  ];

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(
        searchParams
      );
      params.set("type", key.toString());
      router.replace(
        `${pathname}?${params.toString()}`
      );
    });
  }

  return (
    <div className="flex w-full flex-col overflow-auto mt-5 gap-5">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        className="px-4"
        onSelectionChange={(key) =>
          handleTabChange(key)
        }
      >
        {(item) => (
          <Tab key={item.id} style={{fontSize:'16px'}} title={item.label}>
            {isPending ? (
              <Loading />
            ) : (
              <>
              <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                {members.length > 0 ? (
                    members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likeIds={likeIds}
                      />
                    ))
                ) : (
                  <div>
                    No members for this filter
                  </div>
                )}
                </div>
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
