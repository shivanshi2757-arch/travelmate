/**
 * db.js - TravelMate Minimal Persistent Database (IndexedDB)
 * Stores: trips, itinerary, packing, budget
 */

const DB_NAME = 'TravelMateDB';
const DB_VERSION = 1;

const DB = {
  db: null,

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // 1. Trips Store
        if (!db.objectStoreNames.contains('trips')) {
          db.createObjectStore('trips', { keyPath: 'id' });
        }

        // 2. Itinerary Store (keyed by id, indexed by tripId)
        if (!db.objectStoreNames.contains('itinerary')) {
          const itinStore = db.createObjectStore('itinerary', { keyPath: 'id' });
          itinStore.createIndex('tripId', 'tripId', { unique: false });
        }

        // 3. Packing Store (keyed by id, indexed by tripId)
        if (!db.objectStoreNames.contains('packing')) {
          const packStore = db.createObjectStore('packing', { keyPath: 'id' });
          packStore.createIndex('tripId', 'tripId', { unique: false });
        }

        // 4. Budget Store (keyed by id, indexed by tripId)
        if (!db.objectStoreNames.contains('budget')) {
          const budgetStore = db.createObjectStore('budget', { keyPath: 'id' });
          budgetStore.createIndex('tripId', 'tripId', { unique: false });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('IndexedDB error:', e.target.error);
        reject(e.target.error);
      };
    });
  },

  // Generic helpers
  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  },

  async put(storeName, item) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  async clear(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  async getByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const index = store.index(indexName);
      const req = index.getAll(value);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }
};
