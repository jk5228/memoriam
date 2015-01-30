$(document).ready(function() {

	// Cell type array
	var types = ['1x1', '2x1', '2x2'];
	types.sample = function() {
		return types[Math.floor(Math.random()*types.length)];
	};

	// Grid selection
	var grid = $("#grid-container");

	// Number of cells in the grid
	grid.cellCount = 0;

	// Cell selection array
	grid.cells = [];

	// Modal selection
	var modal = $('#modal');
	modal.content = $('#modal-content');
	modal.text = $('#modal-text');
	modal.name = $('#modal-name');
	modal.close = $('#modal-close');
	modal.hidden = true;

	// Toggle modal
	modal.toggle = function(cell) {
		if (modal.hidden && cell) {

			// Populate modal with content
			modal.text.text(cell.userData.text);
			modal.name.text(cell.userData.firstName + " " + cell.userData.lastName);

			// Display modal
			modal.hidden = false;
			modal.css({
				visibility: "visible",
				backgroundColor: "rgba(0,0,0,0.8)"
			});
			modal.content.css("top", "10%");
		}
		else {
			modal.hidden = true;
			modal.content.css("top", "100%");
			modal.css("background-color", "rgba(0,0,0,0)");
			window.setTimeout(function() {
				modal.css("visibility", "hidden");
			}, 650);
		}
	}

	// Name box selection
	var namebox = $("#namebox");
	namebox.button = $("#namebox-toggle");
	namebox.auth = $("#auth-button");
	namebox.hidden = true;

	// Toggle namebox display
	namebox.toggle = function() {
		if (namebox.hidden) {
			namebox.hidden = false;
			namebox.css("top", "0%");

		}
		else {
			namebox.hidden = true;
			namebox.css("top", "100%");
		}
	}

	// Watch for toggle button press event
	namebox.button.on("mouseup", function(e) {
		namebox.toggle();
	});

	// Add signature to list
	namebox.add = function(name) {
		namebox.append('<h3 class="name">' + name + '</h3>');
	};

	// Flash message on signature success
	namebox.flash = function(message) {
		// Flash message
	};

	// Add a cell of the specified size to the grid
	// If image === true, add a random image
	// Include any content object
	grid.add = function(size, image, content) {
		var cell = $('<div class="cell wow fadeIn" id="' + this.cellCount++ + '"></div>');
		var contentDiv = $('<div class="cell-content"></div>');
		var veil = $('<div class="veil"></div>');

		// Initialize user-defined properties on cell
		cell.userData = {};

		cell.append(contentDiv);

		if (image) {
			cell.css("background-image", "url('img1.jpg')");
		}

		if (content) {
			contentDiv.text(content.memorial);
			cell.userData.firstName = content.firstName;
			cell.userData.lastName = content.lastName;
			cell.userData.text = content.memorial;
			cell.append(veil);		// Add veil to cell
		}

		switch(size) {
			case '1x1':
				cell.addClass('cell-1-1');
				this.append(cell);
				break;
			case '2x1':
				cell.addClass('cell-2-1');
				this.append(cell);
				break;
			case '2x2':
				cell.addClass('cell-2-2');
				this.append(cell);
				break;
			default:
				console.log('grid.add: Unknown cell size "' + size + '"');
		}

		grid.cells.push(cell);
	};

	// Watch for post click event
	grid.on("mouseup", function(e) {
		var id = e.target.id;
		var cell = grid.cells[parseInt(id)];

		// If target was cell, show modal
		if (cell) {
			modal.toggle(cell);
		}
	});

	// Close modal on close button click
	modal.close.mouseup(function(e) {
		modal.toggle();
	});

	// Close modal on escape key press
	$(document).keydown(function(e) {
		if (!modal.hidden && e.keyCode == 27) {
			modal.toggle();
		}
	});

	// Block all mouse events through modal background
	modal.content.mouseup(function(e) {
		e.stopPropagation();
	});

	// Block all mouse events through modal background
	modal.mouseup(function(e) {
		modal.toggle();
		e.stopPropagation();
	});

	// Load in posts and photos

	$.getJSON('data.json', function(data) {
		for (var i = 0; i < data.memorials.length; i++) {
			if (Math.random() > 0.6) {
				grid.add(types.sample(), true);
			}
			grid.add(types.sample(), false, data.memorials[i]);
		}
	});


	// FACEBOOK AUTHENTICATION

	// we would probably save a profile when we register new users on our site
	// we could also read the profile to see if it's null
	// here we will just simulate this with an isNewUser boolean
	var isNewUser = true;
	var ref = new Firebase("https://luchang.firebaseio.com");
	var uref = new Firebase("https://luchang.firebaseio.com/users");

	ref.onAuth(function(authData) {
	  if (authData && isNewUser) {
	    // save the user's profile into Firebase so we can list users,
	    // use them in Security and Firebase Rules, and show profiles
	    ref.child("users").child(authData.uid).set({
	      provider: authData.provider,
	      name: getName(authData)
	    });
	  }
	});

	// find a suitable name based on the meta info given by each provider
	function getName(authData) {
	  switch(authData.provider) {
	     case 'password':
	       return authData.password.email.replace(/@.*/, '');
	     case 'twitter':
	       return authData.twitter.displayName;
	     case 'facebook':
	       return authData.facebook.displayName;
	  }
	}

	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
	  if (error) {
	  	namebox.flash("Unfortunately, we failed to authenticate your Facebook account. Please try again.");
	    //console.log("Login Failed!", error);
	  } else {
	  	namebox.flash("Thank you for signing Luchang's online memorial. Our thoughts our with you in this difficult time.");
	    //console.log("Authenticated successfully with payload:", authData);
	  }
	}

	// Read initial data once
	//ref.once("value", function(snapshot) {
	//  console.log(snapshot.val());
	//}, function (errorObject) {
	//  console.log("The read failed: " + errorObject.code);
	//});

	// Retrieve new names as they are added to Firebase (uref)
	uref.on("child_added", function(snapshot) {
	  var newUser = snapshot.val();
	  //console.log("Name: " + newUser.name);
	  //console.log("Provider: " + newUser.provider);
	  namebox.add(newUser.name);
	});

	// Attempt FB authentication on auth button press
	namebox.auth.mouseup(function(e) {
		ref.authWithOAuthPopup("facebook", authHandler);
	});

});