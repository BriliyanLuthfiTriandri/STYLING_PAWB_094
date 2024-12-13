const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const todo = require('./src/routes/todo-route');

const session = require('express-session');
const expressjsLayouts = require('express-ejs-layouts');

// Route
const userAuth = require('./src/routes/userAuth-Route');

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(expressjsLayouts);
app.set('layout', 'layouts/main-layouts');

app.use('/', userAuth);
app.use('/todo', todo);


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
