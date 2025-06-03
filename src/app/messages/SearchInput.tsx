'use client';

import { Input } from "@nextui-org/react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
    onSearch: (searchTerm: string) => void; // onSearch is a function that takes a string and returns void
  }

const SearchInput: React.FC<SearchInputProps> = ({onSearch}) => {
    const [value, setValue] = useState("");
    const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        onSearch(event.target.value)
    }
  return (
    <input
        type="text"
        placeholder="Search chats..."
        value={value}
        onChange={handleSearch}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        // Add any other specific styles or attributes here
      />
    // <Input
    //           className="max-w-xs"
    //           value={value} 
    //           onValueChange={handleSearch}
    //           endContent={
    //             <button
    //               aria-label="search"
    //               className="focus:outline-none"
    //               type="button"
    //             >
    //               <IoSearch />
    //             </button>
    //           }
    //           label="Search"
    //           variant="bordered"
    //         />
  )
}

export default SearchInput