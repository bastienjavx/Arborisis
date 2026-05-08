import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

const STORAGE_KEY = 'arborisis-player-state';

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            return JSON.parse(raw);
        }
    } catch {
        // ignore
    }
    return null;
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // ignore
    }
}

export const usePlayerStore = defineStore('player', () => {
    const saved = loadState();

    const currentSound = ref(saved?.currentSound || null);
    const isPlaying = ref(false); // never auto-play on load
    const currentTime = ref(saved?.currentTime || 0);
    const duration = ref(saved?.duration || 0);
    const volume = ref(saved?.volume ?? 1);
    const isMuted = ref(saved?.isMuted || false);

    const hasActiveTrack = computed(() => currentSound.value !== null);

    function play(sound) {
        if (currentSound.value?.id === sound.id) {
            isPlaying.value = true;
            return;
        }
        currentSound.value = sound;
        isPlaying.value = true;
        currentTime.value = 0;
        duration.value = sound.duration || 0;
    }

    function pause() {
        isPlaying.value = false;
    }

    function togglePlay() {
        isPlaying.value = !isPlaying.value;
    }

    function stop() {
        isPlaying.value = false;
        currentTime.value = 0;
    }

    function setTime(time) {
        currentTime.value = time;
    }

    function setDuration(dur) {
        duration.value = dur;
    }

    function setVolume(vol) {
        volume.value = vol;
        if (vol > 0) isMuted.value = false;
    }

    function toggleMute() {
        isMuted.value = !isMuted.value;
    }

    function close() {
        currentSound.value = null;
        isPlaying.value = false;
        currentTime.value = 0;
        duration.value = 0;
    }

    // Persist state (excluding isPlaying)
    watch(
        () => ({
            currentSound: currentSound.value,
            currentTime: currentTime.value,
            duration: duration.value,
            volume: volume.value,
            isMuted: isMuted.value,
        }),
        (state) => saveState(state),
        { deep: true },
    );

    return {
        currentSound,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        hasActiveTrack,
        play,
        pause,
        togglePlay,
        stop,
        setTime,
        setDuration,
        setVolume,
        toggleMute,
        close,
    };
});
