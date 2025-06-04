'use client';

import { useState } from "react";
import SearchInput from "./SearchInput";
import Image from "next/image";

interface ChatsProps {
    onChatSelect: (chatId: string, userName:string) => void;
    selectedChatId: string | null;
    chats: ChatPartner[];
  }
  interface ChatPartner {
    userId: string;    // User ID
    name: string;      // User's name
    image: string | null; // Optional avatar URL
  }

const Chats: React.FC<ChatsProps> = ({ onChatSelect, selectedChatId, chats}) => {

    const [filteredChats, setFilteredChats] = useState<any[]>(chats);

    const handleSearch = (searchTerm: string): void => {
        if (searchTerm) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtered = chats.filter((chat: ChatPartner) =>
              chat.name.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredChats(filtered);
          } else {
            setFilteredChats(chats); // If search term is empty, show all chats
          }
    }
    
  return (
    <div className="flex flex-col h-full">
        <SearchInput  onSearch={handleSearch} />
        <div className="mt-4 flex-grow flex flex-col overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map(chat => (
            <button onClick={()=>onChatSelect(chat.userId, chat.name)} key={chat.userId} className={`p-2 border-b flex items-center gap-3 ${selectedChatId === chat.userId ? 'bg-pink-500 rounded-lg text-white': 'text-primaryBlue'}`}>
              <Image
              height={40}
              width={40}
                      src={chat.image || "/images/user.png"}
                      alt="User avatar"
                      className="rounded-full aspect-square object-cover"
                    />
                    <span>{chat.name}</span>
            </button>
          ))
        ) : null
        }
      </div>
    </div>
  )
}

export default Chats

export const chats = [
    {
      id: 'chat-1',
      name: 'Alice Johnson',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
    },
    {
      id: 'chat-2',
      name: 'Bob Williams',
      lastMessage: 'Got it, thanks!',
      timestamp: 'Yesterday',
    },
    {
      id: 'chat-3',
      name: 'Charlie Brown',
      lastMessage: 'Let\'s meet tomorrow at 3 PM.',
      timestamp: 'Tuesday',
    },
    {
      id: 'chat-4',
      name: 'Diana Prince',
      lastMessage: 'That sounds like a plan!',
      timestamp: 'Monday',
    },
    {
      id: 'chat-5',
      name: 'Eve Adams',
      lastMessage: 'I\'ll send you the details.',
      timestamp: 'Last Week',
    },
    {
      id: 'chat-6',
      name: 'Frank Miller',
      lastMessage: 'Can you confirm the address?',
      timestamp: '2 weeks ago',
    },
    {
      id: 'chat-7',
      name: 'Grace Taylor',
      lastMessage: 'Finished the report.',
      timestamp: '25/05/2025',
    },
    {
      id: 'chat-8',
      name: 'Henry Wilson',
      lastMessage: 'See you there!',
      timestamp: '20/05/2025',
    },
    {
      id: 'chat-9',
      name: 'Ivy Davis',
      lastMessage: 'Don\'t forget the presentation.',
      timestamp: '18/05/2025',
    },
    {
      id: 'chat-10',
      name: 'Jack White',
      lastMessage: 'Checking on that now.',
      timestamp: '15/05/2025',
    },
    {
      id: 'chat-11',
      name: 'Karen Green',
      lastMessage: 'Is everything ready?',
      timestamp: '12/05/2025',
    },
    {
      id: 'chat-12',
      name: 'Liam Harris',
      lastMessage: 'Just sent the email.',
      timestamp: '10/05/2025',
    },
    {
      id: 'chat-13',
      name: 'Mia Lewis',
      lastMessage: 'Thanks for your help!',
      timestamp: '05/05/2025',
    },
    {
      id: 'chat-14',
      name: 'Noah King',
      lastMessage: 'Acknowledged.',
      timestamp: '01/05/2025',
    },
    {
      id: 'chat-15',
      name: 'Olivia Scott',
      lastMessage: 'Any updates on the project?',
      timestamp: '28/04/2025',
    },
    {
      id: 'chat-16',
      name: 'Peter Baker',
      lastMessage: 'The meeting is rescheduled.',
      timestamp: '25/04/2025',
    },
    {
      id: 'chat-17',
      name: 'Quinn Adams',
      lastMessage: 'I\'ll be there in 5.',
      timestamp: '20/04/2025',
    },
    {
      id: 'chat-18',
      name: 'Rachel Bell',
      lastMessage: 'Good job everyone!',
      timestamp: '15/04/2025',
    },
    {
      id: 'chat-19',
      name: 'Sam Carter',
      lastMessage: 'Can we discuss this further?',
      timestamp: '10/04/2025',
    },
    {
      id: 'chat-20',
      name: 'Tina Diaz',
      lastMessage: 'Confirmed everything.',
      timestamp: '05/04/2025',
    },
  ];