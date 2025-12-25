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

        // Add hole punches on BOTH sides (tractor-feed paper style)
        // Top and bottom positions are handled by ::before and ::after for left side
        // We need to add them manually for the right side
        const topBottomPositions = [20]; // 20px from top, bottom handled separately
        const middlePositions = [35, 50, 65, 80]; // percentage from top

        // Add middle hole punches on LEFT side
        middlePositions.forEach(position => {
            const holeLeft = document.createElement('div');
            holeLeft.className = 'hole-punch hole-punch-left';
            holeLeft.style.top = `${position}%`;
            sheet.appendChild(holeLeft);
        });

        // Add ALL hole punches on RIGHT side (including top/bottom)
        // Top hole
        const topHoleRight = document.createElement('div');
        topHoleRight.className = 'hole-punch hole-punch-right';
        topHoleRight.style.top = '20px';
        sheet.appendChild(topHoleRight);

        // Middle holes
        middlePositions.forEach(position => {
            const holeRight = document.createElement('div');
            holeRight.className = 'hole-punch hole-punch-right';
            holeRight.style.top = `${position}%`;
            sheet.appendChild(holeRight);
        });

        // Bottom hole
        const bottomHoleRight = document.createElement('div');
        bottomHoleRight.className = 'hole-punch hole-punch-right';
        bottomHoleRight.style.bottom = '20px';
        sheet.appendChild(bottomHoleRight);

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
        container.appendChild(sheet);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderItinerary();
});
