const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n;
let row;

rl.on("line", (input) => {
    if (n === undefined) n = +input;
    else {
        row = input.trim();

        rl.close();
    }
});

rl.on("close", () => {
    const map = new Map();
    map.set(0, 1);

    const prefix = new Array(n + 1).fill(0);
    let count = 0;

    for (let i = 0; i < row.length; i++) {
        prefix[i + 1] = row[i] === "a" ? prefix[i] + 1 : prefix[i] - 1;

        count += map.get(prefix[i + 1]) || 0;

        map.set(prefix[i + 1], (map.get(prefix[i + 1]) || 0) + 1);
    }

    console.log(count);
});
