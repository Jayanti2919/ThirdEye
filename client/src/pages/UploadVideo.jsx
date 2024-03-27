import React from 'react';
import HomeTopNav from '../components/HomeTopNav';
import HomeSideNav from '../components/HomeSideNav';
import { TextField, Input } from '@mui/material';
import Selector from '../components/Selector';

const UploadVideo = () => {
  return (
    <div className='text-secondary overflow-hidden'>
      <div className="absolute h-screen justify-center items-center flex left-10 px-5">
        <HomeSideNav />
      </div>
      <div>
        <HomeTopNav />
      </div>
      <div className="h-fit md:h-screen w-screen flex justify-center items-center px-4 md:pr-10 md:pl-40">
        <div className="h-fit w-full border-[1px] border-accent mt-10 py-10 px-10 bg-secondary bg-opacity-10">
          <h2 className='text-2xl uppercase tracking-[10px] font-semibold'>upload a video</h2>
          <form action="" className='mt-10 flex flex-col gap-5'>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              size="medium"
              sx={{
                width: "70%",
                '& .MuiInputBase-input': {
                  color: '#F1EFEF',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#9D9FE2',
                  },
                  'fieldset': {
                    borderColor: '#F1EFEF',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9D9FE2',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#9D9FE2',
                  },
                  '&.MuiInputLabel-outlined': {
                    color: '#F1EFEF',
                  },
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              multiline
              maxRows={4}
              rows={4}
              variant="filled"
              size="medium"
              sx={{
                width: "70%",
                '& .MuiInputBase-input': {
                  color: '#F1EFEF',
                },
                '.css-phksla-MuiInputBase-root-MuiFilledInput-root::after':{
                  borderBottom:'1px solid #9D9FE2'

                },
                '& .MuiFilledInput-root': {
                  '&:hover': {
                    borderBottomColor: '#9D9FE2', // Change border color on hover
                  },
                  '&.Mui-focused': {
                    borderBottomColor: '#9D9FE2', // Change border color on focus
                  },
                  '&.Mui-focused:hover': {
                    borderBottomColor: '#9D9FE2', // Change border color on focus and hover
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#9D9FE2',
                  },
                  '&.MuiInputLabel-filled': {
                    color: '#F1EFEF',
                  },
                },
              }}
            />

            <div className="">
              <Selector />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadVideo;
