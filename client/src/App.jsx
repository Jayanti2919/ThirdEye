import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Landing from './pages/Landing';
import Register from './/pages/Register';

export default function App() {
  return (
    <div className='bg-primary min-h-screen'>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Register' element={<Register />}/>
      </Routes>
    </div>
  )
}