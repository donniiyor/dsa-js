interface Subscriber<T> {
    next?: (value: T) => void;
    error?: () => void;
    complete?: () => void;
}

interface Subscription {
    unsubscribe: () => void;
}

class MyObservable<T> {
    constructor(private readonly _subscribe: (subscriber: Subscriber<T>) => () => void) {}

    subscribe(subscriber: Subscriber<T>): Subscription {
        return { unsubscribe: this._subscribe(subscriber) };
    }
}

const numbers = new MyObservable<number>((subscriber) => {
    subscriber.next?.(1);
    subscriber.next?.(2);
    subscriber.next?.(3);

    return () => console.log("This is my unsubscription provider.");
});

const subscription = numbers.subscribe({ next: console.log });
subscription.unsubscribe();
