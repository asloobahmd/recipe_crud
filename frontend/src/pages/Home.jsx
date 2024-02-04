import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Table from "../components/Table";

const Home = () => {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/recipe", {
        withCredentials: true,
      });
      return data;
    },
  });

  return (
    <section className="">
      <div className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-4xl text-center md:text-left md:text-6xl font-semibold  ">
            Recipes
          </h1>

          <Link
            to="/create"
            className="p-[6px] px-3 bg-zinc-100 hover:bg-zinc-200 rounded-sm gap-x-[2px]"
          >
            Add a recipe
          </Link>
        </div>
        {isLoading ? <p>Loading...</p> : <Table recipes={recipes} />}
      </div>
    </section>
  );
};

export default Home;
