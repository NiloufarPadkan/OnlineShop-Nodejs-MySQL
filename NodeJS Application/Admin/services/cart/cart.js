const Cart = require("../../../models/Cart");
const CartItem = require("../../../models/CartItem");
const Product = require("../../../models/Product");
exports.add = async (req, res, next) => {
    console.log("adding");
    try {
        let fetchedCart;
        let product = await Product.findByPk(req.params.id);

        let customerId = req.body.customerId;
        let cartId;
        let item;
        fetchedCart = await Cart.findOne({
            where: {
                customerId: customerId,
            },
        });

        if (fetchedCart === null) {
            fetchedCart = new Cart({
                customerId: customerId,
            });
            await fetchedCart.save();
        }
        cartId = fetchedCart.id;

        item = await CartItem.findOne({
            where: {
                cartId: cartId,
                productId: product.id,
            },
        });
        if (item === null) {
            item = new CartItem({
                cartId: cartId,
                unit_price: product.base_price,
                quantity: parseInt(req.body.quantity),
                productId: product.id,
            });
        }
        item.quantity = parseInt(req.body.quantity);
        await item.save();
        let cartItems = await CartItem.findAll({
            where: {
                cartId: cartId,
            },
            raw: true,
        });

        let totalQuantity = 0;
        let totalPrice = 0;
        cartItems.forEach(myFunction);

        function myFunction(x) {
            totalPrice += parseInt(x.quantity) * parseFloat(x.unit_price);
            totalQuantity += parseInt(x.quantity);
        }
        fetchedCart.totalPrice = totalPrice;
        fetchedCart.totalQuantity = totalQuantity;
        await fetchedCart.save();
        return fetchedCart;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.showCart = async (req, res, next) => {
    //quantity ro midam ke front moghe namayesh cart age quantity kafi nabood bege out of stock shode
    try {
        let cart = await Cart.findOne({
            where: {
                customerId: req.params.id,
            },
            include: [
                {
                    model: Product,
                    attributes: ["id", "name", "quantity", "base_price", "temp_price"],
                },
            ],
        });

        return cart;
    } catch (e) {
        console.log(e);
        return "";
    }
};
