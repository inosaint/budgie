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

// Currency exchange rates (base: USD)
const exchangeRates = {
    INR: 83.12,
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
    SGD: 1.34,
    AED: 3.67,
    THB: 35.25,
    MYR: 4.72,
    IDR: 15420,
    KRW: 1320,
    BRL: 4.97,
    MXN: 17.15,
    ZAR: 18.65,
    TRY: 28.50,
    RUB: 92.50
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

// Cost databases (in USD)
const flightCosts = {
    domestic: 250,
    short: 400,
    medium: 700,
    long: 1200
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
    budget: { budget: 30, moderate: 40, expensive: 50, luxury: 70 },
    moderate: { budget: 60, moderate: 80, expensive: 100, luxury: 130 },
    comfort: { budget: 100, moderate: 130, expensive: 160, luxury: 200 },
    luxury: { budget: 200, moderate: 250, expensive: 350, luxury: 500 }
};

const mealCosts = {
    budget: 25,
    moderate: 45,
    expensive: 70,
    luxury: 100
};

const activityCosts = {
    budget: 20,
    moderate: 40,
    expensive: 60,
    luxury: 100
};

// Store calculated values globally
let lastCalculation = null;
let currentFocus = -1;

function getRegionForDestination(destination) {
    return destinations[destination] || 'moderate';
}

// Autocomplete functionality
function setupAutocomplete() {
    setupAutocompleteForField('source', 'autocomplete-list-source');
    setupAutocompleteForField('destination', 'autocomplete-list-destination');
}

// Approximate coordinates for major cities (lat, lon)
const cityCoordinates = {
    // India
    'New Delhi': [28.6139, 77.2090], 'Mumbai': [19.0760, 72.8777], 'Bangalore': [12.9716, 77.5946],
    'Hyderabad': [17.3850, 78.4867], 'Chennai': [13.0827, 80.2707], 'Kolkata': [22.5726, 88.3639],
    'Pune': [18.5204, 73.8567], 'Ahmedabad': [23.0225, 72.5714], 'Jaipur': [26.9124, 75.7873],
    'Goa': [15.2993, 74.1240], 'Kochi': [9.9312, 76.2673], 'Lucknow': [26.8467, 80.9462],
    // USA
    'New York': [40.7128, -74.0060], 'Los Angeles': [34.0522, -118.2437], 'San Francisco': [37.7749, -122.4194],
    'Chicago': [41.8781, -87.6298], 'Boston': [42.3601, -71.0589], 'Seattle': [47.6062, -122.3321],
    'Miami': [25.7617, -80.1918], 'Las Vegas': [36.1699, -115.1398],
    // UK
    'London': [51.5074, -0.1278], 'Manchester': [53.4808, -2.2426], 'Edinburgh': [55.9533, -3.1883],
    'Birmingham': [52.4862, -1.8904],
    // Asia
    'Tokyo': [35.6762, 139.6503], 'Osaka': [34.6937, 135.5023], 'Kyoto': [35.0116, 135.7681],
    'Bangkok': [13.7563, 100.5018], 'Phuket': [7.8804, 98.3923], 'Chiang Mai': [18.7883, 98.9853],
    'Singapore': [1.3521, 103.8198], 'Hong Kong': [22.3193, 114.1694], 'Seoul': [37.5665, 126.9780],
    'Dubai': [25.2048, 55.2708], 'Abu Dhabi': [24.4539, 54.3773], 'Kuala Lumpur': [3.1390, 101.6869],
    'Manila': [14.5995, 120.9842], 'Jakarta': [6.2088, 106.8456], 'Bali': [-8.4095, 115.1889],
    'Hanoi': [21.0285, 105.8542], 'Ho Chi Minh City': [10.8231, 106.6297],
    // Europe
    'Paris': [48.8566, 2.3522], 'Lyon': [45.7640, 4.8357], 'Nice': [43.7102, 7.2620],
    'Rome': [41.9028, 12.4964], 'Milan': [45.4642, 9.1900], 'Venice': [45.4408, 12.3155],
    'Florence': [43.7696, 11.2558], 'Barcelona': [41.3851, 2.1734], 'Madrid': [40.4168, -3.7038],
    'Seville': [37.3891, -5.9845], 'Berlin': [52.5200, 13.4050], 'Munich': [48.1351, 11.5820],
    'Frankfurt': [50.1109, 8.6821], 'Amsterdam': [52.3676, 4.9041], 'Brussels': [50.8503, 4.3517],
    'Vienna': [48.2082, 16.3738], 'Zurich': [47.3769, 8.5417], 'Geneva': [46.2044, 6.1432],
    'Copenhagen': [55.6761, 12.5683], 'Stockholm': [59.3293, 18.0686], 'Oslo': [59.9139, 10.7522],
    'Helsinki': [60.1699, 24.9384], 'Reykjavik': [64.1466, -21.9426], 'Lisbon': [38.7223, -9.1393],
    'Porto': [41.1579, -8.6291], 'Athens': [37.9838, 23.7275], 'Istanbul': [41.0082, 28.9784],
    'Prague': [50.0755, 14.4378], 'Budapest': [47.4979, 19.0402], 'Krakow': [50.0647, 19.9450],
    'Bucharest': [44.4268, 26.1025], 'Sofia': [42.6977, 23.3219],
    // Oceania
    'Sydney': [-33.8688, 151.2093], 'Melbourne': [-37.8136, 144.9631], 'Brisbane': [-27.4698, 153.0251],
    'Auckland': [-36.8485, 174.7633],
    // South America
    'Buenos Aires': [-34.6037, -58.3816], 'Rio de Janeiro': [-22.9068, -43.1729], 'Sao Paulo': [-23.5505, -46.6333],
    'Lima': [-12.0464, -77.0428], 'Bogota': [4.7110, -74.0721], 'Santiago': [-33.4489, -70.6693],
    'La Paz': [-16.5000, -68.1500], 'Quito': [-0.1807, -78.4678],
    // Africa
    'Cairo': [30.0444, 31.2357], 'Marrakech': [31.6295, -7.9811], 'Tunis': [36.8065, 10.1815],
    'Cape Town': [-33.9249, 18.4241], 'Johannesburg': [-26.2041, 28.0473], 'Nairobi': [-1.2864, 36.8172],
    // Middle East
    'Tel Aviv': [32.0853, 34.7818], 'Doha': [25.2854, 51.5310],
    // North America (Canada & Mexico)
    'Toronto': [43.6532, -79.3832], 'Vancouver': [49.2827, -123.1207], 'Montreal': [45.5017, -73.5673],
    'Mexico City': [19.4326, -99.1332], 'Cancun': [21.1619, -86.8515],
    // Additional
    'Siem Reap': [13.3671, 103.8448], 'Kathmandu': [27.7172, 85.3240], 'Colombo': [6.9271, 79.8612]
};

function calculateDistance(city1, city2) {
    const coords1 = cityCoordinates[city1];
    const coords2 = cityCoordinates[city2];
    
    if (!coords1 || !coords2) return Infinity;
    
    // Haversine formula for great circle distance
    const R = 6371; // Earth's radius in km
    const lat1 = coords1[0] * Math.PI / 180;
    const lat2 = coords2[0] * Math.PI / 180;
    const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
    const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c; // Distance in km
}

function setupAutocompleteForField(fieldId, listId) {
    const input = document.getElementById(fieldId);
    const autocompleteList = document.getElementById(listId);
    
    input.addEventListener('input', function() {
        const val = this.value.toLowerCase();
        closeAutocompleteList(listId);
        currentFocus = -1;
        
        if (!val) return;
        
        let matches = Object.keys(destinations).filter(dest => 
            dest.toLowerCase().includes(val)
        );
        
        // Sort by distance if this is destination field and source is provided
        if (fieldId === 'destination') {
            const sourceCity = document.getElementById('source').value;
            if (sourceCity && cityCoordinates[sourceCity]) {
                matches.sort((a, b) => {
                    const distA = calculateDistance(sourceCity, a);
                    const distB = calculateDistance(sourceCity, b);
                    return distA - distB;
                });
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
    
    section.classList.toggle('open');
    icon.classList.toggle('open');
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
        const { flightCost, accommodationCost, mealCost, activityCost, totalCost, people, duration, includeDailyExpense } = lastCalculation;
        
        document.getElementById('totalCost').innerHTML = formatCurrency(totalCost, currency);
        
        const nights = Math.max(duration - 1, 1);
        
        let breakdownHTML = `
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">flight</span> Flights (${people} pax):</span>
                <span>${formatCurrency(flightCost, currency)}</span>
            </div>
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">hotel</span> Stay (${nights} nights):</span>
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
    
    // Price ranges in USD
    const ranges = {
        budget: [0, 50],
        moderate: [50, 100],
        comfort: [100, 150],
        luxury: [150, 999999]
    };
    
    // Update options with converted prices
    accommodationSelect.innerHTML = `
        <option value="budget">Budget - Under ${symbol}${Math.round(50 * rate)}/night</option>
        <option value="moderate">Mid-range - ${symbol}${Math.round(50 * rate)}-${Math.round(100 * rate)}/night</option>
        <option value="comfort">Comfort - ${symbol}${Math.round(100 * rate)}-${Math.round(150 * rate)}/night</option>
        <option value="luxury">Luxury - ${symbol}${Math.round(150 * rate)}+/night</option>
    `;
    
    // Restore selected value
    accommodationSelect.value = selectedValue;
}

function calculate() {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const duration = parseInt(document.getElementById('duration').value) || 0;
    const people = parseInt(document.getElementById('people').value) || 1;
    const accommodation = document.getElementById('accommodation').value;
    const enableTravelDates = document.getElementById('enableTravelDates').checked;
    const startDate = enableTravelDates ? document.getElementById('startDate').value : '';
    const endDate = enableTravelDates ? document.getElementById('endDate').value : '';
    const currency = document.getElementById('currency').value;
    const includeDailyExpense = document.getElementById('includeDailyExpense').checked;
    const errorDiv = document.getElementById('dateError');
    
    // Clear previous errors
    errorDiv.textContent = '';

    // Validate dates - both must be provided if checkbox is enabled
    if (enableTravelDates && (!startDate || !endDate)) {
        errorDiv.textContent = '⚠ Please select both start and end dates';
        // Show error state in display with Material Icons robot
        document.getElementById('totalCost').innerHTML = '<span class="material-icons" style="font-size: 64px; color: #00ff88;">smart_toy</span><div style="font-size: 16px; margin-top: 5px; color: #00ff88; animation: glitch 0.3s infinite;">ERROR</div>';
        document.getElementById('breakdown').innerHTML = '';
        document.getElementById('perPerson').textContent = '';
        lastCalculation = null;
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

    const flightCost = flightCosts[travelMode] * people * seasonalMultiplier;
    const nights = Math.max(duration - 1, 1);
    const accommodationCost = accommodationCosts[accommodation][region] * nights * seasonalMultiplier;
    const mealCost = mealCosts[region] * duration * people;
    const activityCost = activityCosts[region] * duration * people;

    const totalCost = flightCost + accommodationCost + mealCost + activityCost;
    
    lastCalculation = { source, destination, flightCost, accommodationCost, mealCost, activityCost, totalCost, people, duration, region, includeDailyExpense };
    
    updateDisplay();
}

function reset() {
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
}

function saveReceipt() {
    if (!lastCalculation) {
        showError('No Calculation Found', 'Please enter trip details and calculate before saving.');
        return;
    }
    
    const currency = document.getElementById('currency').value;
    const symbol = currencySymbols[currency];
    const { source, destination, flightCost, accommodationCost, mealCost, activityCost, totalCost, people, duration, includeDailyExpense } = lastCalculation;
    const nights = Math.max(duration - 1, 1);
    const perPersonCost = totalCost / people;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    let tripRoute = destination;
    if (source) {
        tripRoute = `${source} → ${destination}`;
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
    
    let receiptHTML = `
        <div class="receipt-header">
            <div class="receipt-title">BUDGIE</div>
            <div>Travel Budget Estimate</div>
            <div style="font-size: 10px; margin-top: 5px;">${new Date().toLocaleDateString()}</div>
        </div>
        <div style="margin: 15px 0;">
            <strong>Route:</strong> ${tripRoute}<br>
            <strong>Duration:</strong> ${duration} days<br>
            ${dateDisplay}
            <strong>Travelers:</strong> ${people}
        </div>
        <div class="receipt-item">
            <span>Flights:</span>
            <span>${formatCurrency(flightCost, currency)}</span>
        </div>
        <div class="receipt-item">
            <span>Stay (${nights}n):</span>
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
    
    document.getElementById('receiptContent').innerHTML = receiptHTML;
    document.getElementById('receiptOverlay').classList.add('show');

    // Add receipt to background stack
    addReceiptToBackground(receiptHTML);

    setTimeout(() => {
        downloadReceiptAsImage();
    }, 500);
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

function generateItinerary() {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const duration = parseInt(document.getElementById('duration').value) || 0;
    const people = parseInt(document.getElementById('people').value) || 1;
    const startDate = document.getElementById('startDate').value;
    const currency = document.getElementById('currency').value;
    
    if (!destination) {
        alert('Please enter a destination to generate an itinerary!');
        return;
    }
    
    if (duration < 1) {
        alert('Please enter trip duration!');
        return;
    }
    
    let url = 'https://traviti.netlify.app/?';
    const params = new URLSearchParams();
    
    if (source) params.append('from', source);
    params.append('destination', destination);
    params.append('days', duration);
    params.append('travelers', people);
    if (startDate) params.append('startDate', startDate);
    if (lastCalculation) {
        const totalBudget = lastCalculation.totalCost;
        params.append('budget', Math.round(totalBudget));
        params.append('currency', currency);
    }
    
    url += params.toString();
    window.open(url, '_blank');
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

document.getElementById('startDate').addEventListener('change', syncDuration);
document.getElementById('endDate').addEventListener('change', syncDuration);

function syncDuration() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        if (diffDays > 0) {
            document.getElementById('duration').value = diffDays;
        }
    }
}

document.querySelectorAll('input, select').forEach(element => {
    if (element.id !== 'currency' && element.id !== 'duration' && element.id !== 'people') {
        element.addEventListener('change', () => {
            const source = document.getElementById('source').value;
            const destination = document.getElementById('destination').value;
            const duration = parseInt(document.getElementById('duration').value) || 0;

            if (source && destination && duration > 0) {
                calculate();
            }
        });
        
        if (element.type === 'text' || element.type === 'number') {
            element.addEventListener('input', () => {
                const source = document.getElementById('source').value;
                const destination = document.getElementById('destination').value;
                const duration = parseInt(document.getElementById('duration').value) || 0;

                if (source && destination && duration > 0) {
                    calculate();
                }
            });
        }
    }
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
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        if (lastCalculation) {
            saveReceipt();
        }
    }
    
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        reset();
    }
    
    if (e.altKey && e.key === 'a') {
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
    } else {
        startDateInput.disabled = true;
        endDateInput.disabled = true;
        startDateInput.value = '';
        endDateInput.value = '';
        errorDiv.textContent = '';
        calculate();
    }
});

// Date change handlers  
document.getElementById('startDate').addEventListener('change', function() {
    const startDate = this.value;
    const endDateInput = document.getElementById('endDate');
    const duration = parseInt(document.getElementById('duration').value) || 7;
    
    if (startDate) {
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

function isMobile() {
    return window.innerWidth <= 480;
}

function addReceiptToBackground(receiptHTML) {
    // On mobile, use the mobile receipt panel instead
    if (isMobile()) {
        addMobileReceipt(receiptHTML);
        return;
    }

    // Desktop: Add to background stack
    const container = document.getElementById('receiptStackBackground');
    const receiptId = `stacked-receipt-${receiptCounter++}`;

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
        <button class="stacked-receipt-delete" onclick="deleteStackedReceipt('${receiptId}', event)">×</button>
        <div class="stacked-receipt-content">${receiptHTML}</div>
    `;

    // Make receipt draggable
    makeDraggable(receiptDiv, receiptHTML);

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
function addMobileReceipt(receiptHTML) {
    const receiptId = `mobile-receipt-${receiptCounter++}`;

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
                <button class="mobile-receipt-item-delete" onclick="deleteMobileReceipt(${index}, event)">×</button>
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
    mobileReceipts.splice(index, 1);
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

// Initialize
setTodayAsMinDate();
updateAccommodationLabels();
setupAutocomplete();