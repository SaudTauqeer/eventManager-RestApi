    const router = require('express').Router();
    const passport = require('passport');


    // auth logout
    router.get('/logout', (req, res) => {
        req.logout();
        res.send("Logged out");
    });

    // auth with google+
    router.get('/google', passport.authenticate('google', {
        scope: ['profile']
    }));

    // callback route for google to redirect to
    // hand control to passport to use code to grab profile info
    router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
        res.redirect("http://localhost:3000/create");

    });

    module.exports = router;