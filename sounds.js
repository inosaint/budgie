// Sound effects manager for Budgie
// Uses Web Audio API for synthetic sounds + supports loading real audio files

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.muted = localStorage.getItem('budgie-muted') === 'true';
        this.initAudioContext();
        this.loadSounds();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    loadSounds() {
        // Try to load real audio files if they exist
        // If files don't exist, we'll fall back to synthetic sounds
        this.sounds = {
            thermalPrinter: this.createAudioElement('sounds/thermal-printer.mp3'),
            dotMatrixPrinter: this.createAudioElement('sounds/dot-matrix-printer.mp3')
        };
    }

    createAudioElement(src) {
        const audio = new Audio();
        audio.src = src;
        audio.volume = 0.3;
        audio.preload = 'auto';

        // Handle loading errors - will use synthetic sounds as fallback
        audio.addEventListener('error', () => {
            console.log(`Audio file ${src} not found, will use synthetic sound`);
        });

        return audio;
    }

    // Synthetic thermal printer sound (quick beeps)
    playThermalPrinterSynth() {
        if (!this.audioContext || this.muted) return;

        const now = this.audioContext.currentTime;

        // Create a series of quick beeps
        for (let i = 0; i < 3; i++) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 800 + (i * 100);
            oscillator.type = 'square';

            const startTime = now + (i * 0.05);
            gainNode.gain.setValueAtTime(0.1, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.04);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.04);
        }
    }

    // Synthetic dot matrix printer sound (mechanical printing)
    playDotMatrixPrinterSynth(duration = 2) {
        if (!this.audioContext || this.muted) return;

        const now = this.audioContext.currentTime;
        const interval = 0.015; // Time between impacts
        const impacts = Math.floor(duration / interval);

        for (let i = 0; i < impacts; i++) {
            // Print head impact
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Harsh, mechanical sound
            oscillator.frequency.value = 200 + Math.random() * 100;
            oscillator.type = 'sawtooth';
            filter.type = 'bandpass';
            filter.frequency.value = 400;

            const startTime = now + (i * interval);
            gainNode.gain.setValueAtTime(0.03, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.01);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.01);
        }

        // Add motor sound (continuous hum)
        const motor = this.audioContext.createOscillator();
        const motorGain = this.audioContext.createGain();

        motor.connect(motorGain);
        motorGain.connect(this.audioContext.destination);

        motor.frequency.value = 60;
        motor.type = 'sawtooth';

        motorGain.gain.setValueAtTime(0.01, now);
        motorGain.gain.linearRampToValueAtTime(0.015, now + 0.5);
        motorGain.gain.linearRampToValueAtTime(0.005, now + duration);

        motor.start(now);
        motor.stop(now + duration);
    }

    // Play thermal printer sound (for receipt generation)
    playThermalPrinter() {
        if (this.muted) return;

        // Try to play real audio file first
        if (this.sounds.thermalPrinter && this.sounds.thermalPrinter.readyState >= 2) {
            this.sounds.thermalPrinter.currentTime = 0;
            this.sounds.thermalPrinter.play().catch(() => {
                // Fallback to synthetic sound
                this.playThermalPrinterSynth();
            });
        } else {
            // Use synthetic sound
            this.playThermalPrinterSynth();
        }
    }

    // Play dot matrix printer sound (for itinerary generation)
    playDotMatrixPrinter(duration = 2) {
        console.log('[SOUND DEBUG - SoundManager] playDotMatrixPrinter called with duration:', duration);

        if (this.muted) {
            console.log('[SOUND DEBUG - SoundManager] Sound is muted, returning early');
            return;
        }

        console.log('[SOUND DEBUG - SoundManager] dotMatrixPrinter exists:', !!this.sounds.dotMatrixPrinter);

        // Try to play real audio file first
        if (this.sounds.dotMatrixPrinter && this.sounds.dotMatrixPrinter.readyState >= 2) {
            console.log('[SOUND DEBUG - SoundManager] Playing real audio file, readyState:', this.sounds.dotMatrixPrinter.readyState);
            this.sounds.dotMatrixPrinter.currentTime = 0;
            this.sounds.dotMatrixPrinter.play().then(() => {
                console.log('[SOUND DEBUG - SoundManager] Real audio playback started successfully');
            }).catch((error) => {
                console.error('[SOUND DEBUG - SoundManager] Real audio playback failed:', error);
                console.log('[SOUND DEBUG - SoundManager] Falling back to synthetic sound');
                // Fallback to synthetic sound
                this.playDotMatrixPrinterSynth(duration);
            });
        } else {
            console.log('[SOUND DEBUG - SoundManager] Using synthetic sound. ReadyState:', this.sounds.dotMatrixPrinter?.readyState);
            // Use synthetic sound
            this.playDotMatrixPrinterSynth(duration);
        }
    }

    // Stop dot matrix printer sound
    stopDotMatrixPrinter() {
        console.log('[SOUND DEBUG - SoundManager] stopDotMatrixPrinter called');
        // Stop real audio file if it's playing
        if (this.sounds.dotMatrixPrinter) {
            console.log('[SOUND DEBUG - SoundManager] Stopping real audio file');
            this.sounds.dotMatrixPrinter.pause();
            this.sounds.dotMatrixPrinter.currentTime = 0;
        }
        // Note: Synthetic sounds are short-lived oscillators that stop automatically
    }

    // Toggle mute/unmute
    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('budgie-muted', this.muted);
        return this.muted;
    }

    isMuted() {
        return this.muted;
    }
}

// Create global sound manager instance
window.soundManager = new SoundManager();
