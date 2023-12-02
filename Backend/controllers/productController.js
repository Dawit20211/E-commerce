import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

//@desc Fetch all products
//@route  GET /api/products
//access Public 
const getAllProducts = asyncHandler(async (req, res)=>{

    const products = await Product.find({});
    res.json(products)
})
 

//@desc Fetch a single product
//@route  GET /api/products/:id
//access Public 
const getProductById = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error ('product not found');
    }
})

export {getAllProducts, getProductById}