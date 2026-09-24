/**
 * TravelMate - Cute Scrapbook Travel Planner
 * Vanilla JavaScript (No backend, no external API, 100% client side)
 */

// ==========================================
// 1. APP STATE & MOCK DATA
// ==========================================

const APP_STATE = {
  currentTrip: {
    id: 'trip-1',
    destination: 'Kyoto & Tokyo, Japan',
    hotel: 'Hoshinoya Ryokan & Garden Suite',
    dates: 'Apr 10, 2026 - Apr 15, 2026',
    duration: 5,
    currency: '₹',
    totalBudget: 120000,
    travelParty: 'Cute Couple / Pair 💕',
    travelCount: 2,
    travelStyle: 'Cultural & Historic',
    pace: 'Relaxed (Slow mornings & coffee)',
    status: 'Upcoming'
  },
  activeDayIndex: 0,
  
  // Day-by-Day realistic mock itinerary
  itinerary: [
    {
      dayNumber: 1,
      city: 'Kyoto, Japan',
      hotel: 'Hoshinoya Ryokan & Garden',
      theme: 'Ancient Shrines & Bamboo Whispers 🎋',
      morning: {
        time: '08:30 AM - 11:30 AM',
        title: 'Arashiyama Bamboo Grove & Tenryu-ji Temple',
        desc: 'Gentle stroll through towering emerald bamboo stalks before the crowds arrive. Enjoy a matcha bowl in the temple garden.',
        tags: ['Matcha Tea 🍵', 'Bamboo Stroll 🎋', 'Morning Peace 🕊️']
      },
      afternoon: {
        time: '01:00 PM - 04:30 PM',
        title: 'Saga Scenic Romantic Train & Riverboat Cruise',
        desc: 'Vintage train ride through the forested Hozugawa ravine followed by handcrafted soba noodles at a waterside cafe.',
        tags: ['Scenic Train 🚂', 'Soba Lunch 🍜', 'Cherry Blossoms 🌸']
      },
      evening: {
        time: '06:30 PM - 09:30 PM',
        title: 'Gion Lantern Walk & Kaiseki Multi-Course Dinner',
        desc: 'Slip into yukata robes for a traditional 8-course seasonal Kaiseki banquet, followed by a lantern-lit bridge walk.',
        tags: ['Kaiseki Feast 🍱', 'Gion Alleys 🏮', 'Yukata Walk ✨']
      }
    },
    {
      dayNumber: 2,
      city: 'Kyoto, Japan',
      hotel: 'Hoshinoya Ryokan & Garden',
      theme: 'Golden Pavilions & Philosopher’s Trail 🍁',
      morning: {
        time: '09:00 AM - 12:00 PM',
        title: 'Kinkaku-ji (Golden Pavilion) & Zen Rock Gardens',
        desc: 'Marvel at the gold-leaf sanctuary reflecting over Mirror Pond. Sketch the stone gardens in your pocket scrapbook.',
        tags: ['Gold Temple 🏯', 'Zen Rocks 🪨', 'Pond Reflection 🪞']
      },
      afternoon: {
        time: '01:30 PM - 05:00 PM',
        title: 'Philosopher’s Path & Cute Pottery Boutiques',
        desc: 'Walk along the stone canal lined with cherry blossom petals. Browse tiny handmade ceramic cups and washi stationery.',
        tags: ['Canal Walk 🌸', 'Pottery Hunt 🏺', 'Matcha Gelato 🍦']
      },
      evening: {
        time: '06:30 PM - 09:30 PM',
        title: 'Pontocho Alley Izakaya & River Deck Dining',
        desc: 'Atmospheric wooden alleyway along the Kamogawa river. Crispy tempura, skewers, and sweet plum wine under hanging paper lanterns.',
        tags: ['Pontocho Dining 🏮', 'Crispy Tempura 🍤', 'Plum Wine 🍷']
      }
    },
    {
      dayNumber: 3,
      city: 'Kyoto to Tokyo',
      hotel: 'Park Hyatt Tokyo (Shinjuku)',
      theme: 'Bullet Train & Neon Skylines 🚅',
      morning: {
        time: '08:00 AM - 11:00 AM',
        title: 'Shinkansen Bullet Train & Ekiben Bento Box',
        desc: 'Board the Nozomi bullet train gliding past Mount Fuji. Pick up gourmet train station bentos packed with seasonal delicacies.',
        tags: ['Bullet Train 🚅', 'Fuji Views 🗻', 'Ekiben Bento 🍱']
      },
      afternoon: {
        time: '01:00 PM - 04:30 PM',
        title: 'Shinjuku Gyoen National Garden & Cafe Hopping',
        desc: 'Lush English and Japanese landscape gardens. Rest your legs with warm milk bread and specialty drip pour-overs.',
        tags: ['Garden Picnic 🧺', 'Hand Drip Coffee ☕', 'City Oasis 🌿']
      },
      evening: {
        time: '06:00 PM - 10:00 PM',
        title: 'Tokyo Metropolitan Sunset View & Omoide Yokocho',
        desc: 'Watch the Tokyo sun sink behind the high-rises from the observation deck, followed by cozy yakitori skewers in vintage alleys.',
        tags: ['Golden Hour 🌇', 'Yakitori 🍢', 'City Lights 🌃']
      }
    },
    {
      dayNumber: 4,
      city: 'Tokyo, Japan',
      hotel: 'Park Hyatt Tokyo (Shinjuku)',
      theme: 'Retro Alleys & Digital Dreamlands 👾',
      morning: {
        time: '09:30 AM - 12:30 PM',
        title: 'Asakusa Senso-ji & Nakamise Craft Stalls',
        desc: 'Tokyo’s oldest temple with huge red lanterns. Taste fresh melonpan and collect souvenir wooden bookmarks.',
        tags: ['Historic Temple 🏮', 'Sweet Melonpan 🍈', 'Incense Ritual 🪔']
      },
      afternoon: {
        time: '02:00 PM - 05:30 PM',
        title: 'teamLab Borderless Immersive Art Museum',
        desc: 'Wander barefoot through rooms of shifting light cascades, crystalline stars, and tea cups that sprout digital flowers.',
        tags: ['Digital Art 🎨', 'Light Magic ✨', 'Mirrored Rooms 🪞']
      },
      evening: {
        time: '07:00 PM - 10:00 PM',
        title: 'Shibuya Crossing & Rooftop Sky Deck',
        desc: 'Cross the world’s most famous scramble crossing and catch the neon panoramic sea from Shibuya Sky.',
        tags: ['Shibuya Crossing 🚦', 'Neon Sky 🌌', 'Ramen Bowls 🍜']
      }
    },
    {
      dayNumber: 5,
      city: 'Tokyo, Japan',
      hotel: 'Park Hyatt Tokyo (Shinjuku)',
      theme: 'Pastel Boutiques & Farewell Memories 🛍️',
      morning: {
        time: '10:00 AM - 01:00 PM',
        title: 'Harajuku Takeshita Street & Meiji Shrine Forest',
        desc: 'Contrasting peaceful sacred cedar woods with the cute pop-culture boutiques, rainbow crepes, and purikura sticker photo booths.',
        tags: ['Cedar Forest 🌲', 'Rainbow Crepes 🥞', 'Sticker Photos 📸']
      },
      afternoon: {
        time: '02:00 PM - 05:00 PM',
        title: 'Ginza Stationery Shopping at Itoya (12 Floors!)',
        desc: 'Pick up fountain pens, washi tape rolls, stickers, and handmade greeting cards to fill your scrapbook.',
        tags: ['Washi Tape 🎀', 'Stationery Heaven ✏️', 'Cafe Rest 🍰']
      },
      evening: {
        time: '06:30 PM - 09:30 PM',
        title: 'Rooftop Cocktail Toast & Souvenir Packing',
        desc: 'Celebrate an unforgettable trip with panoramic city views and start pasting train tickets into your journal.',
        tags: ['Celebration Toast 🥂', 'Scrapbook Session 📔', 'Happy Hearts 💖']
      }
    }
  ],

  // Packing list categorized
  packingList: [
    { id: 1, text: 'Passport & International Travel Insurance', category: 'Essentials', checked: true },
    { id: 2, text: 'JR Rail Pass & Flight Boarding Passes', category: 'Essentials', checked: true },
    { id: 3, text: 'Credit Cards & Local Cash Yen/Euros', category: 'Essentials', checked: true },
    { id: 4, text: 'Cozy walking sneakers (15k steps/day!)', category: 'Clothing', checked: true },
    { id: 5, text: 'Pastel linen shirts & cardigans', category: 'Clothing', checked: false },
    { id: 6, text: 'Light rain jacket & compact umbrella', category: 'Clothing', checked: false },
    { id: 7, text: 'Sleepwear & soft fuzzy socks', category: 'Clothing', checked: true },
    { id: 8, text: 'SPF 50+ Sunscreen & lip balm', category: 'Toiletries', checked: true },
    { id: 9, text: 'Hydrating sheet masks & moisturizer', category: 'Toiletries', checked: false },
    { id: 10, text: 'Toothbrush & mini travel toothpaste', category: 'Toiletries', checked: true },
    { id: 11, text: 'Universal travel plug adapter', category: 'Tech', checked: true },
    { id: 12, text: 'Power bank (10,000 mAh) & charging cords', category: 'Tech', checked: false },
    { id: 13, text: 'Noise-canceling earphones', category: 'Tech', checked: true },
    { id: 14, text: 'Travel scrapbook, pens & washi tape', category: 'Fun', checked: true },
    { id: 15, text: 'Polaroid Instax camera & extra film rolls', category: 'Fun', checked: false },
    { id: 16, text: 'Chewing gum & throat lozenges', category: 'Fun', checked: false }
  ],

  // Budget tracker
  expenses: [
    { id: 1, title: 'Hoshinoya Ryokan (2 Nights deposit)', amount: 42000, category: 'Stays & Hotels' },
    { id: 2, title: 'Shinkansen Bullet Train Passes (2x)', amount: 14200, category: 'Transport & Trains' },
    { id: 3, title: 'Kaiseki 8-Course Dinner Experience', amount: 6800, category: 'Food & Treats' },
    { id: 4, title: 'teamLab Planets Admission Tickets', amount: 3200, category: 'Activities & Passes' },
    { id: 5, title: 'Itoya Stationery, Washi Tape & Stamp shopping', amount: 2300, category: 'Cute Shopping' }
  ],

  // Saved My Trips Collection
  myTrips: [
    {
      id: 'trip-1',
      title: 'Kyoto Cherry Blossom Dreams',
      destination: 'Kyoto & Tokyo, Japan',
      dates: 'Apr 10 - Apr 15, 2026',
      duration: '5 Days',
      budget: '₹1,20,000',
      party: 'Couple 💕 (2)',
      style: 'Cultural & Historic',
      status: 'Upcoming',
      photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
      note: 'Ancient temples, matcha lattes, and peaceful zen gardens.'
    },
    {
      id: 'trip-2',
      title: 'Amalfi Coastline & Lemon Groves',
      destination: 'Positano & Capri, Italy',
      dates: 'Jun 22 - Jun 28, 2026',
      duration: '7 Days',
      budget: '€2,400',
      party: 'BFFs 👯‍♀️ (3)',
      style: 'Beach & Island Chill',
      status: 'Planning',
      photo: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
      note: 'Cliffside colorful houses, fresh pasta, and boat cruises.'
    },
    {
      id: 'trip-3',
      title: 'Parisian Bakeries & Art Walk',
      destination: 'Paris, France',
      dates: 'Oct 02 - Oct 07, 2025',
      duration: '6 Days',
      budget: '€1,850',
      party: 'Solo 🎒 (1)',
      style: 'Cozy & Romantic',
      status: 'Completed',
      photo: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      note: 'Flaky almond croissants, Montmartre streets, and Louvre galleries.'
    }
  ],

  // Handpicked Destinations
  destinations: [
    {
      name: 'Kyoto, Japan',
      region: 'Asia',
      vibe: '🌸 Zen & Shrines',
      photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
      desc: 'Wander through scarlet torii gates, golden pavilions, and tranquil bamboo groves with fresh matcha in hand.',
      tags: ['Temples', 'Cherry Blossoms', 'Matcha', 'Ryokan'],
      hotel: 'Hoshinoya Ryokan'
    },
    {
      name: 'Santorini, Greece',
      region: 'Europe',
      vibe: '🌊 Blue & White Magic',
      photo: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
      desc: 'Whitewashed cliffside villas overlooking azure Aegean waters, famous pink sunsets, and bougainvillea arches.',
      tags: ['Sunsets', 'Aegean Sea', 'Wine', 'Caldera'],
      hotel: 'Canaves Oia Suites'
    },
    {
      name: 'Ubud, Bali',
      region: 'Islands',
      vibe: '🌴 Tropical Jungle Peace',
      photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
      desc: 'Emerald rice terraces, soothing sound of jungle rainfall, waterfall dips, and cozy organic plant cafes.',
      tags: ['Rice Terraces', 'Waterfalls', 'Yoga', 'Smoothie Bowls'],
      hotel: 'Kamandalu Ubud Villa'
    },
    {
      name: 'Amalfi Coast, Italy',
      region: 'Europe',
      vibe: '🍋 Lemon Groves & Cliffs',
      photo: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
      desc: 'Pastel homes clinging to steep cliffs, sparkling coastal drives, sweet limoncello, and sun-soaked boat rides.',
      tags: ['Pasta', 'Coastal Views', 'Limoncello', 'Boat Trips'],
      hotel: 'Le Sirenuse Positano'
    },
    {
      name: 'Hallstatt, Austria',
      region: 'Europe',
      vibe: '🏔️ Fairytale Lake Town',
      photo: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
      desc: 'Charming Alpine village surrounded by mirror-calm waters, cozy wooden chalets, and swan-filled coves.',
      tags: ['Alps', 'Lakeside', 'Chalets', 'Snow Peaks'],
      hotel: 'Heritage Hotel Hallstatt'
    },
    {
      name: 'Jeju Island, South Korea',
      region: 'Asia',
      vibe: '🍊 Tangerines & Emerald Waves',
      photo: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=600&q=80',
      desc: 'Volcanic beaches, cute aesthetic cafes facing the sea, sweet tangerines, and gentle wildflower hiking trails.',
      tags: ['Tangerine Orchards', 'Aesthetic Cafes', 'Beaches', 'Hiking'],
      hotel: 'Parnas Hotel Jeju'
    }
  ]
};

// ==========================================
// 2. NAVIGATION & TABS
// ==========================================

function navigate(tabId) {
  // Update nav buttons
  const navBtns = document.querySelectorAll('.nav-item');
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Update page sections
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => {
    sec.classList.toggle('active', sec.id === `section-${tabId}`);
  });

  // Close mobile nav if open
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.remove('mobile-open');
  }

  // Smooth scroll to top of section
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup Mobile Menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('mobile-open');
  });
}

// Cute Toast Helper
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `<span>✨</span> ${message}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================
// 3. ITINERARY RENDERING & DAY TABS
// ==========================================

function renderItinerary() {
  const trip = APP_STATE.currentTrip;
  const days = APP_STATE.itinerary;
  
  // Update header badges
  const badgeTitle = document.getElementById('itineraryTripBadge');
  if (badgeTitle) {
    badgeTitle.innerHTML = `Showing active plan: <strong>${trip.destination}</strong> (${days.length} Days)`;
  }
  
  document.getElementById('itinCity').textContent = trip.destination;
  document.getElementById('itinHotel').textContent = trip.hotel;
  document.getElementById('itinTravellers').textContent = `${trip.travelCount} Travellers (${trip.travelParty.split(' ')[0]})`;
  document.getElementById('itinStyle').textContent = trip.travelStyle;

  // Render Day Tabs
  const tabsContainer = document.getElementById('dayTabsContainer');
  tabsContainer.innerHTML = '';

  days.forEach((day, index) => {
    const btn = document.createElement('button');
    btn.className = `day-tab-btn ${index === APP_STATE.activeDayIndex ? 'active' : ''}`;
    btn.innerHTML = `<span>🌸 Day ${day.dayNumber}</span>`;
    btn.onclick = () => selectItineraryDay(index);
    tabsContainer.appendChild(btn);
  });

  // Render Selected Day Content
  renderActiveDay();
}

function selectItineraryDay(index) {
  APP_STATE.activeDayIndex = index;
  renderItinerary();
}

function renderActiveDay() {
  const container = document.getElementById('dayContentCard');
  const day = APP_STATE.itinerary[APP_STATE.activeDayIndex];

  if (!day) return;

  const renderSlot = (slotType, slotData, icon, titleText) => {
    const tagsHtml = slotData.tags.map(t => `<span class="slot-tag">${t}</span>`).join('');
    return `
      <div class="slot-block slot-${slotType}">
        <div class="slot-label">
          <span class="slot-icon">${icon}</span>
          <span class="slot-name">${titleText}</span>
          <span class="slot-time">${slotData.time}</span>
        </div>
        <div class="slot-details">
          <h4>${slotData.title}</h4>
          <p>${slotData.desc}</p>
          <div class="slot-tag-cloud">${tagsHtml}</div>
        </div>
      </div>
    `;
  };

  container.innerHTML = `
    <div class="washi-tape tape-top-center"></div>
    <div class="pin purple-pin"></div>
    
    <div class="day-card-header">
      <div class="day-title-group">
        <h3>Day ${day.dayNumber}: ${day.theme}</h3>
        <p style="color: #635b54; font-size: 0.95rem;">📍 Location: ${day.city}</p>
      </div>
      <div class="day-hotel-pill">
        🛌 Resting at: <strong>${day.hotel}</strong>
      </div>
    </div>

    <div class="schedule-slots">
      ${renderSlot('morning', day.morning, '☀️', 'Morning Warmth')}
      ${renderSlot('afternoon', day.afternoon, '🌤️', 'Afternoon Wonder')}
      ${renderSlot('evening', day.evening, '🌙', 'Evening Glow')}
    </div>
  `;
}

// ==========================================
// 4. PLAN TRIP FORM SUBMISSION
// ==========================================

function handleTripPlanSubmit(event) {
  event.preventDefault();

  const destination = document.getElementById('destInput').value.trim();
  const departDate = document.getElementById('departDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const currency = document.getElementById('tripCurrency').value;
  const budget = parseFloat(document.getElementById('tripBudget').value) || 1000;
  const travelParty = document.getElementById('travelParty').value;
  const travelCount = parseInt(document.getElementById('travelCount').value) || 1;
  const travelStyle = document.getElementById('travelStyle').value;
  const accomPreference = document.getElementById('accomPreference').value;
  const pace = document.querySelector('input[name="tripPace"]:checked')?.value || 'Relaxed';

  // Calculate day difference
  let numDays = 4;
  if (departDate && returnDate) {
    const diffTime = Math.abs(new Date(returnDate) - new Date(departDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    numDays = Math.max(1, Math.min(diffDays, 10)); // keep between 1 and 10 days
  }

  // Generate dynamic days
  const newDays = [];
  const sampleThemes = [
    'Arrival & Secret Cafe Discovery ☕',
    'Old Town Stroll & Local Flavors 🥐',
    'Scenic Landmark & Sunset Boat ⛵',
    'Art Galleries, Craft Boutiques & Gelato 🎨',
    'Hidden Gardens & Panoramic Viewpoints 🌸',
    'Foodie Markets & Street Feasts 🍜',
    'Relaxing Spa & Farewell Keepsakes 🎀'
  ];

  for (let i = 1; i <= numDays; i++) {
    const theme = sampleThemes[(i - 1) % sampleThemes.length];
    newDays.push({
      dayNumber: i,
      city: destination,
      hotel: `${accomPreference} Sanctuary`,
      theme: theme,
      morning: {
        time: '09:00 AM - 12:00 PM',
        title: `Morning explorations in ${destination.split(',')[0]}`,
        desc: `Fresh bakery breakfast followed by walking through the scenic historic district under the morning light.`,
        tags: ['Coffee & Pastry 🥐', 'Photo Walk 📷', 'Local Vibe 🌿']
      },
      afternoon: {
        time: '01:30 PM - 05:00 PM',
        title: `Curated ${travelStyle} Adventures`,
        desc: `Immerse in scenic landmarks, artisan workshops, and relaxing tea terraces at your ${pace.split(' ')[0].toLowerCase()} pace.`,
        tags: [`${travelStyle} ✨`, 'Artisan Goods 🛍️', 'Scenic Rest 🪴']
      },
      evening: {
        time: '06:30 PM - 09:30 PM',
        title: `Candlelit Dinner & Golden Hour Stroll`,
        desc: `Dine at an authentic local bistro, savor regional specialties, and write down the day’s sweetest memories.`,
        tags: ['Cozy Dinner 🍷', 'Golden Hour 🌅', 'Scrapbook Notes ✏️']
      }
    });
  }

  // Update App State
  APP_STATE.currentTrip = {
    id: 'trip-' + Date.now(),
    destination,
    hotel: `${accomPreference} Retreat`,
    dates: `${departDate} to ${returnDate}`,
    duration: numDays,
    currency,
    totalBudget: budget,
    travelParty,
    travelCount,
    travelStyle,
    pace,
    status: 'Upcoming'
  };

  APP_STATE.itinerary = newDays;
  APP_STATE.activeDayIndex = 0;

  const newTripRecord = {
    id: APP_STATE.currentTrip.id,
    title: `${destination.split(',')[0]} Getaway`,
    destination: destination,
    dates: `${departDate} - ${returnDate}`,
    duration: `${numDays} Days`,
    budget: `${currency}${budget.toLocaleString()}`,
    currency: currency,
    totalBudget: budget,
    party: `${travelParty.split(' ')[0]} (${travelCount})`,
    travelParty: travelParty,
    travelCount: travelCount,
    travellers: travelCount,
    style: travelStyle,
    travelStyle: travelStyle,
    hotel: `${accomPreference} Retreat`,
    preferences: { pace, style: travelStyle, accommodation: accomPreference },
    status: 'Upcoming',
    photo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
    note: `Planned for ${travelCount} travellers in ${travelStyle.toLowerCase()} style.`
  };

  // Add to My Trips
  APP_STATE.myTrips.unshift(newTripRecord);

  // Persist to Backend API & Database
  if (window.API) {
    API.createTrip({
      id: newTripRecord.id,
      destination: newTripRecord.destination,
      dates: newTripRecord.dates,
      budget: budget,
      currency: currency,
      travellers: travelCount,
      preferences: newTripRecord.preferences,
      itinerary: newDays.map(d => ({
        day: d.dayNumber,
        city: d.city,
        hotel: d.hotel,
        activities: {
          theme: d.theme,
          morning: d.morning,
          afternoon: d.afternoon,
          evening: d.evening
        }
      }))
    });
  }

  // Also sync to local DB fallback
  if (window.DB && DB.db) {
    DB.put('trips', newTripRecord);
    newDays.forEach(d => {
      DB.put('itinerary', {
        id: `${newTripRecord.id}-day-${d.dayNumber}`,
        tripId: newTripRecord.id,
        day: d.dayNumber,
        city: d.city,
        hotel: d.hotel,
        theme: d.theme,
        activities: { morning: d.morning, afternoon: d.afternoon, evening: d.evening }
      });
    });
  }

  // Re-render
  renderItinerary();
  renderMyTrips();
  updateBudgetDisplay();
  
  showToast(`Yay! Trip to ${destination} planned and added to scrapbook! 💖`);
  navigate('itinerary');
}

function resetTripForm() {
  document.getElementById('tripPlanForm').reset();
  showToast('Form cleared! Ready for new dreams 🧹');
}

// ==========================================
// 5. PACKING LIST INTERACTIVITY
// ==========================================

function renderPackingList() {
  const container = document.getElementById('packingColumnsContainer');
  const items = APP_STATE.packingList;

  // Group by categories
  const categories = ['Essentials', 'Clothing', 'Toiletries', 'Tech', 'Fun'];
  const categoryIcons = {
    Essentials: '📄',
    Clothing: '👗',
    Toiletries: '🧴',
    Tech: '📷',
    Fun: '✨'
  };

  container.innerHTML = '';

  let totalItems = items.length;
  let packedItems = items.filter(i => i.checked).length;

  categories.forEach(cat => {
    const catItems = items.filter(i => i.category === cat);
    if (catItems.length === 0) return;

    const catCard = document.createElement('div');
    catCard.className = 'packing-category-card paper-texture';

    const itemsHtml = catItems.map(item => `
      <li class="packing-item-row ${item.checked ? 'checked' : ''}" id="pack-item-${item.id}">
        <label class="packing-item-label">
          <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="togglePackingItem(${item.id})">
          <span class="packing-text">${item.text}</span>
        </label>
        <button class="delete-item-btn" onclick="deletePackingItem(${item.id})" title="Remove item">×</button>
      </li>
    `).join('');

    catCard.innerHTML = `
      <div class="category-card-head">
        <h4>${categoryIcons[cat] || '🎒'} ${cat}</h4>
        <span class="sticker-badge" style="font-size: 0.85rem; padding: 0.1rem 0.5rem;">${catItems.filter(i => i.checked).length}/${catItems.length}</span>
      </div>
      <ul class="items-checklist">
        ${itemsHtml}
      </ul>
    `;

    container.appendChild(catCard);
  });

  // Update progress bar
  const percent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
  document.getElementById('packingProgressFill').style.width = `${percent}%`;
  document.getElementById('packingCountText').textContent = `${packedItems} of ${totalItems} packed (${percent}%)`;
}

function togglePackingItem(id) {
  const item = APP_STATE.packingList.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    renderPackingList();
    if (window.API) {
      API.togglePacking(item.id, item.checked);
    }
    if (window.DB && DB.db) {
      DB.put('packing', {
        id: item.id,
        tripId: APP_STATE.currentTrip.id || 'trip-1',
        item_text: item.text,
        category: item.category,
        is_checked: item.checked ? 1 : 0
      });
    }
    if (item.checked) {
      showToast(`Packed: ${item.text} 🧳`);
    }
  }
}

function addPackingItem() {
  const input = document.getElementById('newPackingInput');
  const catSelect = document.getElementById('newPackingCategory');
  const text = input.value.trim();

  if (!text) {
    showToast('Please type an item name first! ✏️');
    return;
  }

  const newItem = {
    id: `pack-${Date.now()}`,
    text: text,
    category: catSelect.value,
    checked: false
  };

  APP_STATE.packingList.push(newItem);

  if (window.API) {
    API.addPacking({
      id: newItem.id,
      trip_id: APP_STATE.currentTrip.id || 'trip-1',
      item_text: newItem.text,
      category: newItem.category,
      is_checked: 0
    });
  }

  if (window.DB && DB.db) {
    DB.put('packing', {
      id: newItem.id,
      tripId: APP_STATE.currentTrip.id || 'trip-1',
      item_text: newItem.text,
      category: newItem.category,
      is_checked: 0
    });
  }

  input.value = '';
  renderPackingList();
  showToast(`Added "${text}" to your checklist! 🌸`);
}

function deletePackingItem(id) {
  APP_STATE.packingList = APP_STATE.packingList.filter(i => i.id !== id);
  if (window.API) {
    API.deletePacking(id);
  }
  if (window.DB && DB.db) {
    DB.delete('packing', id);
  }
  renderPackingList();
  showToast('Item removed 🗑️');
}

// ==========================================
// 6. BUDGET TRACKER LOGIC
// ==========================================

function updateBudgetDisplay() {
  const currency = APP_STATE.currentTrip.currency || '₹';
  const total = APP_STATE.currentTrip.totalBudget || 120000;
  
  const spent = APP_STATE.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = total - spent;
  const percentage = Math.min(100, Math.round((spent / total) * 100));

  document.getElementById('budgetTotalDisplay').textContent = `${currency}${total.toLocaleString()}`;
  document.getElementById('budgetSpentDisplay').textContent = `${currency}${spent.toLocaleString()}`;
  document.getElementById('budgetRemainingDisplay').textContent = `${currency}${remaining.toLocaleString()}`;

  const fill = document.getElementById('budgetProgressFill');
  fill.style.width = `${percentage}%`;

  const hint = document.getElementById('budgetPercentageText');
  if (remaining < 0) {
    hint.textContent = `⚠️ Oops! You have exceeded your budget by ${currency}${Math.abs(remaining).toLocaleString()}!`;
    hint.style.color = '#e11d48';
  } else {
    hint.textContent = `You have spent ${percentage}% of your travel treasure. ${currency}${remaining.toLocaleString()} left for treats!`;
    hint.style.color = '#78716c';
  }

  // Render recent expenses list
  const listEl = document.getElementById('expenseList');
  listEl.innerHTML = APP_STATE.expenses.map(e => `
    <div class="expense-item">
      <div class="expense-item-info">
        <strong>${e.title}</strong>
        <small>${e.category}</small>
      </div>
      <div class="expense-item-amount">${currency}${e.amount.toLocaleString()}</div>
    </div>
  `).join('');

  // Category breakdown tags
  const breakdownTags = document.getElementById('categoryBreakdownTags');
  const catTotals = {};
  APP_STATE.expenses.forEach(e => {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });

  breakdownTags.innerHTML = Object.entries(catTotals).map(([cat, amt]) => `
    <span class="breakdown-chip">${cat}: ${currency}${amt.toLocaleString()}</span>
  `).join('');
}

function handleAddExpense(event) {
  event.preventDefault();
  const title = document.getElementById('expenseTitle').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount').value) || 0;
  const category = document.getElementById('expenseCategory').value;

  if (!title || amount <= 0) return;

  const newExpense = {
    id: `budget-${Date.now()}`,
    tripId: APP_STATE.currentTrip.id || 'trip-1',
    title,
    amount,
    category
  };

  APP_STATE.expenses.unshift(newExpense);

  if (window.API) {
    API.addBudget({
      id: newExpense.id,
      trip_id: newExpense.tripId,
      category: newExpense.category,
      amount: newExpense.amount,
      title: newExpense.title
    });
  }

  if (window.DB && DB.db) {
    DB.put('budget', newExpense);
  }

  document.getElementById('expenseForm').reset();
  updateBudgetDisplay();
  showToast(`Recorded "${title}" expense! 🪙`);
}

function resetExpenses() {
  if (confirm('Reset all logged expenses?')) {
    APP_STATE.expenses = [];
    if (window.API) {
      API.clearBudget(APP_STATE.currentTrip.id || 'trip-1');
    }
    if (window.DB && DB.db) {
      DB.clear('budget');
    }
    updateBudgetDisplay();
    showToast('Expenses cleared! 👛');
  }
}

// ==========================================
// 7. MY TRIPS COLLECTION
// ==========================================

function renderMyTrips() {
  const container = document.getElementById('myTripsContainer');
  container.innerHTML = APP_STATE.myTrips.map(trip => {
    let statusClass = 'status-planning';
    if (trip.status === 'Upcoming') statusClass = 'status-upcoming';
    if (trip.status === 'Completed') statusClass = 'status-completed';

    return `
      <div class="trip-scrapbook-card">
        <div class="washi-tape tape-top-center"></div>
        <div class="trip-polaroid-frame">
          <img src="${trip.photo}" alt="${trip.destination}">
          <span class="trip-status-sticker ${statusClass}">${trip.status}</span>
        </div>
        <div class="trip-info-body">
          <h3>${trip.title}</h3>
          <div class="trip-meta-list">
            <div>📍 <strong>${trip.destination}</strong></div>
            <div>📅 ${trip.dates} (${trip.duration})</div>
            <div>💰 Budget: ${trip.budget} • 👥 ${trip.party}</div>
            <div style="font-family: var(--font-hand); font-size: 1.05rem; color: #713f12; margin-top: 0.3rem;">"${trip.note}"</div>
          </div>
          <div class="trip-actions">
            <button class="btn btn-primary" onclick="loadTripIntoItinerary('${trip.id}')" style="font-size: 0.85rem; padding: 0.4rem 0.9rem;">📖 Open Itinerary</button>
            <button class="btn btn-outline" onclick="deleteTrip('${trip.id}')" style="font-size: 0.85rem; padding: 0.4rem 0.9rem;">Delete</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function loadTripIntoItinerary(tripId) {
  const trip = APP_STATE.myTrips.find(t => t.id === tripId);
  if (!trip) return;

  APP_STATE.currentTrip.id = trip.id;
  APP_STATE.currentTrip.destination = trip.destination;
  APP_STATE.currentTrip.travelStyle = trip.style || 'Cultural & Romantic';
  APP_STATE.currentTrip.hotel = trip.hotel || 'Charming Local Stay';
  
  if (window.DB && DB.db) {
    DB.getByIndex('itinerary', 'tripId', trip.id).then(itinItems => {
      if (itinItems && itinItems.length > 0) {
        APP_STATE.itinerary = itinItems.sort((a,b) => a.day - b.day).map(item => ({
          dayNumber: item.day,
          city: item.city,
          hotel: item.hotel,
          theme: item.theme,
          morning: item.activities.morning,
          afternoon: item.activities.afternoon,
          evening: item.activities.evening
        }));
        APP_STATE.activeDayIndex = 0;
      }
      renderItinerary();
    });
  } else {
    renderItinerary();
  }

  showToast(`Loaded ${trip.title} into your Itinerary! 📖`);
  navigate('itinerary');
}

function deleteTrip(tripId) {
  APP_STATE.myTrips = APP_STATE.myTrips.filter(t => t.id !== tripId);
  if (window.DB && DB.db) {
    DB.delete('trips', tripId);
  }
  renderMyTrips();
  showToast('Trip removed from collection! 🗑️');
}

// ==========================================
// 8. DESTINATIONS & QUICK PLAN
// ==========================================

function renderDestinations(filter = 'all') {
  const container = document.getElementById('destinationsGrid');
  const items = APP_STATE.destinations.filter(d => filter === 'all' || d.region === filter);

  container.innerHTML = items.map(d => `
    <div class="dest-card">
      <div class="dest-img-box">
        <img src="${d.photo}" alt="${d.name}">
        <span class="dest-vibe-tag">${d.vibe}</span>
      </div>
      <div class="dest-body">
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="dest-highlights">
          ${d.tags.map(t => `<span class="highlight-chip">#${t}</span>`).join('')}
        </div>
        <button class="btn btn-secondary" onclick="quickPlanDestination('${d.name}')" style="margin-top: auto; width: 100%;">
          🌸 Plan a trip here!
        </button>
      </div>
    </div>
  `).join('');
}

function filterDestinations(region, pillBtn) {
  document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
  pillBtn.classList.add('active');
  renderDestinations(region);
}

function quickPlanDestination(destName) {
  navigate('plan');
  const input = document.getElementById('destInput');
  if (input) {
    input.value = destName;
    input.focus();
  }
  showToast(`Selected ${destName}! Set your dates & details ✨`);
}

// ==========================================
// 9. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
  // Set default dates in form (today + 14 days, duration 5 days)
  const today = new Date();
  const depart = new Date(today);
  depart.setDate(today.getDate() + 14);
  const ret = new Date(depart);
  ret.setDate(depart.getDate() + 5);

  const formatDate = d => d.toISOString().split('T')[0];
  const departInput = document.getElementById('departDate');
  const returnInput = document.getElementById('returnDate');
  if (departInput) departInput.value = formatDate(depart);
  if (returnInput) returnInput.value = formatDate(ret);

  // Initialize DB & load persistent data
  if (window.DB) {
    try {
      await DB.init();
      
      const storedTrips = await DB.getAll('trips');
      if (storedTrips && storedTrips.length > 0) {
        APP_STATE.myTrips = storedTrips;
        APP_STATE.currentTrip = storedTrips[0];
      } else {
        // Seed initial trips to DB
        for (const t of APP_STATE.myTrips) {
          await DB.put('trips', t);
        }
      }

      // Load itinerary for active trip
      const storedItin = await DB.getByIndex('itinerary', 'tripId', APP_STATE.currentTrip.id);
      if (storedItin && storedItin.length > 0) {
        APP_STATE.itinerary = storedItin.sort((a,b) => a.day - b.day).map(item => ({
          dayNumber: item.day,
          city: item.city,
          hotel: item.hotel,
          theme: item.theme,
          morning: item.activities.morning,
          afternoon: item.activities.afternoon,
          evening: item.activities.evening
        }));
      } else {
        // Seed initial itinerary
        for (const d of APP_STATE.itinerary) {
          await DB.put('itinerary', {
            id: `${APP_STATE.currentTrip.id}-day-${d.dayNumber}`,
            tripId: APP_STATE.currentTrip.id,
            day: d.dayNumber,
            city: d.city,
            hotel: d.hotel,
            theme: d.theme,
            activities: { morning: d.morning, afternoon: d.afternoon, evening: d.evening }
          });
        }
      }

      // Load packing items for active trip
      const storedPacking = await DB.getAll('packing');
      if (storedPacking && storedPacking.length > 0) {
        APP_STATE.packingList = storedPacking.map(p => ({
          id: p.id,
          text: p.item_text,
          category: p.category,
          checked: Boolean(p.is_checked)
        }));
      } else {
        // Seed initial packing items
        for (const p of APP_STATE.packingList) {
          await DB.put('packing', {
            id: p.id,
            tripId: APP_STATE.currentTrip.id,
            item_text: p.text,
            category: p.category,
            is_checked: p.checked ? 1 : 0
          });
        }
      }

      // Load budget expenses
      const storedBudget = await DB.getAll('budget');
      if (storedBudget && storedBudget.length > 0) {
        APP_STATE.expenses = storedBudget;
      } else {
        // Seed initial budget
        for (const b of APP_STATE.expenses) {
          await DB.put('budget', {
            id: b.id,
            tripId: APP_STATE.currentTrip.id,
            title: b.title,
            amount: b.amount,
            category: b.category
          });
        }
      }
    } catch (err) {
      console.warn('Persistent DB init warning, falling back to local state:', err);
    }
  }

  // Initial renders
  renderItinerary();
  renderPackingList();
  updateBudgetDisplay();
  renderMyTrips();
  renderDestinations('all');
});
