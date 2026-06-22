const users = [
    { id: 1, name: "John", age: 17, active: true },
    { id: 2, name: "Alice", age: 25, active: false },
    { id: 3, name: "Bob", age: 32, active: true },
    { id: 4, name: "Kate", age: 19, active: true },
];

function filter<T>(predicate: (item: T) => boolean) {
    return (array: T[]) => array.filter(predicate);
}

function map<T, R>(mapper: (item: T) => R) {
    return (array: T[]) => array.map(mapper);
}

function take<T>(n: number) {
    return (array: T[]) => array.slice(0, n);
}

function sortBy<T>(selector: (item: T) => number) {
    return (array: T[]) => [...array].sort((a, b) => selector(a) - selector(b));
}

function pipe(...fns: Function[]) {
    return (value: unknown) => fns.reduce((acc, fn) => fn(acc), value);
}

const result = pipe(
    filter((user) => user.active),
    filter((user) => user.age >= 18),
    sortBy((user) => user.age),
    map((user) => user.name.toUpperCase()),
    take(2),
)(users);

console.log(result); // ["KATE", "BOB"]
