import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

  const {userInfo}=useSelector((store)=>store.auth)

  return userInfo?<Outlet/>:<Navigate to={'/'} replace/>
}

export default PrivateRoute