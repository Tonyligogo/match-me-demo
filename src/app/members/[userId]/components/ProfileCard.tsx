import LikeButton from '@/components/LikeButton';
import { calculateAge } from '@/lib/util'
import { Member } from '@prisma/client'
import Image from 'next/image';
import { LuDot } from 'react-icons/lu';

type Props = {
    member: Member;
    likeIds: string[];
    photos: {
        id: string;
        url: string;
        publicId: string | null;
        isApproved: boolean;
        memberId: string;
    }[] | null
  };

const ProfileCard = ({member, likeIds, photos}:Props) => {
    const hasLiked = likeIds.includes(
        member.userId
      );
  return (
    <div className='bg-white p-4 md:p-6 rounded-lg shadow-md'>
    <h1 className="font-bold text-2xl mb-4 text-primaryBlue">Profile</h1>
    <div className="flex flex-col md:flex-row gap-2 sm:gap-6 md:gap-10 overflow-hidden">
        <div className="flex-1">
            <img
            src={member.image || '/images/user.png'}
            alt={member.name}
            className="object-cover h-[400px] w-full rounded-lg"
            />
        </div>
        <div className="text-primaryBlue flex-1">
            <div className='flex justify-between items-center'>
                <h1 className="font-bold text-3xl">{member.name}</h1>
                <LikeButton
                            targetId={member.userId}
                            hasLiked={hasLiked}
                          />
            </div>
            <div className='flex items-center'>
                          <p className='text-sm text-gray-500'>{member.zodiac}</p>
                          <LuDot className='size-6 text-pink-500'/>
                          <p className='text-sm text-gray-500'>{calculateAge(member.dateOfBirth) }</p>
                          </div>
                <p className="text-gray-500">{member.city},{' '}{member.country}</p>
                <p className="text-lg md:mt-4">{member.description}</p>
            </div>
    </div>
    <div className='mt-5 text-primaryBlue'>
        {/* about */}
        <p className='text-2xl font-bold'>About</p>
        <div>
            <p className='font-semibold'>Relationship Status <span className='font-normal'>Single</span> </p>
            <p className='font-semibold'>Kind of relationship <span className='font-normal'>Serious</span> </p>
        </div>
        {/* interests */}
        <p className='text-2xl font-bold mt-4'>Interests & Hobbies</p>
        <div>
            <p className='font-semibold'>Interests <span className='font-normal'>Reading novels, Gaming, Travelling</span> </p>
        </div>
        {/* photos */}
        <p className='text-2xl font-bold mt-4 mb-1'>Photos</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {photos ? (
              photos.map((photo) => (
                <div key={photo.id}>
                  <Image
                  height={200}
                  width={200}
                  src={photo.url}
                  alt="Image of user"
                  className="object-cover aspect-square"
                  />
                </div>
              ))
          )
          :
          null
        }
        </div>
    </div>
    </div>
  )
}

export default ProfileCard