var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var UserService  = require('./../services/UserService')
const ConfigFile = require('../config')

const passportJWT = require('passport-jwt')
const JWtStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use('login', new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
//Creation du systeme du login avec comparaidon des mots de passe.
//console.log(username, password)
UserService.loginUser(username, password, null, done)
}))

passport.use(new JWtStrategy({
jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
secretOrKey: ConfigFile.secret_key,
passReqToCallback: true 
}, function(req, jwt_payload, done) {
    // Dechiffrer le token et lire les informations dedans. (_id) -> Pour rechercher l'utilisateur.
    UserService.findOneUserById(jwt_payload_id, null, function(err, value) {
        if (err)
            done(err)
        else if (value && !value.token =="") {
            done (null, false, {msg:"unauthorized", type_error:"no-valid"})
        }
        else
        done(null, value)
    })
        
}))
module.exports = passport
