import { getMemberByUserId } from "@/app/actions/memberActions";
import React, { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";
import { getAuthUserId } from "@/app/actions/authActions";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/edit`;

  const navLinks = [
    { name: "Edit Profile", href: `${basePath}` },
    {
      name: "Update Photos",
      href: `${basePath}/photos`,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row px-4 pt-6 gap-5 md:h-[80vh]">
      <div className="flex-1">
        <MemberSidebar
          member={member}
          navLinks={navLinks}
        />
      </div>
      <div className="flex-[4]">
        <Card className="w-full md:h-[80vh]">
          {children}
        </Card>
      </div>
    </div>
  );
}
