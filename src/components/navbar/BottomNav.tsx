import {
  Navbar,
  NavbarContent,
} from "@nextui-org/react";
import { GiSelfLove } from "react-icons/gi";
import NavLink from "./NavLink";
import { auth } from "@/auth";

import { IoChatbubblesOutline, } from "react-icons/io5";
import { BsHeartPulse } from "react-icons/bs";
import { RiHeartsLine } from "react-icons/ri";

export default async function BottomNav() {
  const session = await auth();

  const memberLinks = [
    { href: "/my-profile", label: "Mingle", icon: <BsHeartPulse size={20} /> },
    { href: "/members", label: "My Stars", icon:<GiSelfLove size={20} /> },
    { href: "/lists", label: "Activities", icon:<RiHeartsLine size={20} /> },
    { href: "/messages", label: "Messages", icon:<IoChatbubblesOutline size={20} /> },
  ];

  return (
      <Navbar
        maxWidth="full"
        className="bg-white z-50 justify-center"
        classNames={{
          item: [
            "text-sm",
            "text-primaryBlue",
            "data-[active=true]:text-pink-500 ",
          ],
          wrapper:[
            "px-4",
            "justify-between"
          ],
          content:[
            "w-full",
            "justify-center justify-between",
          ],
          menu:[
            "w-full",
            "justify-center justify-between"
          ]
        }}
      >
       
        <NavbarContent className="w-full"  data-justify="between">
          {session &&
            memberLinks.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            ))}
        </NavbarContent>
      </Navbar>
  );
}
