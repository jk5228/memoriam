$(document).ready(function() {

	// Grid selection
	var grid = $("#grid-container");

	// Number of cells in the grid
	grid.cellCount = 0;

	// Name box selection
	var namebox = $("#namebox");
	namebox.button = $("#namebox-toggle");
	namebox.hidden = true;

	// Toggle namebox display
	namebox.toggle = function() {
		if (namebox.hidden) {
			namebox.hidden = false;
			$("#namebox").css("top", "0%");
		}
		else {
			namebox.hidden = true;
			$("#namebox").css("top", "100%");
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

	// Add a cell of the specified type to the grid
	grid.add = function(type) {
		switch(type) {
			case '1x1':
				this.append('<div class="cell-1-1 wow fadeIn" id="' + ++this.cellCount + '"></div>');
				break;
			case '2x1':
				this.append('<div class="cell-2-1 wow fadeIn" id="' + ++this.cellCount + '"></div>');
				break;
			case '2x2':
				this.append('<div class="cell-2-2 wow fadeIn" id="' + ++this.cellCount + '"></div>');
				break;
			default:
				console.log('grid.add: Unknown cell type "' + type + '"');
		}
	};

	// Load in posts and photos

	// Fake posts
	grid.add('2x2');
	grid.add('1x1');
	grid.add('2x1');
	grid.add('1x1');
	grid.add('1x1');
	grid.add('2x2');
	grid.add('1x1');
	grid.add('2x1');
	grid.add('1x1');
	grid.add('2x1');
	grid.add('2x2');

	namebox.add("Jason Kim");

});