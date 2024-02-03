import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: [],
    description: "",
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

  const navigate = useNavigate();

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async (recipeData) => {
      const { data } = await axios.post(
        "http://localhost:5000/recipe",
        recipeData,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onError: (error) => {
      toast.success(error.response.data);
    },
    onSuccess: () => {
      toast.success("Recipe added successfully!");
      recipeData.name = "";
      recipeData.ingredients = [];
      recipeData.description = "";
      navigate("/");
    },
  });

  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validating all fields
      if (
        !recipeData ||
        !recipeData.name ||
        recipeData.ingredients.length === 0 ||
        !recipeData.description
      ) {
        return toast.error("Please enter all input fields");
      }
      createPost(recipeData);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <section>
      <div className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8 md:py-16">
        <h1 className="text-4xl text-center md:text-6xl font-semibold mb-8">
          Add a Recipe
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
              value={recipeData.ingredients}
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
            Add Recipe
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddRecipe;
