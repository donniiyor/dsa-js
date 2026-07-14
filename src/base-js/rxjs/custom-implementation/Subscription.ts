export class Subscription {
    private closed: boolean = false;

    constructor(private teardown?: () => void) {}

    unsubscribe() {
        if (this.closed) return;

        this.closed = true;
        this.teardown?.();
    }
}
