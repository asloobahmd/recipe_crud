import { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Navmodel from "./Navmodel";
import { AuthContext } from "../context/AuthContext";

const links = [{ title: "Home", link: "/" }];

const Navbar = ({}) => {
  const [showModel, setShowModel] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setShowModel(!showModel);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav>
      <div className="container max-w-7xl bg-white flex items-center justify-between mx-auto p-2 py-4 border-b">
        <Link to="/">
          <h1 className="text-3xl">Logo</h1>
        </Link>

        <div className="flex items-center justify-center gap-x-4">
          <ul className="hidden items-center gap-x-4 md:flex">
            {links.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  className="p-[6px] px-3 rounded-md hover:bg-zinc-100"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center justify-center gap-x-4">
            <button
              onClick={handleRefresh}
              className="p-[6px] px-3 rounded-md hover:bg-zinc-100"
            >
              Refresh page
            </button>
            {currentUser && (
              <>
                <button
                  onClick={handleLogout}
                  className="p-[6px] px-3 bg-zinc-100  rounded-sm"
                >
                  Logout
                </button>
                <li className="font-medium list-none">
                  {currentUser?.username}
                </li>
              </>
            )}
          </div>
          <button className="text-[20px] md:hidden" onClick={handleClick}>
            <FiMenu size={30} />
          </button>
        </div>
        {showModel && <Navmodel setmodel={setShowModel} />}
      </div>
    </nav>
  );
};

export default Navbar;
