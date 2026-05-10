<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import FollowButton from '@/Components/Social/FollowButton.vue';
import { ref } from 'vue';

const props = defineProps({
    creator: Object,
    sounds: Object,
    stats: Object,
    avatarUrl: String,
    isFollowing: Boolean,
});

const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const isNew = (createdAt) => {
    if (!createdAt) return false;
    const date = new Date(createdAt);
    const now = new Date();
    const diffDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffDays < 7;
};
</script>

<template>
    <Head :title="creator.name" />
    <GuestLayout>
        <div class="pt-24 pb-16">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Profile Header -->
                <div class="glass-card p-6 sm:p-8 mb-8 relative overflow-hidden">
                    <!-- Subtle background gradient -->
                    <div class="absolute inset-0 bg-gradient-to-br from-arbor-moss/5 via-transparent to-arbor-emerald/5 pointer-events-none" />

                    <div class="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <!-- Avatar -->
                        <div class="w-24 h-24 rounded-full bg-arbor-moss/30 flex items-center justify-center shrink-0 overflow-hidden ring-4 ring-arbor-glass-border/50">
                            <img
                                v-if="avatarUrl"
                                :src="avatarUrl"
                                :alt="creator.name"
                                class="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <span v-else class="text-3xl font-display font-bold text-arbor-emerald">
                                {{ creator.name?.charAt(0)?.toUpperCase() ?? '?' }}
                            </span>
                        </div>

                        <div class="flex-1 text-center sm:text-left">
                            <h1 class="font-display text-2xl sm:text-3xl font-bold text-arbor-cream mb-2">
                                {{ creator.name }}
                            </h1>
                            <p v-if="creator.profile?.bio" class="text-arbor-sage mb-4 max-w-xl">
                                {{ creator.profile.bio }}
                            </p>

                            <div class="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-arbor-sage mb-4">
                                <div class="flex items-center gap-1 group cursor-default">
                                    <span class="font-semibold text-arbor-cream transition-transform group-hover:scale-110">{{ stats.sounds_count }}</span>
                                    <span>son{{ stats.sounds_count > 1 ? 's' : '' }}</span>
                                </div>
                                <div class="flex items-center gap-1 group cursor-default">
                                    <span class="font-semibold text-arbor-cream transition-transform group-hover:scale-110">{{ stats.followers_count }}</span>
                                    <span>abonné{{ stats.followers_count > 1 ? 's' : '' }}</span>
                                </div>
                                <div class="flex items-center gap-1 group cursor-default">
                                    <span class="font-semibold text-arbor-cream transition-transform group-hover:scale-110">{{ stats.following_count }}</span>
                                    <span>abonnements</span>
                                </div>
                                <div class="flex items-center gap-1 group cursor-default">
                                    <span class="font-semibold text-arbor-cream transition-transform group-hover:scale-110">{{ stats.total_plays }}</span>
                                    <span>écoutes</span>
                                </div>
                            </div>

                            <FollowButton
                                v-if="$page.props.auth.user && $page.props.auth.user.id !== creator.id"
                                :user-id="creator.id"
                                :initial-following="isFollowing"
                                size="md"
                            />
                        </div>
                    </div>
                </div>

                <!-- Sounds Grid -->
                <div v-if="sounds.data.length > 0">
                    <h2 class="font-semibold text-arbor-cream mb-6 text-lg">Enregistrements</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link
                            v-for="(sound, index) in sounds.data"
                            :key="sound.id"
                            :href="route('sounds.show', sound.slug)"
                            class="glass-card overflow-hidden hover:bg-white/10 transition-all duration-300 group hover-lift"
                            :style="`animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * 0.06}s; opacity: 0;`"
                        >
                            <div class="aspect-[16/9] bg-arbor-deep relative overflow-hidden">
                                <div
                                    v-if="sound.cover_url"
                                    class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    :style="`background-image: url(${sound.cover_url})`"
                                />
                                <div v-else class="absolute inset-0 flex items-center justify-center">
                                    <svg class="w-12 h-12 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <div class="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-arbor-night/80 text-xs text-arbor-cream">
                                    {{ formatDuration(sound.duration) }}
                                </div>
                                <!-- New badge -->
                                <div v-if="isNew(sound.created_at)" class="absolute top-2 left-2">
                                    <span class="badge badge-emerald text-[10px]">Nouveau</span>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div class="w-14 h-14 rounded-full bg-arbor-emerald/90 flex items-center justify-center shadow-lg shadow-arbor-emerald/30 transition-transform group-hover:scale-110">
                                        <svg class="w-6 h-6 text-arbor-night ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="p-5">
                                <h3 class="font-semibold text-arbor-cream mb-1 group-hover:text-arbor-emerald transition-colors">
                                    {{ sound.title }}
                                </h3>
                                <div class="flex items-center gap-3 text-xs text-arbor-sage">
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {{ sound.play_count }}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        {{ sound.like_count }}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16">
                    <div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-arbor-cream mb-2">Aucun son publié</h3>
                    <p class="text-arbor-sage">Ce créateur n'a pas encore publié d'enregistrements.</p>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
