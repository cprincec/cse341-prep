function ensureAuth(req, res, next) {

    if (req.isAuthenticated()) {
        console.log("Authenticated user in ensure auth")
        return next()
    } else {
        res.json("You must login to access the requested resource")
    }
}

function ensureGuest(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("Authenticated user in ensure guest")
        res.json(req.user)
    } else {
        // req.Send("Welcome to our Homepage")
        // req.redirect("http://localhost:8000/shops")
        return next()
    }
}

module.exports = { ensureAuth, ensureGuest }