import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'


//@desc Create new order
//@route  POST /api/orders
//access Private
const addOrderItems = asyncHandler(async (req, res)=>{
    const { 
        orderItems,
        shippingAdress,
        pamentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totoalPrice,
    } = req.body;

    if ( orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error ('No order items found')
    }else{

        const order = new Order({
        orderItems: orderItems.map((x) => ({...x, 
            product: x._id,
            _id: undefined
        })),
        shippingAdress,
        pamentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totoalPrice,
        })

        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
})
 

//@desc Get logged in user orders
//@route  GET /api/orders/myorders
//access Private
const getMyOrders = asyncHandler(async (req, res)=>{
    const orders = await Order.find({user : req.user_id})
    res.status(200).json(orders);
})
 

//@desc Get order by ID
//@route  GET /api/orders/:id
//access Private
const getOrderById = asyncHandler(async (req, res)=>{
    const order = await Order.findById(req.parms.id).populate('user', 
    'name email')

    if (order){
        res.status(200).json(order)
    }else{
        res.status(400);
        throw new Error('order not found')
    }
})
 

//@desc update order to paid
//@route  GET /api/orders/:id/pay
//access Private
const updateOrderToPaid = asyncHandler(async (req, res)=>{
    res.send('update order to paid')
})


//@desc update to deliverd
//@route  GET /api/orders/:id/delivered
//access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res)=>{
    res.send('update order to delivered')
})
 


//@desc Get all orders
//@route  GET /api/orders/:id/pay
//access Private/Admin
const getOrders = asyncHandler(async (req, res)=>{
    res.send('GET ALL ORDERS')
})
 
 
export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}


