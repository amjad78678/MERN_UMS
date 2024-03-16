import { Formik, Form, Field} from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupValidation } from "../validation/signupValidation";
import { useRegisterMutation } from "../redux/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
  };

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [register,{isLoading}] = useRegisterMutation()
  


  return (
    <div className="bg-[url('/login.jpg')] bg-no-repeat bg-cover bg-center ">
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border border-black rounded-lg shadow-xl p-7 pt-10">
            <h2 className="text-center text-2xl font-bold leading-tight mb-4 text-white">
              Sign Up your account
            </h2>
            <span className="text-center text-sm text-white">
              Already have an account?
              <span
                title=""
                className="ms-2 font-semibold text-white transition-all duration-200 hover:underline"
              >
                <Link to={"/"}>Login to your account</Link>
              </span>
            </span>
            <Formik
              initialValues={initialValues}
              validationSchema={signupValidation}
              onSubmit={async(values) => {
                console.log(values);

                try {

                 const userData= await register(values).unwrap()
                 if(userData){
                   dispatch(setCredentials({...userData}))
                   toast.success('Account created successfully')
                   navigate('/home')
                 }
                  
                } catch (err) {
                  toast.error(err.data.message || err.error)
                }
       
              }}
            >
              {({ errors,touched }) => (
                <Form className="mt-4">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-white"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <Field
                          className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          name="name"
                          placeholder="Name"
                        />
                      </div>
                      {errors.name&&<small className="text-red-500">{errors.name}</small>}
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-white"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <Field
                          className="flex h-10 w-full text-white rounded-md border border-gray-300 bg-transparent px-3  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          name="email"
                          placeholder="Email"
                        />
                      </div>
                      {errors.email&& <small className="text-red-500">{errors.email}</small>}

                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-white"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <Field
                          className="flex h-10 w-full text-white rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="password"
                          name="password"
                          placeholder="Name"
                        />
                      </div>
                      {errors.password&& <small className="text-red-500">{errors.password}</small>}
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-white"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2">
                        <Field
                          className="flex h-10 w-full text-white rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="password"
                          name="cPassword"
                          placeholder="Confirm Password"
                        />
                      </div>
                      {errors.cPassword&& <small className="text-red-500">{errors.cPassword}</small>}

                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      >
                        Get started{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="mt-3 "></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
