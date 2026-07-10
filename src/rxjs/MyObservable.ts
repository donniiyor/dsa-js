interface Subscriber<T> {
    next?: (value: T) => void;
    error?: () => void;
    complete?: () => void;
}

class MyObservable<T> {
    constructor(private readonly _subscribe: (subscriber: Subscriber<T>) => void) {}

    subscribe(subscriber: Subscriber<T>) {
        this._subscribe(subscriber);
    }
}

const numbers = new MyObservable<number>((subscriber) => {
    subscriber.next?.(1);
    subscriber.next?.(2);
    subscriber.next?.(3);
});

numbers.subscribe({ next: console.log });
numbers.subscribe({ next: console.log });
