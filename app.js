let gameBoard = {
	bigGrid : {
		grid1 : '',
		grid2 : '',
		grid3 : '',
		grid4 : '',
		grid5 : '',
		grid6 : '',
		grid7 : '',
		grid8 : '',
		grid9 : ''
	},
	grid1   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	},
	grid2   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	},
	grid3   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	},
	grid4   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	},
	grid5   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	},
	grid6   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	},
	grid7   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	},
	grid8   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	},
	grid9   : {
		A1 : '',
		A2 : '',
		A3 : '',
		B1 : '',
		B2 : '',
		B3 : '',
		C1 : '',
		C2 : '',
		C3 : ''
	}
};
let turn = 'X';
let allowedRegion = '';

$('#gameBoard').on('click', '.cell', function() {
	event.preventDefault();

	let tempSquare = $(this).attr('id');
	let square = `#${tempSquare}`;
	let tempLoc = $(this).attr('class');
	let loc = tempLoc.substr(tempLoc.length - 2);
	let gridClass = tempLoc.substr(5, 5);
	let gridNum = tempSquare.substr(0, 5);

	if ($(square).text() == '' && !($(`.${gridClass}`).css('background-color') == 'rgb(128, 128, 128)') && !($('#turn').text() == 'X Wins' || $('#turn').text() == 'O Wins')) {
		handleClick(square, loc, gridNum);
	}
});

function handleClick(square, loc, gridNum) {
	if (turn === 'X') {
		$(square).text('X');
		gameBoard[gridNum][loc] = 'X';
		checkForSquare(gridNum, loc);
	} else {
		$(square).text('O');
		gameBoard[gridNum][loc] = 'O';
		checkForSquare(gridNum, loc);
	}
}

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
	}
}

function nextTurn(loc) {
	allowedRegion = loc;
	console.log(allowedRegion);
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
