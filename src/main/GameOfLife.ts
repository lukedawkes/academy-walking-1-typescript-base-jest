class GameOfLife
{
	public grid: boolean[][] = [];

	public constructor(gridSize: number, cellPositions: number[][])
	{
		this.regenerateGrid(gridSize);
		this.assignCells(cellPositions);
	}

	public isCellAlive(row: number, column: number): boolean {
		return this.grid[row][column];
	}

	public getLivingCellCount(): number
	{
		return this.grid
			.reduce((count, row) => {
				return count + row
					.filter((cell) => cell)
					.length;
			}, 0);
	}

	public calculateNextGeneration(): void
	{
		const newGrid: boolean[][] = [];

		for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
			const row = this.grid[rowIndex];

			newGrid.push([]);

			for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
				newGrid[rowIndex].push(this.calculateNextGenerationForCell(rowIndex, cellIndex));
			}
		}

		this.grid = newGrid;
	}

	private calculateNextGenerationForCell(row: number, column: number): boolean
	{
		const neighbours = this.getLivingNeighbouringCells(row, column);
		const currentCell = this.grid[row][column];

		if (currentCell) {
			return neighbours === 2 || neighbours === 3;
		}

		return neighbours === 3;
	}

	private getLivingNeighbouringCells(row: number, column: number): number {
		const isAtLeftBoundary  = column === 0;
		const isAtRightBoundary = column + 1 === this.grid[0].length;

		const isAtUpperBoundary = row === 0;
		const isAtLowerBoundary = row + 1 === this.grid.length;

		const neighbours: boolean[] = [];

		if (isAtUpperBoundary) {
			neighbours.push(false, false, false);
		} else {
			neighbours.push(
				isAtLeftBoundary
					? false
					: this.grid[row - 1][column - 1],
			);

			neighbours.push(this.grid[row - 1][column]);

			neighbours.push(
				isAtRightBoundary
					? false
					: this.grid[row - 1][column + 1],
			);
		}

		neighbours.push(
			isAtLeftBoundary
				? false
				: this.grid[row][column - 1]
		);

		neighbours.push(
			isAtRightBoundary
				? false
				: this.grid[row][column + 1]
		);

		if (isAtLowerBoundary) {
			neighbours.push(false, false, false);
		} else {
			neighbours.push(
				isAtLeftBoundary
					? false
					: this.grid[row + 1][column - 1],
			);

			neighbours.push(this.grid[row + 1][column]);

			neighbours.push(
				isAtRightBoundary
					? false
					: this.grid[row + 1][column + 1],
			);
		}

		return neighbours
			.filter((neighbour) => neighbour)
			.length;
	}

	private assignCells(cellPositions: number[][])
	{
		for (const [cellRow, cellColumn] of cellPositions) {
			this.grid[cellRow][cellColumn] = true;
		}
	}

	private regenerateGrid(gridSize: number): void
	{
		this.grid = new Array(gridSize);

		for (let currentRow = 0; currentRow < gridSize; currentRow++) {
			this.grid[currentRow] = new Array(gridSize);
			this.grid[currentRow].fill(false);
		}
	}
}

export {GameOfLife};
