// Parent: (i - 1) / 2
// Left child: 2 * i + 1
// Right child: 2 * i + 2

class MaxHeap<T> {
    private readonly data: T[] = [];

    constructor(private readonly compare: (a: T, b: T) => number) {}

    size(): number {
        return this.data.length;
    }

    peek(): T | undefined {
        return this.data[0];
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    insert(value: T): void {
        this.data.push(value);
        this.bubbleUp();
    }

    extractMax(): T | undefined {
        if (this.isEmpty()) return undefined;
        if (this.size() === 1) return this.data.pop();

        const firstElement = this.data[0];

        this.data[0] = this.data.pop()!;
        this.bubbleDown();

        return firstElement;
    }

    private bubbleUp(): void {
        let currentIndex = this.size() - 1;

        while (currentIndex !== 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            if (this.compare(this.data[parentIndex], this.data[currentIndex]) < 0) {
                [this.data[parentIndex], this.data[currentIndex]] = [
                    this.data[currentIndex],
                    this.data[parentIndex],
                ];

                currentIndex = parentIndex;
            } else break;
        }
    }

    private bubbleDown(): void {
        let currentIndex = 0;

        while (true) {
            const lChildIndex = currentIndex * 2 + 1;
            const rChildIndex = currentIndex * 2 + 2;

            let largestIndex = currentIndex;

            if (
                lChildIndex < this.size() &&
                this.compare(this.data[lChildIndex], this.data[largestIndex]) > 0
            ) {
                largestIndex = lChildIndex;
            }

            if (
                rChildIndex < this.size() &&
                this.compare(this.data[rChildIndex], this.data[largestIndex]) > 0
            ) {
                largestIndex = rChildIndex;
            }

            if (largestIndex === currentIndex) break;

            [this.data[currentIndex], this.data[largestIndex]] = [
                this.data[largestIndex],
                this.data[currentIndex],
            ];

            currentIndex = largestIndex;
        }
    }
}

const maxHeap: MaxHeap<number> = new MaxHeap((a, b) => a - b);
