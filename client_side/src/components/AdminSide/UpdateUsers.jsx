import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { profileValidation } from "../../validation/profileValidation";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { setCredentials } from "../../redux/authSlice";
import Loader from "../UserSide/Loader";
import { toast } from "react-toastify";
import {
  useGetUserDetailsMutation,
  useUpdateUserMutation,
} from "../../redux/adminApiSlice";
import Shimmer from "./Shimmer";

const UpdateUsers = () => {
  const { id } = useParams();
  console.log("iamuseridfromupdateusers", id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usr, setUsr] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("iamuserekrejedfjkjfkdjfk", usr);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [getUserDetails] = useGetUserDetailsMutation();
  const [imageProfile, setImageProfile] = useState(null);

  async function getUserUpdateDetails(userId) {
    try {
      const user = await getUserDetails(userId);
      console.log("user", user);
      setUsr(user.data);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  }

  useEffect(() => {
    getUserUpdateDetails(id);
  }, [getUserDetails, id]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: usr ? usr.name : "",
      email: usr ? usr.email : "",
      password: "",
      cPassword: "",
      image: "",
    },
    enableReinitialize: true,
    validationSchema: profileValidation,
    onSubmit: async (values) => {
      console.log("iam values that in updateusers", values);

      if (values.password && !values.cPassword) {
        toast.error("Please enter confirm password");
      } else {
        const formData = new FormData();
        for (let value in values) {
        formData.append(value, values[value]);
        }
        formData.append("userId", usr._id);
        // Log FormData contents
        for (let [key, value] of formData.entries()) {
          console.log(`we are key value pairs,${key}: ${value}`);
        }

        try {
          const data = await updateUser(formData).unwrap();
          toast.success("User updated successfully");
        } catch (error) {
          toast.error(error.data.message || error.error);
        }
      }
    },
  });

  return usr === null ? (
    <Shimmer />
  ) : (
    <div
      className="bg-cover"
      style={{ backgroundImage: `url('/adminGradient.jpg')` }}
    >
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col
            className="text-center rounded-lg shadow-lg mb-5 bg-white"
            xs={6}
          >
            <form
              onSubmit={handleSubmit}
              className="px-5 pb-5 my-4"
              encType="multipart/form-data"
            >
              <h2 className="pt-4">Update Profile</h2>

              <img
                className="h-32 text-center rounded-3xl mx-auto"
                src={
                  imageProfile == null
                    ? usr.imageUrl
                    : URL.createObjectURL(imageProfile)
                }
                alt=""
              />

              <Form.Group className="mt-2">
                <Form.Label>Profile Image</Form.Label>

                <Form.Control
                  name="image"
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    setFieldValue("image", e.currentTarget.files[0]);
                    setImageProfile(e.target.files[0]);
                  }}
                  onBlur={handleBlur}
                  className="py-2 border border-gray-200"
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label className="font-semibold float-start">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="py-2 border border-gray-200"
                ></Form.Control>
              </Form.Group>
              {errors.name && (
                <>
                  <small className="text-red-500 float-start">
                    {errors.name}
                  </small>
                  <br />
                </>
              )}
              <Form.Group className="mt-2">
                <Form.Label className="font-semibold float-start">
                  Email Address
                </Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="py-2 border border-gray-200"
                />
              </Form.Group>
              {errors.email && (
                <>
                  <small className="text-red-500 float-start">
                    {errors.email}
                  </small>
                  <br />
                </>
              )}
              <Form.Group className="mb-2">
                <Form.Label className="font-semibold float-start">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter Password"
                  className="py-2 border border-gray-200"
                />
              </Form.Group>
              {errors.password && (
                <>
                  <small className="text-red-500 float-start">
                    {errors.password}
                  </small>
                  <br />
                </>
              )}
              <Form.Group className="my-2">
                <Form.Label className="font-semibold float-start">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="cPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cPassword}
                  placeholder="Confirm Password"
                  className="py-2 border border-gray-200"
                />
              </Form.Group>
              {errors.cPassword && (
                <small className="text-red-500 float-start">
                  {errors.cPassword}
                </small>
              )}

              {isLoading && <Loader />}

              <button
                type="submit"
                className="px-10 py-2 mt-4 rounded-lg w-3/4 bg-black text-white"
              >
                Update
              </button>
            </form>
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateUsers;
