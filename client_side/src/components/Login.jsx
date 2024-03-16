import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field} from "formik";
import { signinValidation } from "../validation/signinValidation";
import { useLoginMutation } from "../redux/usersApiSlice";
import { setCredentials } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'


const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate=useNavigate()
  const dispatch=useDispatch()

 // Use the generated hook for the login mutation
 const [login, { isLoading }] = useLoginMutation();


const {userInfo}=useSelector((store)=>store.auth)

useEffect(()=>{
  
  if(userInfo){
    navigate('/home')
  }

},[navigate,userInfo])

  return (
    <div className="bg-[url('/login.jpg')] h-screen bg-cover bg-no-repeat bg-center m-0 p-0 overflow-hidden">
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border border-black rounded-lg shadow-xl p-7 pt-10">
            <h2 className="text-center text-2xl font-bold leading-tight text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-red-400">
              Don&#x27;t have an account?{" "}
              <p
                title=""
                className="font-semibold text-white transition-all duration-200 hover:underline"
              >
                <Link to={"/signup"}>Create a free account</Link>
              </p>
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={signinValidation}
              onSubmit={async(values) => {
                console.log(values);
                try {
                  const res=await login(values).unwrap();
                  dispatch(setCredentials({...res}))
                  navigate('/home')
                } catch (err) {

                 toast.error(err.data.message || err.error)
                  
                }
              
              }}
              
            >

{({errors})=>(

<Form className="mt-8">
<div className="space-y-5">
  <div>
    <label
      htmlFor=""
      className="text-base font-medium text-white"
    >
     
      Email address
    </label>
    <div className="mt-2">

      <Field
       className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
       type="email"
       name="email"
       placeholder="Email"
      >
      </Field>
   
      {errors.email && <small className="text-red-500">{errors.email}</small>}
    </div>
  </div>
  <div>
    <div className="flex items-center justify-between">
      <label
        htmlFor=""
        className="text-base font-medium text-white"
      >
   
        Password
      </label>
      <p
        title=""
        className="text-sm font-semibold text-white hover:underline"
      >

        Forgot password?
      </p>
    </div>
    <div className="mt-2">
 
      <Field 
       name="password"
       type="password"
       placeholder="Password"
       className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 custom-password-input"
       ></Field>
  
       {errors.password && <small className="text-red-500">{errors.password}</small>}
    </div>
  </div>
  <div>
    <button
      type="submit"
      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
    >
      Get started{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </button>
  </div>
</div>
</Form>
)}
          
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
