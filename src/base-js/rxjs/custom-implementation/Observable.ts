import { Subscriber } from "./Subscriber";
import { Subscription } from "./Subscription";

export class Observable<T> {
    constructor(
        private readonly _subscribe: (subscriber: Subscriber<T>) => (() => void) | undefined,
    ) {}

    subscribe(subscriberOrNext?: Partial<Subscriber<T>> | ((value: T) => void)): Subscription {
        const subscriber = new Subscriber<T>(subscriberOrNext);
        let teardown: undefined | (() => void) = undefined;

        try {
            teardown = this._subscribe(subscriber);
        } catch (error) {
            subscriber.error?.(error);
        }

        return new Subscription(teardown);
    }
}
