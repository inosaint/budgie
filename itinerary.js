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
    const container = document.getElementById('itinerarySheets');
    const route = document.getElementById('summaryRoute').textContent;

    dummyItinerary.days.forEach(dayData => {
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
function regenerateItinerary() {
    // Play dot matrix printer sound
    if (window.soundManager) {
        window.soundManager.playDotMatrixPrinter(2.5);
    }
    alert('Regenerating full itinerary... (Feature coming soon)');
}

// Save itinerary as PDF
function saveItineraryAsPDF() {
    window.print();
}

// Toggle sound on/off
function toggleSound(button) {
    if (window.soundManager) {
        const isMuted = window.soundManager.toggleMute();
        const icon = button.querySelector('.sound-icon');
        if (isMuted) {
            icon.textContent = '🔇';
            button.childNodes[1].textContent = ' Sound Off';
        } else {
            icon.textContent = '🔊';
            button.childNodes[1].textContent = ' Sound On';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update sound button state
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle && window.soundManager) {
        const isMuted = window.soundManager.isMuted();
        const icon = soundToggle.querySelector('.sound-icon');
        if (isMuted) {
            icon.textContent = '🔇';
            soundToggle.childNodes[1].textContent = ' Sound Off';
        }
    }

    // Play dot matrix printer sound when loading itinerary
    if (window.soundManager) {
        window.soundManager.playDotMatrixPrinter(2.5);
    }

    renderItinerary();
});
