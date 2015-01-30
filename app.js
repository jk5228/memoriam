$(document).ready(function() {

	// Grid selection
	var grid = $("#grid-container");

	// Number of cells in the grid
	grid.cellCount = 0;

	// Name box selection
	var namebox = $("#namebox");

	// Add signature to list
	namebox.add = function(name) {
		for (var i = 0; i < data.length; i++) {
			// ASDFA
		}
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

	TweenMax.to($("#namebox"), 2, {top: 0});

});