import { createHash } from "crypto";

interface Server {
    hash: number;
    name: string;
}

class ConsistentHash {
    servers: Server[] = []; // hash based sorted array

    addServer(serverName: string): void {
        const newServer: Server = { hash: this.hash(serverName), name: serverName };

        if (this.servers.length === 0) {
            this.servers.push(newServer);

            return;
        }

        if (this.servers.length === 1) {
            if (newServer.hash > this.servers[0].hash) this.servers.push(newServer);
            else this.servers.unshift(newServer);

            return;
        }

        this.servers.splice(this.getInsertionIndex(newServer.hash), 0, newServer);
    }

    removeServer(serverName: string): void {
        this.servers = this.servers.filter((server) => server.name !== serverName);
    }

    getServer(key: string): string {
        const insertionIndex = this.getInsertionIndex(this.hash(key)) % this.servers.length;

        return this.servers[insertionIndex].name;
    }

    hash(value: string): number {
        //  0 <= value <= 2^32 - 1
        return createHash("sha256").update(value).digest().readUInt32BE(0);
    }

    private getInsertionIndex(hash: number): number {
        let l = 0,
            r = this.servers.length - 1;

        while (l < r) {
            const m = Math.floor((l + r) / 2);

            if (hash > this.servers[m].hash) l = m + 1;
            else r = m;
        }

        return hash > this.servers[l].hash ? l + 1 : l;
    }
}

const ch = new ConsistentHash();
"FDCEBA".split("").forEach((serverName) => ch.addServer(serverName));
"KIOMSQ".split("").forEach((serverName) => ch.addServer(serverName));
console.log(ch.getServer("apple"), ch.hash("apple"), ch.servers);
// 0b00000000 => 0x00
// 32byte => 16hex
// 1byte = 8bit
// 1hex = 4bit
// 2hex = 1byte
// 64hex = 32byte
