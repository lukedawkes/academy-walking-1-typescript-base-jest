import {GameOfLife} from '../main/GameOfLife';

describe("GameOfLife", () => {
	describe("Grid construction", () => {
		let game: GameOfLife;
		let cellSeeds: number[][];

		beforeEach(() => {
			cellSeeds = [[5, 6], [7, 2], [0, 9], [2, 3], [4, 4]];
			game = new GameOfLife(10, cellSeeds);
		});

		it("should construct grid with correct number of rows", () => {
			expect(game.grid.length).toEqual(10);
		});

		it("should construct grid with correct number of columns", () => {
			expect.assertions(10);

			for (const row of game.grid)
			{
				expect(row.length).toEqual(10);
			}
		});

		it("should construct grid with correct number of true values", () => {
			expect(game.getLivingCellCount()).toEqual(5);
		});

		it("should correctly position true values", () => {
			for (const cellSeed of cellSeeds)
			{
				expect(game.grid[cellSeed[0]][cellSeed[1]]).toEqual(true);
			}
		});
	});

	describe("Next Generation", () => {
		it("should go extinct if no cells are next to each other", () => {
			const cellSeeds = [[5, 6]];
			const game = new GameOfLife(10, cellSeeds);

			game.calculateNextGeneration();

			expect(game.getLivingCellCount()).toEqual(0);
		});

		it("should unalive cells with more than 3 neighbours", () => {
			const cellSeeds = [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]];
			const game = new GameOfLife(3, cellSeeds);

			game.calculateNextGeneration();

			expect(game.isCellAlive(1, 1)).toEqual(false);
		});

		it("should keep alive cells with 2 neighbours", () => {
			const cellSeeds = [[0, 0], [0, 1], [1, 0]];
			const game = new GameOfLife(3, cellSeeds);

			game.calculateNextGeneration();

			expect(game.isCellAlive(0, 0)).toEqual(true);
		});

		it("should keep alive cells with 3 neighbours", () => {
			const cellSeeds = [[0, 0], [0, 1], [1, 0], [1, 1]];
			const game = new GameOfLife(3, cellSeeds);

			game.calculateNextGeneration();

			expect(game.isCellAlive(0, 0)).toEqual(true);
		});

		it("should resurrect dead cells with 3 live neighbours", () => {
			const cellSeeds = [[0, 1], [1, 0], [1, 1]];
			const game = new GameOfLife(3, cellSeeds);

			game.calculateNextGeneration();

			expect(game.isCellAlive(0, 0)).toEqual(true);
		});
	});
});
