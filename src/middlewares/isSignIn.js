function isSignIn(req, res, next) {
    if (req.session.idUser) {
        return next();
    }
    res.redirect('/sign-in');
}

module.exports = { isSignIn };