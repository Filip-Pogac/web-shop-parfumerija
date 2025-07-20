const express = require('express');
const session = require("express-session");
const app = express();
const path = require("path");


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // set to true if using https
        sameSite: 'lax' // or 'strict' or 'none'
    }
}));


const homeRoutes = require('./routes/home.routes');

app.use('/', homeRoutes);
app.use('/home', homeRoutes);
app.use('/cart', require('./routes/cart.routes'));


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});