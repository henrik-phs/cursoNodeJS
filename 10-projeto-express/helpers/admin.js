module.exports = {
    admin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.admin == 1) {
            return next()
        }

        req.flash('error_msg', 'Você precisa ser um admin')
        res.redirect('/')
    }
}