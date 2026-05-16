<script setup>
import { ref, computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const props = defineProps({
    points: Object,
    filters: Object,
});

const search = ref(props.filters?.q ?? '');
const habitat = ref(props.filters?.habitat ?? '');

const habitatOptions = [
    { value: '', label: 'Tous les habitats' },
    { value: 'forest', label: 'Forêt' },
    { value: 'wetland', label: 'Zone humide' },
    { value: 'river', label: 'Rivière' },
    { value: 'meadow', label: 'Prairie' },
    { value: 'ocean', label: 'Océan' },
    { value: 'mountain', label: 'Montagne' },
    { value: 'urban_nature', label: 'Nature urbaine' },
];
</script>

<template>
    <Head title="Points d'écoute" />
    <GuestLayout>
        <div class="min-h-screen bg-arbor-night">
            <!-- Hero -->
            <div class="relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-b from-arbor-moss/10 via-transparent to-transparent pointer-events-none"></div>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
                    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <div class="flex items-center gap-2 mb-3">
                                <span class="inline-block w-2 h-2 rounded-full bg-arbor-emerald animate-pulse"></span>
                                <span class="text-xs font-medium text-arbor-emerald uppercase tracking-widest">Écoute scientifique</span>
                            </div>
                            <h1 class="font-display text-4xl md:text-5xl font-bold text-arbor-cream leading-tight">
                                Points d'écoute
                            </h1>
                            <p class="mt-3 text-arbor-sage text-lg max-w-2xl">
                                Lieux suivis dans le temps par la communauté Arborisis. Chaque point rassemble plusieurs enregistrements pour observer l'évolution sonore de la nature.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div class="glass-card p-4 flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Rechercher un lieu..."
                            class="w-full bg-arbor-deep/50 border border-arbor-glass-border rounded-lg px-4 py-2 text-arbor-cream placeholder-arbor-sage/50 focus:outline-none focus:border-arbor-emerald/50"
                        />
                    </div>
                    <div class="sm:w-48">
                        <select
                            v-model="habitat"
                            class="w-full bg-arbor-deep/50 border border-arbor-glass-border rounded-lg px-4 py-2 text-arbor-cream focus:outline-none focus:border-arbor-emerald/50"
                        >
                            <option v-for="opt in habitatOptions" :key="opt.value" :value="opt.value">
                                {{ opt.label }}
                            </option>
                        </select>
                    </div>
                    <Link
                        :href="route('listening-points.index', { q: search, habitat: habitat })"
                        class="px-6 py-2 bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30 rounded-lg hover:bg-arbor-emerald/30 transition-colors text-sm font-medium text-center"
                    >
                        Filtrer
                    </Link>
                </div>
            </div>

            <!-- Grid -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        v-for="point in points.data"
                        :key="point.id"
                        :href="route('listening-points.show', point.slug)"
                        class="glass-card p-6 group hover:border-arbor-emerald/30 transition-all duration-300"
                    >
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-2">
                                <span class="text-2xl">
                                    {{ point.habitat_type === 'forest' ? '🌲' : point.habitat_type === 'wetland' ? '💧' : point.habitat_type === 'river' ? '🌊' : point.habitat_type === 'meadow' ? '🌾' : point.habitat_type === 'ocean' ? '🌊' : point.habitat_type === 'mountain' ? '⛰️' : '📍' }}
                                </span>
                                <span class="text-xs text-arbor-sage uppercase tracking-wider">{{ point.habitat_type }}</span>
                            </div>
                            <span class="text-xs font-mono text-arbor-emerald">{{ point.sounds_count }} enreg.</span>
                        </div>

                        <h3 class="font-display text-xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors">
                            {{ point.title }}
                        </h3>

                        <p class="mt-2 text-sm text-arbor-sage line-clamp-2">
                            {{ point.description || 'Aucune description disponible.' }}
                        </p>

                        <div class="mt-4 flex items-center gap-4 text-xs text-arbor-sage/70">
                            <span>{{ point.public_latitude?.toFixed(2) }}, {{ point.public_longitude?.toFixed(2) }}</span>
                            <span v-if="point.first_recorded_at">
                                Depuis {{ new Date(point.first_recorded_at).getFullYear() }}
                            </span>
                        </div>

                        <div class="mt-4 flex items-center gap-2">
                            <div class="flex -space-x-2">
                                <div
                                    v-for="contributor in point.contributors?.slice(0, 3)"
                                    :key="contributor.id"
                                    class="w-7 h-7 rounded-full bg-arbor-moss border-2 border-arbor-deep flex items-center justify-center text-[10px] text-arbor-cream"
                                >
                                    {{ contributor.name?.charAt(0)?.toUpperCase() }}
                                </div>
                            </div>
                            <span class="text-xs text-arbor-sage/70">
                                {{ point.contributors?.length || 1 }} contributeur{{ point.contributors?.length > 1 ? 's' : '' }}
                            </span>
                        </div>
                    </Link>
                </div>

                <!-- Pagination -->
                <div v-if="points.links.length > 3" class="mt-10 flex justify-center">
                    <div class="flex gap-2">
                        <Link
                            v-for="link in points.links"
                            :key="link.label"
                            :href="link.url"
                            v-html="link.label"
                            class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                            :class="link.active
                                ? 'bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30'
                                : 'text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30 border border-transparent'
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
