const router = require('express').Router();
mydata = require('../data/mydata.js');



router.get('/', function (req, res, next) {
    res.setHeader('Cache-Control', 'no-store, must-revalidate'); //stranica se osježuje svaki put, radi i navigacija kroz browser
    req.session.cart = req.session.cart || new Map();
    req.session.openCategory = req.session.openCategory || 0
    req.session.basketCount = req.session.basketCount || 0;

    //dohvati nazive kategorija i napravi mapu index, naziv
    let categories = new Map();
    for (let i = 0; i < mydata.categories.length; i++) {
        categories.set(i, mydata.categories[i].name.split("_").join(" "));
    }

    //dohvati proizvode iz trenutno otovrene kategorije
    let products = [];
    for (let i = 0; i < mydata.categories[req.session.openCategory].products.length; i++) {
        products.push(mydata.categories[req.session.openCategory].products[i]);
    }


    res.render('home', {
        title: 'Home',
        categories: categories,
        products: products,
        openCategory: "",
        cart: req.session.cart,
        basketCount: req.session.basketCount,
    });
});


router.get('/products/:id', function (req, res, next) {
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    req.session.openCategory = req.params.id;
    let products = [];
    for (let i = 0; i < mydata.categories[req.session.openCategory].products.length; i++) {
        products.push(mydata.categories[req.session.openCategory].products[i]);
    }

    res.render('partials/products', {
        products: products,
        cart: req.session.cart
    });

});

router.get('/categories/', function (req, res, next) {
    let categories = new Map();
    for (let i = 0; i < mydata.categories.length; i++) {
        categories.set(i, mydata.categories[i].name.split("_").join(" "));
    }

    res.send({
        categories: categories,
    });
});

module.exports = router;