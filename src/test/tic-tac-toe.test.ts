import {Game} from '../main/TicTacToe';

describe("Game", () => {
	let game: Game;

	beforeEach(() => {
		game = new Game();
	});

	it("starts with player x", () => {
		expect(game.currentPlayer).toEqual("x");
	});

	it("should mark grid cell with current player", () => {
		game.doMove(0, 0);

		expect(game.grid[0][0]).toEqual("x");
	});

	it("should advance to next player after doMove", () => {
		expect.assertions(2);

		game.doMove(0, 0);

		expect(game.currentPlayer).toEqual("o");

		game.doMove(0, 1);

		expect(game.currentPlayer).toEqual("x");
	});

	it("should mark grid cell with advanced player", () => {
		game.doMove(0, 0);
		game.doMove(0, 1);

		expect(game.grid[0][1]).toEqual("o");
	});

	it("should throw exception if doMove on occupied cell", () => {
		game.doMove(0, 0);

		const gameMove = () => game.doMove(0, 0);

		expect(gameMove).toThrow("can't move there dipshit");
	});

	it.each`
	rowX | rowO
	${0} | ${1}
	${1} | ${2}
	${2} | ${0}
	`("should mark winning player with 3 horizontal cells", ({rowX, rowO}) => {
		game.doMove(rowX, 0); // x
		game.doMove(rowO, 0); // o
		game.doMove(rowX, 1); // x
		game.doMove(rowO, 1); // o
		game.doMove(rowX, 2); // x

		expect(game.checkPlayerHasWon()).toEqual(true);
	});

	it.each`
	colX | colO
	${0} | ${1}
	${1} | ${2}
	${2} | ${0}
	`("should mark winning player with 3 vertical cells", ({colX, colO}) => {
		game.doMove(0, colX); // x
		game.doMove(0, colO); // o
		game.doMove(1, colX); // x
		game.doMove(1, colO); // o
		game.doMove(2, colX); // x

		expect(game.checkPlayerHasWon()).toEqual(true);
	});

	it("should mark winning player with 3 diagonal cells", () => {
		game.doMove(0, 0); // x
		game.doMove(1, 0); // o
		game.doMove(1, 1); // x
		game.doMove(1, 2); // o
		game.doMove(2, 2); // x

		expect(game.checkPlayerHasWon()).toEqual(true);

		game = new Game();
		game.doMove(2, 0); // x
		game.doMove(1, 0); // o
		game.doMove(1, 1); // x
		game.doMove(1, 2); // o
		game.doMove(0, 2); // x

		expect(game.checkPlayerHasWon()).toEqual(true);
	});

	it("should let o win horizontally", () => {
		game.doMove(0, 0); // x
		game.doMove(1, 0); // o
		game.doMove(0, 1); // x
		game.doMove(1, 1); // o
		game.doMove(2, 2); // x
		game.doMove(1, 2); // o

		expect(game.currentPlayer).toEqual("o");
		expect(game.checkPlayerHasWon()).toEqual(true);
	});

	it("should let o win vertically", () => {
		game.doMove(0, 1); // x
		game.doMove(0, 0); // o
		game.doMove(1, 1); // x
		game.doMove(1, 0); // o
		game.doMove(2, 2); // x
		game.doMove(2, 0); // o

		expect(game.currentPlayer).toEqual("o");
		expect(game.checkPlayerHasWon()).toEqual(true);
	});

	it("should let o win diagonally", () => {
		game.doMove(0, 1); // x
		game.doMove(0, 0); // o
		game.doMove(2, 1); // x
		game.doMove(1, 1); // o
		game.doMove(1, 2); // x
		game.doMove(2, 2); // o

		expect(game.currentPlayer).toEqual("o");
		expect(game.checkPlayerHasWon()).toEqual(true);
	});

	it("should end in draw if no player has three in a line", () => {
		game.doMove(0, 0); // x
		game.doMove(0, 1); // o
		game.doMove(0, 2); // x
		game.doMove(1, 0); // o
		game.doMove(1, 2); // x
		game.doMove(1, 1); // o
		game.doMove(2, 0); // x
		game.doMove(2, 2); // o

		const finalMove = () => game.doMove(2, 1);

		expect(finalMove).toThrow('grid is full, it\'s a draw!');
	});
});
