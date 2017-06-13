var authController = require('../controllers/authController.js');

// ROUTES FOR USER AUTHENTICATION 
module.exports = function(app, passport) {
 	// These bring us to the main login page
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    // When new user signs up (redirect to form if fails)
    app.post('/signup', passport.authenticate('local-signup', 
    	{
	        successRedirect: '/menu',
	 
	        failureRedirect: '/signup'
    	}
	));

    // only authenticated users should see menu
	app.get('/menu', isLoggedIn, authController.menu);

	app.get('/logout',authController.logout);

	// When existing user signs in (redirect to form if fails)
	app.post('/signin', passport.authenticate('local-signin', 
		{
	        successRedirect: '/menu',
	 
	        failureRedirect: '/signin'
    	}
	));

	// Route for getting some data about our user to be used client side
	// (HAVEN'T TESTED THIS YET, BASED OFF CLASS EXAMPLE)
	  app.get("/api/user_data", function(req, res) {
	    if (!req.user) {
	      // The user is not logged in, send back an empty object
	      res.json({});
	    }
	    else {
	      // Otherwise send back the user's name
	      res.json({
	        name: req.user.name,
	      });
	    }
	  });

	// custom middleware to protect menu route
	function isLoggedIn(req, res, next) {
	 
	    if (req.isAuthenticated())
	     
	        return next();

	    else res.redirect('/signin');
	}
}