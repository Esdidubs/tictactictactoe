// Registers all of the moves
let gameBoard = {
	bigGrid : { grid1: '', grid2: '', grid3: '', grid4: '', grid5: '', grid6: '', grid7: '', grid8: '', grid9: '' },
	grid1   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' },
	grid2   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' },
	grid3   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' },
	grid4   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' },
	grid5   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' },
	grid6   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' },
	grid7   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' },
	grid8   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' },
	grid9   : { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' }
};

let turn = 'X';
let allowedRegion = '';

// sets up all variables for the move, checks to see if the move is legal, passes onto the next function
$('#gameBoard').on('click', '.cell', function() {
	event.preventDefault();

	let squareIdNoHash = $(this).attr('id');
	let squareId = `#${squareIdNoHash}`;
	let fullClass = $(this).attr('class');
	let loc = fullClass.substr(fullClass.length - 2);
	let gridClass = fullClass.substr(5, 5);
	let gridNum = squareIdNoHash.substr(0, 5);

	if (
		$(squareId).text() == '' &&
		!($(`.${gridClass}`).css('background-color') == 'rgb(128, 128, 128)') &&
		!($('#turn').text() == 'X Wins' || $('#turn').text() == 'O Wins')
	) {
		handleClick(squareId, loc, gridNum);
	}
});

// Goes to the game after reading the rules
$('body').on('click', '#rules-box', function() {
	$('#rules').addClass('hidden');
	$('#rules-box').addClass('hidden');
});

// Looks for whose turn it is, marks & registers square, passes the info to the next function
function handleClick(squareId, loc, gridNum) {
	if (turn === 'X') {
		$(squareId).text('X');
		gameBoard[gridNum][loc] = 'X';
		checkForSquare(gridNum, loc);
	} else {
		$(squareId).text('O');
		gameBoard[gridNum][loc] = 'O';
		checkForSquare(gridNum, loc);
	}
}

// Checks to see if the 3x3 grid has a tic-tac-toe
function checkForSquare(gridNum, loc) {
	if (
		(gameBoard[gridNum].A1 == 'X' && gameBoard[gridNum].A2 == 'X' && gameBoard[gridNum].A3 == 'X') ||
		(gameBoard[gridNum].B1 == 'X' && gameBoard[gridNum].B2 == 'X' && gameBoard[gridNum].B3 == 'X') ||
		(gameBoard[gridNum].C1 == 'X' && gameBoard[gridNum].C2 == 'X' && gameBoard[gridNum].C3 == 'X') ||
		(gameBoard[gridNum].A1 == 'X' && gameBoard[gridNum].B1 == 'X' && gameBoard[gridNum].C1 == 'X') ||
		(gameBoard[gridNum].A2 == 'X' && gameBoard[gridNum].B2 == 'X' && gameBoard[gridNum].C2 == 'X') ||
		(gameBoard[gridNum].A3 == 'X' && gameBoard[gridNum].B3 == 'X' && gameBoard[gridNum].C3 == 'X') ||
		(gameBoard[gridNum].A1 == 'X' && gameBoard[gridNum].B2 == 'X' && gameBoard[gridNum].C3 == 'X') ||
		(gameBoard[gridNum].C1 == 'X' && gameBoard[gridNum].B2 == 'X' && gameBoard[gridNum].A3 == 'X')
	) {
		$(`#${gridNum}`).replaceWith(`
		<div id="grid1" class="grid" style="display: grid; grid-template-rows: 100%; grid-template-columns: 100%; align-items: center;	font-size: 15rem;">
			X
		</div>
		`);
		gameBoard.bigGrid[gridNum] = 'X';
		turn = 'O';
		$('#turn').text(`O's Turn`);
		checkForWin();
		if (!($('#turn').text() == 'X Wins' || $('#turn').text() == 'O Wins')) {
			nextTurn(loc);
		}
	} else if (
		(gameBoard[gridNum].A1 == 'O' && gameBoard[gridNum].A2 == 'O' && gameBoard[gridNum].A3 == 'O') ||
		(gameBoard[gridNum].B1 == 'O' && gameBoard[gridNum].B2 == 'O' && gameBoard[gridNum].B3 == 'O') ||
		(gameBoard[gridNum].C1 == 'O' && gameBoard[gridNum].C2 == 'O' && gameBoard[gridNum].C3 == 'O') ||
		(gameBoard[gridNum].A1 == 'O' && gameBoard[gridNum].B1 == 'O' && gameBoard[gridNum].C1 == 'O') ||
		(gameBoard[gridNum].A2 == 'O' && gameBoard[gridNum].B2 == 'O' && gameBoard[gridNum].C2 == 'O') ||
		(gameBoard[gridNum].A3 == 'O' && gameBoard[gridNum].B3 == 'O' && gameBoard[gridNum].C3 == 'O') ||
		(gameBoard[gridNum].A1 == 'O' && gameBoard[gridNum].B2 == 'O' && gameBoard[gridNum].C3 == 'O') ||
		(gameBoard[gridNum].C1 == 'O' && gameBoard[gridNum].B2 == 'O' && gameBoard[gridNum].A3 == 'O')
	) {
		$(`#${gridNum}`).replaceWith(`
		<div id="grid1" class="grid" style="display: grid; grid-template-rows: 100%; grid-template-columns: 100%; align-items: center;	font-size: 15rem;">
			O
		</div>
		`);
		gameBoard.bigGrid[gridNum] = 'O';
		turn = 'X';
		$('#turn').text(`X's Turn`);
		checkForWin();
		if (!($('#turn').text() == 'X Wins' || $('#turn').text() == 'O Wins')) {
			nextTurn(loc);
		}
	} else if (
		gameBoard[gridNum].A1 != '' &&
		gameBoard[gridNum].A2 != '' &&
		gameBoard[gridNum].A3 != '' &&
		gameBoard[gridNum].B1 != '' &&
		gameBoard[gridNum].B2 != '' &&
		gameBoard[gridNum].B3 != '' &&
		gameBoard[gridNum].C1 != '' &&
		gameBoard[gridNum].C2 != '' &&
		gameBoard[gridNum].C3 != ''
	) {
		gameBoard.bigGrid[gridNum] = 'Tie';
		if (turn == 'X') {
			turn = 'O';
			$('#turn').text(`O's Turn`);
			nextTurn(loc);
		} else {
			turn = 'X';
			$('#turn').text(`X's Turn`);
			nextTurn(loc);
		}
	} else {
		if (turn == 'X') {
			turn = 'O';
			$('#turn').text(`O's Turn`);
			nextTurn(loc);
		} else {
			turn = 'X';
			$('#turn').text(`X's Turn`);
			nextTurn(loc);
		}
	}
}

// checks to see if the overall 9x9 grid has a tic-tac-toe
function checkForWin() {
	if (
		(gameBoard.bigGrid.grid1 == 'X' && gameBoard.bigGrid.grid2 == 'X' && gameBoard.bigGrid.grid3 == 'X') ||
		(gameBoard.bigGrid.grid4 == 'X' && gameBoard.bigGrid.grid5 == 'X' && gameBoard.bigGrid.grid6 == 'X') ||
		(gameBoard.bigGrid.grid7 == 'X' && gameBoard.bigGrid.grid8 == 'X' && gameBoard.bigGrid.grid9 == 'X') ||
		(gameBoard.bigGrid.grid1 == 'X' && gameBoard.bigGrid.grid4 == 'X' && gameBoard.bigGrid.grid7 == 'X') ||
		(gameBoard.bigGrid.grid2 == 'X' && gameBoard.bigGrid.grid5 == 'X' && gameBoard.bigGrid.grid8 == 'X') ||
		(gameBoard.bigGrid.grid3 == 'X' && gameBoard.bigGrid.grid6 == 'X' && gameBoard.bigGrid.grid9 == 'X') ||
		(gameBoard.bigGrid.grid1 == 'X' && gameBoard.bigGrid.grid5 == 'X' && gameBoard.bigGrid.grid9 == 'X') ||
		(gameBoard.bigGrid.grid7 == 'X' && gameBoard.bigGrid.grid5 == 'X' && gameBoard.bigGrid.grid3 == 'X')
	) {
		$('#turn').text(`X Wins`);
		$('#gameBoard').css('background-color', 'rgb(128, 128, 128)');
	} else if (
		(gameBoard.bigGrid.grid1 == 'O' && gameBoard.bigGrid.grid2 == 'O' && gameBoard.bigGrid.grid3 == 'O') ||
		(gameBoard.bigGrid.grid4 == 'O' && gameBoard.bigGrid.grid5 == 'O' && gameBoard.bigGrid.grid6 == 'O') ||
		(gameBoard.bigGrid.grid7 == 'O' && gameBoard.bigGrid.grid8 == 'O' && gameBoard.bigGrid.grid9 == 'O') ||
		(gameBoard.bigGrid.grid1 == 'O' && gameBoard.bigGrid.grid4 == 'O' && gameBoard.bigGrid.grid7 == 'O') ||
		(gameBoard.bigGrid.grid2 == 'O' && gameBoard.bigGrid.grid5 == 'O' && gameBoard.bigGrid.grid8 == 'O') ||
		(gameBoard.bigGrid.grid3 == 'O' && gameBoard.bigGrid.grid6 == 'O' && gameBoard.bigGrid.grid9 == 'O') ||
		(gameBoard.bigGrid.grid1 == 'O' && gameBoard.bigGrid.grid5 == 'O' && gameBoard.bigGrid.grid9 == 'O') ||
		(gameBoard.bigGrid.grid7 == 'O' && gameBoard.bigGrid.grid5 == 'O' && gameBoard.bigGrid.grid3 == 'O')
	) {
		$('#turn').text(`O Wins`);
		$('#gameBoard').css('background-color', 'rgb(128, 128, 128)');
	} else if (
		gameBoard.bigGrid.grid1 != '' &&
		gameBoard.bigGrid.grid2 != '' &&
		gameBoard.bigGrid.grid3 != '' &&
		gameBoard.bigGrid.grid4 != '' &&
		gameBoard.bigGrid.grid5 != '' &&
		gameBoard.bigGrid.grid6 != '' &&
		gameBoard.bigGrid.grid7 != '' &&
		gameBoard.bigGrid.grid8 != '' &&
		gameBoard.bigGrid.grid9 != ''
	) {
		$('#turn').text(`It's a Tie Game!`);
		$('#gameBoard').css('background-color', 'rgb(128, 128, 128)');
	}
}

// blocks off inaccessible regions due to turn rules
function nextTurn(loc) {
	allowedRegion = loc;
	if (allowedRegion == 'A1') {
		if (gameBoard.bigGrid.grid1 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid1`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	} else if (allowedRegion == 'A2') {
		if (gameBoard.bigGrid.grid2 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid2`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	} else if (allowedRegion == 'A3') {
		if (gameBoard.bigGrid.grid3 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid3`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	}
	if (allowedRegion == 'B1') {
		if (gameBoard.bigGrid.grid4 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid4`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	} else if (allowedRegion == 'B2') {
		if (gameBoard.bigGrid.grid5 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid5`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	} else if (allowedRegion == 'B3') {
		if (gameBoard.bigGrid.grid6 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid6`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	} else if (allowedRegion == 'C1') {
		if (gameBoard.bigGrid.grid7 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid7`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	} else if (allowedRegion == 'C2') {
		if (gameBoard.bigGrid.grid8 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid8`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	} else if (allowedRegion == 'C3') {
		if (gameBoard.bigGrid.grid9 == '') {
			$('.cell').css('background-color', 'rgb(128, 128, 128)');
			$(`.grid9`).css('background-color', 'rgb(255, 255, 255)');
		} else {
			$(`.cell`).css('background-color', 'rgb(255, 255, 255)');
		}
	}
}
