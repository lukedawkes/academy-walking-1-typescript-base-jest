class Game
{
	public currentPlayer: string              = 'x';
	public playerHasWon: boolean              = false;
	public readonly grid: (string | null)[][] = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	public doMove(row: number, column: number)
	{
		if (this.grid[row][column] !== null) {
			throw new Error('can\'t move there dipshit');
		}

		this.grid[row][column] = this.currentPlayer;

		if (!this.checkPlayerHasWon()) {
			if (this.isGridFull()) {
				throw new Error('grid is full, it\'s a draw!');
			}

			this.nextPlayer();
		}
	}

	public checkPlayerHasWon(): boolean
	{
		return this.checkPlayerHasWonDiagonally() ||
			this.checkPlayerHasWonHorizontally() ||
			this.checkPlayerHasWonVertically();
	}

	private isGridFull()
	{
		return this.grid
			.every(row => {
				return row.every(cell => cell !== null);
			});
	}

	private checkPlayerHasWonDiagonally()
	{
		const hasWonForwardDiagonal = [this.grid[0][0], this.grid[1][1], this.grid[2][2]]
			.every((cell) => cell === this.currentPlayer);

		const hasWonReverseDiagonal = [this.grid[0][2], this.grid[1][1], this.grid[0][2]]
			.every((cell) => cell === this.currentPlayer);

		return hasWonForwardDiagonal || hasWonReverseDiagonal;
	}

	private checkPlayerHasWonHorizontally()
	{
		return this.grid
			.some((row) => {
				return row.every((cell) => cell === this.currentPlayer);
			});
	}

	private checkPlayerHasWonVertically()
	{
		for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
			const isWinningColumn = this.grid.every((row) => {
				return row[columnIndex] === this.currentPlayer;
			});

			if (isWinningColumn) {
				return true;
			}
		}

		return false;
	}

	private nextPlayer()
	{
		this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
	}
}

export {Game};
