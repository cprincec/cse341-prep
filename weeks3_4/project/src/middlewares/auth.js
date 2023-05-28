function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("http://localhost:8000/shops")
    }
}

function ensureGuest(req, res, next) {
    if (req.isAuthenticated()) {
        req.redirect(`http://localhost:8000/users/${req.user._id}`)
    } else {
        // req.Send("Welcome to our Homepage")
        // req.redirect("http://localhost:8000/shops")
        return next()
    }
}

module.exports = { ensureAuth, ensureGuest }