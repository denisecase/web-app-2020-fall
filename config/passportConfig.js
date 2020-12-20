const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');
const LOG = require('../util/logger');
const db = require('../models/index')();

module.exports = async (passport) => {
  // get the user definition
  const User = (await db).models.User;
  const defaultError = null;
  const defaultUser = false;

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      (username, password, done) => {
        User.findOne({ where: { email: username } }).then((user) => {
          if (user === null) {
            LOG.info(`passportConfig: no user=${JSON.stringify(user)}`);
            return done(defaultError, defaultUser, {
              message: 'Email not registered',
            });
          }
          LOG.info(`passportConfig: found local user ${user.id}`);
          LOG.info(`passportConfig: found local user ${user.email}`);
          LOG.info(`passportConfig: found local pwd ${user.password}`);
          LOG.info(`passportConfig: calc md5 of pwd ${md5(password)}`);
          LOG.info(`passportConfig: Verifying passwords match`);
          if (md5(password) === user.password) {
            LOG.info(`passportConfig: Password matched; logging in`);
            return done(defaultError, user);
          }
          return done(defaultError, defaultUser, {
            message: 'Password incorrect',
          });
        });
      }
    )
  );

  // serialize user for this session
  passport.serializeUser((user, done) => {
    LOG.info(`passportConfig.serializeUser: local user ${user.id}`);
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(async (id, done) => {
    LOG.info(`passportConfig.deserializeUser: local user id ${id}`);
    const user = await User.findByPk(id);
    LOG.info(`passportConfig.deserializeUser: local user ${user.email}`);
    done(null, user);
  });
};
