import express from "express";
import {
  addRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", addRecipe);
router.get("/:id", getRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
