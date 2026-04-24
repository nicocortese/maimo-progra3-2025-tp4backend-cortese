import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.js";
import productsRoutes from "./routes/products.js";
import categoriesRoutes from "./routes/categories.js";
import ordersRoutes from "./routes/orders.js";

const app = express();

// DB Connection
import { connectDb } from "./db.js";
connectDb();

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: ["https://retro-kicks.vercel.app"],
    credentials: true,
  })
);

/* Routes */
app.use("/api/", indexRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoutes);

/* Error handler */
app.use(function (req, res, next) {
  res.status(404).send({ message: "Not found" });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ message: err.message || "error" });
});

// ✅ Exportar en vez de listen
export default app;