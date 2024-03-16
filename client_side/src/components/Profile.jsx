import React, { useState } from "react";
import Header from "./Header";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Formik, Form as FormikForm, Field,useFormikContext } from "formik";
import { profileValidation } from "../validation/profileValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  useProfileUpdateMutation,
  useRegisterMutation,
} from "../redux/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/authSlice";
import Loader from "./Loader";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);
  const [profileUpdate, { isLoading }] = useProfileUpdateMutation();
  const initialValues = {
    name: userInfo.name || "",
    email: userInfo.email || "",
    password: "",
    cPassword: "",
  };
  const [image, setImage] = useState(null);

  return (
    <div className="" style={{ backgroundImage: `url('/gradi.jpg')` }}>
      <Header />
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col
            className="text-center rounded-lg shadow-lg mb-5 bg-white"
            xs={6}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={profileValidation}
              onSubmit={async (values) => {
                console.log("Form submitted with values:", values);
                if (values.password && values.cPassword == "") {
                  toast.error("Please enter confirm password");
                } else {
                  try {
                    const updated = await profileUpdate(values).unwrap();
                    console.log("iam ukpdatd ", updated);
                    dispatch(setCredentials(updated));
                    toast.success("Profile updated successfully");
                  } catch (error) {
                    toast.error(error.data.message || error.error);
                  }
                }
              }}
            >
              {({ errors,setFieldValue }) => (
                <FormikForm className="px-5 pb-5 my-4">
                  <h2 className="pt-4">Update Profile</h2>
                  {image !== null ? (
                    <img
                      className="h-32 text-center rounded-3xl mx-auto"
                      src={image !== null ? URL.createObjectURL(image) : null}
                      alt=""
                    />
                  ) : (
                    <img
                      className="h-32 text-center  mx-auto"
                      src="https://img.freepik.com/premium-vector/young-man-face-avater-vector-illustration-design_968209-13.jpg"
                      alt=""
                    />
                  )}

                  <Form.Group className="mt-2">
                    <Form.Label>Profile Image</Form.Label>

                    <Form.Control
                      name="myFile"
                      type="file"
                      onChange={(e) => {
                        // Handle Formik's state management
                        setFieldValue("file", e.currentTarget.files[0]);
                        setImage(e.target.files[0]);
                      }}
                      className="py-2 border border-gray-200"
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label className="font-semibold float-start">
                      Name
                    </Form.Label>
                    <Field
                      as={Form.Control}
                      type="text"
                      name="name"
                      className="py-2 border border-gray-200"
                    ></Field>
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
                    <Field
                      name="email"
                      as={Form.Control}
                      type="email"
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
                    <Field
                      as={Form.Control}
                      type="password"
                      name="password"
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
                    <Field
                      as={Form.Control}
                      type="password"
                      name="cPassword"
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
                </FormikForm>
              )}
            </Formik>
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
