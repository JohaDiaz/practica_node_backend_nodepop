import assert from "node:assert";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { query, validationResult } from "express-validator";

export async function index(req, res, next) {
  try {
    res.locals.session = req.session;

    // Cargar todos los usuarios por si los necesitas en otras vistas
    res.locals.users = await User.find();

    const userId = req.session.userId;
    console.log("Usuario logueado:", userId);

    // Si hay un usuario logueado, busca sus productos
    let products = [];
    if (userId) {
      products = await Product.find({ owner: userId }).populate("tags");
      console.log("Productos encontrados:", products);
    }

    // Renderiza la vista y pasa los productos
    res.render("home", { products });
  } catch (err) {
    next(err);
  }
}
