<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { ref, computed } from 'vue';

const props = defineProps({
    sounds: Object,
    categories: Array,
});

const selectedCategory = ref('');

const filteredSounds = computed(() => {
    if (!selectedCategory.value) return props.sounds.data;
    return props.sounds.data.filter(s => s.category_id === selectedCategory.value);
});

const isNew = (createdAt) => {
    if (!createdAt) return false;
    const date = new Date(createdAt);
    const now = new Date();
    const diffDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffDays < 7;
};

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
                    <button
                        @click="selectedCategory = ''"
                        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        :class="selectedCategory === '' ? 'bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30 shadow-sm shadow-arbor-emerald/5' : 'bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent'"
                    >
                        Tous
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category.id"
                        @click="selectedCategory = selectedCategory === category.id ? '' : category.id"
                        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        :class="selectedCategory === category.id ? 'bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30 shadow-sm shadow-arbor-emerald/5' : 'bg-arbor-glass text-arbor-sage hover:bg-white/10 border border-transparent'"
                    >
                        {{ category.name }}
                    </button>
                </div>

                <!-- Results count -->
                <div class="mb-6 text-sm text-arbor-sage">
                    <span class="text-arbor-emerald font-medium">{{ filteredSounds.length }}</span>
                    son{{ filteredSounds.length > 1 ? 's' : '' }} trouvé{{ filteredSounds.length > 1 ? 's' : '' }}
                </div>

                <!-- Sounds Grid -->
                <div v-if="filteredSounds.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        v-for="(sound, index) in filteredSounds"
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
                                loading="lazy"
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
                    <div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-arbor-cream mb-2">Aucun son pour le moment</h3>
                    <p class="text-arbor-sage mb-6">Soyez le premier à publier un enregistrement naturel.</p>
                    <Link v-if="$page.props.auth.user" href="/sounds/create" class="btn-primary">
                        Publier un son
                    </Link>
                    <Link v-else href="/register" class="btn-primary">
                        Créer un compte
                    </Link>
                </div>

                <!-- Pagination -->
                <div v-if="sounds.links && sounds.links.length > 3" class="mt-12 flex justify-center">
                    <div class="flex items-center gap-2">
                        <template v-for="(link, index) in sounds.links" :key="index">
                            <Link
                                v-if="link.url"
                                :href="link.url"
                                class="px-4 py-2 rounded-lg text-sm transition-colors"
                                :class="link.active ? 'bg-arbor-emerald/15 text-arbor-emerald border border-arbor-emerald/30' : 'text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass border border-transparent'"
                                v-html="link.label"
                            />
                            <span
                                v-else
                                class="px-4 py-2 rounded-lg text-sm text-arbor-sage/50"
                                v-html="link.label"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
