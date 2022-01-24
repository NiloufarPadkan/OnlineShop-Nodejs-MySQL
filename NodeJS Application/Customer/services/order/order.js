const Cart = require("../../../models/Cart");
const Product = require("../../../models/Product");
const OrderItem = require("../../../models/OrderItem");
const Order = require("../../../models/Order");
const Sequelize = require("sequelize");

exports.store = async (req, res, next) => {
    try {
        let customerId = req.customer.id;
        let fetchedCart = await Cart.findOne({
            where: {
                customerId: customerId,
            },
            include: {
                model: Product,
                attributes: ["id", "name", "quantity", "base_price", "temp_price"],
            },
        });

        let order = new Order({
            customerId: customerId,
            status: "Pending",
            address: req.body.address,
        });
        order = await order.save();

        let cartItems = fetchedCart.toJSON().products;
        let totalQuantity = 0;
        let totalPrice = 0;
        let totalTempPrice = 0;
        let outOfStockProducts = [];
        for (let i = 0; i < cartItems.length; i++) {
            if (
                cartItems[i].quantity < 1 ||
                cartItems[i].quantity < cartItems[i].cartItem.quantity
            ) {
                outOfStockProducts.push(cartItems[i]);
                break;
            }
            let newOrderItem = new OrderItem({
                orderId: order.id,
                unit_price: cartItems[i].base_price,
                temp_price: cartItems[i].temp_price,
                quantity: cartItems[i].cartItem.quantity,
                productId: cartItems[i].cartItem.productId,
            });
            totalPrice += newOrderItem.quantity * newOrderItem.unit_price;
            totalTempPrice += newOrderItem.quantity * newOrderItem.temp_price;
            totalQuantity += newOrderItem.quantity;
            newOrderItem = await newOrderItem.save();
        }
        if (outOfStockProducts.length >= 1) {
            return "outofstockProducts";
        }
        order.totalPrice = totalPrice;
        order.totalTempPrice = totalTempPrice;
        order.totalQuantity = totalQuantity;
        await order.save();

        let cartId = fetchedCart.id;

        Cart.destroy({ where: { id: cartId } });

        return order;
    } catch (error) {
        throw new Error(error);
    }
};
exports.AddPaymentId = async (req, res, next) => {
    try {
        let id = req.params.id;
        let paymentId = req.body.paymentId;
        let order = await Order.findOne({
            where: {
                id: id,
                customerId: req.customer.id,
            },
            include: [
                {
                    model: Product,
                    attributes: ["id", "name", "quantity", "base_price", "temp_price"],
                },
            ],
        });
        if (!order) {
            return "orderNotFound";
        }
        if (order.paymentId) return "paymentIdExists";
        order.paymentId = paymentId;
        order.status = "Processing";

        let orderItems = order.toJSON().products;

        for (let i = 0; i < orderItems.length; i++) {
            const product = await Product.findByPk(orderItems[i].id);
            product.quantity -= orderItems[i].orderItem.quantity;
            product.quantity_sold += orderItems[i].orderItem.quantity;
            await product.save();
        }

        await order.save();
        return order;
    } catch (error) {
        throw new Error(error);
    }
};
exports.cancel = async (req, res, next) => {
    try {
        let id = req.params.id;
        let order = await Order.findOne({
            where: {
                id: id,
                customerId: req.customer.id,
            },
        });
        order.status = "Canceled";
        await order.save();
        return order;
    } catch (error) {
        throw new Error(error);
    }
};
exports.show = async (req, res, next) => {
    try {
        const id = req.params.id;
        let order = await Order.findOne({
            where: {
                id: id,
                customerId: req.customer.id,
            },
            include: [
                {
                    model: Product,
                    attributes: ["id", "name", "quantity", "base_price", "temp_price"],
                },
            ],
        });
        return order;
    } catch (error) {
        throw new Error(error);
    }
};

exports.index = async (req, res, next) => {
    try {
        console.log(req.customer.id);
        let order = await Order.findAll({
            where: {
                customerId: req.customer.id,
            },
            include: [
                {
                    model: Product,
                    attributes: ["id", "name", "quantity", "base_price", "temp_price"],
                },
            ],
        });
        return order;
    } catch (error) {
        throw new Error(error);
    }
};
