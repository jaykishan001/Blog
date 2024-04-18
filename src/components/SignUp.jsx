import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { authLogin as login}from '../store/authSlice'
import { useForm } from 'react-hook-form'
import {  useNavigate, Link } from 'react-router-dom'
import { Input, Logo } from '../components'


function SignUp() {
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate;



    const signUp = async (data) => {
        setError("");
        try {
          const userData = await authService.createAccount(data)
          if(userData) {
           const currentUser = await authService.getCurrentUser()
           if(currentUser) {
            dispatch(login(currentUser));
           }
           navigate("/");
          }
            
        } catch (error) {
            setError(error.message)
        } 
    }


  return (
    <>
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center"> 
            <span>
                <Logo />
            </span>
            </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                        Sign In
                    </Link>
                </p>
        {error &&  <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signUp)}>
            <div className='space-y-5'>
                <Input
                label = "name"
                placeholder= "Enter Your Full Name"
                type= "text"
                {...register("name", {
                    required: true,
                })}/>
                <Input
                label = "email"
                placeholder = "Enter your email"
                type = "email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input 
                label = "password"
                placeholder= "Enter Password"
                type= "password"
                {...register("password", {
                    required: true,
                    
                    
                })}
                />
                <button type="submit" className='w-full'> 
                    Sign up
                </button>
            </div>
        
        </form>        
        </div>
    </div>
    </>
  )
}

export default SignUp