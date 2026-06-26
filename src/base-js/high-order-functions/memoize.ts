function memoize<T extends (...args: any[]) => any>(
    fn: T,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T> {
    type Node = {
        primitive: Map<any, Node>;
        object: WeakMap<object, Node>;
        hasValue: boolean;
        value: ReturnType<T>;
    };

    const createNode = (): Node => ({
        primitive: new Map(),
        object: new WeakMap(),
        hasValue: false,
        value: undefined as ReturnType<T>,
    });

    const root = createNode();

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        let node = root;

        for (const arg of args) {
            const isObject = (typeof arg === "object" && arg !== null) || typeof arg === "function";

            const map = isObject ? node.object : node.primitive;

            let next = map.get(arg);

            if (!next) {
                next = createNode();
                map.set(arg, next);
            }

            node = next;
        }

        if (node.hasValue) return node.value;

        const result = fn.apply(this, args);

        node.value = result;
        node.hasValue = true;

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
