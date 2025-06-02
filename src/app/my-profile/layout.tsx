import { ReactNode } from "react";
import LeftSidebar from "./LeftSidebar";
import { getAuthUserId } from "../actions/authActions";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
    const userId = await getAuthUserId();
  return (
    <div className="flex-grow h-full overflow-hidden flex gap-10 md:px-4 my-6 md:max-w-[90vw] mx-auto">
      <div className="w-full md:flex-[3] overflow-auto">
          {children}
      </div>
      <aside className="hidden md:flex md:flex-1">
        <LeftSidebar userId={userId}/>
      </aside>
    </div>
  );
}
