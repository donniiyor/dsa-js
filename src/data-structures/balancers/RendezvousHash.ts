import { createHash } from "crypto";

class RendezvousHash {
    constructor(private readonly servers: string[]) {}

    getServer(key: string): string {
        let bestServer: null | string = null;
        let bestScore = -Infinity;

        for (const server of this.servers) {
            const score = this.hash(server, key);

            if (score > bestScore) {
                bestScore = score;
                bestServer = server;
            }
        }

        if (!bestServer) throw new Error("No servers are available.");

        return bestServer;
    }

    private hash(server: string, client: string) {
        return createHash("sha256").update(`${server}:${client}`).digest().readUInt32BE();
    }
}

const rh = new RendezvousHash(["A", "B", "C"]);
"ABCDEF".split("").forEach((client) => console.log(rh.getServer(client)));
