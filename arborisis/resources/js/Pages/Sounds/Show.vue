<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import LikeButton from '@/Components/Social/LikeButton.vue';
import FollowButton from '@/Components/Social/FollowButton.vue';
import CommentSection from '@/Components/Social/CommentSection.vue';
import ReportModal from '@/Components/Social/ReportModal.vue';
import WaveSurfer from '@/Components/Audio/WaveSurfer.vue';
import { usePlayerStore } from '@/Stores/player';
import { ref, computed, watch } from 'vue';

const props = defineProps({
    sound: Object,
    audioUrl: String,
    coverUrl: String,
    comments: Object,
    isLiked: Boolean,
    isFollowing: Boolean,
});

const player = usePlayerStore();
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(props.sound.duration || 0);
const waveSurferRef = ref(null);

const isCurrentInPlayer = computed(() =>
    player.currentSound?.id === props.sound.id
);

const effectiveIsPlaying = computed(() => {
    if (isCurrentInPlayer.value) {
        return player.isPlaying;
    }
    return isPlaying.value;
});

watch(() => player.isPlaying, (playing) => {
    if (isCurrentInPlayer.value) {
        isPlaying.value = playing;
    }
});

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const togglePlay = () => {
    if (!isCurrentInPlayer.value) {
        player.play({
            id: props.sound.id,
            title: props.sound.title,
            slug: props.sound.slug,
            audioUrl: props.audioUrl,
            userName: props.sound.user?.name,
            duration: duration.value,
        });
        isPlaying.value = true;
        return;
    }

    player.togglePlay();
};

const onWaveReady = (dur) => {
    duration.value = dur;
};

const onWaveTimeUpdate = (time) => {
    currentTime.value = time;
    if (isCurrentInPlayer.value) {
        player.setTime(time);
    }
};

const onWaveFinish = () => {
    isPlaying.value = false;
    currentTime.value = 0;
    if (isCurrentInPlayer.value) {
        player.stop();
    }
};

const seek = (event) => {
    if (!duration.value) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    if (waveSurferRef.value) {
        waveSurferRef.value.seekTo(percent);
    }
    currentTime.value = percent * duration.value;
    if (isCurrentInPlayer.value) {
        player.setTime(currentTime.value);
    }
};

const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
</script>

<template>
    <Head :title="sound.title" />
    <GuestLayout>
        <div class="pt-24 pb-16">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Back link -->
                <Link href="/sounds" class="inline-flex items-center text-sm text-arbor-sage hover:text-arbor-cream mb-8 transition-colors">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour aux sons
                </Link>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Main Content -->
                    <div class="lg:col-span-2 space-y-8">
                        <!-- Cover / Visual -->
                        <div class="aspect-[16/9] rounded-2xl overflow-hidden bg-arbor-deep relative">
                            <div
                                v-if="coverUrl"
                                class="absolute inset-0 bg-cover bg-center"
                                :style="`background-image: url(${coverUrl})`"
                            />
                            <div v-else class="absolute inset-0 bg-gradient-to-br from-arbor-moss/20 to-arbor-emerald/10 flex items-center justify-center">
                                <svg class="w-24 h-24 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Audio Player -->
                        <div class="glass-card p-6">
                            <div class="flex items-center gap-4 mb-4">
                                <button
                                    @click="togglePlay"
                                    class="w-14 h-14 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors shrink-0"
                                >
                                    <svg v-if="!effectiveIsPlaying" class="w-6 h-6 text-arbor-night ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    <svg v-else class="w-6 h-6 text-arbor-night" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                </button>
                                <div class="flex-1 min-w-0">
                                    <h1 class="font-display text-xl font-bold text-arbor-cream truncate">
                                        {{ sound.title }}
                                    </h1>
                                    <Link
                                        :href="route('creators.show', sound.user?.slug)"
                                        class="text-sm text-arbor-sage hover:text-arbor-emerald transition-colors"
                                    >
                                        {{ sound.user?.name ?? 'Anonyme' }}
                                    </Link>
                                </div>
                            </div>

                            <!-- WaveSurfer -->
                            <WaveSurfer
                                v-if="audioUrl"
                                ref="waveSurferRef"
                                :audio-url="audioUrl"
                                :is-playing="effectiveIsPlaying"
                                wave-color="#4a5d4a"
                                progress-color="#7c9a6a"
                                cursor-color="#d4c9a8"
                                :height="80"
                                @ready="onWaveReady"
                                @timeupdate="onWaveTimeUpdate"
                                @finish="onWaveFinish"
                                @play="isPlaying = true"
                                @pause="isPlaying = false"
                            />

                            <!-- Progress bar fallback / time display -->
                            <div class="flex items-center gap-3 mt-4">
                                <span class="text-xs text-arbor-sage w-10 text-right">{{ formatTime(currentTime) }}</span>
                                <div
                                    class="flex-1 h-1.5 bg-arbor-glass rounded-full cursor-pointer relative overflow-hidden"
                                    @click="seek"
                                >
                                    <div
                                        class="absolute top-0 left-0 h-full bg-arbor-emerald rounded-full transition-all duration-100"
                                        :style="`width: ${duration ? (currentTime / duration) * 100 : 0}%`"
                                    />
                                </div>
                                <span class="text-xs text-arbor-sage w-10">{{ formatTime(duration) }}</span>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center gap-3">
                            <LikeButton
                                :sound-id="sound.id"
                                :initial-liked="isLiked"
                                :initial-count="sound.like_count"
                            />
                            <ReportModal
                                reportable-type="sound"
                                :reportable-id="sound.id"
                            />
                        </div>

                        <!-- Description -->
                        <div>
                            <h2 class="font-semibold text-arbor-cream mb-3">Description</h2>
                            <p class="text-arbor-sage leading-relaxed whitespace-pre-line">
                                {{ sound.description || 'Aucune description.' }}
                            </p>
                        </div>

                        <!-- Metadata -->
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div v-if="sound.category" class="glass-card p-4">
                                <div class="text-xs text-arbor-sage mb-1">Catégorie</div>
                                <div class="text-sm font-medium text-arbor-cream">{{ sound.category.name }}</div>
                            </div>
                            <div v-if="sound.environment" class="glass-card p-4">
                                <div class="text-xs text-arbor-sage mb-1">Environnement</div>
                                <div class="text-sm font-medium text-arbor-cream">{{ sound.environment }}</div>
                            </div>
                            <div v-if="sound.equipment" class="glass-card p-4">
                                <div class="text-xs text-arbor-sage mb-1">Matériel</div>
                                <div class="text-sm font-medium text-arbor-cream">{{ sound.equipment }}</div>
                            </div>
                            <div v-if="sound.recorded_at" class="glass-card p-4">
                                <div class="text-xs text-arbor-sage mb-1">Date d'enregistrement</div>
                                <div class="text-sm font-medium text-arbor-cream">{{ formatDate(sound.recorded_at) }}</div>
                            </div>
                            <div class="glass-card p-4">
                                <div class="text-xs text-arbor-sage mb-1">Licence</div>
                                <div class="text-sm font-medium text-arbor-cream">{{ sound.license }}</div>
                            </div>
                            <div v-if="sound.sound_location?.location_name" class="glass-card p-4">
                                <div class="text-xs text-arbor-sage mb-1">Lieu</div>
                                <div class="text-sm font-medium text-arbor-cream">{{ sound.sound_location.location_name }}</div>
                            </div>
                        </div>

                        <!-- Comments -->
                        <CommentSection
                            :sound-id="sound.id"
                            :comments="comments"
                        />
                    </div>

                    <!-- Sidebar -->
                    <div class="space-y-6">
                        <!-- Creator Card -->
                        <div class="glass-card p-6">
                            <Link :href="route('creators.show', sound.user?.slug)" class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 rounded-full bg-arbor-moss/30 flex items-center justify-center">
                                    <span class="text-lg font-display font-bold text-arbor-emerald">
                                        {{ sound.user?.name?.charAt(0)?.toUpperCase() ?? '?' }}
                                    </span>
                                </div>
                                <div>
                                    <div class="font-semibold text-arbor-cream">{{ sound.user?.name ?? 'Anonyme' }}</div>
                                    <div class="text-xs text-arbor-sage">Créateur</div>
                                </div>
                            </Link>
                            <FollowButton
                                v-if="$page.props.auth.user && $page.props.auth.user.id !== sound.user_id"
                                :user-id="sound.user_id"
                                :initial-following="isFollowing"
                                size="md"
                                class="w-full"
                            />
                        </div>

                        <!-- Tags -->
                        <div v-if="sound.tags?.length > 0" class="glass-card p-6">
                            <h3 class="font-semibold text-arbor-cream mb-3 text-sm">Tags</h3>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="tag in sound.tags"
                                    :key="tag.id"
                                    class="px-3 py-1 rounded-lg bg-arbor-glass text-arbor-sage text-xs"
                                >
                                    {{ tag.name }}
                                </span>
                            </div>
                        </div>

                        <!-- Stats -->
                        <div class="glass-card p-6">
                            <h3 class="font-semibold text-arbor-cream mb-4 text-sm">Statistiques</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between text-sm">
                                    <span class="text-arbor-sage">Écoutes</span>
                                    <span class="text-arbor-cream font-medium">{{ sound.play_count }}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-arbor-sage">J'aime</span>
                                    <span class="text-arbor-cream font-medium">{{ sound.like_count }}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-arbor-sage">Commentaires</span>
                                    <span class="text-arbor-cream font-medium">{{ sound.comment_count }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
