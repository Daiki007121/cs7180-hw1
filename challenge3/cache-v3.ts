// Cache with TTL, LRU, and Persistence (V3 - Fixed)
export class Cache {
  private cache = new Map();
  private maxSize: number;
  private defaultTTL: number;
  private storageKey = 'cache-data';

  constructor(maxSize = 100, defaultTTL = 60000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
    this.load(); // Load from localStorage on initialization
  }

  set(key: string, value: any, ttl?: number) {
    // If updating existing key, don't need to evict
    const isUpdate = this.cache.has(key);

    if (!isUpdate && this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, {
      value,
      expires: Date.now() + (ttl || this.defaultTTL),
      lastAccess: Date.now()
    });

    this.persist(); // Save to localStorage after every set
  }

  get(key: string) {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      this.persist(); // Save after removing expired entry
      return undefined;
    }

    entry.lastAccess = Date.now();
    this.persist(); // Save after updating lastAccess
    return entry.value;
  }

  has(key: string) {
    return this.get(key) !== undefined;
  }

  delete(key: string) {
    const result = this.cache.delete(key);
    this.persist(); // Save after deletion
    return result;
  }

  clear() {
    this.cache.clear();
    this.persist(); // Save after clearing
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

  // ✅ NEW: Persist to localStorage
  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        const serialized = JSON.stringify(Array.from(this.cache.entries()));
        localStorage.setItem(this.storageKey, serialized);
      }
    } catch (e) {
      console.error('Cache persistence failed:', e);
    }
  }

  // ✅ NEW: Load from localStorage
  private load() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
          const entries = JSON.parse(data);
          this.cache = new Map(entries);

          // Clean up expired entries on load
          const now = Date.now();
          for (const [key, entry] of this.cache) {
            if (now > entry.expires) {
              this.cache.delete(key);
            }
          }
        }
      }
    } catch (e) {
      console.error('Cache load failed:', e);
    }
  }
}