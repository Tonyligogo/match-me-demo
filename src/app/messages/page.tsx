
import React, { useState } from "react";
import Chats from "./Chats";
import MessagesContainer from "./MessagesContainer";
import Wrapper from "./Wrapper";
// import MessageSidebar from "./MessageSidebar";
// import { getMessagesByContainer } from "../actions/messageActions";
// import MessageTable from "./MessageTable";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { container: string };
}) {
  // const { messages, nextCursor } =
  //   await getMessagesByContainer(
  //     searchParams.container
  //   );
  

  return (
    <div className="h-[calc(100vh-70px)] flex flex-col">
      <h1 className="px-8 font-semibold text-2xl my-4 text-primaryBlue">Messages</h1>
      <div className="flex-grow overflow-hidden mx-4 bg-white rounded-xl">
        <Wrapper/>
      </div>
    </div>
  );
}

{/* <div className="flex bg-white rounded-xl">
      <div className="w-[250px] px-4 border-r lg:w-[400px]">
        <MessageSidebar />
      </div>
      <div className="flex-grow">
        <MessageTable
          initialMessages={messages}
          nextCursor={nextCursor}
        />
      </div>
      </div> */}