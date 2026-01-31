import { Cache } from './cache-v3';

// Mock localStorage for Node.js testing
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

global.localStorage = localStorageMock as any;

describe('Cache', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('sets and gets values', () => {
    const cache = new Cache();
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  test('expires entries', async () => {
    const cache = new Cache(100, 50);
    cache.set('key1', 'value1');
    await new Promise(r => setTimeout(r, 100));
    expect(cache.get('key1')).toBeUndefined();
  });

  test('deletes and clears', () => {
    const cache = new Cache();
    cache.set('key1', 'value1');
    cache.delete('key1');
    expect(cache.has('key1')).toBe(false);

    cache.set('key2', 'value2');
    cache.clear();
    expect(cache.has('key2')).toBe(false);
  });

  // ✅ NEW: Test persistence
  test('persists data to localStorage', () => {
    const cache = new Cache();
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');

    // Check localStorage was updated
    const stored = localStorage.getItem('cache-data');
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(2);
  });

  // ✅ NEW: Test loading from localStorage
  test('loads data from localStorage on initialization', () => {
    // Create first cache and add data
    const cache1 = new Cache();
    cache1.set('persistent-key', 'persistent-value');

    // Create second cache - should load from localStorage
    const cache2 = new Cache();
    expect(cache2.get('persistent-key')).toBe('persistent-value');
  });

  // ✅ NEW: Test expired entries are cleaned on load
  test('cleans expired entries on load', () => {
    const cache1 = new Cache(100, 50);
    cache1.set('expired-key', 'value');

    // Wait for expiration
    return new Promise(resolve => {
      setTimeout(() => {
        // Create new cache - should clean expired entries on load
        const cache2 = new Cache(100, 50);
        expect(cache2.get('expired-key')).toBeUndefined();
        resolve(true);
      }, 100);
    });
  });

  // ✅ NEW: Test LRU eviction
  test('evicts oldest entry when cache is full', () => {
    const cache = new Cache(2); // Max 2 items

    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3'); // Should evict key1 (oldest)

    expect(cache.get('key1')).toBeUndefined(); // Evicted
    expect(cache.get('key2')).toBe('value2'); // Still exists
    expect(cache.get('key3')).toBe('value3'); // Newly added

    // Verify persistence
    const cache2 = new Cache(2);
    expect(cache2.get('key1')).toBeUndefined();
    expect(cache2.get('key2')).toBe('value2');
    expect(cache2.get('key3')).toBe('value3');
  });
});