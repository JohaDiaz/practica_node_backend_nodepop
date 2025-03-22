import mongoose from "mongoose";
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
