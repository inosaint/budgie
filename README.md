# Budgie

A retro-styled travel budget calculator with AI-powered itinerary generation. Built with vanilla HTML, CSS, JavaScript, and Claude API.

## Future improvements

- **Short trips by ground transport:** trips under ~300 km (e.g. Bangalore → Mysore) are priced as flights; most people take a train or bus, so add a cheaper "Train/Bus" fare band.
- **Connections for unlisted small airports:** cities found by the location lookup (e.g. Da Lat) get no connecting-flight markup, so they can be ~25% too cheap. Consider inferring this from distance to the nearest major hub.
- **Lookup privacy:** unlisted city names are sent to Open-Meteo's geocoding API. Mention this in the disclaimer, or cache results so repeat lookups aren't needed.
