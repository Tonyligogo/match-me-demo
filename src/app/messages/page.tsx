
import Wrapper from "./Wrapper";
import { getChats } from "../actions/messageActions";
import { getAuthUserId } from "../actions/authActions";

export default async function MessagesPage() {

  const messages = await getChats()
  const userId = await getAuthUserId();

  return (
    <div className="h-[calc(100vh-70px)] flex flex-col">
      <h1 className="px-4 font-semibold text-2xl my-4 text-primaryBlue">Messages</h1>
      <div className="flex-grow overflow-hidden">
        <Wrapper chats={messages} userId={userId}/>
      </div>
    </div>
  );
}
