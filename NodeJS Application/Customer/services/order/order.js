const Cart = require("../../../models/Cart");
const CartItem = require("../../../models/CartItem");
const Product = require("../../../models/Product");
const OrderItem = require("../../../models/OrderItem");
const Order = require("../../../models/Order");

//todo
// kam shodan quantity
// check kardan quantity before order
// agar status proceesing bud dige payment id nemikhaim
// add try catch
// add error handling
// ghable pardakht bayad quantity check she

exports.store = async (req, res, next) => {
    let customerId = req.customer.id;

    let fetchedCart = await Cart.findOne({
        where: {
            customerId: customerId,
        },
    });
    let cartId = fetchedCart.id;

    let cartItems = await CartItem.findAll({
        where: {
            cartId: cartId,
        },
        raw: true,
    });
    const order = new Order({
        customerId: customerId,
        status: "Pending",
        address: req.body.address,
        totalPrice: fetchedCart.totalPrice,
        totalQuantity: fetchedCart.totalQuantity,
    });
    await order.save();
    const orderItemsIds = Promise.all(
        cartItems.map(async (item) => {
            let newOrderItem = new OrderItem({
                orderId: order.id,
                unit_price: item.unit_price,
                quantity: item.quantity,
                productId: item.productId,
            });

            newOrderItem = await newOrderItem.save();

            return newOrderItem;
        })
    );
    Cart.destroy({ where: { id: cartId } });
    const orderItemsResolved = await orderItemsIds;
    return orderItemsResolved;
};
exports.AddPaymentId = async (req, res, next) => {
    let id = req.params.id;
    let paymentId = req.body.paymentId;
    let order = await Order.findOne({
        where: {
            id: id,
        },
    });
    order.paymentId = paymentId;
    order.status = "Processing";
    await order.save();
    return order;
};
exports.cancel = async (req, res, next) => {
    let id = req.params.id;
    let order = await Order.findOne({
        where: {
            id: id,
        },
    });
    order.status = "Canceled";
    await order.save();
    return order;
};
exports.show = async (req, res, next) => {
    const id = req.params.id;
    let order = await Order.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: Product,
                attributes: ["id", "name", "quantity", "base_price", "temp_price"],
            },
        ],
    });
    return order;
};

exports.index = async (req, res, next) => {
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
};
