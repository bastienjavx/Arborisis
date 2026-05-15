<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue';
import { usePlayerStore } from '@/Stores/player';
import { useWakeLock } from '@/Composables/useWakeLock';
import { Link } from '@inertiajs/vue3';

const player = usePlayerStore();
const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock();
const audioRef = ref(null);
const showVolume = ref(false);

const progressPercent = computed(() => {
    if (!player.duration) return 0;
    return (player.currentTime / player.duration) * 100;
});

// Procedural mini waveform bars
const waveformBars = computed(() => {
    const seed = player.currentSound?.id || 1;
    return Array.from({ length: 24 }, (_, i) => {
        const base = 15 + Math.abs(Math.sin(seed * 0.7 + i * 0.9)) * 85;
        return Math.max(10, Math.min(100, base));
    });
});

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

watch(() => player.isPlaying, (playing) => {
    if (!audioRef.value) return;
    if (playing) {
        audioRef.value.play().catch(() => {});
        requestWakeLock();
    } else {
        audioRef.value.pause();
        releaseWakeLock();
    }
});

watch(() => player.currentSound, async (sound) => {
    if (sound && audioRef.value) {
        await nextTick();
        audioRef.value.currentTime = player.currentTime || 0;
        if (player.isPlaying) {
            audioRef.value.play().catch(() => {});
        }
    }
});

onMounted(() => {
    if (audioRef.value && player.currentSound) {
        audioRef.value.currentTime = player.currentTime || 0;
        audioRef.value.volume = player.isMuted ? 0 : player.volume;
        audioRef.value.muted = player.isMuted;
    }
});

watch(() => player.isMuted, (muted) => {
    if (audioRef.value) {
        audioRef.value.muted = muted;
    }
});

watch(() => player.volume, (vol) => {
    if (audioRef.value) {
        audioRef.value.volume = vol;
    }
});

function onTimeUpdate() {
    if (audioRef.value) {
        player.setTime(audioRef.value.currentTime);
    }
}

function onLoadedMetadata() {
    if (audioRef.value) {
        player.setDuration(audioRef.value.duration);
    }
}

function onEnded() {
    player.stop();
    releaseWakeLock();
}

function setupMediaSession() {
    if (!('mediaSession' in navigator)) return;

    const sound = player.currentSound;
    if (!sound) return;

    navigator.mediaSession.metadata = new MediaMetadata({
        title: sound.title || 'Arborisis',
        artist: sound.userName || 'Anonyme',
        album: 'Arborisis — Archive sonore',
        artwork: [
            { src: sound.coverUrl || '/pwa-icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: sound.coverUrl || '/pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
    });

    navigator.mediaSession.setActionHandler('play', () => player.play());
    navigator.mediaSession.setActionHandler('pause', () => player.pause());
    navigator.mediaSession.setActionHandler('stop', () => player.stop());
    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        const skip = details.seekOffset || 10;
        if (audioRef.value) {
            audioRef.value.currentTime = Math.max(0, audioRef.value.currentTime - skip);
            player.setTime(audioRef.value.currentTime);
        }
    });
    navigator.mediaSession.setActionHandler('seekforward', (details) => {
        const skip = details.seekOffset || 10;
        if (audioRef.value) {
            audioRef.value.currentTime = Math.min(audioRef.value.duration || Infinity, audioRef.value.currentTime + skip);
            player.setTime(audioRef.value.currentTime);
        }
    });
    navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime && audioRef.value) {
            audioRef.value.currentTime = details.seekTime;
            player.setTime(audioRef.value.currentTime);
        }
    });
    navigator.mediaSession.setActionHandler('previoustrack', null);
    navigator.mediaSession.setActionHandler('nexttrack', null);
    navigator.mediaSession.playbackState = player.isPlaying ? 'playing' : 'paused';
}

watch(() => player.currentSound, () => {
    setupMediaSession();
});

watch(() => player.isPlaying, (playing) => {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
    }
});

function seek(event) {
    if (!audioRef.value || !player.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    audioRef.value.currentTime = percent * player.duration;
    player.setTime(audioRef.value.currentTime);
}
</script>

<template>
    <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
    >
        <div
            v-if="player.hasActiveTrack"
            class="fixed bottom-0 left-0 right-0 z-50 bg-arbor-deep/95 backdrop-blur-xl border-t border-arbor-glass-border"
        >
            <!-- Hidden audio element -->
            <audio
                ref="audioRef"
                :src="player.currentSound?.audioUrl"
                @timeupdate="onTimeUpdate"
                @loadedmetadata="onLoadedMetadata"
                @ended="onEnded"
                class="hidden"
            />

            <!-- Mini waveform visualization (desktop only) -->
            <div class="hidden sm:flex items-end justify-center gap-[2px] h-5 px-4 pt-1 max-w-7xl mx-auto">
                <div
                    v-for="(h, i) in waveformBars"
                    :key="i"
                    class="w-[3px] rounded-full transition-colors duration-150"
                    :class="(i / waveformBars.length) * 100 <= progressPercent ? 'bg-arbor-emerald' : 'bg-arbor-charcoal'"
                    :style="{ height: `${Math.max(4, h * 0.18)}px`, opacity: player.isPlaying ? 0.8 : 0.4 }"
                />
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
                <div class="flex items-center gap-3 sm:gap-4">
                    <!-- Play/Pause -->
                    <button
                        @click="player.togglePlay"
                        :aria-label="player.isPlaying ? 'Mettre en pause' : 'Lecture'"
                        class="btn-audio w-9 h-9 sm:w-10 sm:h-10 shrink-0 min-h-[44px] min-w-[44px]"
                    >
                        <svg v-if="!player.isPlaying" class="w-4 h-4 sm:w-5 sm:h-5 text-arbor-night ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <svg v-else class="w-4 h-4 sm:w-5 sm:h-5 text-arbor-night" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    </button>

                    <!-- Info -->
                    <div class="min-w-0 flex-1">
                        <Link
                            v-if="player.currentSound?.slug"
                            :href="route('sounds.show', player.currentSound.slug)"
                            class="block font-medium text-arbor-cream text-sm truncate hover:text-arbor-emerald transition-colors"
                        >
                            {{ player.currentSound.title }}
                        </Link>
                        <div v-else class="font-medium text-arbor-cream text-sm truncate">
                            {{ player.currentSound.title }}
                        </div>
                        <div class="text-[11px] sm:text-xs text-arbor-sage truncate">
                            {{ player.currentSound.userName || 'Anonyme' }}
                        </div>
                    </div>

                    <!-- Progress bar (always visible) -->
                    <div class="flex items-center gap-2 flex-1 max-w-[140px] sm:max-w-xs">
                        <span class="text-[10px] sm:text-xs text-arbor-sage w-7 sm:w-8 text-right hidden sm:block">{{ formatTime(player.currentTime) }}</span>
                        <div
                            class="flex-1 h-1 bg-arbor-glass rounded-full cursor-pointer relative"
                            @click="seek"
                            :aria-label="`Progression : ${formatTime(player.currentTime)} sur ${formatTime(player.duration)}`"
                            role="slider"
                            :aria-valuenow="Math.round(progressPercent)"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            <div
                                class="absolute top-0 left-0 h-full bg-arbor-emerald rounded-full transition-transform duration-100"
                                :style="`width: ${progressPercent}%`"
                            />
                        </div>
                        <span class="text-[10px] sm:text-xs text-arbor-sage w-7 sm:w-8 hidden sm:block">{{ formatTime(player.duration) }}</span>
                    </div>

                    <!-- Volume (desktop) / Volume toggle (mobile) -->
                    <div class="relative">
                        <button
                            @click="showVolume = !showVolume"
                            :aria-label="player.isMuted ? 'Activer le son' : 'Couper le son'"
                            class="text-arbor-sage hover:text-arbor-cream p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                            <svg v-if="player.isMuted || player.volume === 0" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        </button>
                        <!-- Volume slider popup -->
                        <div
                            v-if="showVolume"
                            class="absolute bottom-full right-0 mb-2 p-3 bg-arbor-deep border border-arbor-glass-border rounded-xl shadow-xl hidden sm:block"
                        >
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                :value="player.isMuted ? 0 : player.volume"
                                @input="player.setVolume(parseFloat($event.target.value))"
                                class="w-24 accent-arbor-emerald"
                                aria-label="Volume"
                            />
                        </div>
                    </div>

                    <!-- Close -->
                    <button @click="player.close" aria-label="Fermer le lecteur" class="text-arbor-sage hover:text-arbor-cream p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>
