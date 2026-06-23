interface CacheEntry {
    value: number;
    timeout: NodeJS.Timeout;
}

class TimeLimitedCache {
    private cache: Map<number, CacheEntry> = new Map();

    constructor() {}

    set(key: number, value: number, duration: number): boolean {
        const storedCacheEntry = this.cache.get(key);

        if (storedCacheEntry) clearTimeout(storedCacheEntry.timeout);

        this.cache.set(key, {
            value,
            timeout: setTimeout(() => this.cache.delete(key), duration),
        });

        return Boolean(storedCacheEntry);
    }

    get(key: number): number {
        return this.cache.get(key)?.value || -1;
    }

    count(): number {
        return this.cache.size;
    }
}

const timeLimitedCache = new TimeLimitedCache();
console.log(timeLimitedCache.set(1, 42, 1000)); // false
console.log(timeLimitedCache.get(1)); // 42
console.log(timeLimitedCache.count()); // 1
