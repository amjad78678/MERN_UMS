import React from 'react'
import Header from './Header'


const Home = () => {
  return (
    <>
     <Header/>
   
     
     <div style={{backgroundImage: 'url("/gradient-2.jpg")'}} className='grid grid-cols-12 h-screen object-cover bg-no-repeat'> 
     <span className='col-span-3'></span>
     <div className='col-span-6 mx-auto text-center  px-16 py-24 m-10 my-auto shadow-2xl rounded-lg'>
     <h1 className='text-4xl font-semibold mb-10'>Welcome back, Amjadali</h1>
     <p className='text-center text-xl mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Toastify Tailwind css
          </p>
     </div>
     <span className='col-span-3'></span>
     </div>
 
 
    </>
  )
}

export default Home