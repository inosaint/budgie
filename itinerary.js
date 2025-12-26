// Dummy travel itinerary data
const dummyItinerary = {
    days: [
        {
            day: 1,
            activities: [
                {
                    icon: '✈️',
                    description: 'Flight from Bangalore',
                    notes: 'Long layover in Sydney'
                }
            ]
        },
        {
            day: 2,
            activities: [
                {
                    icon: '✈️',
                    description: 'Land in Auckland and Checkin to Hilton',
                    notes: 'Hotel is centrally located, luggage storage available if early arrival'
                },
                {
                    icon: '⭐',
                    description: 'Stroll through Viaduct Harbour and waterfront precinct',
                    notes: 'Browse boutique shops and galleries, perfect for photos'
                },
                {
                    icon: '⭐',
                    description: 'Visit Sky Tower for sunset views and romantic photo opportunity',
                    notes: 'Book tickets online to skip queues, visit at 4:30pm for best light'
                },
                {
                    icon: '🏨',
                    description: 'Dinner at Depot Eatery & Oyster Bar (farm-to-table cuisine)',
                    notes: 'Reserve in advance, expect NZ$150-250 per couple'
                }
            ]
        },
        {
            day: 3,
            activities: [
                {
                    icon: '✈️',
                    description: 'Land in Auckland and Checkin to Hilton',
                    notes: 'Hotel is centrally located, luggage storage available if early arrival'
                },
                {
                    icon: '⭐',
                    description: 'Stroll through Viaduct Harbour and waterfront precinct',
                    notes: 'Browse boutique shops and galleries, perfect for photos'
                },
                {
                    icon: '⭐',
                    description: 'Visit Sky Tower for sunset views and romantic photo opportunity',
                    notes: 'Book tickets online to skip queues, visit at 4:30pm for best light'
                },
                {
                    icon: '🏨',
                    description: 'Dinner at Depot Eatery & Oyster Bar (farm-to-table cuisine)',
                    notes: 'Reserve in advance, expect NZ$150-250 per couple'
                }
            ]
        },
        {
            day: 4,
            activities: [
                {
                    icon: '⭐',
                    description: 'Morning hike at Rangitoto Island volcanic reserve',
                    notes: 'Ferry departs at 9:15am, bring water and sunscreen'
                },
                {
                    icon: '⭐',
                    description: 'Afternoon wine tasting at Waiheke Island vineyards',
                    notes: 'Cable Bay and Mudbrick wineries recommended'
                },
                {
                    icon: '🏨',
                    description: 'Seafood dinner at Oyster & Chop overlooking the marina',
                    notes: 'Try the green-lipped mussels, a New Zealand specialty'
                }
            ]
        },
        {
            day: 5,
            activities: [
                {
                    icon: '⭐',
                    description: 'Day trip to Hobbiton Movie Set in Matamata',
                    notes: 'Book guided tour in advance, 2.5 hour drive from Auckland'
                },
                {
                    icon: '⭐',
                    description: 'Explore Rotorua geothermal parks and Maori cultural show',
                    notes: 'Te Puia offers authentic experience with traditional hangi dinner'
                },
                {
                    icon: '🏨',
                    description: 'Return to Auckland, casual dinner at Federal Street',
                    notes: 'Many options available, try Depot for fresh seafood'
                }
            ]
        },
        {
            day: 6,
            activities: [
                {
                    icon: '⭐',
                    description: 'Visit Auckland Museum and Domain parklands',
                    notes: 'Free entry on most days, allow 2-3 hours'
                },
                {
                    icon: '⭐',
                    description: 'Shop at Queen Street and Britomart precinct',
                    notes: 'Local designers and international brands, cafes everywhere'
                },
                {
                    icon: '🏨',
                    description: 'Farewell dinner at The Grove, fine dining experience',
                    notes: 'Reserve 2 weeks ahead, expect NZ$200-300 per person with wine'
                }
            ]
        },
        {
            day: 7,
            activities: [
                {
                    icon: '⭐',
                    description: 'Morning walk along Mission Bay beach',
                    notes: 'Great for photos, grab coffee at one of the beachfront cafes'
                },
                {
                    icon: '✈️',
                    description: 'Checkout and flight back to Bangalore',
                    notes: 'Arrive at airport 3 hours early for international flight'
                }
            ]
        }
    ]
};

// Render the itinerary sheets
function renderItinerary() {
    // Stop dot matrix printer sound when itinerary is ready to display
    if (window.soundManager) {
        window.soundManager.stopDotMatrixPrinter();
    }

    const container = document.getElementById('itinerarySheets');
    const route = document.getElementById('summaryRoute').textContent;

    // Use currentItinerary if available, otherwise fallback to dummy data
    const itinerary = currentItinerary || dummyItinerary;

    // Clear container first
    container.innerHTML = '';

    itinerary.days.forEach(dayData => {
        const sheet = document.createElement('div');
        sheet.className = 'day-sheet';
        sheet.dataset.day = dayData.day;

        // Add vertical lines parallel to hole punches
        const leftLine = document.createElement('div');
        leftLine.className = 'vertical-line-left';
        sheet.appendChild(leftLine);

        const rightLine = document.createElement('div');
        rightLine.className = 'vertical-line-right';
        sheet.appendChild(rightLine);

        // Sheet content
        const content = document.createElement('div');
        content.innerHTML = `
            <div class="sheet-header">
                <div class="sheet-title">${route}</div>
                <div class="sheet-day">Day ${dayData.day}</div>
            </div>
            <hr class="sheet-divider">
            <div class="activities-list">
                ${dayData.activities.map(activity => `
                    <div class="activity-item">
                        <div class="activity-icon">${activity.icon}</div>
                        <div class="activity-description">${activity.description}</div>
                        <div class="activity-notes">${activity.notes}</div>
                    </div>
                `).join('')}
            </div>
        `;

        sheet.appendChild(content);

        // Add modification panel
        const modPanel = document.createElement('div');
        modPanel.className = 'modification-panel';
        modPanel.innerHTML = `
            <button onclick="regenerateDay(${dayData.day})">🔄 Regenerate Day ${dayData.day}</button>
            <button onclick="editDay(${dayData.day})">✏️ Edit Day</button>
            <button onclick="closeSheet()">✕ Close</button>
        `;
        sheet.appendChild(modPanel);

        container.appendChild(sheet);

        // Add click handler for active state
        sheet.addEventListener('click', function(e) {
            if (!e.target.closest('.modification-panel')) {
                toggleSheetActive(sheet);
            }
        });
    });

    // Add hole punches after sheets are rendered (so we can calculate height)
    setTimeout(addDynamicHolePunches, 100);
}

// Add hole punches dynamically based on card height
function addDynamicHolePunches() {
    const sheets = document.querySelectorAll('.day-sheet');

    sheets.forEach(sheet => {
        const height = sheet.offsetHeight;
        const holePunchSpacing = 60; // Space between hole punches in pixels
        const marginTop = 20; // Top margin for first hole
        const marginBottom = 20; // Bottom margin for last hole

        // Calculate how many holes we need
        const availableHeight = height - marginTop - marginBottom;
        const numHoles = Math.floor(availableHeight / holePunchSpacing) + 2; // +2 for top and bottom

        // Add holes on both sides
        for (let i = 0; i < numHoles; i++) {
            const position = marginTop + (i * holePunchSpacing);

            // Left side hole
            const holeLeft = document.createElement('div');
            holeLeft.className = 'hole-punch hole-punch-left';
            holeLeft.style.top = `${position}px`;
            sheet.appendChild(holeLeft);

            // Right side hole
            const holeRight = document.createElement('div');
            holeRight.className = 'hole-punch hole-punch-right';
            holeRight.style.top = `${position}px`;
            sheet.appendChild(holeRight);
        }
    });
}

// Toggle sheet active state
function toggleSheetActive(sheet) {
    const isActive = sheet.classList.contains('active');

    // Close all other sheets
    document.querySelectorAll('.day-sheet').forEach(s => {
        s.classList.remove('active');
    });

    // Toggle overlay
    const overlay = getOrCreateOverlay();

    if (isActive) {
        sheet.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        sheet.classList.add('active');
        overlay.classList.add('active');
    }
}

// Get or create overlay
function getOrCreateOverlay() {
    let overlay = document.querySelector('.sheet-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sheet-overlay';
        overlay.addEventListener('click', closeSheet);
        document.body.appendChild(overlay);
    }
    return overlay;
}

// Close active sheet
function closeSheet() {
    document.querySelectorAll('.day-sheet').forEach(s => {
        s.classList.remove('active');
    });
    const overlay = document.querySelector('.sheet-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Placeholder functions for modification actions
function regenerateDay(day) {
    // Play dot matrix printer sound
    if (window.soundManager) {
        window.soundManager.playDotMatrixPrinter(1.5);
    }
    alert(`Regenerating Day ${day}... (Feature coming soon)`);
}

function editDay(day) {
    alert(`Editing Day ${day}... (Feature coming soon)`);
}

// Regenerate full itinerary
async function regenerateItinerary() {
    // Play dot matrix printer sound
    if (window.soundManager) {
        window.soundManager.playDotMatrixPrinter(2.5);
    }

    // Get trip data from localStorage
    const tripDataStr = localStorage.getItem('budgieTripData');

    if (!tripDataStr) {
        alert('No trip data found. Please return to the calculator and generate a new itinerary.');
        return;
    }

    const tripData = JSON.parse(tripDataStr);

    // Check if we're deployed (can use API)
    const useAPI = window.location.hostname !== 'file://';

    if (useAPI) {
        // Fetch new itinerary from API
        await fetchItineraryFromAPI(tripData);
    } else {
        // Local development - just re-render dummy data
        alert('Running locally - using dummy data. Deploy to Netlify to use Claude API.');
        currentItinerary = dummyItinerary;
        renderItinerary();
    }
}

// Save itinerary as PDF
function saveItineraryAsPDF() {
    window.print();
}

// API endpoint configuration
// When deployed to Netlify, this will be the serverless function endpoint
const API_ENDPOINT = '/.netlify/functions/generate-itinerary';

// Global variable to store the current itinerary
let currentItinerary = null;

// Load trip data from localStorage and initialize page
async function initializePage() {
    // Load trip data from localStorage
    const tripDataStr = localStorage.getItem('budgieTripData');

    if (!tripDataStr) {
        // No trip data found - use dummy data
        console.log('No trip data found in localStorage, using dummy data');
        updateBudgetSummary(null);
        currentItinerary = dummyItinerary;
        renderItinerary();
        return;
    }

    const tripData = JSON.parse(tripDataStr);

    // Update budget summary with real data
    updateBudgetSummary(tripData);

    // Check if we should use the API or dummy data
    // If API_ENDPOINT is localhost or the function exists, try to use it
    const useAPI = window.location.hostname !== 'file://';

    if (useAPI) {
        // Show loading state and fetch itinerary from API
        await fetchItineraryFromAPI(tripData);
    } else {
        // Local development - use dummy data
        console.log('Running locally, using dummy data');
        currentItinerary = dummyItinerary;
        renderItinerary();
    }
}

// Update budget summary section with trip data
function updateBudgetSummary(tripData) {
    if (!tripData) {
        // Use default dummy values
        return;
    }

    // Update all summary fields
    document.getElementById('summaryRoute').textContent = tripData.route;
    document.getElementById('summaryDuration').textContent = `${tripData.duration} days`;
    document.getElementById('summaryDates').textContent = tripData.dates;
    document.getElementById('summaryTravelers').textContent = tripData.travelers;
    document.getElementById('summaryFlights').textContent = tripData.flights;
    document.getElementById('summaryNights').textContent = tripData.nights;
    document.getElementById('summaryAccom').textContent = tripData.accommodation;
    document.getElementById('summaryMeals').textContent = tripData.meals;
    document.getElementById('summaryActivities').textContent = tripData.activities;
    document.getElementById('summaryPerDay').textContent = tripData.perDay;
    document.getElementById('summaryTotal').textContent = tripData.total;
    document.getElementById('summaryPerPerson').textContent = tripData.perPerson;

    // Update date
    const today = new Date().toLocaleDateString();
    document.getElementById('summaryDate').textContent = today;
}

// Fetch itinerary from Claude API via Netlify Function
async function fetchItineraryFromAPI(tripData) {
    try {
        showLoadingState();

        // Call the serverless function
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripData)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.itinerary) {
            currentItinerary = data.itinerary;
            hideLoadingState();
            renderItinerary();
        } else {
            throw new Error('Invalid response from API');
        }

    } catch (error) {
        console.error('Error fetching itinerary:', error);
        hideLoadingState();
        showErrorState(error);

        // Fallback to dummy data
        currentItinerary = dummyItinerary;
        renderItinerary();
    }
}

// Show loading state while API is working
function showLoadingState() {
    // Play dot matrix printer sound
    if (window.soundManager) {
        window.soundManager.playDotMatrixPrinter(2);
    }

    const container = document.getElementById('itinerarySheets');
    container.innerHTML = `
        <div class="loading-container" style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            padding: 40px;
            color: #666;
        ">
            <div class="loading-spinner" style="
                width: 60px;
                height: 60px;
                border: 4px solid #e0e0e0;
                border-top: 4px solid #333;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            "></div>
            <div style="font-size: 18px; margin-bottom: 10px;">
                🖨️ Generating your itinerary...
            </div>
            <div style="font-size: 14px; color: #999;">
                Claude is planning your perfect trip
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
}

// Hide loading state
function hideLoadingState() {
    // Loading will be replaced by renderItinerary
}

// Show error state if API fails
function showErrorState(error) {
    const container = document.getElementById('itinerarySheets');
    const errorHTML = `
        <div class="error-container" style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            padding: 40px;
            color: #666;
        ">
            <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
            <div style="font-size: 18px; margin-bottom: 10px; color: #d32f2f;">
                Failed to generate itinerary
            </div>
            <div style="font-size: 14px; color: #999; margin-bottom: 20px; text-align: center; max-width: 500px;">
                ${error.message || 'An error occurred while generating your itinerary.'}
            </div>
            <div style="font-size: 14px; color: #999; margin-bottom: 20px;">
                Showing sample itinerary instead...
            </div>
        </div>
    `;

    // Show error briefly before showing dummy data
    container.innerHTML = errorHTML;

    setTimeout(() => {
        renderItinerary();
    }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
});
