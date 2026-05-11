<script setup>
import { computed, ref, defineAsyncComponent } from 'vue';
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

const audioFeaturesSafe = computed(() => props.audioFeatures ?? {});
const audioDistributionsSafe = computed(() => props.audioFeatureDistribution ?? {});
const statsSafe = computed(() => props.stats ?? {});

const audioFeatureRows = computed(() => Object.entries(audioFeaturesSafe.value).map(([key, stats]) => ({
    key,
    label: featureLabels[key] ?? key,
    description: featureDescriptions[key] ?? 'Feature acoustique extraite automatiquement du signal.',
    stats,
})));

const audioSummary = computed(() => {
    const totalAnalyses = Number(statsSafe.value.total_analyses ?? 0);
    const completedAnalyses = Number(statsSafe.value.completed_analyses ?? 0);
    const totalSounds = Number(statsSafe.value.total_sounds ?? 0);
    const featureCount = audioFeatureRows.value.length;
    const distributionCount = Object.keys(audioDistributionsSafe.value).length;

    return {
        totalAnalyses,
        completedAnalyses,
        pendingAnalyses: Math.max(totalAnalyses - completedAnalyses, 0),
        coverage: totalSounds > 0 ? Math.round((completedAnalyses / totalSounds) * 100) : 0,
        featureCount,
        distributionCount,
        hasFeatures: featureCount > 0,
    };
});

const featureLabels = {
    zcr: 'Zero Crossing Rate',
    rms: 'RMS Energy',
    spectral_centroid: 'Centroide spectral',
    spectral_rolloff: 'Rolloff spectral',
    spectral_bandwidth: 'Bande passante spectrale',
    zero_crossing_rate: 'Zero Crossing Rate',
};

const featureDescriptions = {
    zcr: 'Taux de passages par zéro, utile pour distinguer textures bruitées, impulsions et signaux tonals.',
    rms: 'Énergie moyenne du signal, indicateur de présence sonore et de dynamique globale.',
    spectral_centroid: 'Centre de gravité fréquentiel, souvent perçu comme la brillance du son.',
    spectral_rolloff: 'Fréquence sous laquelle se concentre la majorité de l’énergie spectrale.',
    spectral_bandwidth: 'Dispersion du spectre autour du centroide, liée à la richesse fréquentielle.',
    zero_crossing_rate: 'Alias du taux de passages par zéro conservé pour compatibilité dataset.',
};

const pipelineSteps = [
    { title: 'Ingestion', desc: 'Les sons publics publiés sont indexés sans exposer les fichiers privés ni les coordonnées exactes.' },
    { title: 'Prétraitement', desc: 'Décodage audio, normalisation et extraction de fenêtres temporelles adaptées aux sons naturels.' },
    { title: 'Features', desc: 'Calcul de métriques temporelles et spectrales pour comparer les paysages sonores.' },
    { title: 'Agrégation', desc: 'Publication de statistiques anonymisées, distributions et échantillons limités pour la recherche.' },
];

const qualityChecks = [
    'Données limitées aux sons publics et publiés.',
    'Coordonnées exactes exclues des exports publics.',
    'Agrégations géographiques arrondies avant affichage.',
    'API conçue pour des analyses reproductibles et non intrusives.',
];

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
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div class="glass-card p-5">
                            <p class="text-xs uppercase tracking-wider text-arbor-sage">Analyses terminées</p>
                            <p class="mt-2 font-display text-3xl font-bold text-arbor-cream">{{ audioSummary.completedAnalyses.toLocaleString('fr-FR') }}</p>
                            <p class="mt-1 text-xs text-arbor-sage">sur {{ audioSummary.totalAnalyses.toLocaleString('fr-FR') }} analyses créées</p>
                        </div>
                        <div class="glass-card p-5">
                            <p class="text-xs uppercase tracking-wider text-arbor-sage">Couverture dataset</p>
                            <p class="mt-2 font-display text-3xl font-bold text-arbor-emerald">{{ audioSummary.coverage }}%</p>
                            <div class="mt-3 h-1.5 rounded-full bg-arbor-deep overflow-hidden">
                                <div class="h-full rounded-full bg-arbor-emerald" :style="{ width: `${Math.min(audioSummary.coverage, 100)}%` }"></div>
                            </div>
                        </div>
                        <div class="glass-card p-5">
                            <p class="text-xs uppercase tracking-wider text-arbor-sage">Features publiées</p>
                            <p class="mt-2 font-display text-3xl font-bold text-arbor-cream">{{ audioSummary.featureCount }}</p>
                            <p class="mt-1 text-xs text-arbor-sage">{{ audioSummary.distributionCount }} distributions disponibles</p>
                        </div>
                        <div class="glass-card p-5">
                            <p class="text-xs uppercase tracking-wider text-arbor-sage">File d'attente</p>
                            <p class="mt-2 font-display text-3xl font-bold text-arbor-amber">{{ audioSummary.pendingAnalyses.toLocaleString('fr-FR') }}</p>
                            <p class="mt-1 text-xs text-arbor-sage">analyses non finalisées</p>
                        </div>
                    </div>

                    <div v-if="audioSummary.hasFeatures" class="space-y-6">
                        <AudioFeaturesChart :features="audioFeaturesSafe" :distributions="audioDistributionsSafe" />
                    </div>

                    <div v-else class="glass-card p-8 overflow-hidden relative">
                        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arbor-emerald/60 to-transparent"></div>
                        <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
                            <div>
                                <p class="text-xs uppercase tracking-widest text-arbor-emerald mb-3">Analyse audio</p>
                                <h3 class="font-display text-2xl font-semibold text-arbor-cream mb-3">Aucune feature exploitable n'est encore publiée</h3>
                                <p class="text-sm leading-relaxed text-arbor-sage">
                                    La page reste prête pour les résultats du pipeline. Dès que les analyses auront des métriques dans
                                    <code class="px-1.5 py-0.5 rounded bg-arbor-deep text-arbor-cream">features_json</code>, les graphiques,
                                    histogrammes et statistiques descriptives apparaîtront automatiquement.
                                </p>
                            </div>
                            <div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/50 p-5">
                                <p class="text-xs uppercase tracking-wider text-arbor-sage mb-4">À vérifier côté pipeline</p>
                                <div class="space-y-3">
                                    <div class="flex items-start gap-3">
                                        <span class="mt-1 h-2 w-2 rounded-full bg-arbor-emerald"></span>
                                        <p class="text-sm text-arbor-sage">Les analyses sont marquées comme traitées via <code class="text-arbor-cream">processed_at</code>.</p>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-1 h-2 w-2 rounded-full bg-arbor-amber"></span>
                                        <p class="text-sm text-arbor-sage">Le JSON contient les chemins attendus : temporal, spectral, stats et values.</p>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-1 h-2 w-2 rounded-full bg-arbor-moss"></span>
                                        <p class="text-sm text-arbor-sage">Les sons associés sont publics et publiés, sinon ils restent exclus.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="glass-card p-6">
                            <h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Pipeline d'analyse</h3>
                            <div class="space-y-4">
                                <div
                                    v-for="(step, index) in pipelineSteps"
                                    :key="step.title"
                                    class="flex gap-4 rounded-xl border border-arbor-glass-border/70 bg-arbor-deep/35 p-4"
                                >
                                    <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-arbor-emerald/10 text-xs font-mono text-arbor-emerald">
                                        {{ index + 1 }}
                                    </div>
                                    <div>
                                        <h4 class="text-sm font-semibold text-arbor-cream">{{ step.title }}</h4>
                                        <p class="mt-1 text-sm leading-relaxed text-arbor-sage">{{ step.desc }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="glass-card p-6">
                            <h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Qualité & confidentialité</h3>
                            <div class="space-y-3">
                                <div
                                    v-for="check in qualityChecks"
                                    :key="check"
                                    class="flex items-start gap-3 rounded-lg bg-arbor-deep/35 px-3 py-2.5"
                                >
                                    <span class="mt-1 h-2 w-2 rounded-full bg-arbor-emerald"></span>
                                    <p class="text-sm text-arbor-sage">{{ check }}</p>
                                </div>
                            </div>
                            <div class="mt-5 rounded-xl border border-arbor-amber/25 bg-arbor-amber/10 p-4">
                                <p class="text-sm leading-relaxed text-arbor-sage">
                                    Les métriques audio sont des indicateurs descriptifs. Elles ne remplacent pas une annotation naturaliste
                                    ni une validation experte des espèces ou habitats.
                                </p>
                            </div>
                        </div>
                    </div>

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
                                        v-for="row in audioFeatureRows"
                                        :key="row.key"
                                        class="border-b border-arbor-glass-border/50 hover:bg-arbor-glass/20 transition-colors"
                                    >
                                        <td class="px-4 py-3">
                                            <div class="text-arbor-cream font-medium">{{ row.label }}</div>
                                            <div class="mt-1 max-w-sm text-xs text-arbor-sage/70">{{ row.description }}</div>
                                        </td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ row.stats.count }}</td>
                                        <td class="px-4 py-3 text-arbor-emerald font-mono">{{ Number(row.stats.mean).toExponential(3) }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ Number(row.stats.median).toExponential(3) }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ Number(row.stats.std).toExponential(3) }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ Number(row.stats.min).toExponential(3) }}</td>
                                        <td class="px-4 py-3 text-arbor-sage font-mono">{{ Number(row.stats.max).toExponential(3) }}</td>
                                    </tr>
                                    <tr v-if="audioFeatureRows.length === 0">
                                        <td colspan="7" class="px-4 py-8 text-center text-arbor-sage">
                                            Aucune statistique descriptive disponible pour le moment.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="glass-card p-6">
                        <h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Dictionnaire des features</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            <div
                                v-for="(description, key) in featureDescriptions"
                                :key="key"
                                class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4"
                            >
                                <code class="text-xs text-arbor-emerald">{{ key }}</code>
                                <h4 class="mt-2 text-sm font-semibold text-arbor-cream">{{ featureLabels[key] ?? key }}</h4>
                                <p class="mt-1 text-sm leading-relaxed text-arbor-sage">{{ description }}</p>
                            </div>
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
