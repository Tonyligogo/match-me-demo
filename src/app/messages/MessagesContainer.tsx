
import { IoMdArrowRoundBack } from "react-icons/io";
import { getMessageThread } from "../actions/messageActions";
import { createChatId } from "@/lib/util";
import MessageList from "./MessageList";
import ChatForm from "./ChatForm";
import { useQuery } from "@tanstack/react-query";
import { LuLoader } from "react-icons/lu";

interface MessagesContainerProps {
  selectedChatId: string | null;
  selectedUserName: string | null;
  onCloseChat: () => void;
  userId:string
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ userId, selectedUserName, selectedChatId, onCloseChat }) => {

    const { isPending, data:messages } = useQuery({
      queryKey: ['messages', selectedChatId],
      queryFn: async () => {
        if (!selectedChatId) return null;
        return await getMessageThread(selectedChatId);
      },
    })
    if(!selectedChatId) return <p>Select a chat to start a conversation</p>
  
    if (isPending) {
      return (
            <div className="h-[80vh] grid place-content-center">
              <LuLoader className="animate-spin" /> ;
            </div>
          )
    }
    const chatId = createChatId(userId, selectedChatId)

  return (
    <div className="flex flex-col h-full">
      <div className='flex items-center gap-10 mb-2'>
        <button onClick={onCloseChat} className='md:hidden'>
          <IoMdArrowRoundBack size={20} className='text-primaryBlue' />
        </button>
        <h2 className="text-xl font-semibold text-primaryBlue">
          {selectedUserName}
        </h2>
      </div>
      <div className="overflow-y-auto">
      <MessageList
        initialMessages={messages || { messages: [], readCount: 0 }}
        currentUserId={userId}
        chatId={chatId}
      />
      </div>
      <div className="mt-auto ">
      <ChatForm selectedChatId={selectedChatId} />
      </div>
    </div>
  );
};

export default MessagesContainer;