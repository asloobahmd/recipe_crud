import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../components/Button";

const ActionBtns = ({ recipeId }) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteRecipe, isLoading } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/recipe/${id}`,
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
      queryClient.invalidateQueries("recipes"); // Invalidate and refetch the "recipes" query
      toast.success("Recipe updated successfully!");
    },
  });

  const handleDeleteBtn = async (id) => {
    // Display confirmation dialog
    Swal.fire({
      title: "Are you sure you want to delete the recipe?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, proceed with delete operation
        try {
          await deleteRecipe(id);
        } catch (error) {
          console.error("Error deleting recipe:", error);
        }
      } else {
        return;
      }
    });
  };

  const handleEditBtn = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Button
        onClick={() => handleEditBtn(recipeId)}
        className="text-white rounded-sm bg-teal-700 hover:bg-teal-600 p-1 px-3 mr-2"
      >
        Edit
      </Button>
      <Button
        onClick={() => handleDeleteBtn(recipeId)}
        className="text-white rounded-sm bg-orange-700 hover:bg-orange-600 p-1 px-3"
        disabled={isLoading}
        isLoading={isLoading}
      >
        {isLoading ? "Deleting" : "Delete"}
      </Button>
    </>
  );
};

export default ActionBtns;
