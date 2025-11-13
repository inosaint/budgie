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

function setupAutocompleteForField(fieldId, listId) {
    const input = document.getElementById(fieldId);
    const autocompleteList = document.getElementById(listId);
    
    input.addEventListener('input', function() {
        const val = this.value.toLowerCase();
        closeAutocompleteList(listId);
        currentFocus = -1;
        
        if (!val) return;
        
        const matches = Object.keys(destinations).filter(dest => 
            dest.toLowerCase().includes(val)
        ).slice(0, 5);
        
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
        return `${symbol}${Math.round(converted).toLocaleString()}`;
    } else {
        return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
}

function updateDisplay() {
    if (lastCalculation) {
        const currency = document.getElementById('currency').value;
        const { flightCost, accommodationCost, mealCost, activityCost, totalCost, people, duration, includeDailyExpense } = lastCalculation;
        
        document.getElementById('totalCost').textContent = formatCurrency(totalCost, currency);
        
        const nights = Math.max(duration - 1, 1);
        
        let breakdownHTML = `
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">flight</span> Flights (${people} pax):</span>
                <span>${formatCurrency(flightCost, currency)}</span>
            </div>
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">hotel</span> Accommodation (${nights} nights):</span>
                <span>${formatCurrency(accommodationCost, currency)}</span>
            </div>
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">restaurant</span> Meals (${duration} days):</span>
                <span>${formatCurrency(mealCost, currency)}</span>
            </div>
            <div class="display-breakdown-item">
                <span><span class="material-icons" style="font-size: 13px; vertical-align: middle;">local_activity</span> Activities & Transport:</span>
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
        document.getElementById('perPerson').textContent = `${formatCurrency(perPersonCost, currency)} per person`;
    }
}

function calculate() {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const travelMode = document.getElementById('travelMode').value;
    const duration = parseInt(document.getElementById('duration').value) || 0;
    const people = parseInt(document.getElementById('people').value) || 1;
    const accommodation = document.getElementById('accommodation').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const currency = document.getElementById('currency').value;
    const includeDailyExpense = document.getElementById('includeDailyExpense').checked;

    if (!destination || !travelMode || duration < 1) {
        return;
    }
    
    const region = getRegionForDestination(destination);
    const seasonalMultiplier = getSeasonalMultiplier(startDate, endDate);

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
    document.getElementById('travelMode').value = '';
    document.getElementById('duration').value = '7';
    document.getElementById('people').value = '2';
    document.getElementById('accommodation').value = 'budget';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('includeDailyExpense').checked = false;
    
    const currency = document.getElementById('currency').value;
    const symbol = currencySymbols[currency];
    
    document.getElementById('totalCost').textContent = `${symbol}0`;
    document.getElementById('breakdown').innerHTML = '';
    document.getElementById('perPerson').textContent = '';
    
    lastCalculation = null;
}

function saveReceipt() {
    if (!lastCalculation) {
        alert('Please enter trip details first!');
        return;
    }
    
    const currency = document.getElementById('currency').value;
    const symbol = currencySymbols[currency];
    const { source, destination, flightCost, accommodationCost, mealCost, activityCost, totalCost, people, duration, includeDailyExpense } = lastCalculation;
    const nights = Math.max(duration - 1, 1);
    const perPersonCost = totalCost / people;
    
    let tripRoute = destination;
    if (source) {
        tripRoute = `${source} → ${destination}`;
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
            <strong>Travelers:</strong> ${people}
        </div>
        <div class="receipt-item">
            <span>Flights:</span>
            <span>${formatCurrency(flightCost, currency)}</span>
        </div>
        <div class="receipt-item">
            <span>Accommodation (${nights}n):</span>
            <span>${formatCurrency(accommodationCost, currency)}</span>
        </div>
        <div class="receipt-item">
            <span>Meals:</span>
            <span>${formatCurrency(mealCost, currency)}</span>
        </div>
        <div class="receipt-item">
            <span>Activities:</span>
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
    
    html2canvas(receipt, {
        backgroundColor: '#ffffff',
        scale: 2
    }).then(canvas => {
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
    if (element.id !== 'currency') {
        element.addEventListener('change', () => {
            const destination = document.getElementById('destination').value;
            const travelMode = document.getElementById('travelMode').value;
            const duration = parseInt(document.getElementById('duration').value) || 0;
            
            if (destination && travelMode && duration > 0) {
                calculate();
            }
        });
        
        if (element.type === 'text' || element.type === 'number') {
            element.addEventListener('input', () => {
                const destination = document.getElementById('destination').value;
                const travelMode = document.getElementById('travelMode').value;
                const duration = parseInt(document.getElementById('duration').value) || 0;
                
                if (destination && travelMode && duration > 0) {
                    calculate();
                }
            });
        }
    }
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
        const overlay = document.getElementById('receiptOverlay');
        if (overlay.classList.contains('show')) {
            closeReceipt();
        }
    }
});

// Initialize autocomplete
setupAutocomplete();