import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import { useSelector } from 'react-redux'

const Admin = () => {
  const {adminInfo}=useSelector((store)=>store.adminAuth)

  return adminInfo?<><AdminHeader/><Outlet/></>:<Navigate to={'/admin'} replace/>

}

export default Admin