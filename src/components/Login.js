
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

  
const validUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
  { username: "user4", password: "password4" },
  { username: "user5", password: "password5" },
];

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
 

  const handleLogin = (values, { setSubmitting, setFieldError }) => {
    const user = validUsers.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', values.username);
      navigate('/dashboard');
      console.log("move to dashboard");
    } else {
      setFieldError("password", "Invalid username or password!");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
    {/* Background Image */}
    <div
      className="w-3/4 bg-cover bg-center"
      style={{ backgroundImage: `url('https://www.kapturecrm.com/blog/wp-content/uploads/2022/11/kBB2-Getting-started-with-Kapture.png')` }}
    ></div>
     
   {/* Welcome Text and Login Card Container */}
   <div className="w-1/4 flex flex-col items-center justify-center">
        {/* Welcome Text */}
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome To Kapture <br/>Tickets</h2>

        {/* Login Card */}
        <div className="bg-slate-100 p-8 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
         
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Field
                name="username"
                type="text"
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="username" component="div" className="text-red-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default Login;
