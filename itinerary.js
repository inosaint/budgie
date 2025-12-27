// No dummy data - we show proper error messages when API fails

// Render the itinerary sheets
function renderItinerary() {
    console.log('[SOUND DEBUG] renderItinerary called, stopping sound...');
    // Stop dot matrix printer sound when itinerary is ready to display
    try {
        if (window.soundManager) {
            window.soundManager.stopDotMatrixPrinter();
        } else {
            console.error('[SOUND DEBUG] ERROR: window.soundManager is not defined in renderItinerary!');
        }
    } catch (error) {
        console.error('[SOUND DEBUG] ERROR stopping sound in renderItinerary:', error);
    }

    const container = document.getElementById('itinerarySheets');
    const route = document.getElementById('summaryRoute').textContent;

    // Use currentItinerary - should always be set by this point
    if (!currentItinerary) {
        console.error('No itinerary data available to render');
        return;
    }
    const itinerary = currentItinerary;

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
    console.log('[SOUND DEBUG] Attempting to play regenerate itinerary sound...');
    try {
        if (!window.soundManager) {
            console.error('[SOUND DEBUG] ERROR: window.soundManager is not defined!');
        } else {
            console.log('[SOUND DEBUG] soundManager found, calling playDotMatrixPrinter(2.5)...');
            window.soundManager.playDotMatrixPrinter(2.5);
            console.log('[SOUND DEBUG] playDotMatrixPrinter() called successfully');
        }
    } catch (error) {
        console.error('[SOUND DEBUG] ERROR playing sound:', error);
    }

    // Get trip data from localStorage
    const tripDataStr = localStorage.getItem('budgieTripData');

    if (!tripDataStr) {
        alert('No trip data found. Please return to the calculator and generate a new itinerary.');
        return;
    }

    const tripData = JSON.parse(tripDataStr);

    // Check if Netlify functions are available
    // True when: deployed to netlify.app OR custom domain OR running Netlify Dev (localhost:8888)
    const hasNetlifyFunctions = window.location.hostname.includes('netlify.app') ||
                                 window.location.port === '8888' ||
                                 (window.location.protocol !== 'file:' &&
                                  window.location.hostname !== 'localhost' &&
                                  window.location.hostname !== '127.0.0.1');

    if (hasNetlifyFunctions) {
        // Fetch new itinerary from API
        await fetchItineraryFromAPI(tripData);
    } else {
        // Local development without Netlify Dev - show error
        showErrorState(new Error('Netlify functions not available. Run with `netlify dev` or deploy to Netlify to generate itineraries.'));
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
        // No trip data found - this shouldn't happen in normal flow
        console.error('No trip data found in localStorage');
        updateBudgetSummary(null);
        showErrorState(new Error('No trip data found. Please return to the budget calculator and generate an itinerary.'));
        return;
    }

    const tripData = JSON.parse(tripDataStr);

    // Update budget summary with real data
    updateBudgetSummary(tripData);

    // Play dot matrix printer sound for initial generation
    console.log('[SOUND DEBUG] Attempting to play initial itinerary sound...');
    try {
        if (!window.soundManager) {
            console.error('[SOUND DEBUG] ERROR: window.soundManager is not defined!');
        } else {
            console.log('[SOUND DEBUG] soundManager found:', window.soundManager);
            console.log('[SOUND DEBUG] soundManager.muted:', window.soundManager.isMuted());
            console.log('[SOUND DEBUG] soundManager.sounds:', window.soundManager.sounds);

            if (window.soundManager.sounds && window.soundManager.sounds.dotMatrixPrinter) {
                console.log('[SOUND DEBUG] dotMatrixPrinter audio element:', {
                    src: window.soundManager.sounds.dotMatrixPrinter.src,
                    readyState: window.soundManager.sounds.dotMatrixPrinter.readyState,
                    error: window.soundManager.sounds.dotMatrixPrinter.error
                });
            }

            console.log('[SOUND DEBUG] Calling playDotMatrixPrinter(2)...');
            window.soundManager.playDotMatrixPrinter(2);
            console.log('[SOUND DEBUG] playDotMatrixPrinter() called successfully');
        }
    } catch (error) {
        console.error('[SOUND DEBUG] ERROR playing sound:', error);
    }

    // Check if Netlify functions are available
    // True when: deployed to netlify.app OR custom domain OR running Netlify Dev (localhost:8888)
    const hasNetlifyFunctions = window.location.hostname.includes('netlify.app') ||
                                 window.location.port === '8888' ||
                                 (window.location.protocol !== 'file:' &&
                                  window.location.hostname !== 'localhost' &&
                                  window.location.hostname !== '127.0.0.1');

    if (hasNetlifyFunctions) {
        // Show loading state and fetch itinerary from API
        await fetchItineraryFromAPI(tripData);
    } else {
        // Local development without Netlify Dev - show error
        console.log('Netlify functions not available');
        showErrorState(new Error('Netlify functions not available. Please run with `netlify dev` or access the deployed site at budgie.travel to generate itineraries.'));
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
        // No fallback - user needs to fix the issue or try again
    }
}

// Show loading state while API is working
function showLoadingState() {
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
            <div style="font-size: 18px; margin-bottom: 10px; color: #d32f2f; font-weight: bold;">
                Failed to Generate Itinerary
            </div>
            <div style="font-size: 14px; color: #666; margin-bottom: 30px; text-align: center; max-width: 500px; line-height: 1.6;">
                ${error.message || 'An error occurred while generating your itinerary.'}
            </div>
            <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                <button onclick="location.reload()" style="
                    padding: 12px 24px;
                    background: #333;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    font-weight: bold;
                ">🔄 Try Again</button>
                <button onclick="window.location.href='index.html'" style="
                    padding: 12px 24px;
                    background: #666;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                ">← Back to Calculator</button>
            </div>
        </div>
    `;

    container.innerHTML = errorHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
});
