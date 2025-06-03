// MessagesContainer.tsx
import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

interface MessagesContainerProps {
  selectedChatId: string | null;
  onCloseChat: () => void;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ selectedChatId, onCloseChat }) => {
  const [messages, setMessages] = useState<any[]>([]); // Type this more strictly (e.g., Message[])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch messages whenever selectedChatId changes
  useEffect(() => {
    if (selectedChatId) {
      setIsLoading(true);
      setError(null);
      const simulateFetch = async () => {
        try {
          const fetchedMsgs = await new Promise<any[]>(resolve =>
            setTimeout(() => {
              const sampleMessages = [
                { id: 'm1', text: `Message 1 for chat ${selectedChatId}`, sender: 'other' },
                { id: 'm2', text: `Message 2 for chat ${selectedChatId}`, sender: 'me' },
                { id: 'm3', text: `Longer message for chat ${selectedChatId} to test scrolling. This message should be quite long to demonstrate how text wraps and how the container handles overflow.`, sender: 'me' },
                { id: 'm4', text: `Another message for chat ${selectedChatId}.`, sender: 'me' },
                { id: 'm5', text: `Last message for now for chat ${selectedChatId}.`, sender: 'other' },
                { id: 'm6', text: `More message for chat ${selectedChatId}.`, sender: 'me' },
                { id: 'm7', text: `Message 7 for chat ${selectedChatId}.`, sender: 'other' },
                { id: 'm8', text: `Message 8 for chat ${selectedChatId}.`, sender: 'me' },
                { id: 'm9', text: `Message 9 for chat ${selectedChatId}.`, sender: 'other' },
                { id: 'm10', text: `Message 10 for chat ${selectedChatId}.`, sender: 'me' },
              ];
              if (parseInt(selectedChatId.split('-')[1]) % 2 === 0) { // Add more for even IDs
                for (let i = 11; i <= 30; i++) {
                  sampleMessages.push({ id: `m${i}`, text: `Extra message ${i} for chat ${selectedChatId}.`, sender: i % 2 === 0 ? 'me' : 'other' });
                }
              }
              resolve(sampleMessages);
            }, 500) // Simulate network delay
          );
          setMessages(fetchedMsgs);
        } catch (err) {
          setError('Failed to load messages.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      simulateFetch();
    } else {
      setMessages([]); // Clear messages if no chat is selected
    }
  }, [selectedChatId]); // Re-run effect whenever selectedChatId changes

  if (!selectedChatId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to view messages
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full"> {/* Use flex-col to stack messages */}
    <div className='flex items-center gap-10 mb-4'>
    <button onClick={onCloseChat} className='md:hidden'>
    <IoMdArrowRoundBack size={20} className='text-primaryBlue' />
    </button>
      <h2 className="text-xl font-semibold text-primaryBlue">
        Conversation with {selectedChatId} {/* In a real app, display chat name */}
      </h2>
    </div>
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar"> {/* Message list scroll area */}
        {messages.length === 0 ? (
          <div className="text-gray-500">No messages yet.</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`mb-2 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>
      {/* Optional: Message input area */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border rounded-md"
        />
        <button className="mt-2 w-full bg-primaryBlue text-white p-2 rounded-md">Send</button>
      </div>
    </div>
  );
};

export default MessagesContainer;