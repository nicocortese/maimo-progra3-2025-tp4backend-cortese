import express from "express";
const router = express.Router();
import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("_id name price categories images");
    return res
      .status(200)
      .send({ message: "Todos los productos", products: products });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).select(
      "_id name categories images brand price sizes stockBySize gender color style material sole description rating categories"
    );
    return res.status(200).send({ message: "Producto encontrado", product });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const addProduct = async (req, res) => {
  const {
    name,
    images,
    brand,
    price,
    sizes,
    stockBySize,
    gender,
    color,
    style,
    material,
    sole,
    description,
    rating,
    categories,
  } = req.body;
  try {
    const product = new Product({
      name,
      images,
      brand,
      price,
      sizes,
      stockBySize,
      gender,
      color,
      style,
      material,
      sole,
      description,
      rating,
      categories,
    });
    await product.save();
    return res.status(200).send({ message: "Producto creado", product });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productToDelete = await Product.findOne({ _id: id });
    if (!productToDelete) {
      return res.status(404).send({ message: "No existe el producto", id: id });
    }

    await Product.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "Producto borrado", product: productToDelete });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, categories, images, brand, sizes, stockBySize, gender, color, style, material, sole, description, rating } = req.body;
  try {
    const productToUpdate = await Product.findOne({ _id: id });
    if (!productToUpdate) {
      return res.status(404).send({ message: "No existe el producto", id: id });
    }
    if (name) {
      productToUpdate.name = name;
    }
    if (price) {
      productToUpdate.price = price;
    }

    if (categories) {
      productToUpdate.categories = categories; 
     } 
      if (images) {
      productToUpdate.images = images;
     } 
     
     if (description) {
      productToUpdate.description = description;
     }

     if (brand) {
      productToUpdate.brand = brand;
     }

     if (sizes) {
      productToUpdate.sizes = sizes;
     }

     if (stockBySize) {
      productToUpdate.stockBySize = stockBySize;
     }

     if (gender) {
      productToUpdate.gender = gender;
     }

     if (color) {
      productToUpdate.color = color;
     }

     if (style) {
      productToUpdate.style = style;
     }

     if (material) {
      productToUpdate.material = material;
     }

     if (sole) {
      productToUpdate.sole  = sole;
     }

     if (rating) {
      productToUpdate.rating = rating;
     }

    await productToUpdate.save();

    //Valores a actualizar
    return res
      .status(200)
      .send({ message: "Producto actualizado", product: productToUpdate });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

//CRUD endpoints
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
export default router;
