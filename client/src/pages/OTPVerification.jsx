import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'
import {GetAuthContext, GetAuthUpdateContext} from '../AuthContext'

const OTPVerification = () => {
    const updateAuth=GetAuthUpdateContext()
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
                console.log(r)
                if(r.data.message==='OTP verified successfully'){
                    updateAuth()
                    nav('/home')
                }
            }).catch(e=>{
                console.log(e)
            })
        } else if(cardLabel==='Register'){
            axios.post(`${import.meta.env.VITE_API_URL}/register/verifyOTP`,{
                email:email,
                otp:otp
            }).then((r)=>{
                console.log(r)
                if(r.data.message==='OTP verified and user created successfully'){
                    alert(r.data.message)
                    updateAuth()
                    nav('/home')
                }
                else if(r.data.message==='OTP verified but error creating user'){
                    alert(r.data.message)
                    nav('/home')
                }
            }).catch(e=>{
                console.log(e)
            })

        }
    }
  return (
    <Card cardLabel={cardLabel} txtLabel="Enter OTP" buttonLabel="Verify OTP" setAction={setOtp} handleSubmit={handleVerify}/>
  )
}

export default OTPVerification