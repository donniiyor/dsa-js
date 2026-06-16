function work(a: number, b: number): number {
    return a + b; // work is an arbitrary function or method
}

type Spy<T extends (...args: any) => any> = ((...args: Parameters<T>) => ReturnType<T>) & {
    calls: Parameters<T>[];
};

function spy<T extends (...args: any[]) => any>(func: T): Spy<T> {
    const calls: Parameters<T>[] = [];

    const wrapper = function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
        calls.push(args);
        return func.apply(this, args);
    } as Spy<T>;

    wrapper.calls = calls;

    return wrapper;
}

const w = spy(work);

w(1, 2); // 3
w(4, 5); // 9

for (let args of w.calls) {
    alert("call:" + args.join()); // "call:1,2", "call:4,5"
}
