import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'


const Home = () => {

  const {userInfo}=useSelector((store)=>store.auth)

  return (
    <>
     <Header/>
   
     
     <div style={{backgroundImage: 'url("/gradi.jpg")'}} className='grid grid-cols-12 h-screen object-cover bg-no-repeat'> 
     <span className='col-span-3'></span>
     <div className='col-span-6 mx-auto text-center  px-16 py-24 m-10 my-auto shadow-2xl rounded-lg'>
     <h1 className='text-4xl font-semibold mb-10'>Welcome back, {userInfo&&userInfo.name}</h1>
     <p className='text-center text-xl mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Toastify Tailwind css
          </p>
          <img className='mx-auto rounded-xl' src='https://dresma.ai/wp-content/uploads/2022/01/mern-stack-developer.gif'/>
     </div>
     <span className='col-span-3'></span>
     </div>
 
 
    </>
  )
}

export default Home