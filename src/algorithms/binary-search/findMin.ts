function findMin(nums: number[]): number {
    let l: number = 0,
        r: number = nums.length - 1;

    while (l < r) {
        if (nums[l] <= nums[r]) return nums[l];

        const m: number = Math.floor((l + r) / 2);

        if (nums[m] < nums[r]) r = m;
        else l = m + 1;
    }

    return nums[l];
}
