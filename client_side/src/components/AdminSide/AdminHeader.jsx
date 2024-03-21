import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/usersApiSlice";
import { clearCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useAdminLogoutMutation } from "../../redux/adminApiSlice";
import { clearAdminCredentials } from "../../redux/adminAuthSlice";

const AdminHeader = () => {
  const { adminInfo } = useSelector((store) => store.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminLogout, { isLoading }] = useAdminLogoutMutation();

  const logoutHandler = async () => {
    try {
      await adminLogout().unwrap();
      dispatch(clearAdminCredentials());
      toast.success("Logged out successfully");
      navigate("/admin");
    } catch (err) {
      toast.error(err.data.message || err.error);
    }
  };

  return (
    <div
     
      className="bg-cover bg-no-repeat bg-transparent border-0"
    >
      <Container>
        <Navbar expand="lg" className="bg-transparent">
          <Container>
            <Navbar.Brand className="font-bold text-xl py-3">
              <Link to={"/admin/home"} className="text-black no-underline">
                {" "}
                MERN AUTH UMS
              </Link>
            </Navbar.Brand>

            {adminInfo && (
              <Dropdown>
                <span className="">
                  <Dropdown.Toggle className="hover:border-none" variant="">
                    <span className="font-semibold text-xl">
                      {adminInfo && adminInfo && adminInfo && adminInfo.name}{" "}
                    </span>
                  </Dropdown.Toggle>
                </span>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link className="text-black no-underline" to={"/admin/dashboard"}>
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Container>
          <img
            src={adminInfo&&adminInfo.imageUrl}
            className="w-14 h-14 rounded-full"
            alt=""
          />
        </Navbar>
      </Container>
    </div>
  );
};

export default AdminHeader;
