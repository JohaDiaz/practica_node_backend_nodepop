import mongoose from "mongoose";
import createError from "http-errors";
import Product from "../models/Product.js";
import Tag from "../models/Tag.js";

export function index(req, res, next) {
  res.render("newproduct");
}

export async function postNew(req, res, next) {
  try {
    const userId = req.session.userId;
    console.log("Usuario que crea producto:", userId);

    const { product, price, tags } = req.body;
    const image = "/multiple-products.jpg";
    const tagIds = await Tag.find({ tagname: { $in: tags } }).select("_id");
    const tagObjectIds = tagIds.map((tag) => tag._id);

    const newProduct = new Product({
      product,
      price,
      image,
      tags: tagObjectIds,
      owner: userId,
    });
    console.log("newProduct", newProduct);

    await newProduct.save();
    console.log("Producto guardado");
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  const userId = req.session.userId;
  const productId = req.params.productId;

  // Validar que el elemento que queremos borrar es propiedad del usuario logado

  const product = await Product.findOne({ _id: productId });
  // verificar si existe

  if (!product) {
    console.warn(
      `WARNING - el usuario ${userId} está intentando eliminar un producto inexistente`
    );
    return next(createError(404, "Not found"));
  }

  if (product.owner.toString() !== userId) {
    console.warn(
      `WARNING - el usuario ${userId} está intentando eliminar un producto de otro usuario`
    );
    return next(createError(401, "Not authorized"));
  }

  await Product.deleteOne({ _id: productId });

  res.redirect("/");
}
