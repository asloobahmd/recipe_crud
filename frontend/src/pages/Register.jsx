import React, { useContext, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userRegisterPayload } from "../utils/validationSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../components/Button";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const [userRegData, setUserRegData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserRegData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUser = async (userRegData) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        userRegData
      );
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userRegisterPayload.validate(userRegData, { abortEarly: false });

      //Validation successful
      await registerUser(userRegData);
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
      <div className="max-w-md mx-2 w-full px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
          Register
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
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="px-4 py-3 w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-300"
              placeholder="Email"
              onChange={handleChange}
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>
          <div className="mb-3 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="px-4 py-3 w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-300"
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute top-[18px] right-2 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <div className="mb-6 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="px-4 py-3 w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-300"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className=" absolute top-[18px] right-2 cursor-pointer"
            >
              {showConfirmPassword ? <FaEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </Button>
        </form>
        <div className="flex justify-center gap-x-2">
          <p className="text-center ">Already have an account?</p>
          <Link
            to={"/login"}
            className="block cursor-pointer font-medium text-sky-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
