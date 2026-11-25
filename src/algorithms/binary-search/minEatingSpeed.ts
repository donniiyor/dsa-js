function minEatingSpeed(piles: number[], h: number): number {
    let k: number = Infinity;
    let l: number = 1,
        r: number = Math.max(...piles);

    while (l <= r) {
        const m: number = Math.floor((l + r) / 2);

        if (isValidSpeed(m, piles, h)) {
            k = Math.min(k, m);
            r = m - 1;
        } else l = m + 1;
    }

    return k;
}

function isValidSpeed(k: number, piles: number[], h: number): boolean {
    let t: number = 0;

    for (const pile of piles) {
        t += Math.ceil(pile / k);

        if (t > h) return false;
    }

    return true;
}
