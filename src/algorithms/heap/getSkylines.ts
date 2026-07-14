type Building = [number, number, number]; // [left, right, height]
type Keypoint = [number, number]; // [x, y]

function getSkyline(buildings: Building[]): Keypoint[] {
    const events: Array<[number, "s" | "e", number]> = []; // [x, event-type, height]
    const result: Array<[number, number]> = []; // [x, height]

    for (const [l, r, h] of buildings) {
        events.push([l, "s", h]);
        events.push([r, "e", h]);
    }

    events.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];

        if (a[1] === b[1]) {
            if (a[1] === "s") {
                return b[2] - a[2]; // start: выше раньше
            }

            return a[2] - b[2]; // end: ниже раньше
        }

        return a[1] === "s" ? -1 : 1; // start раньше end
    });

    let heap = [0];
    let prevHeight = 0;

    for (const [x, t, h] of events) {
        if (t === "s") heap.push(h);
        else {
            const index = heap.findIndex((h0) => h0 === h);
            heap.splice(index, 1);
        }

        const currentHeight = Math.max(...heap);

        if (prevHeight !== currentHeight) {
            prevHeight = currentHeight;
            result.push([x, currentHeight]);
        }
    }

    return result;
}

console.log(
    getSkyline([
        [0, 2, 3],
        [2, 5, 3],
    ]),
);
