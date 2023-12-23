const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user.modle')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async function (req, email, password, done) {
        try {
            let user = await User.findOne({ email: email })
            if (!user) {
                return done(null, false);
            }
            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }

    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id);
        if (!user) {
            return done(null, false)
        }
        return done(null, user);
    } catch (error) {
        done(err);
    }
});

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.send('Unauthorize');
}
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;