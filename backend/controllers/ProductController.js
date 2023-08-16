const Product = require("../models/Products");

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getSingleProduct = async (req, res) => {
  const { id } = req.params; 
  try {
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};



module.exports.addProduct = async (req, res) => {

  try {
    const { title,price,description,img } = req.body;

    if (!(title && price && description && img)) {
      throw new Error("All input is required");
    }
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(409).json({ error: "Product already exists" });
    }

    
    const newProduct = new Product({ title, price, description, img });
    
    const savedProduct = await newProduct.save();

    console.log("Added Successfully...");
    console.log(savedProduct);

    res.status(201).json({ product: savedProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};