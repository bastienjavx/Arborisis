<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import SoundMap from '@/Components/Map/SoundMap.vue';

const props = defineProps({
    categories: Array,
});

const sounds = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');
const searchTimeout = ref(null);

const hasSounds = computed(() => sounds.value.length > 0);

const fetchSounds = async () => {
    loading.value = true;
    try {
        const params = new URLSearchParams();
        if (selectedCategory.value) {
            params.append('category', selectedCategory.value);
        }

        const response = await fetch(`/api/map/sounds?${params.toString()}`);
        const data = await response.json();
        sounds.value = data.features ?? [];
    } catch (e) {
        console.error('Failed to load sounds:', e);
        sounds.value = [];
    } finally {
        loading.value = false;
    }
};

const searchSounds = async () => {
    if (!searchQuery.value || searchQuery.value.length < 2) {
        fetchSounds();
        return;
    }

    loading.value = true;
    try {
        const response = await fetch(`/api/map/sounds/search?q=${encodeURIComponent(searchQuery.value)}`);
        const data = await response.json();
        sounds.value = data.features ?? [];
    } catch (e) {
        console.error('Search failed:', e);
        sounds.value = [];
    } finally {
        loading.value = false;
    }
};

const onSearchInput = () => {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(searchSounds, 400);
};

const clearSearch = () => {
    searchQuery.value = '';
    fetchSounds();
};

const selectCategory = (id) => {
    selectedCategory.value = selectedCategory.value === id ? '' : id;
};

watch(selectedCategory, fetchSounds);

onMounted(() => {
    fetchSounds();
});
</script>

<template>
    <Head title="Carte sonore" />
    <GuestLayout>
        <div class="relative h-[calc(100vh-4rem)] min-h-[600px]">
            <!-- Sidebar filters -->
            <div class="absolute top-4 left-4 z-[1000] w-80 max-w-[calc(100vw-2rem)]">
                <div class="glass-card p-4 space-y-4">
                    <!-- Search -->
                    <div class="relative">
                        <svg
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-arbor-sage"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Rechercher un son, un lieu..."
                            class="w-full pl-10 pr-9 py-2.5 bg-arbor-deep border border-arbor-glass-border rounded-xl text-sm text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:border-arbor-emerald/50 transition-colors"
                            @input="onSearchInput"
                        />
                        <button
                            v-if="searchQuery"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-arbor-sage hover:text-arbor-cream"
                            @click="clearSearch"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Categories -->
                    <div class="flex flex-wrap gap-1.5">
                        <button
                            :class="[
                                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                                selectedCategory === ''
                                    ? 'bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30'
                                    : 'bg-arbor-deep text-arbor-sage border border-arbor-glass-border hover:border-arbor-sage/50',
                            ]"
                            @click="selectCategory('')"
                        >
                            Tous
                        </button>
                        <button
                            v-for="category in categories"
                            :key="category.id"
                            :class="[
                                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                                selectedCategory == category.id
                                    ? 'bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30'
                                    : 'bg-arbor-deep text-arbor-sage border border-arbor-glass-border hover:border-arbor-sage/50',
                            ]"
                            @click="selectCategory(category.id)"
                        >
                            {{ category.name }}
                        </button>
                    </div>

                    <!-- Results count -->
                    <div class="flex items-center justify-between text-xs text-arbor-sage">
                        <span>
                            {{ sounds.length }} son{{ sounds.length > 1 ? 's' : '' }} trouvé{{ sounds.length > 1 ? 's' : '' }}
                        </span>
                        <span v-if="loading" class="flex items-center gap-1">
                            <svg class="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Chargement...
                        </span>
                    </div>
                </div>
            </div>

            <!-- Map -->
            <SoundMap :sounds="sounds" />
        </div>
    </GuestLayout>
</template>
