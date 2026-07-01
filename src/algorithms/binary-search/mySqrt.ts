const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line: string) => {
    const x = Number(line);

    console.log(mySqrt(x));

    rl.close();
});

function mySqrt(x: number): number {
    let l = 0;
    let r = 2 ** 31 - 1;
    let m = Math.floor((l + r) / 2);

    while (l < r) {
        const sq = m ** 2;

        if (sq === x) return m;

        if (x < sq) r = m;
        else l = m + 1;

        m = Math.floor((l + r) / 2);
    }

    return m - 1;
}
