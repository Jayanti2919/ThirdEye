import React from 'react'

const VideoCard = ({title, creator, thumbnailHash, likeCount, viewCount}) => {
  return (
    <div className='text-secondary bg-tertiary flex flex-col items-start px-3 py-5 rounded-md cursor-pointer'>
        <img src={`https://ipfs.io/ipfs/${thumbnailHash}`} alt='thumbnail' className='w-96 h-56' />
        {/* <span>{thumbnailHash}</span> */}
        <div className='flex justify-between w-full items-center'>
            <p className='text-sm'>{creator}</p>
            <p className='text-lg'>{title}</p>
        </div>
        <div className='flex justify-between w-full'>
            <p className='text-xs'>{likeCount} likes</p>
            <p className='text-xs'>{viewCount} views</p>
        </div>
    </div>
  )
}

export default VideoCard