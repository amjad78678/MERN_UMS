import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import { useSelector } from 'react-redux'

const Admin = () => {
  const {adminInfo}=useSelector((store)=>store.adminAuth)

  return adminInfo?<div className="bg-[url('/skyblue.jpg')] bg-cover bg-no-repeat"><AdminHeader/><Outlet/></div>:<Navigate to={'/admin'} replace/>

}

export default Admin