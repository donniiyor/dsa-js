declare global {
    interface Array<T> {
        snail(rowsCount: number, colsCount: number): number[][];
    }
}

Array.prototype.snail = function <T>(this: T[], rowsCount: number, colsCount: number): T[][] {
    if (rowsCount * colsCount !== this.length) throw new Error("Invalid input.");

    const result: T[][] = new Array<T>(rowsCount)
        .fill(null as T)
        .map(() => new Array<T>(colsCount).fill(null as T));

    let isReversed = false;
    for (let i = 0; i < this.length; i++) {
        const row = isReversed ? rowsCount - 1 - (i % rowsCount) : i % rowsCount;
        const col = Math.floor(i / rowsCount);

        result[row][col] = this[i];

        if (i % rowsCount === rowsCount - 1) isReversed = !isReversed;
    }

    return result;
};

const arr = [1, 2, 3, 4];
console.log(arr.snail(1, 4)); // [[1,2,3,4]]
