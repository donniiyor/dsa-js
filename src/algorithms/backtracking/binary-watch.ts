function readBinaryWatch(turnedOn: number): string[] {
    const result: string[] = [];
    const leds: number[] = [1, 2, 4, 8, 1, 2, 4, 8, 16, 32];

    function backtrack(index: number, used: number, h: number, m: number) {
        if (h > 11 || m > 59) return;

        if (used === turnedOn) {
            result.push(`${h}:${m.toString().padStart(2, "0")}`);
            return;
        }

        if (index === leds.length) return;

        backtrack(index + 1, used, h, m);

        if (index < 4) backtrack(index + 1, used + 1, h + leds[index], m);
        else backtrack(index + 1, used + 1, h, m + leds[index]);
    }

    backtrack(0, 0, 0, 0);

    return result;
}
