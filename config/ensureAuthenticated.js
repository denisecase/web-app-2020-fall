module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'You must login to make that request.');
    const baseUrl = process.env.BASE_URL || '/';
    return res.redirect(`${baseUrl}user/login`);
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    const baseUrl = process.env.BASE_URL || '/';
    return res.redirect(baseUrl);
  },
};
