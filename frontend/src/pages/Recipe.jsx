import axios from "axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import parse from "html-react-parser";

const RecipeDetail = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singlerecipe", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipe/${id}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          Loading...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          Error fetching recipe.
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-4xl text-center md:text-left md:text-6xl font-semibold">
            {recipe?.name}
          </h1>
          <Link
            to="/"
            className="p-[6px] px-3 bg-zinc-100 hover:bg-zinc-200 rounded-sm flex items-center justify-center gap-x-[2px]"
          >
            <GoChevronLeft size={15} className="mt-[2px]" />
            Home
          </Link>
        </div>
        <div className="bg-white border rounded-md shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe?.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <div className="mt-6 ql-editor">
            <h2 className="text-xl font-semibold mb-4">Description 📖</h2>{" "}
            <br />
            {parse(recipe?.description)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetail;
