import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    product: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    image: {
      type: String,
      trim: true,
      required: true,
      default: "/multiple-products.jpg",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "products",
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
