export class RoundRobinBalancer {
    private index: number = 0;

    constructor(private servers: string[]) {}

    public next() {
        if (!this.servers.length) throw new Error("No servers available");

        const currentIndex = this.index++;

        if (this.index === 2 ** 53 - 1) this.index = 0;

        return this.servers[currentIndex % this.servers.length];
    }

    public add(server: string) {
        this.servers.push(server);
    }

    public remove(serverToRemove: string) {
        this.servers = this.servers.filter((server) => server !== serverToRemove);
    }
}

const lb = new RoundRobinBalancer(["A", "B", "C"]);

for (let i = 0; i < 5; i++) console.log(lb.next());
