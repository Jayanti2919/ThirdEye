import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Landing from './pages/Landing';

export default function App() {
  return (
    <div className='bg-primary min-h-screen'>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}