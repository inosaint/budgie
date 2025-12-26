# Budgie Sound Effects

This directory is for optional sound effect files that enhance the retro printer aesthetic.

## Sound Files

Budgie looks for these two audio files:

1. **`thermal-printer.mp3`** - Quick thermal receipt printer sound (1-2 seconds)
   - Plays when generating a budget receipt
   - Should sound like: beep-beep-beep (thermal printer)

2. **`dot-matrix-printer.mp3`** - Mechanical dot matrix printer sound (2-3 seconds)
   - Plays when loading or regenerating the itinerary
   - Should sound like: mechanical printing with motor hum

## Fallback Behavior

**If these files are not present**, Budgie will automatically use **synthetic sounds** generated with the Web Audio API. These work out of the box and sound pretty good!

## Where to Get Sounds

If you want to use real audio files instead of synthetic sounds, here are some options:

### Free Sound Libraries:
- **Freesound.org** - Search for "thermal printer" or "dot matrix printer"
  - https://freesound.org/search/?q=thermal+printer
  - https://freesound.org/search/?q=dot+matrix+printer

- **Zapsplat.com** - Free sound effects (requires account)
  - https://www.zapsplat.com/sound-effect-category/printers/

- **BBC Sound Effects** - Free for personal use
  - https://sound-effects.bbcrewind.co.uk/

### Recording Your Own:
- Record a real thermal receipt printer (grocery store, ATM)
- Record a dot matrix printer (if you have access to one!)
- Use your phone's voice recorder

## File Requirements

- **Format**: MP3 (most compatible)
- **Duration**: 1-3 seconds recommended
- **Volume**: Will be automatically adjusted to 30% volume
- **Size**: Keep files under 100KB for fast loading

## Adding Custom Sounds

1. Download or create your sound files
2. Convert to MP3 format (if needed)
3. Rename them to exactly:
   - `thermal-printer.mp3`
   - `dot-matrix-printer.mp3`
4. Place them in this `sounds/` directory
5. Refresh your browser - sounds will load automatically!

## Muting Sounds

Users can toggle sounds on/off using the 🔊/🔇 button in the itinerary page. The preference is saved in localStorage.

---

**Note**: If you're deploying to GitHub Pages or a static host, make sure to include the `sounds/` directory in your deployment!
