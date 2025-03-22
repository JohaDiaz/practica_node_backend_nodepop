import assert from "node:assert";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Tag from "../models/Tag.js";
import { query, validationResult } from "express-validator";

export async function index(req, res, next) {
  try {
    res.locals.session = req.session;

    // Cargar todos los usuarios por si los necesitas en otras vistas
    res.locals.users = await User.find();

    const userId = req.session.userId;

    console.log("Usuario logueado:", userId);

    let products = [];

    if (userId) {
      // Obtener parámetros opcionales de la URL
      const { name, tag, min, max } = req.query;

      // Construir filtro base por usuario
      const filter = { owner: userId };

      // Filtro por nombre (insensible a mayúsculas)
      if (name) {
        filter.product = new RegExp(name, "i");
      }

      // Filtro por tag (busca productos que tengan el ID del tag)
      if (tag) {
        const selectedTags = Array.isArray(tag) ? tag : [tag];
        const foundTags = await Tag.find({
          tagname: { $in: selectedTags },
        }).select("_id");
        const tagIds = foundTags.map((tag) => tag._id);
        filter.tags = { $in: tagIds };
      }

      // Filtro por precio
      if (min || max) {
        filter.price = {};
        if (min) filter.price.$gte = parseFloat(min);
        if (max) filter.price.$lte = parseFloat(max);
      }

      products = await Product.find(filter).populate("tags");
      console.log("Productos encontrados con filtros:", products);
    }

    // Renderiza la vista y pasa los productos
    res.render("home", { products, query: req.query });
  } catch (err) {
    next(err);
  }
}
