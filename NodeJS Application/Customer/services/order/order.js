const Cart = require("../../../models/Cart");
const CartItem = require("../../../models/CartItem");
const Product = require("../../../models/Product");

const OrderItem = require("../../../models/OrderItem");
const Order = require("../../../models/Order");

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
    });
    await order.save();
    const orderItemsIds = Promise.all(
        cartItems.map(async (item) => {
            let newOrderItem = new OrderItem({
                orderId: order.id,
                unit_price: item.unit_price,
                quantity: item.quantity,
                productId: item.product,
            });

            newOrderItem = await newOrderItem.save();

            return newOrderItem;
        })
    );
    const orderItemsResolved = await orderItemsIds;
    return orderItemsResolved;
};
