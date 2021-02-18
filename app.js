let gameBoard = {
	bigGrid : {}, 
	A1: {}, A2: {}, A3: {},
	B1: {}, B2: {}, B3: {},
	C1: {}, C2: {}, C3: {}
};

let turn = 'X';

// Goes to the game after reading the rules
function hideRules() {
	$('#rules').hide();
	$('#rules-box').hide();
}

// sets up all variables for the move, checks to see if the move is legal, passes onto the next function
$('#gameBoard').on('click', '.cell', function() {
	let squareId = `#${$(this).attr('id')}`;
	let loc = squareId.substr(squareId.length - 2);
	let gridNum = squareId.substr(1, 2);

	// Use function if nobody has the square yet, the grid isn't greyed, and nobody won yet
	if (
		$(squareId).text() === '' &&
		!($(`.${gridNum}`).css('background-color') === 'rgb(128, 128, 128)') &&
		!($('#turn').text() === 'X Wins' || $('#turn').text() === 'O Wins')
	) {
		handleClick(squareId, loc, gridNum);
	}
});

// Looks for whose turn it is, marks & registers square, passes the info to the next function
function handleClick(squareId, loc, gridNum) {

	// Add letter to board
	$(squareId).text(turn);

	// Add letter to gameBoard array
	gameBoard[gridNum][loc] = turn;

	checkForSquare(gridNum, loc);	
}

// Checks to see if the 3x3 grid has a tic-tac-toe
function checkForSquare(gridNum, loc) {
	let letter = turn;
	let g = gameBoard[gridNum];

	// Check for 3 in a row
	if (
		(g.A1 === g.A2 && g.A1 === g.A3 && g.A1) ||
		(g.B1 === g.B2 && g.B1 === g.B3 && g.B1) ||
		(g.C1 === g.C2 && g.C1 === g.C3 && g.C1) ||
		(g.A1 === g.B1 && g.A1 === g.C1 && g.A1) ||
		(g.A2 === g.B2 && g.A2 === g.C2 && g.A2) ||
		(g.A3 === g.B3 && g.A3 === g.C3 && g.A3) ||
		(g.A1 === g.B2 && g.A1 === g.C3 && g.A1) ||
		(g.C1 === g.B2 && g.C1 === g.A3 && g.C1)
	) {
		// Add letter to board
		$(`#${gridNum}`).html(`${letter}`);
		$(`#${gridNum}`).removeClass('grid');
		$(`#${gridNum}`).addClass('letter');

		// Add letter to gameBoard array
		gameBoard.bigGrid[gridNum] = letter;		
	} 
	
	// Check that all squares have a value
	else if (g.A1 && g.A2 && g.A3 && g.B1 && g.B2 && g.B3 && g.C1 && g.C2 && g.C3) {
		gameBoard.bigGrid[gridNum] = 'Tie';
	}
	
	// Switch turns
	turn === 'X' ? turn = 'O': turn = 'X';
	$('#turn').text(`${turn}'s Turn`);

	checkForWin(letter);

	if (!($('#turn').text() === 'X Wins' || $('#turn').text() === 'O Wins' || $('#turn').text() === "It's a Tie Game!")) {
		nextTurn(loc);
	}

}

// checks to see if the overall 9x9 grid has a tic-tac-toe
function checkForWin(player) {
	let g = gameBoard.bigGrid;

	// Check for 3 in a row on big board
	if (
		(g.A1 === g.A2 && g.A1 === g.A3 && g.A1) ||
		(g.B1 === g.B2 && g.B1 === g.B3 && g.B1) ||
		(g.C1 === g.C2 && g.C1 === g.C3 && g.C1) ||
		(g.A1 === g.B1 && g.A1 === g.C1 && g.A1) ||
		(g.A2 === g.B2 && g.A2 === g.C2 && g.A2) ||
		(g.A3 === g.B3 && g.A3 === g.C3 && g.A3) ||
		(g.A1 === g.B2 && g.A1 === g.C3 && g.A1) ||
		(g.C1 === g.B2 && g.C1 === g.A3 && g.C1)
	) {
		$('#turn').text(`${player} Wins`);
	}

	// Check for tie game on big board
	else if (
		g.A1 && g.A2 && g.A3 && g.B1 && g.B2 && g.B3 && g.C1 && g.C2 && g.C3
	) {
		$('#turn').text(`It's a Tie Game!`);
	}

	$('#gameBoard').css('background-color', 'rgb(128, 128, 128)');
}

// blocks off inaccessible regions due to turn rules
function nextTurn(allowedRegion) {
	if(!gameBoard.bigGrid[allowedRegion]) {
		$('.cell').css('background-color', 'rgb(128, 128, 128)');
		$(`.${allowedRegion}`).css('background-color', 'rgb(255, 255, 255)');
	} else {
		$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
	}
}