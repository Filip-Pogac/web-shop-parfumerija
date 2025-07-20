const router = require('express').Router();
mydata = require('../data/mydata.js');


router.get('/', function (req, res, next) {
    res.setHeader('Cache-Control', 'no-store, must-revalidate'); //stranica se osježuje svaki put, radi i navigacija kroz browser
    req.session.cart = req.session.cart || new Map();
    req.session.basketCount = req.session.basketCount || 0;

    let cart = req.session.cart || new Map();
    let cartName = new Map();
    let cartCount = new Map();


    mydata.categories.forEach(category => {
        category.products.forEach(product => {
            if (cart.hasOwnProperty(product.image)) {
                cartName.set(product.image, product.name);
                cartCount.set(product.image, cart[product.image]);
            }
        });
    });


    res.render('cart', {
        title: 'Cart',
        openCategory: "Parfemi",
        cartName: cartName,
        cartCount: cartCount,
        basketCount: req.session.basketCount || 0,
    });
});

router.get('/add/:id', function (req, res, next) {
    let id = req.params.id;
    const cart = req.session.cart || {};

    cart[id] = (cart[id] || 0) + 1;
    req.session.basketCount = (req.session.basketCount || 0) + 1;
    req.session.cart = cart;
    res.sendStatus(200);
});

router.get('/remove/:id', function (req, res, next) {
    let id = req.params.id;
    const cart = req.session.cart || {};


    if (cart[id]) {
        cart[id]--;
        req.session.basketCount = Math.max(0, req.session.basketCount - 1);
    } else {
        //ako je već 0, ne možemo smanjiti
        //vrati grešku da se ne izvrši skripta
        cart[id] = 0;
        return res.sendStatus(400);
    }


    req.session.cart = cart;
    res.sendStatus(200);
});

router.get('/all', function (req, res, next) {
    res.send({
        cart: req.session.cart || {},
    });
});

module.exports = router;