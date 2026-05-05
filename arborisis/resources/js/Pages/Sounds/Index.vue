<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const props = defineProps({
    sounds: Object,
    categories: Array,
});

const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
</script>

<template>
    <Head title="Sons naturels" />
    <GuestLayout>
        <div class="pt-24 pb-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-12">
                    <h1 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4">
                        Sons naturels
                    </h1>
                    <p class="text-arbor-sage max-w-xl">
                        Explorez les enregistrements géolocalisés de notre communauté de field recorders.
                    </p>
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap gap-2 mb-8">
                    <button class="px-4 py-2 rounded-lg bg-arbor-emerald/10 text-arbor-emerald text-sm font-medium">
                        Tous
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category.id"
                        class="px-4 py-2 rounded-lg bg-arbor-glass text-arbor-sage text-sm font-medium hover:bg-arbor-glass/50 transition-colors"
                    >
                        {{ category.name }}
                    </button>
                </div>

                <!-- Sounds Grid -->
                <div v-if="sounds.data.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        v-for="sound in sounds.data"
                        :key="sound.id"
                        :href="route('sounds.show', sound.slug)"
                        class="glass-card overflow-hidden hover:bg-arbor-glass/50 transition-all duration-300 group"
                    >
                        <div class="aspect-[16/9] bg-arbor-deep relative overflow-hidden">
                            <div
                                v-if="sound.cover_image"
                                class="absolute inset-0 bg-cover bg-center"
                                :style="`background-image: url(${sound.cover_image})`"
                            />
                            <div v-else class="absolute inset-0 flex items-center justify-center">
                                <svg class="w-12 h-12 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <div class="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-arbor-night/80 text-xs text-arbor-cream">
                                {{ formatDuration(sound.duration) }}
                            </div>
                            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="w-14 h-14 rounded-full bg-arbor-emerald/90 flex items-center justify-center">
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
                            <p class="text-sm text-arbor-sage mb-3">
                                {{ sound.user?.name ?? 'Anonyme' }}
                            </p>
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

                <!-- Empty State -->
                <div v-else class="text-center py-24">
                    <svg class="w-16 h-16 text-arbor-moss/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <h3 class="text-lg font-semibold text-arbor-cream mb-2">Aucun son pour le moment</h3>
                    <p class="text-arbor-sage mb-6">Soyez le premier à publier un enregistrement naturel.</p>
                    <Link v-if="$page.props.auth.user" href="/sounds/create" class="btn-primary">
                        Publier un son
                    </Link>
                    <Link v-else href="/register" class="btn-primary">
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
