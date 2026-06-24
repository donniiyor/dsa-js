function memoize<T extends (this: ThisParameterType<any>, ...params: number[]) => number>(
    fn: T,
): (...params: Parameters<T>) => ReturnType<T> {
    const cache = new Map<string, any>();

    function hash(...numbers: number[]) {
        return numbers.join("-");
    }

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const key = hash(...args);

        if (cache.has(key)) return cache.get(key);

        const result = fn.apply(this, args);

        cache.set(key, result);

        return result;
    };
}

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
    callCount += 1;
    return a + b;
});
memoizedFn(2, 3); // 5
memoizedFn(2, 3); // 5
console.log(callCount); // 1
