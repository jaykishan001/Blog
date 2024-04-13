import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import conf from './conf/conf'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { lgoin, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components'

function App() {
 const [loading , setLoading] = useState(true);
 const dispatch = useDispatch();

 useEffect(()=> {
  authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(lgoin({userData}));
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false));

 }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'> 
      <Header />
      <main>
        {/* <Outlet/> */}
      </main>
      <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
