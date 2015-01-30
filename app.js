// Light up cell if not already lit up
function light(cell) {
	if ( !cell.lit ) {
		cell.lit = true;
		cell.css("background-color", "#444");

		window.setTimeout(function() {
			TweenMax.to(cell, 0.3, {backgroundColor: "none"});
			window.setTimeout(function() {
				cell.lit = false;
			}, 300);
		}, 100);
	}
}


// Return array of neighboring cells
function neighbors(grid, cell) {

	var id = parseInt(cell.attr("id"));

	// Default neighbor id array
	var res = [id - grid.columns, id + grid.columns];

	// Add any left neighbors
	if ( id % grid.columns !== 0 )
		res.push(id - grid.columns - 1, id - 1, id + grid.columns - 1);

	// Add any right neighbors
	if ( (id + 1) % grid.columns !== 0 )
		res.push(id - grid.columns + 1, id + 1, id + grid.columns + 1);

	// Filter out overflow and underflow cells
	res = res.filter(function(i) {
		if ( i < 0 )
			return false;
		if ( i >= grid.cellCount )
			return false;
		return true;
	});

	res = res.map(function(i) { return grid.cells[i]; });

	return res;


}

$(document).ready(function() {

	// Worm params
	var worm = {};
	worm.death = 0.00;
	worm.birth = 0.08;

	// Grid element
	var grid = $("#grid-container");
	grid.rows = 32;

	// Counter element
	var counter = $("#counter");
	counter.tally = 0;
	counter.increment = function() {
		counter.tally++;
		counter.text(counter.tally);

		if ( counter.tally > 1 ) {
			worm.death = 0.05;
		}
		if ( counter.tally > 10 ) {
			worm.death = 0.07;
		}
		if ( counter.tally > 50 ) {
			worm.death = 0.09;
		}
		if ( counter.tally > 100 ) {
			worm.death = 0.11;
		}

		console.log(worm.death);
	};

	counter.decrement = function() {
		counter.tally--;
		counter.text(counter.tally);

		if ( counter.tally <= 100 ) {
			worm.death = 0.09;
		}
		if ( counter.tally <= 50 ) {
			worm.death = 0.07;
		}
		if ( counter.tally <= 10 ) {
			worm.death = 0.05;
		}
		if ( counter.tally <= 1 ) {
			worm.death = 0.00;
		}

		console.log(worm.death);
	};

	// Cell parameter object
	var cell = {};

	// Get grid width and height
	var width = grid.width();
	var height = grid.height();

	// Set cell dimensions
	cell.height = height / grid.rows;
	cell.width = cell.height;

	// Get number of columns and cells
	grid.columns = Math.floor(width / cell.width);
	grid.cellCount = grid.columns * grid.rows;

	// Set grid width to grid.columns * cell.width
	grid.width(grid.columns * cell.width);

	grid.cells = [];

	// Populate grid container with grid cells
	for ( var i = 0; i < grid.cellCount; i++ ) {
		grid.append('<div class="cell" id="' + i + '"></div>');
		grid.cells[i] = $("#" + i);
	}

	// Attach lit property and neighbors array to each cell
	for ( var i = 0; i < grid.cellCount; i++ ) {
		grid.cells[i].lit = false;
		grid.cells[i].neighbors = neighbors(grid, grid.cells[i]);
	}

	// Pass on light
	function pass(grid, cell) {

		// Get cell id
		var id = parseInt(cell.attr("id"));

		// Get adjacent unlit cell list
		var adjacentList = cell.neighbors.filter(function(cell) {
			return !cell.lit;
		});

		// Light self
		light(cell);

		// If cell is not at edge, pass on light
		// if ( first ||
		// 	 (id % grid.columns !== 0 &&
		// 	  (id + 1) % grid.columns !== 0 &&
		// 	  id - grid.columns >= 0 &&
		// 	  id + grid.columns < grid.cellCount) ) {

			// // Light adjacent, unlit cells
			// for ( var i = 0; i < adjacentList.length; i++ ) {
			// 	light(grid.cells[idList[i]]);
			// }

			// Pass on light
			window.setTimeout(function() {
				// for ( var i = 0; i < adjacentList.length; i++ ) {
				// 	if ( Math.random() > 0.85 )
				// 		pass(grid, adjacentList[i]);
				// }
				if ( Math.random() < worm.death ) {
					cell.css("background-color", "red");
					counter.decrement();
				}
				else {

					// If there's a cell to pass to, then pass
					if ( adjacentList.length > 0 ) {
						pass(grid, adjacentList[Math.floor(adjacentList.length * Math.random())]);
					}
					else {
						cell.css("background-color", "red");
						counter.decrement();
					}
				}
				if ( Math.random() < worm.birth ) {
					var clone = cell.neighbors[Math.floor(cell.neighbors.length * Math.random())];
					clone.css("background-color", "green");
					pass(grid, clone);
					counter.increment();
				}
			}, 30);

		// }

	}

	// Attach click handler to grid
	grid.on("click", function(e) {
		console.log(grid.cells[e.target.id]);
		counter.increment();
		pass(grid, grid.cells[e.target.id]);
	});

	// function clickCell() {
	// 	grid.cells[Math.floor(grid.cells.length * Math.random())].click();
	// 	window.setTimeout(clickCell, 500);
	// }

	// clickCell();

});