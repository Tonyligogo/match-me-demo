"use client";

import {
  Image,
} from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiExternalLink } from "react-icons/fi";

type Props = {
  member: Member;
  navLinks: { name: string; href: string }[];
};

export default function MemberSidebar({
  member,
  navLinks,
}: Props) {
  const pathname = usePathname();

  return (
    <div className='w-full'>
        {/* user profile */}
        <h1 className='text-primaryBlue text-2xl font-bold'>Your profile</h1>
        <div className='relative mt-2 h-[240px]'>
          <Image
          height={240}
          width={240}
          src={member?.image || "/images/user.png"}
          alt="User profile main image"
          className="object-cover object-top h-full rounded-xl"
          />
        </div>
          <p className='text-lg font-semibold text-primaryBlue'>{member?.name}</p>
        <p className="text-primaryBlue">{member?.zodiac}</p>
          <p className='text-sm text-primaryBlue'>{member?.city},{member?.country}</p>
          <nav className="flex flex-col py-4 text-xl gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`flex justify-between underline text-primaryBlue text-[15px]  
                                ${
                                  pathname ===
                                  link.href
                                    ? "text-pink-500"
                                    : "hover:text-pink-500"
                                }`}
            >
              {link.name}
              <FiExternalLink size={16} />
            </Link>
          ))}
        </nav>
      </div>
    
  );
}
