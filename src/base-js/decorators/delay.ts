function delay<T extends (this: any, ...args: any[]) => any>(
    fn: T,
    ms: number,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => Promise<ReturnType<T>> {
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        return new Promise((resolve) => setTimeout(() => resolve(fn.apply(this, args)), ms));
    };
}

const user = {
    name: "John",
    getName: function () {
        return this.name;
    },
};

const delayedGetName = delay(user.getName, 1000);
delayedGetName().then((value) => value);
