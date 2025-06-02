import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GiSelfLove } from "react-icons/gi";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import { getUserInfoForNav } from "@/app/actions/userActions";
import FiltersWrapper from "./FiltersWrapper";
import { IoChatbubblesOutline, } from "react-icons/io5";
import { BsHeartPulse } from "react-icons/bs";
import { RiHeartsLine } from "react-icons/ri";

export default async function TopNav() {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  const memberLinks = [
    { href: "/my-profile", label: "Mingle", icon: <BsHeartPulse size={20}  /> },
    { href: "/members", label: "My Stars", icon:<GiSelfLove size={20} /> },
    { href: "/lists", label: "Activities", icon:<RiHeartsLine size={20} /> },
    { href: "/messages", label: "Messages", icon:<IoChatbubblesOutline size={20} /> },
  ];

  const adminLinks = [
    {
      href: "/admin/moderation",
      label: "Photo Moderation",
      icon:<GiSelfLove size={20} />
    },
  ];

  const links =
    session?.user.role === "ADMIN"
      ? adminLinks
      : memberLinks;

  return (
    <>
      <Navbar
        maxWidth="full"
        className="bg-gradient-to-r from-pink-400 via-pink-500 to-primaryPurple"
        classNames={{
          item: [
            "text-xl",
            "text-white",
            "data-[active=true]:underline underline-primaryPurple ",
          ],
          wrapper:[
            "px-4"
          ],
        }}
      >
        <NavbarBrand as={Link} href="/">
          <GiSelfLove
            className="text-gray-200 size-8 sm:size-12"
          />
          <div className="font-bold text-2xl md:text-3xl flex">
            <span className="text-gray-200">
              Starmingle
            </span>
          </div>
        </NavbarBrand>
        <NavbarContent justify="center" className="hidden md:flex">
          {session &&
            links.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {userInfo ? (
            <UserMenu userInfo={userInfo} userId={session.user?.id || null} />
          ) : (
            <>
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                className="text-white"
              >
                Login
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <FiltersWrapper />
    </>
  );
}
