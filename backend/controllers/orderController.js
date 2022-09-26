const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler  = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError')
const order = require('../models/order')


exports.newOrder = catchAsyncErrors( async (req,res,next)=>{
        const {
            
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo

        } = req.body;

        const order = await Order.create ({

            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id

        })

        res.status(200).json({
            success: true,
            order
        })
})

exports.getSingleOrder = catchAsyncErrors( async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        order
    })

})

exports.myOrders = catchAsyncErrors( async(req, res, next) => {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })

})

exports.allOrders = catchAsyncErrors( async(req, res, next) => {

    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

})

exports.allOrders = catchAsyncErrors( async(req, res, next) => {

    const orders = await Order.find(req.params.id)

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item =>{
        await updateStock(item.product, item.quantity)
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

})