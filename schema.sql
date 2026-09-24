-- TravelMate Minimal Persistent Database Schema
-- Tables: trips, itinerary, packing, budget

CREATE TABLE IF NOT EXISTS trips (
    id TEXT PRIMARY KEY,
    destination TEXT NOT NULL,
    dates TEXT NOT NULL,
    budget REAL NOT NULL,
    currency TEXT DEFAULT '₹',
    travellers INTEGER NOT NULL,
    preferences TEXT -- JSON/text storing style, pace, accommodation
);

CREATE TABLE IF NOT EXISTS itinerary (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    day INTEGER NOT NULL,
    city TEXT NOT NULL,
    hotel TEXT,
    activities TEXT, -- JSON/text storing morning, afternoon, evening schedules
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS packing (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    item_text TEXT NOT NULL,
    category TEXT,
    is_checked INTEGER DEFAULT 0,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS budget (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    title TEXT,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);
