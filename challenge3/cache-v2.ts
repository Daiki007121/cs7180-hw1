// Cache V2
export class Cache {
    private cache = new Map();
    private maxSize: number;
    private defaultTTL: number;

    constructor(maxSize = 100, defaultTTL = 60000) {
        this.maxSize = maxSize;
        this.defaultTTL = defaultTTL;
    }

    set(key: string, value: any, ttl?: number) {
        if (this.cache.size >= this.maxSize) {
            this.evictLRU();
        }

        this.cache.set(key, {
            value,
            expires: Date.now() + (ttl || this.defaultTTL),
            lastAccess: Date.now()
        });
    }

    get(key: string) {
        const entry = this.cache.get(key);
        if (!entry) return undefined;

        if (Date.now() > entry.expires) {
            this.cache.delete(key);
            return undefined;
        }

        entry.lastAccess = Date.now();
        return entry.value;
    }

    has(key: string) {
        return this.get(key) !== undefined;
    }

    delete(key: string) {
        return this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }

    private evictLRU() {
        let oldest = null;
        let oldestTime = Infinity;

        for (const [key, entry] of this.cache) {
            if (entry.lastAccess < oldestTime) {
                oldestTime = entry.lastAccess;
                oldest = key;
            }
        }

        if (oldest) this.cache.delete(oldest);
    }
}

