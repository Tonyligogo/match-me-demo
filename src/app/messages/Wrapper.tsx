'use client';

import { useState } from "react";
import Chats from "./Chats";
import MessagesContainer from "./MessagesContainer";

interface ChatPartner {
  userId: string;
  name: string;
  image: string | null;
}

interface WrapperProps {
  chats: ChatPartner[];
  userId:string
}

const Wrapper: React.FC<WrapperProps> = ({chats, userId}) => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [selectedUserName, setSelectedUserName] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>('chats')
    
      const handleChatSelected = (chatId: string, userName:string) => {
        setSelectedChatId(chatId);
        setSelectedUserName(userName)
        setActiveTab('messagesContainer')
      };
  return (
    <div className="flex border border-red-500 h-full">
         <div className={`overflow-auto h-full flex-shrink-0 w-full md:w-[250px] p-4 md:border-r lg:w-[400px] ${activeTab === 'chats' ? '' : 'hidden md:block'}`}>
          <Chats onChatSelect={handleChatSelected} selectedChatId={selectedChatId} chats={chats}/>
        </div>
        <div className={`h-full overflow-auto px-4 md:py-4 ${activeTab === 'messagesContainer' ? 'block flex-grow' : 'hidden md:block'} `}>
          <MessagesContainer userId={userId} selectedUserName={selectedUserName} selectedChatId={selectedChatId} onCloseChat={()=>setActiveTab('chats')}/>
        </div>
    </div>
  )
}

export default Wrapper