type Callback = (...args: any[]) => any;

type Subscription = {
    unsubscribe: () => void;
};

class EventEmitter {
    private events = new Map<string, Set<Callback>>();

    subscribe(eventName: string, callback: Callback): Subscription {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, new Set());
        }

        const callbacks = this.events.get(eventName)!;
        callbacks.add(callback);

        return {
            unsubscribe: () => {
                callbacks.delete(callback);

                if (callbacks.size === 0) {
                    this.events.delete(eventName);
                }
            },
        };
    }

    emit(eventName: string, args: any[] = []): any[] {
        const callbacks = this.events.get(eventName);

        if (!callbacks) {
            return [];
        }

        return [...callbacks].map((callback) => callback(...args));
    }
}
