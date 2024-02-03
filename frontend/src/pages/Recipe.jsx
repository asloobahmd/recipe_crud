import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singlerecipe"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/recipe/${id}`, {
        withCredentials: true,
      });
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
            className="p-[6px] px-3 bg-teal-700 hover:bg-teal-600 text-white rounded-sm mr-4"
          >
            Back to Home
          </Link>
        </div>
        <div className="bg-white border rounded-md shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe?.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{recipe?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetail;
