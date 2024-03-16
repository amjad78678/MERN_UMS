import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/usersApiSlice";
import { clearCredentials } from "../redux/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [logout,{isLoading}]=useLogoutMutation()

  const logoutHandler=async()=>{
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
      toast.success('Logged out successfully')
      navigate('/')
      
    } catch (err) {
      toast.error(err.data.message||err.error)
    }

  }

  return (
    <div className="bg-[url('/gradi.jpg')]">
      <Container>
        <Navbar expand="lg" className="bg-transparent">
          <Container>
            <Navbar.Brand className="font-bold text-xl py-3">
             <Link to={'/home'} className="text-black no-underline"> MERN AUTH UMS</Link>
            </Navbar.Brand>

            <Dropdown>
              <span className="">
                <Dropdown.Toggle className="hover:border-none" variant="">
                  <span className="font-semibold text-xl">
                    {userInfo && userInfo.name}{" "}
                  </span>
                </Dropdown.Toggle>
              </span>
              <Dropdown.Menu>
                <Dropdown.Item><Link className="text-black no-underline" to={'/profile'}>Profile</Link></Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>
               
                  Logout
                  </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
          <img src="/login.jpg" className="w-10 h-auto rounded-full" alt="" />
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;
