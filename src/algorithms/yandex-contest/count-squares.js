const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin });

let n, m;
const inputs = [];

rl.on("line", (input) => {
    if (n === undefined) [n, m] = input.trim().split(" ").map(Number);
    else {
        inputs.push(input.trim().split(""));
        if (inputs.length === n) rl.close();
    }
});

rl.on("close", () => {
    const visited = new Set(); // row-col

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (inputs[i][j] === ".") continue;

            const key = `${i}-${j}`;

            if (visited.has(key)) continue;
        }
    }

    function isSquare(r, c, visited) {}
});
