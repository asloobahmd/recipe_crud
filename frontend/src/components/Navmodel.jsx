import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./Button";

const links = [{ title: "Home", link: "/" }];

const Navmodel = ({ setmodel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleModelClick = (e) => {
    e.stopPropagation();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      className="md:hidden absolute bg-zinc-900/20 inset-0"
      onClick={() => setmodel(false)}
    >
      <div
        className="absolute bg-white shadow-lg border rounded-md w-[90%] top-[60px] z-50 left-[50%] -translate-x-[50%] px-3 py-10"
        onClick={handleModelClick}
      >
        <AiOutlineClose
          className="absolute top-[10px] right-[10px] cursor-pointer"
          onClick={() => setmodel(false)}
          size={25}
        />
        <div className="">
          <ul className="flex flex-col w-full items-center gap-y-3">
            {links.map((item, i) => (
              <li key={i} className="w-full" onClick={() => setmodel(false)}>
                <Link
                  to={item.link}
                  className="text-center py-2 px-3 block rounded-md hover:bg-zinc-100"
                >
                  {item.title}
                </Link>
              </li>
            ))}

            <button
              onClick={handleRefresh}
              className="w-full text-center py-2 px-3 block rounded-md hover:bg-zinc-100"
            >
              Refresh page
            </button>
            {currentUser && (
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                onClick={handleLogout}
                className="py-2 w-full bg-slate-700 hover:bg-slate-600 text-white rounded-md"
              >
                Logout
              </Button>
            )}
            {currentUser ? (
              <li className="py-2 font-medium list-none">
                {currentUser?.username}
              </li>
            ) : (
              <button
                onClick={handleLogin}
                className="py-2 w-full bg-teal-800 hover:bg-teal-700 text-white rounded-md"
              >
                Login
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navmodel;
