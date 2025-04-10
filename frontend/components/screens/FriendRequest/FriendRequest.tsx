"use client"
import React, { useEffect, useState } from 'react'
import FriendRequestCards from './components/FriendRequestCards'
import FriendSuggestionCards from './components/FriendSuggestionCards'
import requestService from '@/services/friendRequest.service'
import { toast } from 'sonner'
import Loader from '@/components/customs/Loader/Loader'

const FriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFriendRequests = async () => {
    try {
      const response = await requestService.friendRequests();
      setFriendRequests(response?.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch friend requests');
    }
  };
console.log(friendRequests)
  const getFriendSuggestions = async () => {
    try {
      const response = await requestService.friendSuggestion();
      setSuggestions(response?.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (friendId: string) => {
    try {
      await requestService.sendRequest(friendId);
      toast.success('Friend request sent successfully');
      getFriendSuggestions();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send request');
    }
  };

  const handleDeleteRequest = async (friendId: string) => {
    try {
      await requestService.deleteRequest(friendId);
      toast.success('Friend request deleted successfully');
      getFriendRequests();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to delete request');
    }
  };

  const handleAcceptRequest = async (friendId: string) => {
    try {
      await requestService.acceptFriendRequest(friendId);
      toast.success('Friend request accepted successfully');
      getFriendRequests();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to accept request');
    }
  };

  useEffect(() => {
    getFriendRequests();
    getFriendSuggestions();
  }, []);

  if (loading) {
    return (
      <div className='bg-slate-900 h-screen p-4 flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='bg-slate-900 h-screen p-4 overflow-y-scroll no-scrollbar'>
      <div className='flex justify-between text-white items-center px-2'>
        <div className='flex gap-4 items-center'>
          <h1 className='text-2xl font-semibold'>Friend Requests</h1>
          <span className='rounded-full bg-red-500 text-sm flex items-center p-1 justify-center w-6 h-6'>
            {friendRequests.length}
          </span>
        </div>
        <button className="text-blue-500 hover:text-blue-400 cursor-pointer mt-4 text-lg">
          See All
        </button>
      </div>
      <div className='grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 mt-4 mb-4'>
        {friendRequests.slice(0, 10).map((request: any, index: number) => (
          <div key={request._id || index}>
            <FriendRequestCards
              name={request?.name}
              imageurl={request?.avatar}
              mutualFriends={request.mutualFriends}
              timeStamp={request.createdAt}
              onAccept={() => handleAcceptRequest(request?._id)}
              onDelete={() => handleDeleteRequest(request?._id)}
            />
          </div>
        ))}
      </div>
      <div className='border-gray-500 mt-12 border-[1px]'></div>
      <div className='mt-4'>
        <div className='flex justify-between items-center px-2'>
          <h1 className='text-2xl text-white font-semibold'>People You May Know</h1>
          <button className="text-blue-500 hover:text-blue-400 cursor-pointer mt-4 text-lg">
            See All
          </button>
        </div>
        <div className='grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 mt-4 mb-4'>
          {suggestions.slice(0, 10).map((user: any, index: number) => (
            <div key={user._id || index}>
              <FriendSuggestionCards
                name={user.name}
                imageurl={user.avatar}
                mutualFriends={user.mutualFriends}
                onSendRequest={() => handleSendRequest(user._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FriendRequest
