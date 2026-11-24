function searchMatrix(matrix: number[][], target: number): boolean {
    let l: number = 0,
        r: number = matrix.length - 1;

    while (l <= r) {
        const mid: number = Math.floor((l + r) / 2);

        if (inRangeOfRow(target, matrix[mid])) {
            return findIndex(target, matrix[mid]) === -1 ? false : true;
        }

        if (target > matrix[mid][matrix[mid].length - 1]) l = mid + 1;
        else if (target < matrix[mid][0]) r = mid - 1;
        else return false;
    }

    return false;
}

function inRangeOfRow(target: number, row: number[]): boolean {
    return row[0] <= target && target <= row[row.length - 1];
}

function findIndex(target: number, numbers: number[]): number {
    let l: number = 0,
        r: number = numbers.length - 1;

    while (l <= r) {
        const mid: number = Math.floor((l + r) / 2);

        if (numbers[mid] === target) return mid;

        if (numbers[mid] > target) r = mid - 1;
        else l = mid + 1;
    }

    return -1;
}
