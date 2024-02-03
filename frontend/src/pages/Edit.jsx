import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: [],
    description: "",
  });

  const { data: recipe, isLoading: fetchLoading } = useQuery({
    queryKey: ["singlerecipe"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/recipe/${id}`, {
        withCredentials: true,
      });
      setRecipeData(data);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredients") {
      const ingredientsArray = value
        .split(",")
        .map((ingredient) => ingredient.trim());
      setRecipeData((prev) => ({
        ...prev,
        ingredients: ingredientsArray,
      }));
    } else {
      setRecipeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const { mutate: updateRecipe, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.put(
        `http://localhost:5000/recipe/${id}`,
        recipeData,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
    onSuccess: () => {
      toast.success("Recipe updated successfully!");
      navigate("/");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate all fields
      if (
        !recipeData ||
        !recipeData.name ||
        recipeData.ingredients.length === 0 ||
        !recipeData.description
      ) {
        return toast.error("Please enter all input fields");
      }
      updateRecipe();
    } catch (error) {
      console.error(error);
    }
  };

  if (fetchLoading) {
    return (
      <section className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        <h1 className="text-4xl text-center md:text-6xl font-semibold mb-8">
          Edit Recipe
        </h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipeData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block mb-1">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={recipeData.ingredients.join(", ")}
              onChange={handleChange}
              className="w-full border resize-none border-gray-300 rounded-md p-2 h-[100px]"
              required
              placeholder="Eg:- suger,vanilla,egg"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={recipeData.description}
              onChange={handleChange}
              className="w-full border resize-none border-gray-300 rounded-md p-2 h-[100px]"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-600 text-white px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            Update Recipe
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditRecipe;
