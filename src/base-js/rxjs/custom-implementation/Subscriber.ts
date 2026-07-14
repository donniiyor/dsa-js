export class Subscriber<T> {
    private closed: boolean = false;

    private readonly _next?: (value: T) => void;
    private readonly _error?: (error: unknown) => void;
    private readonly _complete?: () => void;

    constructor(subscriberOrNext?: Partial<Subscriber<T>> | ((value: T) => void)) {
        if (typeof subscriberOrNext === "function") this._next = subscriberOrNext;
        else {
            this._next = subscriberOrNext?.next;
            this._error = subscriberOrNext?.error;
            this._complete = subscriberOrNext?.complete;
        }
    }

    next(value: T) {
        if (this.closed) return;

        this._next?.(value);
    }

    error(error: unknown) {
        if (this.closed) return;

        this.closed = true;
        this._error?.(error);
    }

    complete() {
        if (this.closed) return;

        this.closed = true;
        this._complete?.();
    }
}
