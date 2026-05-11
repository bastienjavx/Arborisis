<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { Head } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import StatCard from '@/Components/Scientific/StatCard.vue';

const CategoryChart = defineAsyncComponent(() => import('@/Components/Scientific/CategoryChart.vue'));
const EnvironmentChart = defineAsyncComponent(() => import('@/Components/Scientific/EnvironmentChart.vue'));
const TemporalChart = defineAsyncComponent(() => import('@/Components/Scientific/TemporalChart.vue'));
const GeoHeatmap = defineAsyncComponent(() => import('@/Components/Scientific/GeoHeatmap.vue'));
const AudioFeaturesChart = defineAsyncComponent(() => import('@/Components/Scientific/AudioFeaturesChart.vue'));
const DataTable = defineAsyncComponent(() => import('@/Components/Scientific/DataTable.vue'));
const ApiDocs = defineAsyncComponent(() => import('@/Components/Scientific/ApiDocs.vue'));
const EquipmentChart = defineAsyncComponent(() => import('@/Components/Scientific/EquipmentChart.vue'));

const props = defineProps({
    stats: Object,
    categoryDistribution: Array,
    environmentDistribution: Array,
    temporalDistribution: Array,
    geoHeatmap: Array,
    audioFeatures: Object,
    audioFeatureDistribution: Object,
    topLocations: Array,
    equipmentDistribution: Array,
    rawDataSample: Array,
});

const activeTab = ref('overview');

const tabs = [
    { key: 'overview', label: 'Vue d\'ensemble' },
    { key: 'geo', label: 'Géographie' },
    { key: 'audio', label: 'Analyse audio' },
    { key: 'data', label: 'Données brutes' },
    { key: 'api', label: 'API' },
];

function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
}
</script>

<template>
    <Head title="Données scientifiques & statistiques" />
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
                                <span class="text-xs font-medium text-arbor-emerald uppercase tracking-widest">Open Data</span>
                            </div>
                            <h1 class="font-display text-4xl md:text-5xl font-bold text-arbor-cream leading-tight">
                                Données scientifiques
                            </h1>
                            <p class="mt-3 text-arbor-sage text-lg max-w-2xl">
                                Statistiques agrégées et anonymisées de la plateforme Arborisis, destinées à la recherche, la data science et la conservation.
                            </p>
                        </div>
                        <div class="text-right hidden md:block">
                            <p class="text-xs text-arbor-sage/60 font-mono">
                                Mis à jour : {{ new Date().toLocaleDateString('fr-FR') }}
                            </p>
                            <p class="text-xs text-arbor-sage/60 font-mono">
                                {{ props.stats.total_sounds?.toLocaleString('fr-FR') }} sons indexés
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats row -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <StatCard label="Enregistrements" :value="props.stats.total_sounds" icon="🎙️" />
                    <StatCard label="Durée totale" :value="Math.round((props.stats.total_duration_seconds || 0) / 3600)" suffix="h" icon="⏱️" />
                    <StatCard label="Créateurs" :value="props.stats.total_creators" icon="👤" />
                    <StatCard label="Lieux uniques" :value="props.stats.total_locations" icon="📍" />
                    <StatCard label="Analyses" :value="props.stats.completed_analyses" icon="📊" />
                    <StatCard label="Durée moy." :value="Math.round(props.stats.avg_duration_seconds || 0)" suffix="s" icon="📏" />
                </div>
            </div>

            <!-- Tabs -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
                <div class="flex flex-wrap gap-1 p-1 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border backdrop-blur-sm">
                    <button
                        v-for="tab in tabs"
                        :key="tab.key"
                        @click="activeTab = tab.key"
                        :class="[
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            activeTab === tab.key
                                ? 'bg-arbor-moss/20 text-arbor-emerald border border-arbor-emerald/30'
                                : 'text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30',
                        ]"
                    >
                        {{ tab.label }}
                    </button>
                </div>
            </div>

            <!-- Tab content -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <!-- Overview -->
                <div v-if="activeTab === 'overview'" class="space-y-6 animate-fade-in">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <CategoryChart :categories="props.categoryDistribution" />
                        <EnvironmentChart :data="props.environmentDistribution" />
                    </div>
                    <TemporalChart :data="props.temporalDistribution" />
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="glass-card p-6">
                            <h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Lieux les plus enregistrés</h3>
                            <div class="space-y-2">
                                <div
                                    v-for="(loc, i) in props.topLocations.slice(0, 10)"
                                    :key="i"
                                    class="flex items-center justify-between p-2.5 rounded-lg bg-arbor-deep/50 border border-arbor-glass-border/50 hover:border-arbor-emerald/30 transition-colors"
                                >
                                    <div class="flex items-center gap-3">
                                        <span class="text-xs font-mono text-arbor-sage w-5">{{ i + 1 }}</span>
                                        <span class="text-sm text-arbor-cream">{{ loc.name }}</span>
                                    </div>
                                    <span class="text-xs font-mono text-arbor-emerald">{{ loc.count }}</span>
                                </div>
                            </div>
                        </div>
                        <EquipmentChart :data="props.equipmentDistribution" />
                    </div>
                </div>

                <!-- Geography -->
                <div v-if="activeTab === 'geo'" class="space-y-6 animate-fade-in">
                    <GeoHeatmap :points="props.geoHeatmap" />
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="glass-card p-6 lg:col-span-2">
                            <h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Densité par région</h3>
                            <div class="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                <div
                                    v-for="(loc, i) in props.geoHeatmap.slice(0, 50)"
                                    :key="i"
                                    class="flex items-center justify-between p-2 rounded-lg bg-arbor-deep/30"
                                >
                                    <div class="flex items-center gap-3">
                                        <span class="text-xs font-mono text-arbor-sage">{{ i + 1 }}</span>
                                        <span class="text-sm text-arbor-cream font-mono">{{ loc.lat.toFixed(1) }}, {{ loc.lng.toFixed(1) }}</span>
                                        <span class="text-xs text-arbor-sage/70 truncate max-w-[200px]">{{ loc.categories }}</span>
                                    </div>
                                    <span class="text-xs font-mono text-arbor-emerald">{{ loc.count }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="glass-card p-6">
                            <h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Méthodologie</h3>
                            <div class="space-y-3 text-sm text-arbor-sage">
                                <p>Les coordonnées sont agrégées par cellules de <strong class="text-arbor-cream">0.1°</strong> (environ 11 km) pour préserver la confidentialité des lieux sensibles.</p>
                                <p>Les coordonnées exactes des enregistrements ne sont jamais exposées publiquement.</p>
                                <p>Seuls les enregistrements <strong class="text-arbor-cream">publics</strong> et <strong class="text-arbor-cream">publiés</strong> sont comptabilisés.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Audio -->
                <div v-if="activeTab === 'audio'" class="space-y-6 animate-fade-in">
                    <AudioFeaturesChart :features="props.audioFeatures" :distributions="props.audioFeatureDistribution" />
                    <div class="glass-card p-6">
                        <h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Statistiques descriptives — Features audio</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs text-arbor-sage uppercase border-b border-arbor-glass-border">
                                    <tr>
                                        <th class="px-4 py-3">Feature</th>
                                        <th class="px-4 py-3">N</th>
                                        <th class="px-4 py-3">Moyenne</th>
                                        <th class="px-4 py-3">Médiane</th>
                                        <th class="px-4 py-3">Écart-type</th>
                                        <th class="px-4 py-3">Min</th>
                                        <th class="px-4 py-3">Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(stats, key) in props.audioFeatures"
                                        :key="key"
                                        class="border-b border-arbor-glass-border/50 hover:bg-arbor-glass/20 transition-colors"
                                    >
                                        <td class="px-4 py-3 text-arbor-cream font-medium">{{ key }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ stats.count }}</td>
                                        <td class="px-4 py-3 text-arbor-emerald font-mono">{{ stats.mean.toExponential(3) }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ stats.median.toExponential(3) }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ stats.std.toExponential(3) }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ stats.min.toExponential(3) }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ stats.max.toExponential(3) }}</td>
                                    </tr>
                                    <tr v-if="Object.keys(props.audioFeatures).length === 0">
                                        <td colspan="7" class="px-4 py-8 text-center text-arbor-sage">Aucune analyse audio disponible pour le moment.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Data -->
                <div v-if="activeTab === 'data'" class="space-y-6 animate-fade-in">
                    <DataTable :data="props.rawDataSample" />
                    <div class="glass-card p-6">
                        <h3 class="font-display text-xl font-semibold text-arbor-cream mb-2">Licence d'utilisation des données</h3>
                        <p class="text-sm text-arbor-sage">
                            Les données exposées sur cette page et via l'API sont agrégées et anonymisées. Elles sont mises à disposition à des fins de recherche scientifique, d'éducation et de conservation.
                            Merci de citer <strong class="text-arbor-cream">Arborisis</strong> dans vos publications. Pour un accès à des données plus granulaires ou spécifiques, contactez l'équipe.
                        </p>
                    </div>
                </div>

                <!-- API -->
                <div v-if="activeTab === 'api'" class="space-y-6 animate-fade-in">
                    <ApiDocs />
                </div>
            </div>
        </div>
    </GuestLayout>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
