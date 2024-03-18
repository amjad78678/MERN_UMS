import React from 'react'
import Header from '../UserSide/Header'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'

const Admin = () => {
  return (
    <>

    <AdminHeader/>
    <Outlet/>
    
    </>
  )
}

export default Admin