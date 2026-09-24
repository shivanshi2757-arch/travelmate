/**
 * api.js - TravelMate Frontend to Backend API Connector
 * Connects UI <-> Backend (/api/*) <-> SQLite Database
 */

const API = {
  baseUrl: '/api',

  async getTrips() {
    try {
      const res = await fetch(`${this.baseUrl}/trips`);
      if (!res.ok) throw new Error('Failed to fetch trips');
      return await res.json();
    } catch (err) {
      console.warn('API error, falling back:', err);
      return [];
    }
  },

  async getTrip(id) {
    const res = await fetch(`${this.baseUrl}/trips/${id}`);
    if (!res.ok) throw new Error('Trip not found');
    return await res.json();
  },

  async createTrip(tripData) {
    const res = await fetch(`${this.baseUrl}/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData)
    });
    return await res.json();
  },

  async updateTrip(id, tripData) {
    const res = await fetch(`${this.baseUrl}/trips/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData)
    });
    return await res.json();
  },

  async deleteTrip(id) {
    const res = await fetch(`${this.baseUrl}/trips/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  async addPacking(item) {
    const res = await fetch(`${this.baseUrl}/packing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return await res.json();
  },

  async togglePacking(id, isChecked) {
    const res = await fetch(`${this.baseUrl}/packing/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_checked: isChecked })
    });
    return await res.json();
  },

  async deletePacking(id) {
    const res = await fetch(`${this.baseUrl}/packing/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  async addBudget(item) {
    const res = await fetch(`${this.baseUrl}/budget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return await res.json();
  },

  async clearBudget(tripId) {
    const res = await fetch(`${this.baseUrl}/budget/${tripId}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};
