const Cart = require("../../models/Cart");
const CartItem = require("../../models/CartItem");
const Product = require("../../models/Product");
const { productExistence } = require("../../resources/dict");
exports.add = async (req, res, next) => {
    try {
        let fetchedCart;
        // const x = await req.customer.getCart();
        // const y = await x.getProducts();
        // return res.send(y);
        let product;
        product = await Product.findByPk(req.params.id);
        fetchedCart = await Cart.findOne({
            where: {
                customerId: req.customer.id,
            },
        }).then((fetchedCart) => {
            CartItem.findOne({
                where: {
                    cartId: fetchedCart.id,
                    productId: req.params.id,
                },
            }).then((item) => {
                if (item === null) {
                    const cartItem = new CartItem({
                        cartId: fetchedCart[0].id,
                        quantity: 1,
                        unit_price: product.base_price,
                        productId: req.params.id,
                    });
                    return cartItem.save();
                }
                item.quantity = item.quantity + 1;

                item.save();
                fetchedCart.totalPrice =
                    parseFloat(fetchedCart.totalPrice) + parseFloat(product.base_price);
                fetchedCart.totalQuantity = fetchedCart.totalQuantity + 1;
                fetchedCart.save();
            });

            res.send(fetchedCart);
        });
    } catch (e) {
        console.log(e);
        return "";
    }
};
