const Product = require('../../models/Product');
const slugify = require('slugify');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;
    let productPictures = [];
    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename }
      })
    }
    const newProduct = {
      name,
      slug: slugify(name),
      price,
      description,
      productPictures,
      vendorId: req.user._id,
      quantity: quantity,
    }
    const product = await Product.create(newProduct)
    if (product) return res.status(200).json({ data: product, message: "product created" });

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

exports.getProdutcs = async (req, res) => {
  try {
    const products = await Product.find();
    if (products) return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

exports.getProductByVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendorId: vendorId });
    if (products) return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
