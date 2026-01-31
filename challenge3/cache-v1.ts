// Cache V1
export class Cache {
    private cache = new Map();
    private ttl = 60000; // 60 seconds default

    set(key: string, value: any) {
        this.cache.set(key, {
            value,
            expires: Date.now() + this.ttl
        });
    }

    get(key: string) {
        const entry = this.cache.get(key);
        if (!entry) return undefined;

        if (Date.now() > entry.expires) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value;
    }

    has(key: string) {
        return this.cache.has(key);
    }

    delete(key: string) {
        return this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }
}
