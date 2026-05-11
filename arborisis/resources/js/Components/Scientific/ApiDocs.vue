<script setup>
const endpoints = [
    { method: 'GET', path: '/api/scientific-stats/global', desc: 'Statistiques globales (total, durée, créateurs, analyses)' },
    { method: 'GET', path: '/api/scientific-stats/categories', desc: 'Distribution par catégorie avec durée moyenne' },
    { method: 'GET', path: '/api/scientific-stats/environments', desc: 'Distribution par environnement' },
    { method: 'GET', path: '/api/scientific-stats/temporal', desc: 'Série temporelle mensuelle (quantité + durée moyenne)' },
    { method: 'GET', path: '/api/scientific-stats/geo-heatmap', desc: 'Heatmap géographique agrégée (privacy-safe)' },
    { method: 'GET', path: '/api/scientific-stats/audio-features', desc: 'Statistiques descriptives et distributions des features audio' },
    { method: 'GET', path: '/api/scientific-stats/top-locations', desc: 'Top lieux par nombre d\'enregistrements' },
    { method: 'GET', path: '/api/scientific-stats/equipment', desc: 'Distribution des équipements de recording' },
    { method: 'GET', path: '/api/scientific-stats/raw-data?limit=100', desc: 'Échantillon de données brutes (max 1000 lignes)' },
];

const baseUrl = 'https://<redacted>.com';

const colors = {
    GET: 'text-arbor-emerald bg-arbor-emerald/10 border-arbor-emerald/30',
};

const examples = [
    {
        title: 'Statistiques globales',
        command: `curl -H "Accept: application/json" \\\n  ${baseUrl}/api/scientific-stats/global`,
    },
    {
        title: 'Features audio',
        command: `curl -H "Accept: application/json" \\\n  ${baseUrl}/api/scientific-stats/audio-features`,
    },
    {
        title: 'Échantillon limité',
        command: `curl -H "Accept: application/json" \\\n  "${baseUrl}/api/scientific-stats/raw-data?limit=100"`,
    },
];
</script>

<template>
    <div class="glass-card p-6">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div>
                <h3 class="font-display text-xl font-semibold text-arbor-cream mb-2">API Open Data</h3>
                <p class="text-sm text-arbor-sage max-w-3xl">
                    Toutes les données exposées sont agrégées et anonymisées. Aucune coordonnée exacte ni donnée personnelle n'est accessible.
                </p>
            </div>
            <div class="rounded-xl border border-arbor-emerald/25 bg-arbor-emerald/10 px-4 py-3">
                <p class="text-xs uppercase tracking-wider text-arbor-sage">Base URL</p>
                <code class="mt-1 block text-sm text-arbor-emerald">{{ baseUrl }}</code>
            </div>
        </div>

        <div class="space-y-3">
            <div
                v-for="ep in endpoints"
                :key="ep.path"
                class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl border border-arbor-glass-border bg-arbor-deep/40 hover:bg-arbor-deep/70 transition-colors"
            >
                <div class="flex items-center gap-3 min-w-[260px]">
                    <span :class="['text-xs font-bold px-2 py-0.5 rounded border', colors[ep.method]]">
                        {{ ep.method }}
                    </span>
                    <code class="text-arbor-cream font-mono text-sm">{{ ep.path }}</code>
                </div>
                <p class="text-sm text-arbor-sage">{{ ep.desc }}</p>
            </div>
        </div>

        <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div
                v-for="example in examples"
                :key="example.title"
                class="p-4 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border"
            >
                <p class="text-xs text-arbor-sage font-mono mb-2">{{ example.title }}</p>
                <pre class="overflow-x-auto whitespace-pre-wrap text-arbor-emerald font-mono text-xs leading-relaxed">{{ example.command }}</pre>
            </div>
        </div>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4">
                <h4 class="text-sm font-semibold text-arbor-cream mb-2">Format</h4>
                <p class="text-sm text-arbor-sage">Réponses JSON sous la clé <code class="text-arbor-cream">data</code>, prêtes pour notebooks, scripts ou dashboards.</p>
            </div>
            <div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4">
                <h4 class="text-sm font-semibold text-arbor-cream mb-2">Confidentialité</h4>
                <p class="text-sm text-arbor-sage">Les coordonnées publiques sont approximées et les lieux sensibles ne sont jamais exposés précisément.</p>
            </div>
            <div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4">
                <h4 class="text-sm font-semibold text-arbor-cream mb-2">Limites</h4>
                <p class="text-sm text-arbor-sage">L'endpoint raw-data accepte <code class="text-arbor-cream">limit</code> avec un maximum serveur de 1000 lignes.</p>
            </div>
        </div>
    </div>
</template>
