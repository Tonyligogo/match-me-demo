import { fetchUnreciprocatedLikes } from '@/app/actions/likeActions';
import { calculateAge } from '@/lib/util';
import { unstable_cache } from 'next/cache';
import { LuDot } from "react-icons/lu";

const getSuggestions = unstable_cache(
    async (id) => fetchUnreciprocatedLikes(id),
    ['suggestions']
  );
// show casing more people like the one currently being viewed. Currently showing  people that have liked you and you haven't liked back
const RightSidebar = async({userId}: { userId: string }) => {
  const suggestions = await getSuggestions(userId);
  return (
    <div className='border rounded-xl p-5'>
      <p className='text-2xl text-primaryBlue mb-4 font-bold'>Suggestions</p>
      <hr />
      <div className='flex flex-col gap-3 mt-4'>
        {suggestions.map((user) => (
          <div key={user.userId} className='flex items-center gap-3'>
            <img
              src={user.image || "/images/user.png"}
              alt={user.name}
              className='w-12 h-12 rounded-full object-cover'
            />
            <div>
              <p className='text-primaryBlue leading-none text-lg font-semibold'>{user.name}</p>
              <div className='flex items-center'>
              <p className='text-sm text-gray-500'>{user.zodiac}</p>
              <LuDot className='size-6 text-pink-500'/>
              <p className='text-sm text-gray-500'>{calculateAge(user.dateOfBirth) }</p>
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default RightSidebar