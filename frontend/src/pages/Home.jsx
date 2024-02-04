import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipe`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });

  if (isError) {
    return (
      <div className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        Something went wrong! try later
      </div>
    );
  }

  return (
    <section className="">
      <div className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          {isLoading || recipes?.length === 0 ? (
            ""
          ) : (
            <>
              <h1 className="text-4xl text-center md:text-left md:text-6xl font-semibold  ">
                Recipes
              </h1>
              <Link
                to="/create"
                className="p-[6px] px-3 bg-zinc-100 hover:bg-zinc-200 rounded-sm gap-x-[2px]"
              >
                Add a recipe
              </Link>
            </>
          )}
        </div>
        {isLoading ? (
          <p className="pt-16 mx-auto text-center text-2xl md:text-3xl">
            Loading...
          </p>
        ) : recipes.length === 0 ? (
          <div className="mx-auto flex flex-col items-center justify-center gap-y-10 h-[300px] md:w-3/4 text-center">
            <h2 className="text-2xl md:text-3xl">
              👋Welcome,{" "}
              <span className="font-semibold"> {currentUser?.username}! </span>{" "}
              Start by adding your favorite recipes 🍽️ to create your
              personalized cookbook
            </h2>
            <Link
              to="/create"
              className="block p-2 w-fit px-4 bg-teal-700 text-white text-xl hover:bg-teal-600 rounded-sm"
            >
              Add a recipe
            </Link>
          </div>
        ) : (
          <Table recipes={recipes} />
        )}
      </div>
    </section>
  );
};

export default Home;
