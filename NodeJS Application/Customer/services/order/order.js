const Cart = require("../../../models/Cart");
const Product = require("../../../models/Product");
const OrderItem = require("../../../models/OrderItem");
const Order = require("../../../models/Order");
const Sequelize = require("sequelize");
var nodemailer = require("nodemailer");

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

        if (!fetchedCart) {
            return "CartNotFound";
        }
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

        if (!req.body.paymentId) {
            return "invalidPaymentId";
        }
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
        if (order.paymentId !== null) return "paymentIdExists";

        console.log("exit");
        order.paymentId = paymentId;
        order.status = "Processing";
        await order.save();

        let orderItems = order.toJSON().products;

        for (let i = 0; i < orderItems.length; i++) {
            const product = await Product.findByPk(orderItems[i].id);
            product.quantity -= orderItems[i].orderItem.quantity;
            product.quantity_sold += orderItems[i].orderItem.quantity;
            await product.save();
        }
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: req.customer.email,
            subject: "ثبت سفارش ✔", // Subject line
            text: `${req.customer.fname + req.customer.lname} عزیز`, // plain text body
            html:
                "<!DOCTYPE html>" +
                "<html><head><title>ثبت سفارش</title>" +
                "<style>" +
                "body {background-color:#ffdd00;background-repeat:no-repeat;background-position:top left;background-attachment:fixed;}" +
                "h2{font-family:Arial, sans-serif;color:#000000;background-color:#ffdd00;text-align:center;}" +
                "p {text-align:center;font-family:Georgia, serif;font-size:19px;font-style:normal;font-weight:bold;color:#000000}" +
                "</style>" +
                "</head><body><div>" +
                " <h2>ثبت سفارش</h2>" +
                "<p>از خرید شما متشکریم</p>" +
                "<p> خلاصه سفارش </p>" +
                `<p>نام :${req.customer.fname + " " + req.customer.lname}</p>` +
                `<p>جمع فاکتور ‍‍: ${order.totalPrice} تومان</p>` +
                `<p> جمع فاکتور با تخفیف:  ‍‍${order.totalTempPrice} تومان</p>` +
                "</div></body></html>",
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
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
