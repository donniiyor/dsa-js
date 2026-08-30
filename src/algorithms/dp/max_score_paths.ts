const MOD: number = 1_000_000_007;
function pathsWithMaxScore(board: string[]): number[] {
	const rows: number = board.length;
	const cols: number = board[0].length;

	const dp: Array<Array<[number, number] | null>> = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null ));
	dp[0][0] = [0, 1];

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (board[i][j] === 'E' || board[i][j] === 'X') continue;

			const prevD: [number, number] = [i - 1, j - 1]; // previous top-left cell
			const prevT: [number, number] = [i - 1, j]; // previous top cell
			const prevL: [number, number] = [i, j - 1]; // previous left cell
			const validCells: Array<[number, number]> = [prevD, prevT, prevL]
				.filter((cell) => cell[0] >= 0 && cell[1] >= 0 && cell[0] < rows && cell[1] < cols)
				.filter((cell) => dp[cell[0]][cell[1]] !== null);

			if (validCells.length === 0) continue;

			let maxScore: number = -Infinity;
			let maxPaths: number = 0;
			for (const cell of validCells) {
				const [score, paths] = dp[cell[0]][cell[1]]!;

				if (maxScore < score) {
					maxScore = score;
					maxPaths = paths;
				} else if (maxScore === score) maxPaths = (maxPaths + paths) % MOD;
			}

			dp[i][j] = board[i][j] === 'S' ? [maxScore, maxPaths] :  [(Number(board[i][j]) + maxScore) % MOD, maxPaths];
		}
	}

	const result: [number, number] | null = dp[rows - 1][cols - 1];

	return result === null ? [0, 0] : result;
};
