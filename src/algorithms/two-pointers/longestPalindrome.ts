function longestPalindrome(s: string): string {
    let maxL = 0,
        maxR = 0;

    function expand(l: number, r: number): void {
        while (l >= 0 && r <= s.length - 1 && s[l] === s[r]) {
            const substr = s.slice(l, r + 1);

            if (!isPalindrome(substr)) break;
            if (substr.length > maxR - maxL + 1) [maxL, maxR] = [l, r];

            l--;
            r++;
        }
    }

    for (let i = 0; i < s.length - 1; i++) {
        expand(i, i); // odd
        expand(i, i + 1); // even
    }

    return s.slice(maxL, maxR + 1);
}

function isPalindrome(s: string) {
    let l = 0;
    let r = s.length - 1;

    while (l < r) {
        if (s[l] !== s[r]) return false;

        l++;
        r--;
    }

    return true;
}
