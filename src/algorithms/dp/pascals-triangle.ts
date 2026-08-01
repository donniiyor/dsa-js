const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line: string) => {
	const n = +line.trim();

	console.log(generate(n));

    rl.close();
});

function generate(numRows: number): number[][] {
    const rows: Array<number[]> = [[1]];

    if (numRows === 1) return rows;

    for (let i = 1; i < numRows; i++) {
        const row: number[] = [];

        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                row.push(1);
                continue;
            }

            const l = rows[i - 1][j - 1];
            const r = rows[i - 1][j];

            row.push(l + r);
        }

        rows.push(row);
    }

    return rows;
}

