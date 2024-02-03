import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";
import { connectDB } from "./config/db.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/recipe", authMiddleware, recipeRoutes);

app.get("/", (req, res) => {
  res.json("Hello from api");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
