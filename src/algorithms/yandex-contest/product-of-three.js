const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin });

let n;
let numbers;

rl.on("line", (input) => {
    if (n === undefined) n = +input;
    else {
        numbers = input.trim().split(" ").map(Number);

        rl.close();
    }
});

rl.on("close", () => {
    let l = 0;

    while (l < numbers.length - 2) {
        const [i, j, k] = numbers.slice(l);

        if (1 <= i && i < j && j < k && k <= n) {
            console.log(i * j * k);
            break;
        }

        l++;
    }
});
