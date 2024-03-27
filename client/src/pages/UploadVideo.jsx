import React from 'react';
import HomeTopNav from '../components/HomeTopNav';
import HomeSideNav from '../components/HomeSideNav';
import { TextField, Input } from '@mui/material';
import { Select, selectClasses } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
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

        <div className="h-fit w-full border-2 border-accent mt-10 py-10 px-10 bg-secondary bg-opacity-10">
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
            <Input
              id="outlined-basic"
              placeholder="Description"
              multiline
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
                  '& fieldset': {
                    borderColor: '#F1EFEF',
                  },
                  '&:hover fieldset': {
                    borderColor: '#F1EFEF',
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
            <Selector />
            {/* <Select defaultValue={10} id="named-select" name="demo-select"
            MenuProps={{ PaperProps: { style: { backgroundColor: '#F1EFEF' } } }}
              sx={{
                width: "70%",
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#9D9FE2', // Change border color on focus
                  },
                  '&:hover fieldset': {
                    borderColor: '#F1EFEF', // Change border color on hover
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#9D9FE2', // Change label color on focus
                  },
                  '&.MuiInputLabel-outlined': {
                    color: '#F1EFEF', // Default label color
                  },
                },
                '& .MuiSelect-icon': {
                  color: '#F1EFEF', // Change select icon color
                },
                '& .MuiSelect-select': {
                  color: '#F1EFEF', // Change select text color
                },
              }}
            >
              <Option value={10}>Horror</Option>
              <Option value={20}>Comedy</Option>
              <Option value={30}>Children</Option>
            </Select> */}

          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadVideo