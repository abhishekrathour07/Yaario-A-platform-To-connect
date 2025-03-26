import CustomButton from '@/components/customs/CustomButton/CustomButton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'


type suggestionProps = {
    name: string,
    imageurl: string | null,
    mutualFriends: string
  }

const FriendSuggestionCards:React.FC<suggestionProps> = ({
    name,
    imageurl,
    mutualFriends
}) => {
  return (
    <div className='bg-slate-800 p-4 rounded-lg flex gap-4 space-y-4'>
      <Avatar className="h-20 w-20">
        <AvatarImage
          src={imageurl !== null
            ? imageurl
            : `https://ui-avatars.com/api/?name=${name}`
          }
        />
      </Avatar>
      <div className='flex flex-col gap-2 text-white w-full'>
        <div className="flex justify-between items-center ">
          <h2>{name}</h2>
        </div>
        <p className='text-gray-500'>{mutualFriends}</p>
        <div className='flex gap-4'>
          <CustomButton text='Add Friend' className='w-full'/>
          <button className='bg-transparent border rounded-md w-full text-white'>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default FriendSuggestionCards
