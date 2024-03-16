import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ParticlesComponent from "../components/ParticleComponent";
import { GetAuthContext, GetAuthUpdateContext } from '../AuthContext'
import { setCookie } from "../utils/cookies";


const OTPVerification = () => {
    const updateAuth = GetAuthUpdateContext()
    const [otp, setOtp] = useState("")
    const loc = useLocation()
    const nav = useNavigate()
    let email, cardLabel
    useEffect(() => {
        if (loc.state === null) {
            nav("/login")
        }

    }, [])
    if (loc.state) {
        email = loc.state.email
        cardLabel = loc.state.cardLabel
    }
    console.log(email, cardLabel)
    const handleVerify = () => {
        if (cardLabel === 'Login') {
            axios.post(`${import.meta.env.VITE_API_URL}/user/verifyloginOTP`, {
                email: email,
                otp: otp
            }).then((r) => {
                console.log(r)
                if (r.data.message === 'OTP verified successfully') {
                    updateAuth()
                    nav('/login/2')
                }
            }).catch(e => {
                console.log(e)
                nav('/login')
            })
            return
        } else if (cardLabel === 'Register') {
            axios.post(`${import.meta.env.VITE_API_URL}/register/verifyOTP`, {
                email: email,
                otp: otp
            }).then((r) => {
                console.log(r)
                if (r.status === 200) {
                    alert(r.data.message)
                    updateAuth()
                    nav('/createChannel', {
                        state: {
                          email: loc.state.email,
                        },
                      })
                }
            }).catch(e => {
                if (e.response.status === 500) {
                    alert(e.response.data.message);
                    nav('/register');
                }
                else {
                    alert(e.response.data.message);
                    nav('/');
                }
            })
            return
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="absolute z-20 top-0 left-0 p-5 flex flex-col items-center gap-2 cursor-pointer" onClick={(e) => nav('/')}>
                <img src="thirdeye_logo_white.svg" alt="" className="h-20 w-20" />
                <h1 className="text-secondary uppercase alumni-sans text-xl tracking-[5px] ml-2">thirdeye</h1>
            </div>
            <div className="absolute">
                <ParticlesComponent id="tsparticles" />
            </div>
            <div className="h-fit w-fit flex items-center justify-center flex-col relative z-20">
                <Card 
                cardLabel={cardLabel} txtLabel="Enter OTP" buttonLabel="Verify OTP" setAction={setOtp} handleSubmit={handleVerify} />

            </div>
        </div>
    )
}

export default OTPVerification