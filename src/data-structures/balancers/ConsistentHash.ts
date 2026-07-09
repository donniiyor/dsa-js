import { createHash } from "crypto";

interface Node {
    hash: number;
    name: string;
}

class ConsistentHash {
    private nodes: Node[] = []; // hash based sorted array

    constructor(private readonly virtualNodes: number) {}

    addServer(serverName: string): void {
        const newNodes: Node[] = [];

        for (let i = 0; i < this.virtualNodes; i++) {
            const nodeHash = this.hash(`${serverName}#${i + 1}`);

            newNodes.push({ hash: nodeHash, name: serverName });
        }

        newNodes.forEach((node) => {
            const insertionIndex = this.getInsertionIndex(node.hash); // O(log(n))

            this.nodes.splice(insertionIndex, 0, node); // O(n)
        }); // O(k * n) // Where k is number of nodes
    }

    removeServer(serverName: string): void {
        this.nodes = this.nodes.filter((server) => server.name !== serverName);
    }

    getServer(key: string): string {
        const insertionIndex = this.getInsertionIndex(this.hash(key)) % this.nodes.length;

        return this.nodes[insertionIndex].name;
    }

    private hash(value: string): number {
        //  0 <= value <= 2^32 - 1
        return createHash("sha256").update(value).digest().readUInt32BE(0);
    }

    private getInsertionIndex(hash: number): number {
        if (this.nodes.length === 0) return 0;

        let l = 0,
            r = this.nodes.length - 1;

        while (l < r) {
            const m = Math.floor((l + r) / 2);

            if (hash > this.nodes[m].hash) l = m + 1;
            else r = m;
        }

        return hash > this.nodes[l].hash ? l + 1 : l;
    }
}

const ch = new ConsistentHash(100);
"FDCEBA".split("").forEach((serverName) => ch.addServer(serverName));
"KIOMSQ".split("").forEach((serverName) => ch.addServer(serverName));
// 0b00000000 => 0x00
// 32byte => 16hex
// 1byte = 8bit
// 1hex = 4bit
// 2hex = 1byte
// 64hex = 32byte
