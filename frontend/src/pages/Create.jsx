import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GoChevronLeft } from "react-icons/go";
import { useMutation, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const AddRecipe = () => {
  const [desc, setDesc] = useState("");
  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: [],
  });

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredients") {
      const ingredientsArray = value.split(",");
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
    mutationFn: async (recipePayload) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/recipe`,
        recipePayload,
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
      queryClient.invalidateQueries(["recipes"]);
      toast.success("Recipe added successfully!");
      recipeData.name = "";
      recipeData.ingredients = [];
      setDesc("");
      navigate("/");
    },
  });

  const setNewIngrediants = (ingredients) => {
    const newVal = ingredients.map((item) => item.trim());
    return newVal;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validating all fields
      if (
        !recipeData ||
        !recipeData.name ||
        recipeData.ingredients.length === 0 ||
        !desc
      ) {
        return toast.error("Please enter all input fields");
      }

      const newIngrediants = setNewIngrediants(recipeData.ingredients);

      const recipePayload = {
        name: recipeData.name,
        ingredients: newIngrediants,
        description: desc,
      };

      createPost(recipePayload);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <section>
      <div className="container max-w-6xl mx-auto min-h-[calc(100vh-80px)] p-2 py-8">
        <div className="flex items-center justify-between mx-auto mb-6 md:mb-12 max-w-lg">
          <h1 className="text-4xl text-center md:text-6xl font-semibold">
            Add Recipe
          </h1>
          <Link
            to="/"
            className="p-[6px] px-3 bg-zinc-100 hover:bg-zinc-200 rounded-sm flex items-center justify-center gap-x-[2px]"
          >
            <GoChevronLeft size={15} className="mt-[2px]" />
            Home
          </Link>
        </div>
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
              placeholder="Eg:- suger, milk 1L, egg 3"
            ></textarea>
          </div>
          <div className="mb-[80px]">
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <div className="h-[100px]">
              <ReactQuill
                theme="snow"
                value={desc}
                onChange={(value) => setDesc(value)}
                className="h-[100%] "
              />
            </div>
          </div>
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            className="bg-teal-700 hover:bg-teal-600 text-white px-4 py-2 rounded-md w-full"
          >
            Add Recipe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddRecipe;
