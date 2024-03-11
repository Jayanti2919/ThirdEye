import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Home from './pages/Home';
import OTPVerification from './pages/OTPVerification';
import Features from './components/Features';
import Pricing from './components/Pricing';

export default function App() {
  return (
    <div className='min-h-screen bg-primary'>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/verifyOtp' element={<OTPVerification />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/home' element={<Home />}/>
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        
      </Routes>
    </div>
  )
}