import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'
const OTPVerification = () => {
    const [otp, setOtp] = useState("")
    const loc=useLocation()
    const nav=useNavigate()
    let email, cardLabel
    useEffect(() => {
        if(loc.state===null){
            nav("/login")
        }
        
    }, [])
    if(loc.state){
        email=loc.state.email
        cardLabel=loc.state.cardLabel
    }
    console.log(email, cardLabel)
    const handleVerify=()=>{
        if(cardLabel==='Login'){
            axios.post(`${import.meta.env.VITE_API_URL}/user/verifyloginOTP`,{
                email:email,
                otp:otp
            }).then((r)=>{
                if(r.data.message==='OTP verified successfully'){
                    nav('/home')
                }
            }).catch(e=>{
                console.log(e)
            })
        } else if(cardLabel==='Register'){

        }
    }
  return (
    <Card cardLabel={cardLabel} txtLabel="Enter OTP" buttonLabel="Verify OTP" setAction={setOtp} handleSubmit={handleVerify}/>
  )
}

export default OTPVerification