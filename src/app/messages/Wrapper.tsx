'use client';

import { useState } from "react";
import Chats from "./Chats";
import MessagesContainer from "./MessagesContainer";

const Wrapper = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('chats')
    
      const handleChatSelected = (chatId: string) => {
        setSelectedChatId(chatId);
        setActiveTab('messagesContainer')
      };
      console.log(activeTab)
  return (
    <div className="flex h-full">
         <div className={`overflow-auto h-full flex-shrink-0 w-full md:w-[250px] p-4 md:border-r lg:w-[400px] ${activeTab === 'chats' ? '' : 'hidden md:block'}`}>
          <Chats onChatSelect={handleChatSelected}
            selectedChatId={selectedChatId}/>
        </div>
        <div className={`h-full overflow-auto p-4 ${activeTab === 'messagesContainer' ? 'block flex-grow' : 'hidden md:block'} `}>
          <MessagesContainer selectedChatId={selectedChatId} onCloseChat={()=>setActiveTab('chats')}/>
        </div>
    </div>
  )
}

export default Wrapper