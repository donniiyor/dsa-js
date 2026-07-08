export class RoundRobinBalancer {
    private index: number = 0;

    constructor(private servers: string[]) {}

    public next(): string {
        if (this.servers.length === 0) {
            throw new Error("No servers available");
        }

        const server = this.servers[this.index % this.servers.length];
        this.index++;

        return server;
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
