import React, { useState } from 'react'
import Logo from '../components/Logo';
import authService from "../appwrite/auth";
import {authLogin} from '../store/authSlice'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {  useNavigate, Link } from 'react-router-dom';
import { Input } from "../components/";


function Login() {

    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // created a async method for login because login will take time to get data from backend

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data);
            if(session) {
               const userData = await authService.getCurrentUser()
               if(userData) {
                dispatch(authLogin(userData));
               }
               navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }  
    }


  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>

            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your accoun</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
            Sign Up
            </Link>
            </p>

            {error && <p className="text-red-600 mt-8 text-center">{`error message ${error}`}</p>}
          
            {/* handle submit is event */}
            {/* // created a form whenever horm is onSubmit we call a method which is handleSubmit which take our own method which handle the form */}
         
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label = "Email"
                    placeholder= "Enter your Email"
                    type = "email"
                    // bcs we are using form hook we need to spread register 
                    {...register("email" ,{
                        required: true,
                        validate: {
                          matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        }
                    })}/>
                    <Input 
                    label = "password"
                    placeholder= "Enter Password"
                    type = "password"
                    {...register("password", {
                        required: true,
                    })} />
                    <button type='submit' className='full'>Sign In</button>
                </div>

            </form>


        </div>
    </div>
  )
}

export default Login