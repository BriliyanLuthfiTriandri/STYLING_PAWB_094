const database = require("../configs/database")

// SignUp User
const registerUser = (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

    database.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Register Error : ', err);
            return res.status(500).send('Gagal mendaftarkan user');
        }
        res.status(200).send('User berhasil didaftarkan');
    });
};

// Controller untuk Sign-Up
const renderSignUpPage = (req, res) => {
    res.render('sign-up', {
        layout: 'layouts/main-layouts',
        title: 'SignUp',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk Sign-In
const renderSignInPage = (req, res) => {
    res.render('sign-in', {
        layout: 'layouts/main-layouts',
        title: 'sign-in',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller Sign In
const loginUser = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    database.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).send('Error Fetching user');
        }

        if (results.length === 0) {
            console.log('User not found:', username, password);
            return res.status(400).send('User not Found');
        }

        req.session.idUser = results[0].id;
        console.log('Login Success');
        res.redirect('/');
    });
}


// Conroller Logout
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/sign-in');
    });
};

// Export semua controller
module.exports = {
    registerUser,
    renderSignUpPage,
    renderSignInPage,
    loginUser,
    logoutUser
};