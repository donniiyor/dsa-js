export class MinHeap<T> {
    private readonly data: T[] = [];

    constructor(private readonly compare: (a: T, b: T) => number) {}

    public size(): number {
        return this.data.length;
    }

    public isEmpty(): boolean {
        return this.data.length === 0;
    }

    public peek(): T | undefined {
        const firstElement = this.data[0];

        if (!firstElement) return undefined;
        if (this.size() === 1) return this.data.pop();

        this.data[0] = this.data.pop()!;
        this.heapifyDown();

        return firstElement;
    }

    public add(element: T): void {
        this.data.push(element);
        this.heapifyUp();
    }

    private heapifyUp() {
        let currentIndex = this.size() - 1;

        while (currentIndex !== 0) {
            const parentIndex = this.getParentIndex(currentIndex)!;

            if (this.compare(this.data[currentIndex], this.data[parentIndex]) < 0) {
                this.swap(parentIndex, currentIndex);
                currentIndex = parentIndex;
            } else break;
        }
    }

    private heapifyDown() {
        let currentIndex = 0;

        while (true) {
            const leftChildIndex = this.getLeftChildIndex(currentIndex);
            const rightChildIndex = this.getRightChildIndex(currentIndex);

            let smallestIndex = currentIndex;

            if (
                leftChildIndex &&
                this.compare(this.data[smallestIndex], this.data[leftChildIndex]) > 0
            ) {
                smallestIndex = leftChildIndex;
            }

            if (
                rightChildIndex &&
                this.compare(this.data[smallestIndex], this.data[rightChildIndex]) > 0
            ) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex === currentIndex) break;

            this.swap(currentIndex, smallestIndex);
            currentIndex = smallestIndex;
        }
    }

    private getParentIndex(index: number): number | undefined {
        if (index === 0) return undefined;

        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndex(index: number): number | undefined {
        const leftChildIndex = index * 2 + 1;

        if (leftChildIndex >= this.size()) return undefined;

        return leftChildIndex;
    }

    private getRightChildIndex(index: number): number | undefined {
        const rightChildIndex = index * 2 + 2;

        if (rightChildIndex >= this.size()) return undefined;

        return rightChildIndex;
    }

    private swap(aIndex: number, bIndex: number) {
        [this.data[aIndex], this.data[bIndex]] = [this.data[bIndex], this.data[aIndex]];
    }
}

const minHeap: MinHeap<number> = new MinHeap((a, b) => a - b);

minHeap.add(15);
minHeap.add(8);
minHeap.add(10);
minHeap.add(6);
minHeap.add(7);
minHeap.add(1);
console.log(minHeap.peek());
console.log(minHeap.peek());
console.log(minHeap.peek());
console.log(minHeap.peek());
