import Recipe from "../models/recipe.js";

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getRecipe = async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json("Recipe not found");

    if (recipe.user.toString() !== req.user.id)
      return res.status(401).json("You are not authorized");

    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const addRecipe = async (req, res) => {
  const { name, ingredients, description } = req.body;
  try {
    if (!name || !ingredients || !description)
      return res.status(400).json("All fields are required");

    const createdRecipe = await Recipe.create({
      name,
      ingredients,
      description,
      user: req.user.id,
    });

    return res.status(201).json({
      id: createdRecipe.id,
      name: createdRecipe.name,
      ingredients: createdRecipe.ingredients,
      user: createdRecipe.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const updateRecipe = async (req, res) => {
  const id = req.params.id;
  const { name, ingredients, description } = req.body;

  try {
    if (!name || !ingredients || !description)
      return res.status(400).json("All fields are required");

    const recipeExist = await Recipe.findById(id);
    if (!recipeExist) return res.status(404).json("Recipe not found");

    if (recipeExist.user.toString() !== req.user.id)
      return res.status(401).json("You are not authorized");

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        name,
        ingredients,
        description,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  try {
    const recipeExist = await Recipe.findById(id);
    if (!recipeExist) return res.status(404).json("Recipe not found");

    if (recipeExist.user.toString() !== req.user.id)
      return res.status(401).json("You are not authorized");

    await Recipe.findByIdAndDelete(id);

    return res.status(200).json("Recipe deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
