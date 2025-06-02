import { unstable_cache } from 'next/cache';
import { getMemberByUserId } from '../actions/memberActions';
import Image from 'next/image';
import Link from 'next/link';

const getCachedUser = unstable_cache(
    async (id) => getMemberByUserId(id),
    ['user']
  );

const LeftSidebar = async({userId}: { userId: string }) => {
  const user = await getCachedUser(userId);
  return (
    <div className='w-full px-4'>
      {/* user profile */}
      <h1 className='text-primaryBlue text-2xl font-bold'>Your profile</h1>
      <p className='text-xs text-gray-400'>How other people see you</p>
      <div className='relative mt-2 h-[240px]'>
      <p className='text-xs pl-2 py-1 pr-4 right-0 rounded-md absolute primary-bg-gradient text-white'>{user?.zodiac}</p>
        <Image
        height={240}
        width={240}
        src={user?.image || "/images/user.png"}
        alt="User profile main image"
        className="object-cover h-full rounded-xl"
        />
      </div>
        <p className='text-lg font-semibold text-primaryBlue'>{user?.name}</p>
        <p className='text-sm text-primaryBlue'>{user?.city},{user?.country}</p>
    </div>
  )
}

export default LeftSidebar