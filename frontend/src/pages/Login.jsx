import React, { useContext, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginPayload } from "../utils/validationSchema";
import toast from "react-hot-toast";

const Login = () => {
  const [checked, setChecked] = useState(false);

  const { login, currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errors, setErrors] = useState({});

  const userlogin = async (formData) => {
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginPayload.validate(formData, { abortEarly: false });

      //Validation successful
      await userlogin(formData);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-2 px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
          Login
        </h2>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="px-4 py-3 w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-300"
              placeholder="Username"
              onChange={handleChange}
            />
            {errors.username && (
              <div className="text-red-500">{errors.username}</div>
            )}
          </div>
          <div className="mb-6 relative">
            <input
              type={checked ? "text" : "password"}
              name="password"
              className="px-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
            <button
              type="button"
              onClick={() => setChecked(!checked)}
              className=" absolute top-[18px] right-2 cursor-pointer"
            >
              {checked ? <FaEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center gap-x-2">
          <p className="text-center ">Don't have an account?</p>
          <Link
            to={"/register"}
            className="block cursor-pointer font-medium text-sky-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
