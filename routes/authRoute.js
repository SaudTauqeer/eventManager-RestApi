require('dotenv').config();
const router = require('express').Router();
    const passport = require('passport');


    // auth logout
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect("https://eventmanager-web.herokuapp.com");
    });

    // auth with google+
    router.get('/google', passport.authenticate('google', {
        scope: ['profile']
    }));

    // callback route for google to redirect to
    // hand control to passport to use code to grab profile info
    router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
        res.redirect("https://eventmanager-web.herokuapp.com/timezone");

    });

    module.exports = router;