const ProductsSchema = require("../Models/ProductsModel");

const ProductController = async (req, res) => {
    const { productId } = req.params;
    try {
        const data = await ProductsSchema.findById(productId);
        return res.json(data); 
    } catch (error) {
        console.log(error);
    }
};
    

module.exports = {ProductController}