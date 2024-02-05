import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";

const EditRecipe = () => {
  const { id } = useParams();

  const [desc, setDesc] = useState("");
  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: [],
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: recipe, isLoading: fetchLoading } = useQuery({
    queryKey: ["editrecipe", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipe/${id}`,
        {
          withCredentials: true,
        }
      );
      setRecipeData(data);
      setDesc(data.description);
    },
    cacheTime: 0,
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
    mutationFn: async (recipeEditPayload) => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/recipe/${id}`,
        recipeEditPayload,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["recipes"]);
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
        !desc ||
        desc === "<p><br></p>"
      ) {
        return toast.error("Please enter all input fields");
      }

      // return console.log({
      //   name: recipeData.name,
      //   ingredients: recipeData.ingredients,
      //   description: desc,
      // });

      const recipeEditPayload = {
        name: recipeData.name,
        ingredients: recipeData.ingredients,
        description: desc,
      };

      updateRecipe(recipeEditPayload);
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
        <div className="flex items-center justify-between mx-auto mb-6 md:mb-12 max-w-lg">
          <h1 className="text-4xl text-center md:text-6xl font-semibold">
            Edit Recipe
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
              value={recipeData.ingredients.join(", ")}
              onChange={handleChange}
              className="w-full border resize-none border-gray-300 rounded-md p-2 h-[100px]"
              required
              placeholder="Eg:- suger,vanilla,egg"
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
            type="submit"
            className="bg-teal-700 hover:bg-teal-600 text-white px-4 py-2 rounded-md w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Update Recipe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditRecipe;
