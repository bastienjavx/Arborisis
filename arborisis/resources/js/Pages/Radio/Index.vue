<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { usePlayerStore } from '@/Stores/player';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    nowPlaying: Object,
    history: Array,
    listenerCount: Number,
});

const player = usePlayerStore();
const audioRef = ref(null);
const isPlaying = ref(false);
const volume = ref(0.8);
const isMuted = ref(false);
const currentMetadata = ref(props.nowPlaying);
const currentListeners = ref(props.listenerCount);
const nextUp = ref(null);
const copiedStream = ref(false);
const copiedM3u = ref(false);

let metadataInterval = null;

const currentSound = computed(() => currentMetadata.value);

const effectiveVolume = computed(() => {
    if (isMuted.value) return 0;
    return volume.value;
});

// Anti-cache: unique URL per mount so the browser never reuses a cached stream
const streamUrl = computed(() => `/radio/stream?_=${Date.now()}`);

onMounted(() => {
    if (player.isPlaying) {
        player.pause();
    }

    fetchMetadata();
    metadataInterval = setInterval(fetchMetadata, 5000);
});

onUnmounted(() => {
    if (metadataInterval) {
        clearInterval(metadataInterval);
    }
    if (audioRef.value) {
        audioRef.value.pause();
        audioRef.value.src = '';
        audioRef.value.load();
    }
});

const fetchMetadata = async () => {
    try {
        const response = await fetch('/api/radio/now-playing');
        if (response.ok) {
            const data = await response.json();
            currentMetadata.value = data.now_playing;
            currentListeners.value = data.listener_count;
            nextUp.value = data.next_up;
        }
    } catch {
        // silently fail
    }
};

const togglePlay = () => {
    if (!audioRef.value) return;

    if (isPlaying.value) {
        audioRef.value.pause();
        isPlaying.value = false;
    } else {
        audioRef.value.play().then(() => {
            isPlaying.value = true;
        }).catch(() => {
            // autoplay blocked
        });
    }
};

const onAudioPlay = () => {
    isPlaying.value = true;
};

const onAudioPause = () => {
    isPlaying.value = false;
};

const setVolume = (value) => {
    volume.value = value;
    if (audioRef.value) {
        audioRef.value.volume = effectiveVolume.value;
    }
    if (value > 0) {
        isMuted.value = false;
    }
};

const toggleMute = () => {
    isMuted.value = !isMuted.value;
    if (audioRef.value) {
        audioRef.value.volume = effectiveVolume.value;
    }
};

const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const copyStreamUrl = () => {
    navigator.clipboard.writeText(window.location.origin + '/radio/stream');
    copiedStream.value = true;
    setTimeout(() => copiedStream.value = false, 2000);
};

const copyM3uUrl = () => {
    navigator.clipboard.writeText(window.location.origin + '/radio/stream.m3u');
    copiedM3u.value = true;
    setTimeout(() => copiedM3u.value = false, 2000);
};
</script>

<template>
    <Head title="Radio" />
    <GuestLayout>
        <div class="pt-24 pb-16">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-12">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <span class="text-sm text-arbor-sage font-medium tracking-wide uppercase">En direct</span>
                    </div>
                    <h1 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4">
                        Arborisis Radio
                    </h1>
                    <p class="text-arbor-sage max-w-xl">
                        Un flux continu de field recordings soigneusement sélectionnés parmi les créations de notre communauté.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Main Player -->
                    <div class="lg:col-span-2 space-y-8">
                        <!-- Visualizer / Cover -->
                        <div class="aspect-square sm:aspect-[16/9] rounded-2xl overflow-hidden bg-arbor-deep relative">
                            <div
                                v-if="currentSound?.cover"
                                class="absolute inset-0 bg-cover bg-center"
                                :style="`background-image: url(${currentSound.cover})`"
                            />
                            <div v-else class="absolute inset-0 bg-gradient-to-br from-arbor-moss/20 to-arbor-emerald/10 flex items-center justify-center">
                                <svg class="w-32 h-32 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <div class="absolute inset-0 bg-gradient-to-t from-arbor-night/80 via-transparent to-transparent"></div>
                            <div class="absolute bottom-0 left-0 right-0 p-6">
                                <div class="flex items-center gap-3 mb-2">
                                    <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span class="text-xs text-arbor-sage uppercase tracking-wider">Now Playing</span>
                                </div>
                                <h2 class="font-display text-2xl font-bold text-arbor-cream mb-1 truncate">
                                    {{ currentSound?.title ?? 'Chargement...' }}
                                </h2>
                                <p class="text-arbor-sage truncate">
                                    {{ currentSound?.artist ?? 'Arborisis' }}
                                </p>
                            </div>
                        </div>

                        <!-- Audio Player Controls -->
                        <div class="glass-card p-6">
                            <audio
                                ref="audioRef"
                                :src="streamUrl"
                                @play="onAudioPlay"
                                @pause="onAudioPause"
                                crossorigin="anonymous"
                            />

                            <div class="flex items-center gap-4 mb-6">
                                <button
                                    @click="togglePlay"
                                    class="w-16 h-16 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors shrink-0 shadow-lg shadow-arbor-emerald/20 group"
                                >
                                    <svg v-if="!isPlaying" class="w-7 h-7 text-arbor-night ml-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    <svg v-else class="w-7 h-7 text-arbor-night" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                </button>
                                <div class="flex-1 min-w-0">
                                    <div class="text-sm text-arbor-sage mb-1">Flux continu</div>
                                    <div class="text-arbor-cream font-medium truncate">
                                        {{ isPlaying ? 'Lecture en cours' : 'En pause' }}
                                    </div>
                                </div>
                                <div class="flex items-center gap-2 text-sm text-arbor-sage">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{{ currentListeners }} auditeur{{ currentListeners !== 1 ? 's' : '' }}</span>
                                </div>
                            </div>

                            <!-- Volume -->
                            <div class="flex items-center gap-3">
                                <button @click="toggleMute" class="text-arbor-sage hover:text-arbor-cream transition-colors">
                                    <svg v-if="isMuted || volume === 0" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    :value="volume"
                                    @input="setVolume(parseFloat($event.target.value))"
                                    class="flex-1 h-1.5 bg-arbor-glass rounded-full appearance-none cursor-pointer accent-arbor-emerald"
                                />
                            </div>
                        </div>

                        <!-- Share Links -->
                        <div class="flex flex-wrap gap-3">
                            <button
                                @click="copyStreamUrl"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-all"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                <span v-if="copiedStream">URL copiée !</span>
                                <span v-else>Copier l'URL du flux</span>
                            </button>
                            <button
                                @click="copyM3uUrl"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-all"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                                <span v-if="copiedM3u">M3U copié !</span>
                                <span v-else>Copier le lien M3U</span>
                            </button>
                            <a
                                href="/radio/stream.m3u"
                                download="arborisis-radio.m3u"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-emerald/15 border border-arbor-emerald/30 text-arbor-emerald text-sm hover:bg-arbor-emerald/25 transition-all"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Télécharger M3U
                            </a>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="space-y-6">
                        <!-- Next Up -->
                        <div class="glass-card p-6">
                            <h3 class="font-semibold text-arbor-cream mb-4 text-sm">Prochainement</h3>
                            <div v-if="nextUp" class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-lg bg-arbor-deep overflow-hidden shrink-0">
                                    <img v-if="nextUp.cover_url" :src="nextUp.cover_url" class="w-full h-full object-cover" alt="" />
                                    <div v-else class="w-full h-full flex items-center justify-center">
                                        <svg class="w-5 h-5 text-arbor-moss/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="min-w-0">
                                    <div class="text-sm font-medium text-arbor-cream truncate">{{ nextUp.title }}</div>
                                    <div class="text-xs text-arbor-sage truncate">{{ nextUp.user_name ?? 'Arborisis' }}</div>
                                </div>
                                <span class="text-xs text-arbor-sage font-mono shrink-0">{{ formatDuration(nextUp.duration) }}</span>
                            </div>
                            <div v-else class="text-sm text-arbor-sage">
                                Sélection en cours...
                            </div>
                        </div>

                        <!-- History -->
                        <div class="glass-card p-6">
                            <h3 class="font-semibold text-arbor-cream mb-4 text-sm">Historique</h3>
                            <div v-if="history.length > 0" class="space-y-3">
                                <Link
                                    v-for="sound in history"
                                    :key="sound.id"
                                    :href="route('sounds.show', sound.slug)"
                                    class="flex items-center gap-3 group"
                                >
                                    <div class="w-10 h-10 rounded-lg bg-arbor-deep overflow-hidden shrink-0">
                                        <img v-if="sound.cover_url" :src="sound.cover_url" class="w-full h-full object-cover" alt="" />
                                        <div v-else class="w-full h-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-arbor-moss/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <div class="text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate">{{ sound.title }}</div>
                                        <div class="text-xs text-arbor-sage truncate">{{ sound.user_name ?? 'Arborisis' }}</div>
                                    </div>
                                    <span class="text-xs text-arbor-sage font-mono shrink-0">{{ formatDuration(sound.duration) }}</span>
                                </Link>
                            </div>
                            <div v-else class="text-sm text-arbor-sage">
                                Aucun son dans l'historique.
                            </div>
                        </div>

                        <!-- Info -->
                        <div class="glass-card p-6">
                            <h3 class="font-semibold text-arbor-cream mb-3 text-sm">Écouter ailleurs</h3>
                            <p class="text-sm text-arbor-sage leading-relaxed mb-4">
                                Le flux Arborisis Radio est compatible avec tous les lecteurs audio : VLC, iTunes, Foobar2000, et les appareils mobiles.
                            </p>
                            <div class="space-y-2 text-xs text-arbor-sage">
                                <div class="flex items-center gap-2">
                                    <span class="text-arbor-emerald">●</span>
                                    <span>Format MP3 continu</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-arbor-emerald">●</span>
                                    <span>Métadonnées temps réel</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-arbor-emerald">●</span>
                                    <span>Pas de publicité</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
