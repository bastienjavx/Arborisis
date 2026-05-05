import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePlayerStore = defineStore('player', () => {
    const currentSound = ref(null);
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const volume = ref(1);
    const isMuted = ref(false);

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
