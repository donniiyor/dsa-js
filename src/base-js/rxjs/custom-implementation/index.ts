import { Observable } from "./Observable";

const numbers = new Observable((subscriber) => {
    let count = 0;
    const id = setInterval(() => {
        subscriber.next(count++);
        if (count === 2) throw new Error("boom");
    }, 1000);

    return () => {
        clearInterval(id);
        console.log("This is my unsubscription provider.");
    };
});

const subscription = numbers.subscribe({ next: console.log, error: console.log });

setTimeout(() => {
    subscription.unsubscribe();
}, 5000);
