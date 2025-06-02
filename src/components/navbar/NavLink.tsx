"use client";

import useMessageStore from "@/hooks/useMessageStore";
import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export default function NavLink({
  href,
  label,
  icon,
}: Props) {
  const pathname = usePathname();
  const { unreadCount } = useMessageStore(
    (state) => ({
      unreadCount: state.unreadCount,
    })
  );

  return (
    <NavbarItem
      isActive={pathname === href}
      as={Link}
      href={href}
      className="flex flex-col sm:flex-row gap-1 items-center"
    >
      {icon}
      <div className="flex items-center gap-1">
      <span>{label}</span>
      {href === "/messages" &&
        unreadCount > 0 && (
          <span className="ml-1">
            ({unreadCount})
          </span>
        )}
      </div>
    </NavbarItem>
  );
}
