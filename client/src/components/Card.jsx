import React from 'react'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Card = ({cardLabel, txtLabel, buttonLabel, setAction, handleSubmit}) => {
  return (
    <div className="text-primary flex justify-center items-center h-fit w-full m-10 md:px-24">
      <div className="h-fit w-full lg:w-[30%] bg-secondary opacity-80 font-poppins py-20 flex flex-col rounded-lg gap-7 items-center">
        <h2 className="text-2xl font-semibold ">{cardLabel}</h2>
        <form className="w-full flex justify-center items-center flex-col gap-4">
          <TextField id="outlined-basic" label={txtLabel} variant="outlined" color="secondary" size="medium" sx={{ width: '70%' }}
            onChange={(e)=>{
              setAction(e.target.value)
            }}
          />
          <Button variant="contained" color='secondary' sx={{ width: '70%' }}
          onClick={handleSubmit}
          >{buttonLabel}</Button>
        </form>
      </div>
    </div>
  )
}

export default Card