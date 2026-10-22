// Popular destinations with their regions
const destinations = {
    // Budget
    'Bangkok': 'budget', 'Hanoi': 'budget', 'Ho Chi Minh City': 'budget', 'Bali': 'budget',
    'Chiang Mai': 'budget', 'Siem Reap': 'budget', 'Manila': 'budget', 'Jakarta': 'budget',
    'New Delhi': 'budget', 'Mumbai': 'budget', 'Goa': 'budget', 'Jaipur': 'budget',
    'Kathmandu': 'budget', 'Colombo': 'budget', 'Prague': 'budget', 'Budapest': 'budget',
    'Krakow': 'budget', 'Bucharest': 'budget', 'Sofia': 'budget', 'Cairo': 'budget',
    'Marrakech': 'budget', 'Tunis': 'budget', 'Buenos Aires': 'budget', 'Lima': 'budget',
    'La Paz': 'budget', 'Quito': 'budget',
    // Moderate
    'Barcelona': 'moderate', 'Madrid': 'moderate', 'Lisbon': 'moderate', 'Porto': 'moderate',
    'Rome': 'moderate', 'Milan': 'moderate', 'Athens': 'moderate', 'Istanbul': 'moderate',
    'Dubai': 'moderate', 'Doha': 'moderate', 'Mexico City': 'moderate', 'Cancun': 'moderate',
    'Rio de Janeiro': 'moderate', 'Sao Paulo': 'moderate', 'Cape Town': 'moderate',
    'Johannesburg': 'moderate', 'Seoul': 'moderate', 'Taipei': 'moderate', 'Hong Kong': 'moderate',
    'Kuala Lumpur': 'moderate', 'Bangalore': 'moderate', 'Hyderabad': 'moderate',
    // Expensive
    'Tokyo': 'expensive', 'Osaka': 'expensive', 'Kyoto': 'expensive', 'Paris': 'expensive',
    'London': 'expensive', 'Amsterdam': 'expensive', 'Berlin': 'expensive', 'Munich': 'expensive',
    'Vienna': 'expensive', 'Brussels': 'expensive', 'Copenhagen': 'expensive', 'Stockholm': 'expensive',
    'Sydney': 'expensive', 'Melbourne': 'expensive', 'Auckland': 'expensive', 'Singapore': 'expensive',
    'New York': 'expensive', 'Los Angeles': 'expensive', 'San Francisco': 'expensive',
    'Chicago': 'expensive', 'Boston': 'expensive', 'Seattle': 'expensive', 'Toronto': 'expensive',
    'Vancouver': 'expensive', 'Montreal': 'expensive',
    // Luxury
    'Zurich': 'luxury', 'Geneva': 'luxury', 'Oslo': 'luxury', 'Reykjavik': 'luxury',
    'Helsinki': 'luxury', 'Monaco': 'luxury', 'Luxembourg': 'luxury'
};

// Currency exchange rates (base: USD), updated Oct 2026
const exchangeRates = {
    INR: 94.59,
    USD: 1,
    EUR: 0.89,
    GBP: 0.75,
    JPY: 158.10,
    AUD: 1.42,
    CAD: 1.40,
    CHF: 0.82,
    CNY: 6.69,
    SGD: 1.28,
    AED: 3.67,
    THB: 33.59,
    MYR: 4.08,
    IDR: 18030,
    KRW: 1326,
    BRL: 5.02,
    MXN: 18.63,
    ZAR: 16.37,
    TRY: 49.64,
    RUB: 82.00
};

const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'Fr',
    CNY: '¥',
    SGD: 'S$',
    AED: 'د.إ',
    THB: '฿',
    MYR: 'RM',
    IDR: 'Rp',
    KRW: '₩',
    BRL: 'R$',
    MXN: '$',
    ZAR: 'R',
    TRY: '₺',
    RUB: '₽'
};

// Cost databases (in USD), updated Oct 2026.
// Flights are up ~22-25% YoY after the 2026 Hormuz jet fuel shock (long-haul hit hardest).
const flightCosts = {
    domestic: 310,
    short: 490,
    medium: 860,
    long: 1500
};

// City to country mapping for smarter flight estimates
const cityToCountry = {
    // India
    'New Delhi': 'India', 'Mumbai': 'India', 'Bangalore': 'India', 'Hyderabad': 'India',
    'Chennai': 'India', 'Kolkata': 'India', 'Pune': 'India', 'Ahmedabad': 'India',
    'Jaipur': 'India', 'Goa': 'India', 'Kochi': 'India', 'Lucknow': 'India',
    // USA
    'New York': 'USA', 'Los Angeles': 'USA', 'San Francisco': 'USA', 'Chicago': 'USA',
    'Boston': 'USA', 'Seattle': 'USA', 'Miami': 'USA', 'Las Vegas': 'USA',
    // UK
    'London': 'UK', 'Manchester': 'UK', 'Edinburgh': 'UK', 'Birmingham': 'UK',
    // Asia
    'Tokyo': 'Japan', 'Osaka': 'Japan', 'Kyoto': 'Japan',
    'Bangkok': 'Thailand', 'Phuket': 'Thailand', 'Chiang Mai': 'Thailand',
    'Singapore': 'Singapore',
    'Hong Kong': 'Hong Kong',
    'Seoul': 'South Korea',
    'Dubai': 'UAE', 'Abu Dhabi': 'UAE',
    'Kuala Lumpur': 'Malaysia',
    'Manila': 'Philippines',
    'Jakarta': 'Indonesia', 'Bali': 'Indonesia',
    'Hanoi': 'Vietnam', 'Ho Chi Minh City': 'Vietnam',
    // Europe
    'Paris': 'France', 'Lyon': 'France', 'Nice': 'France',
    'Rome': 'Italy', 'Milan': 'Italy', 'Venice': 'Italy', 'Florence': 'Italy',
    'Barcelona': 'Spain', 'Madrid': 'Spain', 'Seville': 'Spain',
    'Berlin': 'Germany', 'Munich': 'Germany', 'Frankfurt': 'Germany',
    'Amsterdam': 'Netherlands',
    'Brussels': 'Belgium',
    'Vienna': 'Austria',
    'Zurich': 'Switzerland', 'Geneva': 'Switzerland',
    'Copenhagen': 'Denmark',
    'Stockholm': 'Sweden',
    'Oslo': 'Norway',
    'Helsinki': 'Finland',
    'Reykjavik': 'Iceland',
    'Lisbon': 'Portugal', 'Porto': 'Portugal',
    'Athens': 'Greece',
    'Istanbul': 'Turkey',
    'Prague': 'Czech Republic',
    'Budapest': 'Hungary',
    'Krakow': 'Poland',
    'Bucharest': 'Romania',
    'Sofia': 'Bulgaria',
    'Monaco': 'Monaco',
    'Luxembourg': 'Luxembourg',
    // Oceania
    'Sydney': 'Australia', 'Melbourne': 'Australia', 'Brisbane': 'Australia',
    'Auckland': 'New Zealand',
    // South America
    'Buenos Aires': 'Argentina',
    'Rio de Janeiro': 'Brazil', 'Sao Paulo': 'Brazil',
    'Lima': 'Peru',
    'Bogota': 'Colombia',
    'Santiago': 'Chile',
    // Africa
    'Cairo': 'Egypt',
    'Marrakech': 'Morocco',
    'Cape Town': 'South Africa', 'Johannesburg': 'South Africa',
    'Nairobi': 'Kenya',
    // Middle East
    'Tel Aviv': 'Israel',
    'Doha': 'Qatar',
    // North America (Canada & Mexico)
    'Toronto': 'Canada', 'Vancouver': 'Canada', 'Montreal': 'Canada',
    'Mexico City': 'Mexico', 'Cancun': 'Mexico'
};

// City coordinates [lat, lon] for distance-based flight pricing
const cityCoords = {
    // India
    'New Delhi': [28.61, 77.21], 'Mumbai': [19.08, 72.88], 'Bangalore': [12.97, 77.59],
    'Hyderabad': [17.39, 78.49], 'Chennai': [13.08, 80.27], 'Kolkata': [22.57, 88.36],
    'Pune': [18.52, 73.86], 'Ahmedabad': [23.02, 72.57], 'Jaipur': [26.91, 75.79],
    'Goa': [15.38, 73.83], 'Kochi': [9.93, 76.27], 'Lucknow': [26.85, 80.95],
    // USA
    'New York': [40.71, -74.01], 'Los Angeles': [34.05, -118.24], 'San Francisco': [37.77, -122.42],
    'Chicago': [41.88, -87.63], 'Boston': [42.36, -71.06], 'Seattle': [47.61, -122.33],
    'Miami': [25.76, -80.19], 'Las Vegas': [36.17, -115.14],
    // UK
    'London': [51.51, -0.13], 'Manchester': [53.48, -2.24], 'Edinburgh': [55.95, -3.19],
    'Birmingham': [52.49, -1.89],
    // Asia
    'Tokyo': [35.68, 139.69], 'Osaka': [34.69, 135.50], 'Kyoto': [35.01, 135.77],
    'Bangkok': [13.76, 100.50], 'Phuket': [7.88, 98.39], 'Chiang Mai': [18.79, 98.98],
    'Singapore': [1.35, 103.82], 'Hong Kong': [22.32, 114.17], 'Seoul': [37.57, 126.98],
    'Taipei': [25.03, 121.57], 'Kuala Lumpur': [3.14, 101.69], 'Manila': [14.60, 120.98],
    'Jakarta': [-6.21, 106.85], 'Bali': [-8.65, 115.22], 'Hanoi': [21.03, 105.85],
    'Ho Chi Minh City': [10.82, 106.63], 'Siem Reap': [13.36, 103.86],
    'Kathmandu': [27.72, 85.32], 'Colombo': [6.93, 79.86],
    // Middle East
    'Dubai': [25.20, 55.27], 'Abu Dhabi': [24.45, 54.38], 'Doha': [25.29, 51.53],
    'Tel Aviv': [32.09, 34.78], 'Istanbul': [41.01, 28.98],
    // Europe
    'Paris': [48.86, 2.35], 'Lyon': [45.76, 4.84], 'Nice': [43.70, 7.27], 'Monaco': [43.74, 7.42],
    'Rome': [41.90, 12.50], 'Milan': [45.46, 9.19], 'Venice': [45.44, 12.32], 'Florence': [43.77, 11.26],
    'Barcelona': [41.39, 2.17], 'Madrid': [40.42, -3.70], 'Seville': [37.39, -5.98],
    'Berlin': [52.52, 13.40], 'Munich': [48.14, 11.58], 'Frankfurt': [50.11, 8.68],
    'Amsterdam': [52.37, 4.90], 'Brussels': [50.85, 4.35], 'Luxembourg': [49.61, 6.13],
    'Vienna': [48.21, 16.37], 'Zurich': [47.38, 8.54], 'Geneva': [46.20, 6.14],
    'Copenhagen': [55.68, 12.57], 'Stockholm': [59.33, 18.07], 'Oslo': [59.91, 10.75],
    'Helsinki': [60.17, 24.94], 'Reykjavik': [64.15, -21.94], 'Lisbon': [38.72, -9.14],
    'Porto': [41.15, -8.61], 'Athens': [37.98, 23.73], 'Prague': [50.08, 14.44],
    'Budapest': [47.50, 19.04], 'Krakow': [50.06, 19.94], 'Bucharest': [44.43, 26.10],
    'Sofia': [42.70, 23.32],
    // Oceania
    'Sydney': [-33.87, 151.21], 'Melbourne': [-37.81, 144.96], 'Brisbane': [-27.47, 153.03],
    'Auckland': [-36.85, 174.76],
    // South America
    'Buenos Aires': [-34.60, -58.38], 'Rio de Janeiro': [-22.91, -43.17], 'Sao Paulo': [-23.55, -46.63],
    'Lima': [-12.05, -77.04], 'Bogota': [4.71, -74.07], 'Santiago': [-33.45, -70.67],
    'La Paz': [-16.50, -68.15], 'Quito': [-0.18, -78.47],
    // Africa
    'Cairo': [30.04, 31.24], 'Marrakech': [31.63, -7.99], 'Tunis': [36.81, 10.18],
    'Cape Town': [-33.92, 18.42], 'Johannesburg': [-26.20, 28.05], 'Nairobi': [-1.29, 36.82],
    // North America (Canada & Mexico)
    'Toronto': [43.65, -79.38], 'Vancouver': [49.28, -123.12], 'Montreal': [45.50, -73.57],
    'Mexico City': [19.43, -99.13], 'Cancun': [21.16, -86.85]
};

// Round-trip economy fare per person (USD, Oct 2026) by great-circle distance in km.
// Fares between points are linearly interpolated.
const fareCurve = [
    [0, 80],
    [1000, 150],
    [3000, 350],
    [6000, 850],
    [10000, 1400],
    [17000, 2100]
];

// Domestic routes are cheaper per km (more competition, no international taxes)
const domesticFareMultiplier = 0.8;

// Round-trip rail fare per person (USD, Oct 2026) for journeys within Europe
const trainFareCurve = [
    [0, 30],
    [1000, 250]
];

// Beyond this, flying is usually the practical choice even within Europe
const maxTrainDistanceKm = 1000;

// No practical rail link to the other listed cities
const noRailCities = ['Reykjavik', 'Athens'];

function interpolateFare(curve, km) {
    for (let i = 1; i < curve.length; i++) {
        const [d0, f0] = curve[i - 1];
        const [d1, f1] = curve[i];
        if (km <= d1) {
            return f0 + (f1 - f0) * (km - d0) / (d1 - d0);
        }
    }
    return curve[curve.length - 1][1];
}

function distanceKm(from, to) {
    const toRad = deg => deg * Math.PI / 180;
    const [lat1, lon1] = from;
    const [lat2, lon2] = to;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function isRailTrip(source, destination, km) {
    const bothInEurope = continents[cityToCountry[source]] === 'Europe' &&
        continents[cityToCountry[destination]] === 'Europe';
    return bothInEurope && km <= maxTrainDistanceKm &&
        !noRailCities.includes(source) && !noRailCities.includes(destination);
}

// Returns { mode: 'train' | 'flight', fare }, or null when either city's coordinates are unknown
function estimateTravelFare(source, destination) {
    const from = cityCoords[source];
    const to = cityCoords[destination];
    if (!from || !to) return null;

    const km = distanceKm(from, to);
    if (isRailTrip(source, destination, km)) {
        return { mode: 'train', fare: interpolateFare(trainFareCurve, km) };
    }

    const fare = interpolateFare(fareCurve, km);
    const sameCountry = cityToCountry[source] && cityToCountry[source] === cityToCountry[destination];
    return { mode: 'flight', fare: sameCountry ? fare * domesticFareMultiplier : fare };
}

function transportLabel(transport) {
    return transport === 'train' ? 'Train' : 'Flights';
}

// Continental regions for distance estimation
const continents = {
    'India': 'Asia',
    'Japan': 'Asia',
    'Thailand': 'Asia',
    'Singapore': 'Asia',
    'Hong Kong': 'Asia',
    'South Korea': 'Asia',
    'Malaysia': 'Asia',
    'Philippines': 'Asia',
    'Indonesia': 'Asia',
    'Vietnam': 'Asia',
    'UAE': 'Middle East',
    'Qatar': 'Middle East',
    'Israel': 'Middle East',
    'Turkey': 'Middle East',
    'France': 'Europe',
    'Italy': 'Europe',
    'Spain': 'Europe',
    'Germany': 'Europe',
    'Netherlands': 'Europe',
    'Belgium': 'Europe',
    'Austria': 'Europe',
    'Switzerland': 'Europe',
    'Denmark': 'Europe',
    'Sweden': 'Europe',
    'Norway': 'Europe',
    'Finland': 'Europe',
    'Iceland': 'Europe',
    'Portugal': 'Europe',
    'Greece': 'Europe',
    'Czech Republic': 'Europe',
    'Hungary': 'Europe',
    'Poland': 'Europe',
    'Romania': 'Europe',
    'Bulgaria': 'Europe',
    'Monaco': 'Europe',
    'Luxembourg': 'Europe',
    'UK': 'Europe',
    'USA': 'North America',
    'Canada': 'North America',
    'Mexico': 'North America',
    'Australia': 'Oceania',
    'New Zealand': 'Oceania',
    'Argentina': 'South America',
    'Brazil': 'South America',
    'Peru': 'South America',
    'Colombia': 'South America',
    'Chile': 'South America',
    'Egypt': 'Africa',
    'Morocco': 'Africa',
    'South Africa': 'Africa',
    'Kenya': 'Africa'
};

function estimateFlightType(source, destination) {
    // If no source provided, use the manual selection
    if (!source) {
        return null; // Will use whatever user selected
    }
    
    const sourceCountry = cityToCountry[source];
    const destCountry = cityToCountry[destination];
    
    // If we don't know either city, return null to use manual selection
    if (!sourceCountry || !destCountry) {
        return null;
    }
    
    // Same country = domestic
    if (sourceCountry === destCountry) {
        return 'domestic';
    }
    
    const sourceContinent = continents[sourceCountry];
    const destContinent = continents[destCountry];
    
    // Same continent or neighboring regions
    if (sourceContinent === destContinent) {
        // Same continent but different country
        if (sourceContinent === 'Europe' || sourceContinent === 'Asia') {
            return 'short'; // Most intra-continental flights in Europe/Asia are short
        }
        return 'medium';
    }
    
    // Different continents - determine distance
    const intercontinentalPairs = {
        'Asia-Europe': 'medium',
        'Asia-Middle East': 'short',
        'Europe-Middle East': 'short',
        'Europe-North America': 'long',
        'Asia-North America': 'long',
        'Asia-Oceania': 'medium',
        'Europe-Africa': 'short',
        'Asia-Africa': 'medium',
        'North America-South America': 'medium',
        'Europe-South America': 'long',
        'Asia-South America': 'long',
        'Oceania-North America': 'long',
        'Oceania-Europe': 'long',
        'Africa-South America': 'long'
    };
    
    // Check both directions
    const pair1 = `${sourceContinent}-${destContinent}`;
    const pair2 = `${destContinent}-${sourceContinent}`;
    
    return intercontinentalPairs[pair1] || intercontinentalPairs[pair2] || 'long';
}

const accommodationCosts = {
    budget: { budget: 31, moderate: 42, expensive: 52, luxury: 73 },
    moderate: { budget: 62, moderate: 83, expensive: 104, luxury: 135 },
    comfort: { budget: 104, moderate: 135, expensive: 166, luxury: 208 },
    luxury: { budget: 208, moderate: 260, expensive: 364, luxury: 520 }
};

const mealCosts = {
    budget: 26,
    moderate: 47,
    expensive: 73,
    luxury: 104
};

const activityCosts = {
    budget: 21,
    moderate: 42,
    expensive: 62,
    luxury: 104
};

// Store calculated values globally
let lastCalculation = null;
let currentFocus = -1;

// Every city with coordinates can be priced, so all of them are offered in autocomplete
const knownCities = Object.keys(cityCoords);

// Returns the known city's canonical spelling ("bangalore" → "Bangalore"), or the trimmed input
function canonicalCity(name) {
    const trimmed = (name || '').trim();
    return knownCities.find(city => city.toLowerCase() === trimmed.toLowerCase()) || trimmed;
}

function isKnownCity(name) {
    return knownCities.includes(canonicalCity(name));
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getRegionForDestination(destination) {
    return destinations[canonicalCity(destination)] || 'moderate';
}

// Autocomplete functionality
function setupAutocomplete() {
    setupAutocompleteForField('source', 'autocomplete-list-source');
    setupAutocompleteForField('destination', 'autocomplete-list-destination');
}

function setupAutocompleteForField(fieldId, listId) {
    const input = document.getElementById(fieldId);
    const autocompleteList = document.getElementById(listId);

    input.addEventListener('input', function() {
        const val = this.value.toLowerCase();
        closeAutocompleteList(listId);
        currentFocus = -1;

        if (!val) return;

        // Get the other field's value to exclude it
        const otherFieldId = fieldId === 'source' ? 'destination' : 'source';
        const otherValue = document.getElementById(otherFieldId).value.trim();

        let matches = knownCities.filter(dest => {
            // Exclude if it matches the value in the other field
            if (otherValue && dest.toLowerCase() === otherValue.toLowerCase()) {
                return false;
            }
            return dest.toLowerCase().includes(val);
        });
        
        // Sort by distance if this is destination field and source is provided
        if (fieldId === 'destination') {
            const sourceCoords = cityCoords[canonicalCity(document.getElementById('source').value)];
            if (sourceCoords) {
                matches.sort((a, b) => distanceKm(sourceCoords, cityCoords[a]) - distanceKm(sourceCoords, cityCoords[b]));
            }
        }
        
        // Take top 5 matches
        matches = matches.slice(0, 5);
        
        if (matches.length > 0) {
            matches.forEach((match, index) => {
                const div = document.createElement('div');
                div.textContent = match;
                div.setAttribute('data-index', index);
                div.addEventListener('click', function() {
                    input.value = match;
                    closeAutocompleteList(listId);
                    calculate();
                });
                autocompleteList.appendChild(div);
            });
            autocompleteList.classList.add('has-items');
        }
    });
    
    // Keyboard navigation for autocomplete
    input.addEventListener('keydown', function(e) {
        const items = autocompleteList.getElementsByTagName('div');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentFocus++;
            addActive(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentFocus--;
            addActive(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1 && items[currentFocus]) {
                items[currentFocus].click();
            }
        } else if (e.key === 'Escape') {
            closeAutocompleteList(listId);
            currentFocus = -1;
        }
    });
    
    function addActive(items) {
        if (!items || items.length === 0) return;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add('autocomplete-active');
        items[currentFocus].scrollIntoView({ block: 'nearest' });
    }
    
    function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('autocomplete-active');
        }
    }
    
    document.addEventListener('click', function(e) {
        if (e.target !== input) {
            closeAutocompleteList(listId);
            currentFocus = -1;
        }
    });
}

function closeAutocompleteList(listId) {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    list.classList.remove('has-items');
}

function toggleAdvanced() {
    const section = document.getElementById('advancedSection');
    const icon = document.getElementById('advancedIcon');
    
    const isOpen = section.classList.toggle('open');
    icon.classList.toggle('open', isOpen);
    document.querySelector('.advanced-toggle').setAttribute('aria-expanded', String(isOpen));
}

function getSeasonalMultiplier(startDate, endDate) {
    if (!startDate) return 1.0;
    
    const start = new Date(startDate);
    const month = start.getMonth();
    
    if (month === 5 || month === 6 || month === 7 || month === 11) {
        return 1.3;
    } else if (month === 3 || month === 4 || month === 8 || month === 9) {
        return 1.1;
    } else {
        return 0.9;
    }
}

function formatCurrency(amount, currency) {
    const symbol = currencySymbols[currency];
    const converted = amount * exchangeRates[currency];

    if (currency === 'JPY' || currency === 'KRW' || currency === 'IDR') {
        return `<span class="currency-symbol">${symbol}</span>${Math.round(converted).toLocaleString()}`;
    } else {
        return `<span class="currency-symbol">${symbol}</span>${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
}

function updateDisplay() {
    // Always update accommodation labels when currency changes
    updateAccommodationLabels();
    
    if (lastCalculation) {
        const currency = document.getElementById('currency').value;
        const { transport, flightCost, rooms, accommodationCost, mealCost, activityCost, totalCost, people, duration, includeDailyExpense } = lastCalculation;
        
        document.getElementById('totalCost').innerHTML = formatCurrency(totalCost, currency);
        
        const nights = Math.max(duration - 1, 1);
        
        let breakdownHTML = `
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">${transport === 'train' ? 'train' : 'flight'}</span> ${transportLabel(transport)} (${people} pax):</span>
                <span>${formatCurrency(flightCost, currency)}</span>
            </div>
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">hotel</span> Stay (${nights} nights${rooms > 1 ? `, ${rooms} rooms` : ''}):</span>
                <span>${formatCurrency(accommodationCost, currency)}</span>
            </div>
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">restaurant</span> Meals (${duration} days):</span>
                <span>${formatCurrency(mealCost, currency)}</span>
            </div>
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">local_activity</span> Local expenses:</span>
                <span>${formatCurrency(activityCost, currency)}</span>
            </div>
        `;
        
        if (includeDailyExpense) {
            const dailyExpense = totalCost / duration;
            breakdownHTML += `
                <div class="display-breakdown-item" style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #66ff99;">
                    <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">today</span> Per Day Average:</span>
                    <span>${formatCurrency(dailyExpense, currency)}</span>
                </div>
            `;
        }
        
        document.getElementById('breakdown').innerHTML = breakdownHTML;

        const perPersonCost = totalCost / people;
        document.getElementById('perPerson').innerHTML = `${formatCurrency(perPersonCost, currency)} per person`;
    }
}

// Update accommodation options based on currency
function updateAccommodationLabels() {
    const currency = document.getElementById('currency').value;
    const symbol = currencySymbols[currency];
    const rate = exchangeRates[currency];
    
    const accommodationSelect = document.getElementById('accommodation');
    const selectedValue = accommodationSelect.value;

    // Show the same nightly rate the calculation uses for this destination
    const region = getRegionForDestination(document.getElementById('destination').value.trim());
    const nightly = tier => `${symbol}${Math.round(accommodationCosts[tier][region] * rate).toLocaleString()}`;

    accommodationSelect.innerHTML = `
        <option value="budget">Budget - ${nightly('budget')}/night</option>
        <option value="moderate">Mid-range - ${nightly('moderate')}/night</option>
        <option value="comfort">Comfort - ${nightly('comfort')}/night</option>
        <option value="luxury">Luxury - ${nightly('luxury')}/night</option>
    `;
    
    // Restore selected value
    accommodationSelect.value = selectedValue;
}

function calculate() {
    const source = canonicalCity(document.getElementById('source').value);
    const destination = canonicalCity(document.getElementById('destination').value);
    const duration = parseInt(document.getElementById('duration').value) || 0;
    const people = Math.max(parseInt(document.getElementById('people').value) || 1, 1);
    const accommodation = document.getElementById('accommodation').value;
    const enableTravelDates = document.getElementById('enableTravelDates').checked;
    const startDate = enableTravelDates ? document.getElementById('startDate').value : '';
    const endDate = enableTravelDates ? document.getElementById('endDate').value : '';
    const currency = document.getElementById('currency').value;
    const includeDailyExpense = document.getElementById('includeDailyExpense').checked;
    const errorDiv = document.getElementById('dateError');

    // Clear previous errors
    errorDiv.textContent = '';

    // Check if source and destination are the same
    if (source && destination && source.toLowerCase() === destination.toLowerCase()) {
        errorDiv.textContent = '⚠️ Source and destination cannot be the same location';
        errorDiv.style.display = 'block';
        document.getElementById('output').innerHTML = '';
        return;
    }

    // Check if end date is before start date
    if (enableTravelDates && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            errorDiv.textContent = '⚠ End date cannot be before start date';
            // Show error state in display
            document.getElementById('totalCost').innerHTML = '<span class="material-icons" style="font-size: 64px; color: #00ff88;">smart_toy</span><div style="font-size: 16px; margin-top: 5px; color: #00ff88; animation: glitch 0.3s infinite;">ERROR</div>';
            document.getElementById('breakdown').innerHTML = '';
            document.getElementById('perPerson').textContent = '';
            lastCalculation = null;
            return;
        }
    }

    // Both source and destination are required to generate budget
    if (!source || !destination || !source.trim() || !destination.trim() || duration < 1) {
        // Clear display if source or destination is not provided or duration is invalid
        const currency = document.getElementById('currency').value;
        const symbol = currencySymbols[currency];
        document.getElementById('totalCost').textContent = `${symbol}0`;
        document.getElementById('breakdown').innerHTML = '';
        document.getElementById('perPerson').textContent = '';
        lastCalculation = null;
        return;
    }
    
    const region = getRegionForDestination(destination);
    const seasonalMultiplier = enableTravelDates ? getSeasonalMultiplier(startDate, endDate) : 1;

    // Auto-determine flight type from source and destination
    let travelMode = 'medium'; // default
    if (source && destination) {
        const estimated = estimateFlightType(source, destination);
        if (estimated) {
            travelMode = estimated;
        }
    } else if (!source && destination) {
        // If no source, estimate based on destination region
        const destRegion = getRegionForDestination(destination);
        if (destRegion === 'budget' || destRegion === 'moderate') {
            travelMode = 'short';
        } else {
            travelMode = 'medium';
        }
    }

    // Prefer distance-based fare; fall back to the flight-type bands for unknown cities
    const travelFare = estimateTravelFare(source, destination);
    const transport = travelFare ? travelFare.mode : 'flight';
    const farePerPerson = travelFare ? travelFare.fare : flightCosts[travelMode];
    const flightCost = farePerPerson * people * seasonalMultiplier;
    const nights = Math.max(duration - 1, 1);
    // Nightly rates are per room; assume travellers share two to a room
    const rooms = Math.ceil(people / 2);
    const accommodationCost = accommodationCosts[accommodation][region] * rooms * nights * seasonalMultiplier;
    const mealCost = mealCosts[region] * duration * people;
    const activityCost = activityCosts[region] * duration * people;

    const totalCost = flightCost + accommodationCost + mealCost + activityCost;

    lastCalculation = { source, destination, transport, flightCost, rooms, accommodationCost, mealCost, activityCost, totalCost, people, duration, region, includeDailyExpense, accommodation };

    // Track calculation in PostHog
    if (window.posthog) {
        posthog.capture('budget_calculated', {
            source: source,
            destination: destination,
            region: region,
            duration: duration,
            travelers: people,
            accommodation: accommodation,
            total_cost: totalCost
        });
    }

    updateDisplay();
}

function reset() {
    // Track reset in PostHog
    if (window.posthog) {
        posthog.capture('calculator_reset');
    }

    document.getElementById('source').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('duration').value = '7';
    document.getElementById('people').value = '2';
    document.getElementById('accommodation').value = 'budget';
    document.getElementById('enableTravelDates').checked = false;
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('startDate').disabled = true;
    document.getElementById('endDate').disabled = true;
    document.getElementById('includeDailyExpense').checked = false;
    document.getElementById('dateError').textContent = '';
    
    const currency = document.getElementById('currency').value;
    const symbol = currencySymbols[currency];
    
    document.getElementById('totalCost').textContent = `${symbol}0`;
    document.getElementById('breakdown').innerHTML = '';
    document.getElementById('perPerson').textContent = '';
    
    lastCalculation = null;
    updateAccommodationLabels();
}

function saveReceipt() {
    if (!lastCalculation) {
        showError('No Calculation Found', 'Please enter trip details and calculate before saving.');
        return;
    }

    // Track event in PostHog
    if (window.posthog) {
        posthog.capture('receipt_saved', {
            source: lastCalculation.source,
            destination: lastCalculation.destination,
            total_cost: lastCalculation.totalCost,
            currency: document.getElementById('currency').value
        });
    }

    const currency = document.getElementById('currency').value;
    const symbol = currencySymbols[currency];
    const { source, destination, transport, flightCost, rooms, accommodationCost, mealCost, activityCost, totalCost, people, duration, includeDailyExpense, accommodation } = lastCalculation;
    const nights = Math.max(duration - 1, 1);
    const perPersonCost = totalCost / people;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // City names are typed by the user, so escape them before building receipt HTML
    let tripRoute = escapeHtml(destination);
    if (source) {
        tripRoute = `${escapeHtml(source)} → ${escapeHtml(destination)}`;
    }

    // Format dates if provided
    let dateDisplay = '';
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateDisplay = `<strong>Dates:</strong> ${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}<br>`;
    } else if (startDate) {
        const start = new Date(startDate);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateDisplay = `<strong>Start Date:</strong> ${start.toLocaleDateString('en-US', options)}<br>`;
    }

    // Capitalize accommodation type for title
    const accommodationTitle = accommodation.charAt(0).toUpperCase() + accommodation.slice(1);

    let receiptHTML = `
        <div class="receipt-header">
            <div class="receipt-title">BUDGIE</div>
            <div>${accommodationTitle} Travel Estimate</div>
            <div style="font-size: 10px; margin-top: 5px;">${new Date().toLocaleDateString()}</div>
        </div>
        <div style="margin: 15px 0;">
            <strong>Route:</strong> ${tripRoute}<br>
            <strong>Duration:</strong> ${duration} days<br>
            ${dateDisplay}
            <strong>Travelers:</strong> ${people}
        </div>
        <div class="receipt-item">
            <span>${transportLabel(transport)}:</span>
            <span>${formatCurrency(flightCost, currency)}</span>
        </div>
        <div class="receipt-item">
            <span>Stay (${nights}n${rooms > 1 ? ` × ${rooms} rooms` : ''}):</span>
            <span>${formatCurrency(accommodationCost, currency)}</span>
        </div>
        <div class="receipt-item">
            <span>Meals:</span>
            <span>${formatCurrency(mealCost, currency)}</span>
        </div>
        <div class="receipt-item">
            <span>Local expenses:</span>
            <span>${formatCurrency(activityCost, currency)}</span>
        </div>
    `;
    
    if (includeDailyExpense) {
        const dailyExpense = totalCost / duration;
        receiptHTML += `
            <div class="receipt-item">
                <span>Per Day Average:</span>
                <span>${formatCurrency(dailyExpense, currency)}</span>
            </div>
        `;
    }
    
    receiptHTML += `
        <div class="receipt-total">
            <div class="receipt-item">
                <span>TOTAL:</span>
                <span>${formatCurrency(totalCost, currency)}</span>
            </div>
            <div class="receipt-item" style="font-size: 12px; font-weight: normal;">
                <span>Per Person:</span>
                <span>${formatCurrency(perPersonCost, currency)}</span>
            </div>
        </div>
        <div class="receipt-footer">
            <div>Estimates may vary by season</div>
            <div>Thank you for using Budgie!</div>
        </div>
    `;

    // Play thermal printer sound first
    if (window.soundManager) {
        window.soundManager.playThermalPrinter();
    }

    // Delay receipt display until sound is 90% complete
    // Thermal printer sound is ~150ms (3 beeps × 50ms), so 90% = 135ms
    setTimeout(() => {
        document.getElementById('receiptContent').innerHTML = receiptHTML;
        document.getElementById('receiptOverlay').classList.add('show');

        // Add receipt to background stack
        addReceiptToBackground(receiptHTML);

        setTimeout(() => {
            downloadReceiptAsImage();
        }, 500);
    }, 135);
}

function closeReceipt() {
    document.getElementById('receiptOverlay').classList.remove('show');
}

function closeReceiptOverlay(event) {
    if (event.target.id === 'receiptOverlay') {
        closeReceipt();
    }
}

function showError(title, message) {
    const errorContent = document.getElementById('errorContent');
    
    errorContent.innerHTML = `
        <div class="receipt-header">
            <div class="receipt-title">ERROR</div>
            <div style="font-size: 12px; color: #ff4444; margin-top: 5px;">${title}</div>
        </div>
        <div style="margin: 15px 0; text-align: center;">
            <span class="material-icons" style="font-size: 64px; color: #ff6b6b;">smart_toy</span>
        </div>
        <div style="text-align: center; color: #666; font-size: 13px; line-height: 1.6;">
            ${message}
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <button onclick="closeError()" style="
                padding: 10px 30px;
                background: #ff4444;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                font-weight: bold;
            ">OK</button>
        </div>
    `;
    
    document.getElementById('errorOverlay').classList.add('show');
}

function closeError() {
    document.getElementById('errorOverlay').classList.remove('show');
}

function closeErrorOverlay(event) {
    if (event.target.id === 'errorOverlay') {
        closeError();
    }
}

function downloadReceiptAsImage() {
    const receipt = document.getElementById('receipt');
    const closeButton = receipt.querySelector('.receipt-close');

    // Hide close button before capturing
    if (closeButton) {
        closeButton.style.display = 'none';
    }

    html2canvas(receipt, {
        backgroundColor: '#ffffff',
        scale: 2
    }).then(canvas => {
        // Show close button again after capturing
        if (closeButton) {
            closeButton.style.display = 'flex';
        }

        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `budgie-receipt-${new Date().getTime()}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.95);
    });
}

// Recalculate on any option change; calculate() clears the display until both cities are filled in.
// Unknown cities are estimated with average prices. Dates, duration and travelers have their own handlers.
document.querySelectorAll('input, select').forEach(element => {
    if (['currency', 'duration', 'people', 'startDate', 'endDate'].includes(element.id)) return;
    element.addEventListener('change', calculate);
});

['source', 'destination'].forEach(id => {
    const input = document.getElementById(id);

    // While typing, only update once both fields hold a known city,
    // so partial names like "Ban" don't flash fallback estimates
    input.addEventListener('input', () => {
        if (isKnownCity(document.getElementById('source').value) &&
            isKnownCity(document.getElementById('destination').value)) {
            calculate();
        }
    });

    // Tidy the spelling of known cities ("bangalore" → "Bangalore") when leaving the field
    input.addEventListener('change', () => {
        input.value = canonicalCity(input.value);
    });
});

// Add specific listeners for duration and people to trigger calculation
document.getElementById('duration').addEventListener('change', function() {
    const val = parseInt(this.value);
    if (val < 1 || isNaN(val)) {
        this.value = 1;
    }
    
    // Update end date if travel dates are enabled
    const enableTravelDates = document.getElementById('enableTravelDates').checked;
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (enableTravelDates && startDateInput.value) {
        const duration = parseInt(this.value) || 7;
        const start = new Date(startDateInput.value);
        const end = new Date(start);
        end.setDate(start.getDate() + duration - 1); // duration includes start day
        endDateInput.value = end.toISOString().split('T')[0];
    }
    
    calculate();
});

document.getElementById('people').addEventListener('change', () => {
    const val = parseInt(document.getElementById('people').value);
    if (val < 1 || isNaN(val)) {
        document.getElementById('people').value = 1;
    }
    calculate();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Match the physical key: on macOS, Option+S types "ß" so e.key never equals 's'
    if (e.altKey && e.code === 'KeyS') {
        e.preventDefault();
        if (lastCalculation) {
            saveReceipt();
        }
    }
    
    if (e.altKey && e.code === 'KeyC') {
        e.preventDefault();
        reset();
    }
    
    if (e.altKey && e.code === 'KeyA') {
        e.preventDefault();
        toggleAdvanced();
    }
    
    if (e.key === 'Escape') {
        const receiptOverlay = document.getElementById('receiptOverlay');
        const errorOverlay = document.getElementById('errorOverlay');
        
        if (receiptOverlay.classList.contains('show')) {
            closeReceipt();
        } else if (errorOverlay.classList.contains('show')) {
            closeError();
        } else {
            closeMobileReceiptPanel();
        }
    }
});

// Event listeners for form validation and date handling
// (duration and people validation handled in initializeSuffixInputs)

// Enable/disable travel dates based on checkbox
document.getElementById('enableTravelDates').addEventListener('change', function() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const errorDiv = document.getElementById('dateError');

    if (this.checked) {
        startDateInput.disabled = false;
        endDateInput.disabled = false;

        // If no dates set, auto-set based on current duration
        if (!startDateInput.value) {
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];
            startDateInput.value = todayStr;

            // Auto-calculate end date based on duration
            const duration = parseInt(document.getElementById('duration').value) || 7;
            const endDate = new Date(today);
            endDate.setDate(today.getDate() + duration - 1); // duration includes start day
            endDateInput.value = endDate.toISOString().split('T')[0];

            // Set minimum date for end date to be the start date
            endDateInput.setAttribute('min', todayStr);
        }
    } else {
        startDateInput.disabled = true;
        endDateInput.disabled = true;
        startDateInput.value = '';
        endDateInput.value = '';
        errorDiv.textContent = '';

        // Reset min/max attributes
        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
        endDateInput.setAttribute('min', today);
        startDateInput.removeAttribute('max');

        calculate();
    }
});

// Date change handlers
document.getElementById('startDate').addEventListener('change', function() {
    const startDate = this.value;
    const endDateInput = document.getElementById('endDate');
    const duration = parseInt(document.getElementById('duration').value) || 7;

    if (startDate) {
        // Set minimum date for end date to be the start date
        endDateInput.setAttribute('min', startDate);

        // Auto-calculate end date based on duration
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + duration - 1); // duration includes start day
        endDateInput.value = end.toISOString().split('T')[0];

        document.getElementById('dateError').textContent = '';
        calculate();

        // Close the date picker
        this.blur();
    }
});

document.getElementById('endDate').addEventListener('change', function() {
    const endDate = this.value;
    const startDateInput = document.getElementById('startDate');

    if (endDate) {
        // Set maximum date for start date to be the end date
        startDateInput.setAttribute('max', endDate);
    }

    syncDuration();

    // Close the date picker
    this.blur();
});

function syncDuration() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const errorDiv = document.getElementById('dateError');
    
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Check if end date is before start date
        if (end < start) {
            errorDiv.textContent = '⚠ End date cannot be before start date';
            return;
        }
        
        errorDiv.textContent = '';
        
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        if (diffDays > 0) {
            document.getElementById('duration').value = diffDays;
            calculate();
        }
    }
}

function setTodayAsMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').setAttribute('min', today);
    document.getElementById('endDate').setAttribute('min', today);
}

// Receipt Stack Management
let receiptCounter = 0;
const MAX_RECEIPTS = 15; // Upper limit for receipts
let mobileReceipts = []; // Store mobile receipts separately
const RECEIPTS_STORAGE_KEY = 'budgieReceipts';

function isMobile() {
    return window.innerWidth <= 480;
}

// Saved receipts survive a page refresh; storage can be unavailable (private mode), so fail quietly
function loadStoredReceipts() {
    try {
        return JSON.parse(localStorage.getItem(RECEIPTS_STORAGE_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function writeStoredReceipts(receipts) {
    try {
        localStorage.setItem(RECEIPTS_STORAGE_KEY, JSON.stringify(receipts.slice(-MAX_RECEIPTS)));
    } catch (e) {
        // Receipts still work for this session
    }
}

function removeStoredReceipt(receiptId) {
    writeStoredReceipts(loadStoredReceipts().filter(receipt => receipt.id !== receiptId));
}

function restoreSavedReceipts() {
    loadStoredReceipts().forEach(receipt => addReceiptToBackground(receipt.html, receipt.id, false));
}

function addReceiptToBackground(receiptHTML, receiptId = `receipt-${Date.now()}-${receiptCounter++}`, persist = true) {
    if (persist) {
        writeStoredReceipts([...loadStoredReceipts(), { id: receiptId, html: receiptHTML }]);
    }

    // On mobile, use the mobile receipt panel instead
    if (isMobile()) {
        addMobileReceipt(receiptHTML, receiptId);
        return;
    }

    // Desktop: Add to background stack
    const container = document.getElementById('receiptStackBackground');

    // Check if we've hit the limit, remove oldest receipt
    const existingReceipts = container.querySelectorAll('.stacked-receipt');
    if (existingReceipts.length >= MAX_RECEIPTS) {
        existingReceipts[0].remove(); // Remove oldest (first) receipt
    }

    // Create receipt element
    const receiptDiv = document.createElement('div');
    receiptDiv.className = 'stacked-receipt';
    receiptDiv.id = receiptId;

    const receiptWidth = 280;

    // Random positioning (scattered across viewport)
    const randomX = Math.random() * (window.innerWidth - 320);
    const randomY = Math.random() * (window.innerHeight - 400);
    const randomRotation = (Math.random() - 0.5) * 15; // -7.5 to 7.5 degrees

    // Generate unique crumple pattern using CSS variables
    const crumpleVars = {
        '--crumple-x1': `${Math.random() * 30 + 10}%`,
        '--crumple-y1': `${Math.random() * 30 + 10}%`,
        '--crumple-x2': `${Math.random() * 30 + 70}%`,
        '--crumple-y2': `${Math.random() * 30 + 60}%`,
        '--crumple-x3': `${Math.random() * 30 + 30}%`,
        '--crumple-y3': `${Math.random() * 30 + 70}%`,
        '--crumple-x4': `${Math.random() * 30 + 60}%`,
        '--crumple-y4': `${Math.random() * 30 + 10}%`,
        '--crumple-x5': `${Math.random() * 20 + 40}%`,
        '--crumple-y5': `${Math.random() * 20 + 40}%`,
        '--crumple-x6': `${Math.random() * 30 + 20}%`,
        '--crumple-y6': `${Math.random() * 30 + 50}%`,
        '--crumple-x7': `${Math.random() * 30 + 70}%`,
        '--crumple-y7': `${Math.random() * 30 + 30}%`,
        '--wrinkle-angle1': `${Math.random() * 60 + 100}deg`,
        '--wrinkle-angle2': `${Math.random() * 60 + 40}deg`
    };

    // Apply styles
    receiptDiv.style.left = `${randomX}px`;
    receiptDiv.style.top = `${randomY}px`;
    receiptDiv.style.transform = `rotate(${randomRotation}deg)`;
    receiptDiv.style.width = `${receiptWidth}px`;

    // Apply crumple variables
    Object.entries(crumpleVars).forEach(([key, value]) => {
        receiptDiv.style.setProperty(key, value);
    });

    // Add content and delete button
    receiptDiv.innerHTML = `
        <button class="stacked-receipt-delete" onclick="deleteStackedReceipt('${receiptId}', event)" aria-label="Delete saved receipt">×</button>
        <div class="stacked-receipt-content">${receiptHTML}</div>
    `;

    // Make receipt draggable
    makeDraggable(receiptDiv, receiptHTML);

    // Keyboard users can't drag, so let them open the receipt with Enter or Space
    receiptDiv.tabIndex = 0;
    receiptDiv.setAttribute('role', 'button');
    receiptDiv.setAttribute('aria-label', 'Open saved receipt');
    receiptDiv.addEventListener('keydown', e => {
        if (e.target === receiptDiv && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            viewStackedReceipt(receiptHTML);
        }
    });

    container.appendChild(receiptDiv);
}

// Make receipts draggable on desktop
function makeDraggable(element, receiptHTML) {
    let isDragging = false;
    let startX, startY;
    let initialLeft, initialTop;
    let hasMoved = false;

    element.addEventListener('mousedown', function(e) {
        // Ignore if clicking delete button
        if (e.target.classList.contains('stacked-receipt-delete')) {
            return;
        }

        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startY = e.clientY;

        const rect = element.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        element.classList.add('dragging');
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Mark as moved if dragged more than 5px
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            hasMoved = true;
        }

        element.style.left = (initialLeft + deltaX) + 'px';
        element.style.top = (initialTop + deltaY) + 'px';
    });

    document.addEventListener('mouseup', function(e) {
        if (!isDragging) return;

        isDragging = false;
        element.classList.remove('dragging');

        // If it was just a click (not dragged), open the modal
        if (!hasMoved && !e.target.classList.contains('stacked-receipt-delete')) {
            viewStackedReceipt(receiptHTML);
        }
    });
}

// Mobile Receipt Management
function addMobileReceipt(receiptHTML, receiptId) {

    // Check if we've hit the limit
    if (mobileReceipts.length >= MAX_RECEIPTS) {
        mobileReceipts.shift(); // Remove oldest
    }

    mobileReceipts.push({
        id: receiptId,
        html: receiptHTML,
        timestamp: Date.now()
    });

    updateMobileReceiptCount();
    updateMobileReceiptList();
}

function updateMobileReceiptCount() {
    const countElement = document.getElementById('mobileReceiptCount');
    if (countElement) {
        countElement.textContent = mobileReceipts.length;
        // Show/hide button based on receipt count
        const button = document.getElementById('mobileReceiptButton');
        if (button) {
            button.style.display = mobileReceipts.length > 0 ? 'block' : 'none';
        }
    }
}

function updateMobileReceiptList() {
    const listElement = document.getElementById('mobileReceiptList');
    const emptyElement = document.getElementById('mobileReceiptEmpty');

    if (mobileReceipts.length === 0) {
        emptyElement.style.display = 'block';
        // Remove all receipt items
        listElement.querySelectorAll('.mobile-receipt-item').forEach(item => item.remove());
    } else {
        emptyElement.style.display = 'none';

        // Clear and rebuild list
        listElement.querySelectorAll('.mobile-receipt-item').forEach(item => item.remove());

        mobileReceipts.forEach((receipt, index) => {
            const item = document.createElement('div');
            item.className = 'mobile-receipt-item';
            item.id = receipt.id;

            item.innerHTML = `
                <button class="mobile-receipt-item-delete" onclick="deleteMobileReceipt(${index}, event)" aria-label="Delete saved receipt">×</button>
                ${receipt.html}
            `;

            item.addEventListener('click', function(e) {
                if (!e.target.classList.contains('mobile-receipt-item-delete')) {
                    viewStackedReceipt(receipt.html);
                    closeMobileReceiptPanel();
                }
            });

            listElement.appendChild(item);
        });
    }
}

function deleteMobileReceipt(index, event) {
    event.stopPropagation();
    const [removed] = mobileReceipts.splice(index, 1);
    if (removed) {
        removeStoredReceipt(removed.id);
    }
    updateMobileReceiptCount();
    updateMobileReceiptList();
}

function openMobileReceiptPanel() {
    const panel = document.getElementById('mobileReceiptPanel');
    panel.classList.add('show');
}

function closeMobileReceiptPanel() {
    const panel = document.getElementById('mobileReceiptPanel');
    panel.classList.remove('show');
}

function viewStackedReceipt(receiptHTML) {
    document.getElementById('receiptContent').innerHTML = receiptHTML;
    document.getElementById('receiptOverlay').classList.add('show');
}

function deleteStackedReceipt(receiptId, event) {
    event.stopPropagation();
    removeStoredReceipt(receiptId);
    const receipt = document.getElementById(receiptId);
    if (receipt) {
        receipt.style.transition = 'all 0.3s ease';
        receipt.style.opacity = '0';
        receipt.style.transform = receipt.style.transform + ' scale(0.8)';
        setTimeout(() => {
            receipt.remove();
        }, 300);
    }
}

function generateItinerary() {
    // Check if there's a calculation to generate itinerary from
    if (!lastCalculation) {
        showError('No Trip Data', 'Please enter trip details and calculate before generating an itinerary.');
        return;
    }

    // Track event in PostHog
    if (window.posthog) {
        posthog.capture('itinerary_generate_clicked', {
            source: lastCalculation.source,
            destination: lastCalculation.destination,
            duration: lastCalculation.duration,
            travelers: lastCalculation.people,
            accommodation: lastCalculation.accommodation
        });
    }

    const { source, destination, transport, flightCost, rooms, accommodationCost, mealCost, activityCost, totalCost, people, duration, accommodation } = lastCalculation;
    const currency = document.getElementById('currency').value;
    const symbol = currencySymbols[currency];
    const rate = exchangeRates[currency];
    const enableTravelDates = document.getElementById('enableTravelDates').checked;
    const startDate = enableTravelDates ? document.getElementById('startDate').value : '';
    const endDate = enableTravelDates ? document.getElementById('endDate').value : '';

    // Validate required fields
    if (!source || !destination) {
        showError('Incomplete Trip Data', 'Please provide both source and destination before generating an itinerary.');
        return;
    }

    // Format dates for display
    let dateDisplay = '';
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateDisplay = `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
    }

    // Apply currency conversion to all costs
    const convertedFlightCost = flightCost * rate;
    const convertedAccommodationCost = accommodationCost * rate;
    const convertedMealCost = mealCost * rate;
    const convertedActivityCost = activityCost * rate;
    const convertedTotalCost = totalCost * rate;

    // Prepare trip data for API
    const tripData = {
        source,
        destination,
        duration,
        budget: accommodation, // budget tier (budget/moderate/comfort/luxury)
        travelers: people,
        dates: dateDisplay,
        transport,
        flights: `${symbol}${Math.round(convertedFlightCost).toLocaleString()}`,
        accommodation: `${symbol}${Math.round(convertedAccommodationCost).toLocaleString()}`,
        meals: `${symbol}${Math.round(convertedMealCost).toLocaleString()}`,
        activities: `${symbol}${Math.round(convertedActivityCost).toLocaleString()}`,
        total: `${symbol}${Math.round(convertedTotalCost).toLocaleString()}`,
        perPerson: `${symbol}${Math.round(convertedTotalCost / people).toLocaleString()}`,
        nights: Math.max(duration - 1, 1),
        rooms,
        perDay: `${symbol}${Math.round(convertedTotalCost / duration).toLocaleString()}`,
        route: `${source} → ${destination}`
    };

    // Store trip data in localStorage for itinerary page
    localStorage.setItem('budgieTripData', JSON.stringify(tripData));

    // Open itinerary page
    window.open('itinerary.html', '_blank');
}

// Initialize
setTodayAsMinDate();
updateAccommodationLabels();
setupAutocomplete();
restoreSavedReceipts();

// PostHog: Track input field changes for user insights
if (window.posthog) {
    // Track source/destination inputs
    document.getElementById('source').addEventListener('blur', (e) => {
        if (e.target.value) {
            posthog.capture('input_changed', { field: 'source', value: e.target.value });
        }
    });

    document.getElementById('destination').addEventListener('blur', (e) => {
        if (e.target.value) {
            posthog.capture('input_changed', { field: 'destination', value: e.target.value });
        }
    });

    // Track duration changes
    document.getElementById('duration').addEventListener('change', (e) => {
        posthog.capture('input_changed', { field: 'duration', value: parseInt(e.target.value) });
    });

    // Track number of travelers
    document.getElementById('people').addEventListener('change', (e) => {
        posthog.capture('input_changed', { field: 'travelers', value: parseInt(e.target.value) });
    });

    // Track accommodation style selection
    document.getElementById('accommodation').addEventListener('change', (e) => {
        posthog.capture('input_changed', { field: 'accommodation', value: e.target.value });
    });

    // Track currency selection
    document.getElementById('currency').addEventListener('change', (e) => {
        posthog.capture('input_changed', { field: 'currency', value: e.target.value });
    });

    // Track advanced options usage
    document.getElementById('enableTravelDates').addEventListener('change', (e) => {
        posthog.capture('input_changed', { field: 'enable_travel_dates', value: e.target.checked });
    });

    document.getElementById('includeDailyExpense').addEventListener('change', (e) => {
        posthog.capture('input_changed', { field: 'include_daily_expense', value: e.target.checked });
    });
}