<script setup>
import { Link } from '@inertiajs/vue3';
import { usePlayerStore } from '@/Stores/player';
import { computed } from 'vue';

const props = defineProps({
    sound: {
        type: Object,
        required: true,
    },
    size: {
        type: String,
        default: 'default', // 'default' | 'compact'
    },
});

const player = usePlayerStore();

const isPlaying = computed(() => {
    return player.isPlaying && player.currentSound?.id === props.sound.id;
});

const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const playSound = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPlaying.value) {
        player.pause();
    } else {
        player.play({
            id: props.sound.id,
            slug: props.sound.slug,
            title: props.sound.title,
            userName: props.sound.user_name || props.sound.user?.name,
            audioUrl: props.sound.audio_url,
            coverUrl: props.sound.cover_url,
        });
    }
};
</script>

<template>
    <div
        class="sound-card group relative overflow-hidden"
        :class="size === 'compact' ? 'rounded-xl' : 'rounded-2xl'"
    >
        <!-- Cover Image -->
        <div class="relative aspect-[16/9] overflow-hidden bg-arbor-charcoal">
            <img
                v-if="sound.cover_url"
                :src="sound.cover_url"
                :alt="`Couverture de ${sound.title}`"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-arbor-deep">
                <svg class="w-10 h-10 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            </div>

            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-arbor-night/80 via-transparent to-transparent" />

            <!-- Play button overlay -->
            <button
                @click="playSound"
                :aria-label="isPlaying ? `Mettre en pause ${sound.title}` : `Lire ${sound.title}`"
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <div class="w-14 h-14 rounded-full bg-arbor-emerald/90 hover:bg-arbor-emerald flex items-center justify-center shadow-lg shadow-arbor-emerald/20 transition-colors duration-200 active:scale-95">
                    <svg v-if="!isPlaying" class="w-6 h-6 text-arbor-night ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    <svg v-else class="w-6 h-6 text-arbor-night" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                </div>
            </button>

            <!-- Category badge -->
            <span
                v-if="sound.category"
                class="absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-arbor-night/60 backdrop-blur-sm text-arbor-sage border border-arbor-glass-border"
            >
                {{ sound.category.name || sound.category }}
            </span>

            <!-- Duration -->
            <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[11px] font-mono bg-arbor-night/60 backdrop-blur-sm text-arbor-sage">
                {{ formatDuration(sound.duration) }}
            </span>
        </div>

        <!-- Info -->
        <div class="p-4">
            <Link
                :href="route('sounds.show', sound.slug)"
                class="block font-medium text-arbor-cream text-sm truncate hover:text-arbor-emerald transition-colors"
            >
                {{ sound.title }}
            </Link>
            <div class="flex items-center justify-between mt-1">
                <span class="text-xs text-arbor-sage truncate">
                    {{ sound.user_name || sound.user?.name || 'Anonyme' }}
                </span>
                <div class="flex items-center gap-2 text-[11px] text-arbor-sage/70">
                    <span v-if="sound.play_count" class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ sound.play_count }}
                    </span>
                    <span v-if="sound.like_count" class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {{ sound.like_count }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
