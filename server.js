/**
 * TravelMate Minimal Node.js Backend
 * Built-in node:http & node:sqlite (Zero external npm dependencies)
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = 3000;
const DB_FILE = path.join(__dirname, 'travelmate.db');
const SCHEMA_FILE = path.join(__dirname, 'schema.sql');

// 1. Initialize SQLite Database from schema.sql
const db = new DatabaseSync(DB_FILE);
db.exec('PRAGMA foreign_keys = ON;');

const schemaSql = fs.readFileSync(SCHEMA_FILE, 'utf8');
db.exec(schemaSql);

// Helper to seed initial data if trips table is empty
const tripCount = db.prepare('SELECT COUNT(*) as count FROM trips').get().count;
if (tripCount === 0) {
  const insertTrip = db.prepare(`
    INSERT INTO trips (id, destination, dates, budget, currency, travellers, preferences)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const insertItin = db.prepare(`
    INSERT INTO itinerary (id, trip_id, day, city, hotel, activities)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const insertPack = db.prepare(`
    INSERT INTO packing (id, trip_id, item_text, category, is_checked)
    VALUES (?, ?, ?, ?, ?)
  `);
  const insertBudget = db.prepare(`
    INSERT INTO budget (id, trip_id, category, amount, title)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertTrip.run(
    'trip-1',
    'Kyoto & Tokyo, Japan',
    'Apr 10, 2026 - Apr 15, 2026',
    120000,
    '₹',
    2,
    JSON.stringify({
      style: 'Cultural & Historic',
      pace: 'Relaxed',
      hotel: 'Hoshinoya Ryokan & Garden Suite',
      party: 'Cute Couple / Pair 💕',
      photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming',
      note: 'Ancient temples, matcha lattes, and peaceful zen gardens.'
    })
  );

  insertTrip.run(
    'trip-2',
    'Positano & Capri, Italy',
    'Jun 22, 2026 - Jun 28, 2026',
    2400,
    '€',
    3,
    JSON.stringify({
      style: 'Beach & Island Chill',
      pace: 'Moderate',
      hotel: 'Le Sirenuse Positano',
      party: 'BFFs 👯‍♀️ (3)',
      photo: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
      status: 'Planning',
      note: 'Cliffside colorful houses, fresh pasta, and boat cruises.'
    })
  );

  // Sample Day 1 Itinerary
  insertItin.run(
    'trip-1-day-1',
    'trip-1',
    1,
    'Kyoto, Japan',
    'Hoshinoya Ryokan & Garden',
    JSON.stringify({
      theme: 'Ancient Shrines & Bamboo Whispers 🎋',
      morning: {
        time: '08:30 AM - 11:30 AM',
        title: 'Arashiyama Bamboo Grove & Tenryu-ji Temple',
        desc: 'Gentle stroll through towering emerald bamboo stalks. Enjoy a matcha bowl in the temple garden.',
        tags: ['Matcha Tea 🍵', 'Bamboo Stroll 🎋']
      },
      afternoon: {
        time: '01:00 PM - 04:30 PM',
        title: 'Saga Scenic Romantic Train',
        desc: 'Vintage train ride through the forested Hozugawa ravine followed by handcrafted soba noodles.',
        tags: ['Scenic Train 🚂', 'Soba Lunch 🍜']
      },
      evening: {
        time: '06:30 PM - 09:30 PM',
        title: 'Gion Lantern Walk & Kaiseki Dinner',
        desc: 'Slip into yukata robes for a traditional Kaiseki banquet, followed by a lantern-lit bridge walk.',
        tags: ['Kaiseki Feast 🍱', 'Gion Alleys 🏮']
      }
    })
  );

  // Sample Packing
  insertPack.run('pack-1', 'trip-1', 'Passport & Travel Insurance', 'Essentials', 1);
  insertPack.run('pack-2', 'trip-1', 'Cozy walking sneakers', 'Clothing', 1);
  insertPack.run('pack-3', 'trip-1', 'Travel scrapbook & washi tape', 'Fun', 1);

  // Sample Budget
  insertBudget.run('b-1', 'trip-1', 'Stays & Hotels', 42000, 'Hoshinoya Ryokan deposit');
  insertBudget.run('b-2', 'trip-1', 'Transport & Trains', 14200, 'Shinkansen Bullet Train Passes');
}

// 2. Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// 3. HTTP Server
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // --- REST API ENDPOINTS ---

  // GET /api/trips - list all trips
  if (pathname === '/api/trips' && method === 'GET') {
    const rows = db.prepare('SELECT * FROM trips ORDER BY rowid DESC').all();
    const trips = rows.map(r => ({
      ...r,
      preferences: r.preferences ? JSON.parse(r.preferences) : {}
    }));
    return sendJson(res, 200, trips);
  }

  // POST /api/trips - create trip & optional itinerary days
  if (pathname === '/api/trips' && method === 'POST') {
    const data = await parseBody(req);
    const id = data.id || `trip-${Date.now()}`;
    const insertTrip = db.prepare(`
      INSERT INTO trips (id, destination, dates, budget, currency, travellers, preferences)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertTrip.run(
      id,
      data.destination,
      data.dates,
      data.budget || 0,
      data.currency || '₹',
      data.travellers || 1,
      JSON.stringify(data.preferences || {})
    );

    // If itinerary items are provided, insert them
    if (Array.isArray(data.itinerary)) {
      const insertItin = db.prepare(`
        INSERT INTO itinerary (id, trip_id, day, city, hotel, activities)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      data.itinerary.forEach((day, index) => {
        const itinId = `${id}-day-${day.day || (index + 1)}`;
        insertItin.run(
          itinId,
          id,
          day.day || (index + 1),
          day.city || data.destination,
          day.hotel || '',
          JSON.stringify(day.activities || {})
        );
      });
    }

    return sendJson(res, 201, { success: true, id });
  }

  // GET /api/trips/:id - get single trip + full itinerary, packing, budget
  if (pathname.startsWith('/api/trips/') && method === 'GET') {
    const tripId = pathname.replace('/api/trips/', '');
    const trip = db.prepare('SELECT * FROM trips WHERE id = ?').get(tripId);
    if (!trip) return sendJson(res, 404, { error: 'Trip not found' });

    const itinerary = db.prepare('SELECT * FROM itinerary WHERE trip_id = ? ORDER BY day ASC').all(tripId).map(i => ({
      ...i,
      activities: i.activities ? JSON.parse(i.activities) : {}
    }));
    const packing = db.prepare('SELECT * FROM packing WHERE trip_id = ?').all(tripId);
    const budget = db.prepare('SELECT * FROM budget WHERE trip_id = ?').all(tripId);

    return sendJson(res, 200, {
      ...trip,
      preferences: trip.preferences ? JSON.parse(trip.preferences) : {},
      itinerary,
      packing,
      budget
    });
  }

  // PUT /api/trips/:id - edit trip
  if (pathname.startsWith('/api/trips/') && method === 'PUT') {
    const tripId = pathname.replace('/api/trips/', '');
    const data = await parseBody(req);
    const updateTrip = db.prepare(`
      UPDATE trips
      SET destination = COALESCE(?, destination),
          dates = COALESCE(?, dates),
          budget = COALESCE(?, budget),
          currency = COALESCE(?, currency),
          travellers = COALESCE(?, travellers),
          preferences = COALESCE(?, preferences)
      WHERE id = ?
    `);
    updateTrip.run(
      data.destination || null,
      data.dates || null,
      data.budget !== undefined ? data.budget : null,
      data.currency || null,
      data.travellers || null,
      data.preferences ? JSON.stringify(data.preferences) : null,
      tripId
    );
    return sendJson(res, 200, { success: true });
  }

  // DELETE /api/trips/:id - delete trip
  if (pathname.startsWith('/api/trips/') && method === 'DELETE') {
    const tripId = pathname.replace('/api/trips/', '');
    db.prepare('DELETE FROM itinerary WHERE trip_id = ?').run(tripId);
    db.prepare('DELETE FROM packing WHERE trip_id = ?').run(tripId);
    db.prepare('DELETE FROM budget WHERE trip_id = ?').run(tripId);
    db.prepare('DELETE FROM trips WHERE id = ?').run(tripId);
    return sendJson(res, 200, { success: true });
  }

  // Packing Endpoints
  if (pathname === '/api/packing' && method === 'POST') {
    const data = await parseBody(req);
    const id = data.id || `pack-${Date.now()}`;
    db.prepare(`
      INSERT INTO packing (id, trip_id, item_text, category, is_checked)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, data.trip_id, data.item_text, data.category || 'Essentials', data.is_checked ? 1 : 0);
    return sendJson(res, 201, { success: true, id });
  }

  if (pathname.startsWith('/api/packing/') && method === 'PUT') {
    const id = pathname.replace('/api/packing/', '');
    const data = await parseBody(req);
    db.prepare('UPDATE packing SET is_checked = ? WHERE id = ?').run(data.is_checked ? 1 : 0, id);
    return sendJson(res, 200, { success: true });
  }

  if (pathname.startsWith('/api/packing/') && method === 'DELETE') {
    const id = pathname.replace('/api/packing/', '');
    db.prepare('DELETE FROM packing WHERE id = ?').run(id);
    return sendJson(res, 200, { success: true });
  }

  // Budget Endpoints
  if (pathname === '/api/budget' && method === 'POST') {
    const data = await parseBody(req);
    const id = data.id || `budget-${Date.now()}`;
    db.prepare(`
      INSERT INTO budget (id, trip_id, category, amount, title)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, data.trip_id, data.category, data.amount, data.title);
    return sendJson(res, 201, { success: true, id });
  }

  if (pathname.startsWith('/api/budget/') && method === 'DELETE') {
    const tripId = pathname.replace('/api/budget/', '');
    db.prepare('DELETE FROM budget WHERE trip_id = ?').run(tripId);
    return sendJson(res, 200, { success: true });
  }

  // --- STATIC FILE SERVER ---
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`TravelMate backend listening on http://localhost:${PORT}`);
});
