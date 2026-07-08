interface Server {
    name: string;
    sessions: number;
}

export class LeastConnectionsBalancer {
    private readonly servers: Server[] = []; // MinHeap
    private readonly indexes: Map<string, number> = new Map(); // server-name => index in heap tree

    constructor(servers: string[]) {
        servers.forEach((server, index) => {
            this.servers.push({ name: server, sessions: 0 });
            this.indexes.set(server, index);
        });
    }

    acquire(): string {
        if (this.servers.length === 0) {
            throw new Error("No servers available");
        }

        const server = this.servers[0];
        server.sessions++;

        if (this.servers.length === 1) {
            return server.name;
        }

        this.heapifyDown();

        return server.name;
    }

    release(serverName: string): void {
        const serverIndex = this.indexes.get(serverName);

        if (serverIndex === undefined) {
            throw new Error(`No server found with name: ${serverName}`);
        }

        if (this.servers[serverIndex].sessions > 0) {
            this.servers[serverIndex].sessions--;
        }

        this.heapifyUp(serverIndex);
    }

    private heapifyUp(index: number): void {
        while (index !== 0) {
            let largestIndex = index;

            const parentIndex = Math.floor((index - 1) / 2);

            if (
                parentIndex >= 0 &&
                this.servers[parentIndex].sessions > this.servers[largestIndex].sessions
            ) {
                largestIndex = parentIndex;
            }

            if (largestIndex === index) break;

            this.swap(index, largestIndex);
            index = largestIndex;
        }
    }

    private heapifyDown(): void {
        let currentIndex = 0;

        while (true) {
            let smallestIndex = currentIndex;

            const lChildIndex = (currentIndex + 1) * 2 - 1;
            const rChildIndex = (currentIndex + 1) * 2;

            if (
                lChildIndex < this.servers.length &&
                this.servers[lChildIndex].sessions < this.servers[smallestIndex].sessions
            ) {
                smallestIndex = lChildIndex;
            }

            if (
                rChildIndex < this.servers.length &&
                this.servers[rChildIndex].sessions < this.servers[smallestIndex].sessions
            ) {
                smallestIndex = rChildIndex;
            }

            if (smallestIndex === currentIndex) break;

            this.swap(currentIndex, smallestIndex);
            currentIndex = smallestIndex;
        }
    }

    private swap(aIndex: number, bIndex: number): void {
        this.indexes.set(this.servers[aIndex].name, bIndex);
        this.indexes.set(this.servers[bIndex].name, aIndex);

        [this.servers[aIndex], this.servers[bIndex]] = [this.servers[bIndex], this.servers[aIndex]];
    }
}

const lb = new LeastConnectionsBalancer(["A", "B", "C"]);
const s1 = lb.acquire(); // A
console.log(s1);
const s2 = lb.acquire(); // B
console.log(s2);
const s3 = lb.acquire(); // C
console.log(s3);

lb.release(s2);

const s4 = lb.acquire(); // B again
console.log(s4);
