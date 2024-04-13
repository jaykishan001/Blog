import React from 'react'
import authService from '../../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'postcss';
import Logo from '../Logo';
import LogoutBtn from './LogoutBtn';

function Header() {

  const authStatus = useSelector((state) => state.auth.status);
 
  const navigate = useNavigate();
  // when ever we create a navigation bar we create an array and loop over it.
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true  
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All post",
      slug: "/all-post",
      active: authStatus
    }

  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/">
            <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                < button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                 onClick={() => navigate(item.slug)}>{item.name}</button>
              </li>
            ) : null)}
            {
              authStatus && (
              <li>
                <LogoutBtn />
              </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header