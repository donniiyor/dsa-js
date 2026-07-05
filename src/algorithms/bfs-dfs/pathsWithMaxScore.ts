const MOD = 1_000_000_007;
function pathsWithMaxScore(board: string[]): [number, number] {
    const rows: number = board.length;
    const cols: number = board[0].length;

    const queue: Array<[number, number, number]> = [[rows - 1, cols - 1, 0]]; // Array<y, x, score>
    const offsets: Array<[number, number]> = [
        [0, -1], // left
        [-1, -1], // left-top
        [-1, 0], // top
    ];

    let maxScore: number = 0;
    const result: [number, number] = [0, 0]; // [scores, paths]

    while (queue.length) {
        const [y, x, score] = queue.shift()!;

        for (const [oY, oX] of offsets) {
            const [dY, dX]: [number, number] = [y + oY, x + oX];

            if (board[dY] === undefined || board[dY][dX] === undefined || board[dY][dX] === "X")
                continue;

            if (board[dY][dX] === "E") {
                if (score > maxScore) {
                    result[0] = score % MOD;
                    result[1] = 1;

                    maxScore = result[0];
                } else if (score === maxScore) {
                    result[0] = result[0] % MOD;
                    result[1] = (result[1] + 1) % MOD;
                }

                continue;
            }

            queue.push([dY, dX, score + +board[dY][dX]]);
        }
    }

    return result;
}

console.log(
    pathsWithMaxScore([
        "E713399729",
        "X151558988",
        "5545833573",
        "4366595255",
        "23493768X9",
        "8X24154768",
        "1357922244",
        "8921993297",
        "8699512769",
        "214631X17S",
    ]),
);
