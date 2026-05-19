import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-sK8SLxpB.js";
import { t as _sfc_main$2 } from "./GuestLayout-BBezdEIa.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineAsyncComponent, mergeProps, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/Scientific/StatCard.vue
var _sfc_main$1 = {
	__name: "StatCard",
	__ssrInlineRender: true,
	props: {
		label: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		},
		suffix: {
			type: String,
			default: ""
		},
		decimals: {
			type: Number,
			default: 0
		},
		icon: {
			type: String,
			default: ""
		}
	},
	setup(__props) {
		const props = __props;
		const displayValue = ref(0);
		const iconMap = {
			audio: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
			time: "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z",
			users: "M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 11-8 0 4 4 0 018 0zm8 0a3 3 0 11-6 0 3 3 0 016 0z",
			location: "M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
			data: "M4 19V5m0 14h16M8 17V9m4 8V7m4 10v-5",
			score: "M9 12l2 2 4-4m5.618-4.016A12 12 0 0112 2.944a12 12 0 01-8.618 3.04A12 12 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
		};
		function animateCount(target, duration = 1200) {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				displayValue.value = target;
				return;
			}
			const start = performance.now();
			const from = 0;
			function step(now) {
				const progress = Math.min((now - start) / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				displayValue.value = from + (target - from) * eased;
				if (progress < 1) requestAnimationFrame(step);
			}
			requestAnimationFrame(step);
		}
		onMounted(() => {
			animateCount(props.value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "field-stat hover-lift transition-transform duration-300" }, _attrs))}><div class="flex items-start justify-between"><div><p class="text-arbor-sage text-sm font-medium tracking-wide uppercase">${ssrInterpolate(__props.label)}</p><p class="mt-2 text-3xl font-mono font-semibold text-arbor-cream">${ssrInterpolate(__props.decimals > 0 ? displayValue.value.toFixed(__props.decimals) : Math.round(displayValue.value).toLocaleString("fr-FR"))} `);
			if (__props.suffix) _push(`<span class="text-lg text-arbor-sage ml-1">${ssrInterpolate(__props.suffix)}</span>`);
			else _push(`<!---->`);
			_push(`</p></div>`);
			if (__props.icon) {
				_push(`<div class="grid h-10 w-10 place-items-center rounded-full border border-arbor-lichen/20 bg-arbor-lichen/10 text-arbor-lichen">`);
				if (iconMap[__props.icon]) _push(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", iconMap[__props.icon])}></path></svg>`);
				else _push(`<span class="text-lg">${ssrInterpolate(__props.icon)}</span>`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Scientific/StatCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/ScientificStats/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
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
		listeningPoints: Object,
		speciesDistribution: Array,
		globalMetrics: Object,
		qualityOverview: Object,
		datasetCompleteness: Object,
		datasetSchema: Array,
		environmentalOverview: Object
	},
	setup(__props) {
		const CategoryChart = defineAsyncComponent(() => import("./CategoryChart-CvmOm12l.js"));
		const EnvironmentChart = defineAsyncComponent(() => import("./EnvironmentChart-B29opKrf.js"));
		const TemporalChart = defineAsyncComponent(() => import("./TemporalChart-DUgDufeZ.js"));
		const GeoHeatmap = defineAsyncComponent(() => import("./GeoHeatmap-CF74YXMg.js"));
		const AudioFeaturesChart = defineAsyncComponent(() => import("./AudioFeaturesChart-CMs6DpZW.js"));
		const DataTable = defineAsyncComponent(() => import("./DataTable-Budp0lVU.js"));
		const ApiDocs = defineAsyncComponent(() => import("./ApiDocs-DEKkzWzd.js"));
		const EquipmentChart = defineAsyncComponent(() => import("./EquipmentChart-DQZ91oBU.js"));
		const props = __props;
		const activeTab = ref("overview");
		const audioFeaturesSafe = computed(() => props.audioFeatures ?? {});
		const audioDistributionsSafe = computed(() => props.audioFeatureDistribution ?? {});
		const statsSafe = computed(() => props.stats ?? {});
		const datasetCompletenessSafe = computed(() => props.datasetCompleteness ?? {
			fields: [],
			scientific_readiness_score: 0
		});
		const datasetSchemaSafe = computed(() => props.datasetSchema ?? []);
		computed(() => props.qualityOverview ?? {});
		const modelWeatherContext = computed(() => props.globalMetrics?.weather_context ?? props.environmentalOverview ?? {});
		const datasetSummary = computed(() => {
			const fields = datasetCompletenessSafe.value.fields ?? [];
			const criticalFields = [
				"recorded_at",
				"duration",
				"category",
				"environment",
				"public_location",
				"completed_analysis",
				"species_detection"
			];
			const criticalCoverage = fields.filter((field) => criticalFields.includes(field.field));
			const meanCriticalCoverage = criticalCoverage.length ? Math.round(criticalCoverage.reduce((sum, field) => sum + Number(field.percentage ?? 0), 0) / criticalCoverage.length) : 0;
			return {
				readiness: Math.round(Number(datasetCompletenessSafe.value.scientific_readiness_score ?? 0)),
				rows: Number(datasetCompletenessSafe.value.sounds_count ?? statsSafe.value.total_sounds ?? 0),
				columns: datasetSchemaSafe.value.length,
				criticalCoverage: meanCriticalCoverage,
				fields
			};
		});
		const modelCards = computed(() => [{
			key: "biodiversity_score",
			title: "SBS",
			name: "Sound Biodiversity Score",
			metric: props.globalMetrics?.biodiversity_score ?? {},
			desc: "Score descriptif combinant espèces détectées, diversité acoustique et équilibre spectral.",
			endpoint: "/api/scientific-stats/model-stats"
		}, {
			key: "acoustic_activity_score",
			title: "AAS",
			name: "Acoustic Activity Score",
			metric: props.globalMetrics?.acoustic_activity_score ?? {},
			desc: "Score descriptif basé sur loudness, événements acoustiques, silence et énergie RMS.",
			endpoint: "/api/scientific-stats/model-stats"
		}]);
		const modelWeatherSummary = computed(() => ({
			coverage: modelWeatherContext.value.coverage ?? {},
			averages: modelWeatherContext.value.averages ?? {},
			conditions: modelWeatherContext.value.weather_conditions ?? [],
			activityByCondition: modelWeatherContext.value.activity_by_weather_condition ?? [],
			biodiversityByCondition: modelWeatherContext.value.biodiversity_by_weather_condition ?? [],
			individualSounds: modelWeatherContext.value.individual_sounds ?? []
		}));
		const audioFeatureRows = computed(() => Object.entries(audioFeaturesSafe.value).map(([key, stats]) => ({
			key,
			label: featureLabels[key] ?? key,
			description: featureDescriptions[key] ?? "Feature acoustique extraite automatiquement du signal.",
			stats
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
				coverage: totalSounds > 0 ? Math.round(completedAnalyses / totalSounds * 100) : 0,
				featureCount,
				distributionCount,
				hasFeatures: featureCount > 0
			};
		});
		const featureLabels = {
			zcr: "Zero Crossing Rate",
			rms: "RMS Energy",
			spectral_centroid: "Centroide spectral",
			spectral_rolloff: "Rolloff spectral",
			spectral_bandwidth: "Bande passante spectrale",
			zero_crossing_rate: "Zero Crossing Rate"
		};
		const featureDescriptions = {
			zcr: "Taux de passages par zéro, utile pour distinguer textures bruitées, impulsions et signaux tonals.",
			rms: "Énergie moyenne du signal, indicateur de présence sonore et de dynamique globale.",
			spectral_centroid: "Centre de gravité fréquentiel, souvent perçu comme la brillance du son.",
			spectral_rolloff: "Fréquence sous laquelle se concentre la majorité de l’énergie spectrale.",
			spectral_bandwidth: "Dispersion du spectre autour du centroide, liée à la richesse fréquentielle.",
			zero_crossing_rate: "Alias du taux de passages par zéro conservé pour compatibilité dataset."
		};
		const pipelineSteps = [
			{
				title: "Ingestion",
				desc: "Les sons publics publiés sont indexés sans exposer les fichiers privés ni les coordonnées exactes."
			},
			{
				title: "Prétraitement",
				desc: "Décodage audio, normalisation et extraction de fenêtres temporelles adaptées aux sons naturels."
			},
			{
				title: "Features",
				desc: "Calcul de métriques temporelles et spectrales pour comparer les paysages sonores."
			},
			{
				title: "Agrégation",
				desc: "Publication de statistiques anonymisées, distributions et échantillons limités pour la recherche."
			}
		];
		const qualityChecks = [
			"Données limitées aux sons publics et publiés.",
			"Coordonnées exactes exclues des exports publics.",
			"Agrégations géographiques arrondies avant affichage.",
			"API conçue pour des analyses reproductibles et non intrusives."
		];
		const tabs = [
			{
				key: "overview",
				label: "Vue d'ensemble"
			},
			{
				key: "dataset",
				label: "Dataset"
			},
			{
				key: "listening-points",
				label: "Points d'écoute"
			},
			{
				key: "species",
				label: "Espèces"
			},
			{
				key: "models",
				label: "Modèles"
			},
			{
				key: "geo",
				label: "Géographie"
			},
			{
				key: "audio",
				label: "Analyse audio"
			},
			{
				key: "data",
				label: "Données brutes"
			},
			{
				key: "api",
				label: "API"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Données scientifiques & statistiques" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="min-h-screen bg-arbor-night" data-v-f664a2df${_scopeId}><div class="relative overflow-hidden" data-v-f664a2df${_scopeId}><div class="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(120,214,214,0.09),transparent_28rem),radial-gradient(circle_at_82%_12%,rgba(215,180,106,0.09),transparent_24rem)] pointer-events-none" data-v-f664a2df${_scopeId}></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10" data-v-f664a2df${_scopeId}><div class="trace-frame p-6 sm:p-8" data-v-f664a2df${_scopeId}><div class="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4" data-v-f664a2df${_scopeId}><div data-v-f664a2df${_scopeId}><div class="flex items-center gap-2 mb-3" data-v-f664a2df${_scopeId}><span class="inline-block w-2 h-2 rounded-full bg-arbor-firefly animate-pulse" data-v-f664a2df${_scopeId}></span><span class="atlas-kicker" data-v-f664a2df${_scopeId}>Laboratoire naturaliste</span></div><h1 class="atlas-heading text-5xl md:text-6xl" data-v-f664a2df${_scopeId}> Données scientifiques du vivant sonore </h1><p class="mt-3 text-arbor-sage text-lg max-w-2xl" data-v-f664a2df${_scopeId}> Dataset public, documenté et anonymisé pour observer les espèces, les lieux, les saisons et les dynamiques acoustiques sans exposer les coordonnées sensibles. </p></div><div class="text-right hidden md:block" data-v-f664a2df${_scopeId}><p class="text-xs text-arbor-sage/70 font-mono" data-v-f664a2df${_scopeId}> Mis à jour : ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"))}</p><p class="text-xs text-arbor-sage/70 font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.stats.total_sounds?.toLocaleString("fr-FR"))} sons indexés </p></div></div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" data-v-f664a2df${_scopeId}><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-v-f664a2df${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Enregistrements",
							value: props.stats.total_sounds,
							icon: "audio"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Durée totale",
							value: Math.round((props.stats.total_duration_seconds || 0) / 3600),
							suffix: "h",
							icon: "time"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Créateurs",
							value: props.stats.total_creators,
							icon: "users"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Lieux uniques",
							value: props.stats.total_locations,
							icon: "location"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Analyses",
							value: props.stats.completed_analyses,
							icon: "data"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Score dataset",
							value: datasetSummary.value.readiness,
							suffix: "%",
							icon: "score"
						}, null, _parent, _scopeId));
						_push(`</div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4" data-v-f664a2df${_scopeId}><div class="flex flex-wrap gap-1 p-1 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border backdrop-blur-sm" data-v-f664a2df${_scopeId}><!--[-->`);
						ssrRenderList(tabs, (tab) => {
							_push(`<button class="${ssrRenderClass(["px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200", activeTab.value === tab.key ? "bg-arbor-moss/20 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30"])}" data-v-f664a2df${_scopeId}>${ssrInterpolate(tab.label)}</button>`);
						});
						_push(`<!--]--></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" data-v-f664a2df${_scopeId}>`);
						if (activeTab.value === "overview") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-f664a2df${_scopeId}>`);
							_push(ssrRenderComponent(unref(CategoryChart), { categories: props.categoryDistribution }, null, _parent, _scopeId));
							_push(ssrRenderComponent(unref(EnvironmentChart), { data: props.environmentDistribution }, null, _parent, _scopeId));
							_push(`</div>`);
							_push(ssrRenderComponent(unref(TemporalChart), { data: props.temporalDistribution }, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-f664a2df${_scopeId}><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Lieux les plus enregistrés</h3><div class="space-y-2" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(props.topLocations.slice(0, 10), (loc, i) => {
								_push(`<div class="flex items-center justify-between p-2.5 rounded-lg bg-arbor-deep/50 border border-arbor-glass-border/50 hover:border-arbor-emerald/30 transition-colors" data-v-f664a2df${_scopeId}><div class="flex items-center gap-3" data-v-f664a2df${_scopeId}><span class="text-xs font-mono text-arbor-sage w-5" data-v-f664a2df${_scopeId}>${ssrInterpolate(i + 1)}</span><span class="text-sm text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(loc.name)}</span></div><span class="text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(loc.count)}</span></div>`);
							});
							_push(`<!--]--></div></div>`);
							_push(ssrRenderComponent(unref(EquipmentChart), { data: props.equipmentDistribution }, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "dataset") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6" data-v-f664a2df${_scopeId}><div class="glass-card p-6 overflow-hidden relative" data-v-f664a2df${_scopeId}><div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arbor-emerald/70 to-transparent" data-v-f664a2df${_scopeId}></div><p class="text-xs uppercase tracking-widest text-arbor-emerald mb-3" data-v-f664a2df${_scopeId}>Dataset chercheur</p><h3 class="font-display text-2xl font-semibold text-arbor-cream mb-3" data-v-f664a2df${_scopeId}>Table publique exploitable en notebook</h3><p class="text-sm leading-relaxed text-arbor-sage max-w-3xl" data-v-f664a2df${_scopeId}> L&#39;endpoint dataset retourne des lignes normalisées, un schéma machine-readable, la pagination, la licence, la citation et les garanties de confidentialité. Les IDs utilisateur, clés fichiers privées et coordonnées exactes sont exclus. </p><div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3" data-v-f664a2df${_scopeId}><div class="rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Lignes</p><p class="mt-2 text-2xl font-bold text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(datasetSummary.value.rows.toLocaleString("fr-FR"))}</p></div><div class="rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Colonnes</p><p class="mt-2 text-2xl font-bold text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(datasetSummary.value.columns)}</p></div><div class="rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Readiness</p><p class="mt-2 text-2xl font-bold text-arbor-emerald font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(datasetSummary.value.readiness)}%</p></div><div class="rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Critiques</p><p class="mt-2 text-2xl font-bold text-arbor-emerald font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(datasetSummary.value.criticalCoverage)}%</p></div></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Accès direct</h3><div class="space-y-3" data-v-f664a2df${_scopeId}><div class="rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" data-v-f664a2df${_scopeId}><p class="text-xs text-arbor-sage mb-2" data-v-f664a2df${_scopeId}>Dataset paginé</p><code class="text-sm text-arbor-emerald break-all" data-v-f664a2df${_scopeId}>/api/scientific-stats/dataset?limit=100&amp;offset=0</code></div><div class="rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" data-v-f664a2df${_scopeId}><p class="text-xs text-arbor-sage mb-2" data-v-f664a2df${_scopeId}>Schéma de colonnes</p><code class="text-sm text-arbor-emerald break-all" data-v-f664a2df${_scopeId}>/api/scientific-stats/schema</code></div><div class="rounded-xl bg-arbor-amber/10 border border-arbor-amber/25 p-4" data-v-f664a2df${_scopeId}><p class="text-sm leading-relaxed text-arbor-sage" data-v-f664a2df${_scopeId}>Citation incluse dans la réponse API. Les données restent limitées aux sons publics publiés et aux coordonnées approximées.</p></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-f664a2df${_scopeId}><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Complétude des champs</h3><div class="space-y-3" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(datasetSummary.value.fields, (field) => {
								_push(`<div class="rounded-xl bg-arbor-deep/35 border border-arbor-glass-border/60 p-3" data-v-f664a2df${_scopeId}><div class="flex items-center justify-between gap-3" data-v-f664a2df${_scopeId}><code class="text-xs text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(field.field)}</code><span class="text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(Math.round(field.percentage))}%</span></div><div class="mt-2 h-1.5 rounded-full bg-arbor-night overflow-hidden" data-v-f664a2df${_scopeId}><div class="h-full rounded-full bg-arbor-emerald" style="${ssrRenderStyle({ width: `${Math.min(field.percentage, 100)}%` })}" data-v-f664a2df${_scopeId}></div></div></div>`);
							});
							_push(`<!--]--></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Dictionnaire de données</h3><div class="space-y-2 max-h-[520px] overflow-y-auto custom-scrollbar pr-2" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(datasetSchemaSafe.value, (column) => {
								_push(`<div class="rounded-xl bg-arbor-deep/35 border border-arbor-glass-border/60 p-3" data-v-f664a2df${_scopeId}><div class="flex flex-wrap items-center gap-2" data-v-f664a2df${_scopeId}><code class="text-xs text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(column.name)}</code><span class="text-[11px] uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(column.type)}</span>`);
								if (column.unit !== "none") _push(`<span class="text-[11px] text-arbor-sage/70" data-v-f664a2df${_scopeId}>${ssrInterpolate(column.unit)}</span>`);
								else _push(`<!---->`);
								_push(`</div><p class="mt-1 text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(column.description)}</p></div>`);
							});
							_push(`<!--]--></div></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "listening-points") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}><div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-f664a2df${_scopeId}><div class="glass-card p-5 text-center" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Points d&#39;écoute</p><p class="mt-2 font-display text-3xl font-bold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.listeningPoints?.total_points ?? 0)}</p></div><div class="glass-card p-5 text-center" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Avec enregistrements</p><p class="mt-2 font-display text-3xl font-bold text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.listeningPoints?.points_with_recordings ?? 0)}</p></div><div class="glass-card p-5 text-center" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Habitats</p><p class="mt-2 font-display text-3xl font-bold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.listeningPoints?.by_habitat?.length ?? 0)}</p></div><div class="glass-card p-5 text-center" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Espèces détectées</p><p class="mt-2 font-display text-3xl font-bold text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.stats?.total_species ?? props.speciesDistribution?.length ?? 0)}</p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-f664a2df${_scopeId}><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Répartition par habitat</h3><div class="space-y-2" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(props.listeningPoints?.by_habitat, (item, i) => {
								_push(`<div class="flex items-center justify-between p-2 rounded-lg bg-arbor-deep/30" data-v-f664a2df${_scopeId}><div class="flex items-center gap-3" data-v-f664a2df${_scopeId}><span class="text-xs font-mono text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(i + 1)}</span><span class="text-sm text-arbor-cream capitalize" data-v-f664a2df${_scopeId}>${ssrInterpolate(item.habitat)}</span></div><span class="text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(item.count)}</span></div>`);
							});
							_push(`<!--]--></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Points les plus actifs</h3><div class="space-y-2" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(props.listeningPoints?.most_active, (item) => {
								_push(ssrRenderComponent(unref(Link), {
									key: item.slug,
									href: _ctx.route("listening-points.show", item.slug),
									class: "flex items-center justify-between p-2.5 rounded-lg bg-arbor-deep/30 hover:bg-arbor-deep/50 transition-colors"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<div class="flex items-center gap-3" data-v-f664a2df${_scopeId}><span class="text-sm text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(item.title)}</span></div><div class="flex items-center gap-3" data-v-f664a2df${_scopeId}><span class="text-xs text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(item.species_count)} esp.</span><span class="text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(item.recordings_count)}</span></div>`);
										else return [createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "text-sm text-arbor-cream" }, toDisplayString(item.title), 1)]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(item.species_count) + " esp.", 1), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(item.recordings_count), 1)])];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "species") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}><div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-f664a2df${_scopeId}><div class="glass-card p-5 text-center" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Espèces détectées</p><p class="mt-2 font-display text-3xl font-bold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.speciesDistribution?.length ?? 0)}</p></div><div class="glass-card p-5 text-center" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Détections totales</p><p class="mt-2 font-display text-3xl font-bold text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.speciesDistribution?.reduce((a, s) => a + s.detections_count, 0) ?? 0)}</p></div><div class="glass-card p-5 text-center" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Confiance moy.</p><p class="mt-2 font-display text-3xl font-bold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.speciesDistribution?.length ? Math.round(props.speciesDistribution.reduce((a, s) => a + s.mean_confidence, 0) / props.speciesDistribution.length * 100) : 0)}% </p></div><div class="glass-card p-5 text-center" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Sons concernés</p><p class="mt-2 font-display text-3xl font-bold text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.speciesDistribution?.reduce((a, s) => a + s.sounds_count, 0) ?? 0)}</p></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Top espèces détectées</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(props.speciesDistribution?.slice(0, 30), (s) => {
								_push(`<div class="p-4 rounded-xl bg-arbor-deep/30 border border-arbor-glass-border/30" data-v-f664a2df${_scopeId}><div class="flex items-start justify-between" data-v-f664a2df${_scopeId}><div data-v-f664a2df${_scopeId}><h4 class="text-sm font-medium text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(s.common_name)}</h4><p class="text-xs text-arbor-sage italic" data-v-f664a2df${_scopeId}>${ssrInterpolate(s.scientific_name)}</p></div><span class="text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(s.sounds_count)} son${ssrInterpolate(s.sounds_count > 1 ? "s" : "")}</span></div><div class="mt-2 flex items-center justify-between text-xs text-arbor-sage" data-v-f664a2df${_scopeId}><span data-v-f664a2df${_scopeId}>${ssrInterpolate(s.detections_count)} détection${ssrInterpolate(s.detections_count > 1 ? "s" : "")}</span><span data-v-f664a2df${_scopeId}>conf. ${ssrInterpolate(Math.round(s.mean_confidence * 100))}%</span></div></div>`);
							});
							_push(`<!--]--></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "models") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}><div class="glass-card p-6" data-v-f664a2df${_scopeId}><div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6" data-v-f664a2df${_scopeId}><div data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-widest text-arbor-emerald mb-2" data-v-f664a2df${_scopeId}>Model stats</p><h3 class="font-display text-2xl font-semibold text-arbor-cream" data-v-f664a2df${_scopeId}>Indicateurs descriptifs versionnés</h3><p class="mt-2 text-sm leading-relaxed text-arbor-sage max-w-3xl" data-v-f664a2df${_scopeId}> Les modèles Arborisis sont publiés comme variables explicables du dataset, pas comme vérité naturaliste. Chaque score expose son échantillon, ses bornes et son endpoint API. </p></div><div class="rounded-xl border border-arbor-emerald/25 bg-arbor-emerald/10 px-4 py-3" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Endpoint</p><code class="mt-1 block text-sm text-arbor-emerald" data-v-f664a2df${_scopeId}>/api/scientific-stats/model-stats</code></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(modelCards.value, (model) => {
								_push(`<div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-5" data-v-f664a2df${_scopeId}><div class="flex items-start justify-between gap-4" data-v-f664a2df${_scopeId}><div data-v-f664a2df${_scopeId}><p class="text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(model.title)}</p><h4 class="mt-1 text-lg font-semibold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(model.name)}</h4><p class="mt-2 text-sm leading-relaxed text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(model.desc)}</p></div><div class="text-right" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>N</p><p class="mt-1 text-2xl font-bold text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(model.metric.count ?? 0)}</p></div></div><div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2" data-v-f664a2df${_scopeId}><div class="rounded-lg bg-arbor-night/70 p-3" data-v-f664a2df${_scopeId}><p class="text-[11px] uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Moy.</p><p class="mt-1 text-sm font-mono text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(model.metric.mean ?? "-")}</p></div><div class="rounded-lg bg-arbor-night/70 p-3" data-v-f664a2df${_scopeId}><p class="text-[11px] uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Méd.</p><p class="mt-1 text-sm font-mono text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(model.metric.median ?? "-")}</p></div><div class="rounded-lg bg-arbor-night/70 p-3" data-v-f664a2df${_scopeId}><p class="text-[11px] uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Min</p><p class="mt-1 text-sm font-mono text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(model.metric.min ?? "-")}</p></div><div class="rounded-lg bg-arbor-night/70 p-3" data-v-f664a2df${_scopeId}><p class="text-[11px] uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Max</p><p class="mt-1 text-sm font-mono text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(model.metric.max ?? "-")}</p></div></div></div>`);
							});
							_push(`<!--]--></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6" data-v-f664a2df${_scopeId}><div data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream" data-v-f664a2df${_scopeId}>Contexte météo des modèles</h3><p class="mt-2 text-sm leading-relaxed text-arbor-sage max-w-3xl" data-v-f664a2df${_scopeId}> Les scores sont croisés avec les observations météo publiques issues des coordonnées approximées. Ces variables servent à contextualiser l&#39;activité acoustique et la biodiversité sonore. </p></div><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/45 px-4 py-3" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Couverture météo</p><p class="mt-1 text-2xl font-bold text-arbor-emerald font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(Math.round(modelWeatherSummary.value.coverage.percentage ?? 0))}%</p></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" data-v-f664a2df${_scopeId}><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Température moyenne</p><p class="mt-2 text-xl font-semibold text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(modelWeatherSummary.value.averages.temperature_c ?? "-")}`);
							if (modelWeatherSummary.value.averages.temperature_c !== null && modelWeatherSummary.value.averages.temperature_c !== void 0) _push(`<span data-v-f664a2df${_scopeId}> °C</span>`);
							else _push(`<!---->`);
							_push(`</p></div><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Humidité moyenne</p><p class="mt-2 text-xl font-semibold text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(modelWeatherSummary.value.averages.humidity_percent ?? "-")}`);
							if (modelWeatherSummary.value.averages.humidity_percent !== null && modelWeatherSummary.value.averages.humidity_percent !== void 0) _push(`<span data-v-f664a2df${_scopeId}>%</span>`);
							else _push(`<!---->`);
							_push(`</p></div><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Vent moyen</p><p class="mt-2 text-xl font-semibold text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(modelWeatherSummary.value.averages.wind_speed_kmh ?? "-")}`);
							if (modelWeatherSummary.value.averages.wind_speed_kmh !== null && modelWeatherSummary.value.averages.wind_speed_kmh !== void 0) _push(`<span data-v-f664a2df${_scopeId}> km/h</span>`);
							else _push(`<!---->`);
							_push(`</p></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-4" data-v-f664a2df${_scopeId}><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><h4 class="text-sm font-semibold text-arbor-cream mb-3" data-v-f664a2df${_scopeId}>Conditions météo</h4><div class="space-y-2" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(modelWeatherSummary.value.conditions.slice(0, 8), (condition) => {
								_push(`<div class="flex items-center justify-between gap-3 text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(condition.condition)}</span><span class="font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(condition.count)}</span></div>`);
							});
							_push(`<!--]-->`);
							if (modelWeatherSummary.value.conditions.length === 0) _push(`<p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>Aucune météo associée pour le moment.</p>`);
							else _push(`<!---->`);
							_push(`</div></div><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><h4 class="text-sm font-semibold text-arbor-cream mb-3" data-v-f664a2df${_scopeId}>AAS par météo</h4><div class="space-y-2" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(modelWeatherSummary.value.activityByCondition.slice(0, 8), (row) => {
								_push(`<div class="flex items-center justify-between gap-3 text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(row.condition)}</span><span class="font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(row.mean_acoustic_activity_score)}</span></div>`);
							});
							_push(`<!--]-->`);
							if (modelWeatherSummary.value.activityByCondition.length === 0) _push(`<p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>Aucun score AAS croisé météo.</p>`);
							else _push(`<!---->`);
							_push(`</div></div><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><h4 class="text-sm font-semibold text-arbor-cream mb-3" data-v-f664a2df${_scopeId}>SBS par météo</h4><div class="space-y-2" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(modelWeatherSummary.value.biodiversityByCondition.slice(0, 8), (row) => {
								_push(`<div class="flex items-center justify-between gap-3 text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(row.condition)}</span><span class="font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(row.mean_value)}</span></div>`);
							});
							_push(`<!--]-->`);
							if (modelWeatherSummary.value.biodiversityByCondition.length === 0) _push(`<p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>Aucun score SBS croisé météo.</p>`);
							else _push(`<!---->`);
							_push(`</div></div></div><div class="mt-6 rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><div class="flex items-center justify-between gap-4 mb-3" data-v-f664a2df${_scopeId}><h4 class="text-sm font-semibold text-arbor-cream" data-v-f664a2df${_scopeId}>Sons individuels enrichis</h4><span class="text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(modelWeatherSummary.value.individualSounds.length)}</span></div><div class="overflow-x-auto" data-v-f664a2df${_scopeId}><table class="w-full text-sm text-left" data-v-f664a2df${_scopeId}><thead class="text-xs text-arbor-sage uppercase border-b border-arbor-glass-border" data-v-f664a2df${_scopeId}><tr data-v-f664a2df${_scopeId}><th class="px-3 py-2" data-v-f664a2df${_scopeId}>Son</th><th class="px-3 py-2" data-v-f664a2df${_scopeId}>Coordonnées publiques</th><th class="px-3 py-2" data-v-f664a2df${_scopeId}>Temp.</th><th class="px-3 py-2" data-v-f664a2df${_scopeId}>Humidité</th><th class="px-3 py-2" data-v-f664a2df${_scopeId}>Vent</th><th class="px-3 py-2" data-v-f664a2df${_scopeId}>Condition</th></tr></thead><tbody data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(modelWeatherSummary.value.individualSounds.slice(0, 25), (sound) => {
								_push(`<tr class="border-b border-arbor-glass-border/40" data-v-f664a2df${_scopeId}><td class="px-3 py-2 text-arbor-cream max-w-[260px] truncate" data-v-f664a2df${_scopeId}>${ssrInterpolate(sound.title)}</td><td class="px-3 py-2 text-arbor-sage font-mono text-xs" data-v-f664a2df${_scopeId}>${ssrInterpolate(Number(sound.public_latitude).toFixed(2))}, ${ssrInterpolate(Number(sound.public_longitude).toFixed(2))}</td><td class="px-3 py-2 text-arbor-sage font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(sound.weather?.temperature_c ?? "-")}</td><td class="px-3 py-2 text-arbor-sage font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(sound.weather?.humidity_percent ?? "-")}</td><td class="px-3 py-2 text-arbor-sage font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(sound.weather?.wind_speed_kmh ?? "-")}</td><td class="px-3 py-2 text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(sound.weather?.weather_condition ?? "à enrichir")}</td></tr>`);
							});
							_push(`<!--]-->`);
							if (modelWeatherSummary.value.individualSounds.length === 0) _push(`<tr data-v-f664a2df${_scopeId}><td colspan="6" class="px-3 py-6 text-center text-arbor-sage" data-v-f664a2df${_scopeId}>Aucun son public avec météo individuelle pour le moment.</td></tr>`);
							else _push(`<!---->`);
							_push(`</tbody></table></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-f664a2df${_scopeId}><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Score de biodiversité sonore (SBS)</h3>`);
							if (props.globalMetrics?.biodiversity_score?.count) _push(`<div class="space-y-3" data-v-f664a2df${_scopeId}><div class="flex justify-between text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>Moyenne</span><span class="text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.globalMetrics.biodiversity_score.mean)}</span></div><div class="flex justify-between text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>Médiane</span><span class="text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.globalMetrics.biodiversity_score.median)}</span></div><div class="flex justify-between text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>Min / Max</span><span class="text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.globalMetrics.biodiversity_score.min)} / ${ssrInterpolate(props.globalMetrics.biodiversity_score.max)}</span></div><div class="flex justify-between text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>Échantillon</span><span class="text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.globalMetrics.biodiversity_score.count)}</span></div></div>`);
							else _push(`<p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>Aucune métrique de biodiversité calculée pour le moment.</p>`);
							_push(`</div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Score d&#39;activité acoustique (AAS)</h3>`);
							if (props.globalMetrics?.acoustic_activity_score?.count) _push(`<div class="space-y-3" data-v-f664a2df${_scopeId}><div class="flex justify-between text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>Moyenne</span><span class="text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.globalMetrics.acoustic_activity_score.mean)}</span></div><div class="flex justify-between text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>Médiane</span><span class="text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.globalMetrics.acoustic_activity_score.median)}</span></div><div class="flex justify-between text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>Min / Max</span><span class="text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.globalMetrics.acoustic_activity_score.min)} / ${ssrInterpolate(props.globalMetrics.acoustic_activity_score.max)}</span></div><div class="flex justify-between text-sm" data-v-f664a2df${_scopeId}><span class="text-arbor-sage" data-v-f664a2df${_scopeId}>Échantillon</span><span class="text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(props.globalMetrics.acoustic_activity_score.count)}</span></div></div>`);
							else _push(`<p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>Aucune métrique d&#39;activité calculée pour le moment.</p>`);
							_push(`</div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Méthodologie des modèles</h3><div class="space-y-4 text-sm text-arbor-sage" data-v-f664a2df${_scopeId}><p data-v-f664a2df${_scopeId}>Les scores présentés sont des <strong class="text-arbor-cream" data-v-f664a2df${_scopeId}>indicateurs descriptifs</strong> calculés à partir des features audio et des détections d&#39;espèces. Ils ne remplacent pas une expertise naturaliste.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" data-v-f664a2df${_scopeId}><div class="p-4 rounded-xl bg-arbor-deep/30 border border-arbor-glass-border/30" data-v-f664a2df${_scopeId}><h4 class="text-arbor-cream font-medium mb-2" data-v-f664a2df${_scopeId}>SBS — Sound Biodiversity Score</h4><p data-v-f664a2df${_scopeId}>Combinaison pondérée du nombre d&#39;espèces, de l&#39;ADI (Acoustic Diversity Index), de la diversité des tags et de l&#39;équilibre spectral.</p></div><div class="p-4 rounded-xl bg-arbor-deep/30 border border-arbor-glass-border/30" data-v-f664a2df${_scopeId}><h4 class="text-arbor-cream font-medium mb-2" data-v-f664a2df${_scopeId}>AAS — Acoustic Activity Score</h4><p data-v-f664a2df${_scopeId}>Basé sur la loudness LUFS, la densité d&#39;événements sonores, le ratio de silence et l&#39;énergie RMS moyenne.</p></div></div></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "geo") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}>`);
							_push(ssrRenderComponent(unref(GeoHeatmap), { points: props.geoHeatmap }, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-f664a2df${_scopeId}><div class="glass-card p-6 lg:col-span-2" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Densité par région</h3><div class="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(props.geoHeatmap.slice(0, 50), (loc, i) => {
								_push(`<div class="flex items-center justify-between p-2 rounded-lg bg-arbor-deep/30" data-v-f664a2df${_scopeId}><div class="flex items-center gap-3" data-v-f664a2df${_scopeId}><span class="text-xs font-mono text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(i + 1)}</span><span class="text-sm text-arbor-cream font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(loc.lat.toFixed(1))}, ${ssrInterpolate(loc.lng.toFixed(1))}</span><span class="text-xs text-arbor-sage/70 truncate max-w-[200px]" data-v-f664a2df${_scopeId}>${ssrInterpolate(loc.categories)}</span></div><span class="text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(loc.count)}</span></div>`);
							});
							_push(`<!--]--></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Méthodologie</h3><div class="space-y-3 text-sm text-arbor-sage" data-v-f664a2df${_scopeId}><p data-v-f664a2df${_scopeId}>Les coordonnées sont agrégées par cellules de <strong class="text-arbor-cream" data-v-f664a2df${_scopeId}>0.1°</strong> (environ 11 km) pour préserver la confidentialité des lieux sensibles.</p><p data-v-f664a2df${_scopeId}>Les coordonnées exactes des enregistrements ne sont jamais exposées publiquement.</p><p data-v-f664a2df${_scopeId}>Seuls les enregistrements <strong class="text-arbor-cream" data-v-f664a2df${_scopeId}>publics</strong> et <strong class="text-arbor-cream" data-v-f664a2df${_scopeId}>publiés</strong> sont comptabilisés.</p></div></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "audio") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-4 gap-4" data-v-f664a2df${_scopeId}><div class="glass-card p-5" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Analyses terminées</p><p class="mt-2 font-display text-3xl font-bold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(audioSummary.value.completedAnalyses.toLocaleString("fr-FR"))}</p><p class="mt-1 text-xs text-arbor-sage" data-v-f664a2df${_scopeId}>sur ${ssrInterpolate(audioSummary.value.totalAnalyses.toLocaleString("fr-FR"))} analyses créées</p></div><div class="glass-card p-5" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Couverture dataset</p><p class="mt-2 font-display text-3xl font-bold text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(audioSummary.value.coverage)}%</p><div class="mt-3 h-1.5 rounded-full bg-arbor-deep overflow-hidden" data-v-f664a2df${_scopeId}><div class="h-full rounded-full bg-arbor-emerald" style="${ssrRenderStyle({ width: `${Math.min(audioSummary.value.coverage, 100)}%` })}" data-v-f664a2df${_scopeId}></div></div></div><div class="glass-card p-5" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>Features publiées</p><p class="mt-2 font-display text-3xl font-bold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(audioSummary.value.featureCount)}</p><p class="mt-1 text-xs text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(audioSummary.value.distributionCount)} distributions disponibles</p></div><div class="glass-card p-5" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-f664a2df${_scopeId}>File d&#39;attente</p><p class="mt-2 font-display text-3xl font-bold text-arbor-amber" data-v-f664a2df${_scopeId}>${ssrInterpolate(audioSummary.value.pendingAnalyses.toLocaleString("fr-FR"))}</p><p class="mt-1 text-xs text-arbor-sage" data-v-f664a2df${_scopeId}>analyses non finalisées</p></div></div>`);
							if (audioSummary.value.hasFeatures) {
								_push(`<div class="space-y-6" data-v-f664a2df${_scopeId}>`);
								_push(ssrRenderComponent(unref(AudioFeaturesChart), {
									features: audioFeaturesSafe.value,
									distributions: audioDistributionsSafe.value
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<div class="glass-card p-8 overflow-hidden relative" data-v-f664a2df${_scopeId}><div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arbor-emerald/60 to-transparent" data-v-f664a2df${_scopeId}></div><div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center" data-v-f664a2df${_scopeId}><div data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-widest text-arbor-emerald mb-3" data-v-f664a2df${_scopeId}>Analyse audio</p><h3 class="font-display text-2xl font-semibold text-arbor-cream mb-3" data-v-f664a2df${_scopeId}>Aucune feature exploitable n&#39;est encore publiée</h3><p class="text-sm leading-relaxed text-arbor-sage" data-v-f664a2df${_scopeId}> La page reste prête pour les résultats du pipeline. Dès que les analyses auront des métriques dans <code class="px-1.5 py-0.5 rounded bg-arbor-deep text-arbor-cream" data-v-f664a2df${_scopeId}>features_json</code>, les graphiques, histogrammes et statistiques descriptives apparaîtront automatiquement. </p></div><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/50 p-5" data-v-f664a2df${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage mb-4" data-v-f664a2df${_scopeId}>À vérifier côté pipeline</p><div class="space-y-3" data-v-f664a2df${_scopeId}><div class="flex items-start gap-3" data-v-f664a2df${_scopeId}><span class="mt-1 h-2 w-2 rounded-full bg-arbor-emerald" data-v-f664a2df${_scopeId}></span><p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>Les analyses sont marquées comme traitées via <code class="text-arbor-cream" data-v-f664a2df${_scopeId}>processed_at</code>.</p></div><div class="flex items-start gap-3" data-v-f664a2df${_scopeId}><span class="mt-1 h-2 w-2 rounded-full bg-arbor-amber" data-v-f664a2df${_scopeId}></span><p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>Le JSON contient les chemins attendus : temporal, spectral, stats et values.</p></div><div class="flex items-start gap-3" data-v-f664a2df${_scopeId}><span class="mt-1 h-2 w-2 rounded-full bg-arbor-moss" data-v-f664a2df${_scopeId}></span><p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>Les sons associés sont publics et publiés, sinon ils restent exclus.</p></div></div></div></div></div>`);
							_push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-f664a2df${_scopeId}><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Pipeline d&#39;analyse</h3><div class="space-y-4" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(pipelineSteps, (step, index) => {
								_push(`<div class="flex gap-4 rounded-xl border border-arbor-glass-border/70 bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-arbor-emerald/10 text-xs font-mono text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(index + 1)}</div><div data-v-f664a2df${_scopeId}><h4 class="text-sm font-semibold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(step.title)}</h4><p class="mt-1 text-sm leading-relaxed text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(step.desc)}</p></div></div>`);
							});
							_push(`<!--]--></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Qualité &amp; confidentialité</h3><div class="space-y-3" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(qualityChecks, (check) => {
								_push(`<div class="flex items-start gap-3 rounded-lg bg-arbor-deep/35 px-3 py-2.5" data-v-f664a2df${_scopeId}><span class="mt-1 h-2 w-2 rounded-full bg-arbor-emerald" data-v-f664a2df${_scopeId}></span><p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(check)}</p></div>`);
							});
							_push(`<!--]--></div><div class="mt-5 rounded-xl border border-arbor-amber/25 bg-arbor-amber/10 p-4" data-v-f664a2df${_scopeId}><p class="text-sm leading-relaxed text-arbor-sage" data-v-f664a2df${_scopeId}> Les métriques audio sont des indicateurs descriptifs. Elles ne remplacent pas une annotation naturaliste ni une validation experte des espèces ou habitats. </p></div></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Statistiques descriptives — Features audio</h3><div class="overflow-x-auto" data-v-f664a2df${_scopeId}><table class="w-full text-sm text-left" data-v-f664a2df${_scopeId}><thead class="text-xs text-arbor-sage uppercase border-b border-arbor-glass-border" data-v-f664a2df${_scopeId}><tr data-v-f664a2df${_scopeId}><th class="px-4 py-3" data-v-f664a2df${_scopeId}>Feature</th><th class="px-4 py-3" data-v-f664a2df${_scopeId}>N</th><th class="px-4 py-3" data-v-f664a2df${_scopeId}>Moyenne</th><th class="px-4 py-3" data-v-f664a2df${_scopeId}>Médiane</th><th class="px-4 py-3" data-v-f664a2df${_scopeId}>Écart-type</th><th class="px-4 py-3" data-v-f664a2df${_scopeId}>Min</th><th class="px-4 py-3" data-v-f664a2df${_scopeId}>Max</th></tr></thead><tbody data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(audioFeatureRows.value, (row) => {
								_push(`<tr class="border-b border-arbor-glass-border/50 hover:bg-arbor-glass/20 transition-colors" data-v-f664a2df${_scopeId}><td class="px-4 py-3" data-v-f664a2df${_scopeId}><div class="text-arbor-cream font-medium" data-v-f664a2df${_scopeId}>${ssrInterpolate(row.label)}</div><div class="mt-1 max-w-sm text-xs text-arbor-sage/70" data-v-f664a2df${_scopeId}>${ssrInterpolate(row.description)}</div></td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(row.stats.count)}</td><td class="px-4 py-3 text-arbor-emerald font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(Number(row.stats.mean).toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(Number(row.stats.median).toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(Number(row.stats.std).toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(Number(row.stats.min).toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-f664a2df${_scopeId}>${ssrInterpolate(Number(row.stats.max).toExponential(3))}</td></tr>`);
							});
							_push(`<!--]-->`);
							if (audioFeatureRows.value.length === 0) _push(`<tr data-v-f664a2df${_scopeId}><td colspan="7" class="px-4 py-8 text-center text-arbor-sage" data-v-f664a2df${_scopeId}> Aucune statistique descriptive disponible pour le moment. </td></tr>`);
							else _push(`<!---->`);
							_push(`</tbody></table></div></div><div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-f664a2df${_scopeId}>Dictionnaire des features</h3><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" data-v-f664a2df${_scopeId}><!--[-->`);
							ssrRenderList(featureDescriptions, (description, key) => {
								_push(`<div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-f664a2df${_scopeId}><code class="text-xs text-arbor-emerald" data-v-f664a2df${_scopeId}>${ssrInterpolate(key)}</code><h4 class="mt-2 text-sm font-semibold text-arbor-cream" data-v-f664a2df${_scopeId}>${ssrInterpolate(featureLabels[key] ?? key)}</h4><p class="mt-1 text-sm leading-relaxed text-arbor-sage" data-v-f664a2df${_scopeId}>${ssrInterpolate(description)}</p></div>`);
							});
							_push(`<!--]--></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "data") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}>`);
							_push(ssrRenderComponent(unref(DataTable), { data: props.rawDataSample }, null, _parent, _scopeId));
							_push(`<div class="glass-card p-6" data-v-f664a2df${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-2" data-v-f664a2df${_scopeId}>Licence d&#39;utilisation des données</h3><p class="text-sm text-arbor-sage" data-v-f664a2df${_scopeId}> Les données exposées sur cette page et via l&#39;API sont agrégées et anonymisées. Elles sont mises à disposition à des fins de recherche scientifique, d&#39;éducation et de conservation. Merci de citer <strong class="text-arbor-cream" data-v-f664a2df${_scopeId}>Arborisis</strong> dans vos publications. Pour un accès à des données plus granulaires ou spécifiques, contactez l&#39;équipe. </p></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "api") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-f664a2df${_scopeId}>`);
							_push(ssrRenderComponent(unref(ApiDocs), null, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "min-h-screen bg-arbor-night" }, [
						createVNode("div", { class: "relative overflow-hidden" }, [createVNode("div", { class: "absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(120,214,214,0.09),transparent_28rem),radial-gradient(circle_at_82%_12%,rgba(215,180,106,0.09),transparent_24rem)] pointer-events-none" }), createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10" }, [createVNode("div", { class: "trace-frame p-6 sm:p-8" }, [createVNode("div", { class: "relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4" }, [createVNode("div", null, [
							createVNode("div", { class: "flex items-center gap-2 mb-3" }, [createVNode("span", { class: "inline-block w-2 h-2 rounded-full bg-arbor-firefly animate-pulse" }), createVNode("span", { class: "atlas-kicker" }, "Laboratoire naturaliste")]),
							createVNode("h1", { class: "atlas-heading text-5xl md:text-6xl" }, " Données scientifiques du vivant sonore "),
							createVNode("p", { class: "mt-3 text-arbor-sage text-lg max-w-2xl" }, " Dataset public, documenté et anonymisé pour observer les espèces, les lieux, les saisons et les dynamiques acoustiques sans exposer les coordonnées sensibles. ")
						]), createVNode("div", { class: "text-right hidden md:block" }, [createVNode("p", { class: "text-xs text-arbor-sage/70 font-mono" }, " Mis à jour : " + toDisplayString((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")), 1), createVNode("p", { class: "text-xs text-arbor-sage/70 font-mono" }, toDisplayString(props.stats.total_sounds?.toLocaleString("fr-FR")) + " sons indexés ", 1)])])])])]),
						createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" }, [createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" }, [
							createVNode(_sfc_main$1, {
								label: "Enregistrements",
								value: props.stats.total_sounds,
								icon: "audio"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Durée totale",
								value: Math.round((props.stats.total_duration_seconds || 0) / 3600),
								suffix: "h",
								icon: "time"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Créateurs",
								value: props.stats.total_creators,
								icon: "users"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Lieux uniques",
								value: props.stats.total_locations,
								icon: "location"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Analyses",
								value: props.stats.completed_analyses,
								icon: "data"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Score dataset",
								value: datasetSummary.value.readiness,
								suffix: "%",
								icon: "score"
							}, null, 8, ["value"])
						])]),
						createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4" }, [createVNode("div", { class: "flex flex-wrap gap-1 p-1 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border backdrop-blur-sm" }, [(openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
							return createVNode("button", {
								key: tab.key,
								onClick: ($event) => activeTab.value = tab.key,
								class: ["px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200", activeTab.value === tab.key ? "bg-arbor-moss/20 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30"]
							}, toDisplayString(tab.label), 11, ["onClick"]);
						}), 64))])]),
						createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" }, [
							activeTab.value === "overview" ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-6 animate-fade-in"
							}, [
								createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [createVNode(unref(CategoryChart), { categories: props.categoryDistribution }, null, 8, ["categories"]), createVNode(unref(EnvironmentChart), { data: props.environmentDistribution }, null, 8, ["data"])]),
								createVNode(unref(TemporalChart), { data: props.temporalDistribution }, null, 8, ["data"]),
								createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Lieux les plus enregistrés"), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(props.topLocations.slice(0, 10), (loc, i) => {
									return openBlock(), createBlock("div", {
										key: i,
										class: "flex items-center justify-between p-2.5 rounded-lg bg-arbor-deep/50 border border-arbor-glass-border/50 hover:border-arbor-emerald/30 transition-colors"
									}, [createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "text-xs font-mono text-arbor-sage w-5" }, toDisplayString(i + 1), 1), createVNode("span", { class: "text-sm text-arbor-cream" }, toDisplayString(loc.name), 1)]), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(loc.count), 1)]);
								}), 128))])]), createVNode(unref(EquipmentChart), { data: props.equipmentDistribution }, null, 8, ["data"])])
							])) : createCommentVNode("", true),
							activeTab.value === "dataset" ? (openBlock(), createBlock("div", {
								key: 1,
								class: "space-y-6 animate-fade-in"
							}, [createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6" }, [createVNode("div", { class: "glass-card p-6 overflow-hidden relative" }, [
								createVNode("div", { class: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arbor-emerald/70 to-transparent" }),
								createVNode("p", { class: "text-xs uppercase tracking-widest text-arbor-emerald mb-3" }, "Dataset chercheur"),
								createVNode("h3", { class: "font-display text-2xl font-semibold text-arbor-cream mb-3" }, "Table publique exploitable en notebook"),
								createVNode("p", { class: "text-sm leading-relaxed text-arbor-sage max-w-3xl" }, " L'endpoint dataset retourne des lignes normalisées, un schéma machine-readable, la pagination, la licence, la citation et les garanties de confidentialité. Les IDs utilisateur, clés fichiers privées et coordonnées exactes sont exclus. "),
								createVNode("div", { class: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-3" }, [
									createVNode("div", { class: "rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Lignes"), createVNode("p", { class: "mt-2 text-2xl font-bold text-arbor-cream font-mono" }, toDisplayString(datasetSummary.value.rows.toLocaleString("fr-FR")), 1)]),
									createVNode("div", { class: "rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Colonnes"), createVNode("p", { class: "mt-2 text-2xl font-bold text-arbor-cream font-mono" }, toDisplayString(datasetSummary.value.columns), 1)]),
									createVNode("div", { class: "rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Readiness"), createVNode("p", { class: "mt-2 text-2xl font-bold text-arbor-emerald font-mono" }, toDisplayString(datasetSummary.value.readiness) + "%", 1)]),
									createVNode("div", { class: "rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Critiques"), createVNode("p", { class: "mt-2 text-2xl font-bold text-arbor-emerald font-mono" }, toDisplayString(datasetSummary.value.criticalCoverage) + "%", 1)])
								])
							]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Accès direct"), createVNode("div", { class: "space-y-3" }, [
								createVNode("div", { class: "rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage mb-2" }, "Dataset paginé"), createVNode("code", { class: "text-sm text-arbor-emerald break-all" }, "/api/scientific-stats/dataset?limit=100&offset=0")]),
								createVNode("div", { class: "rounded-xl bg-arbor-deep/45 border border-arbor-glass-border p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage mb-2" }, "Schéma de colonnes"), createVNode("code", { class: "text-sm text-arbor-emerald break-all" }, "/api/scientific-stats/schema")]),
								createVNode("div", { class: "rounded-xl bg-arbor-amber/10 border border-arbor-amber/25 p-4" }, [createVNode("p", { class: "text-sm leading-relaxed text-arbor-sage" }, "Citation incluse dans la réponse API. Les données restent limitées aux sons publics publiés et aux coordonnées approximées.")])
							])])]), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Complétude des champs"), createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(datasetSummary.value.fields, (field) => {
								return openBlock(), createBlock("div", {
									key: field.field,
									class: "rounded-xl bg-arbor-deep/35 border border-arbor-glass-border/60 p-3"
								}, [createVNode("div", { class: "flex items-center justify-between gap-3" }, [createVNode("code", { class: "text-xs text-arbor-cream" }, toDisplayString(field.field), 1), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(Math.round(field.percentage)) + "%", 1)]), createVNode("div", { class: "mt-2 h-1.5 rounded-full bg-arbor-night overflow-hidden" }, [createVNode("div", {
									class: "h-full rounded-full bg-arbor-emerald",
									style: { width: `${Math.min(field.percentage, 100)}%` }
								}, null, 4)])]);
							}), 128))])]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Dictionnaire de données"), createVNode("div", { class: "space-y-2 max-h-[520px] overflow-y-auto custom-scrollbar pr-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(datasetSchemaSafe.value, (column) => {
								return openBlock(), createBlock("div", {
									key: column.name,
									class: "rounded-xl bg-arbor-deep/35 border border-arbor-glass-border/60 p-3"
								}, [createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
									createVNode("code", { class: "text-xs text-arbor-emerald" }, toDisplayString(column.name), 1),
									createVNode("span", { class: "text-[11px] uppercase tracking-wider text-arbor-sage" }, toDisplayString(column.type), 1),
									column.unit !== "none" ? (openBlock(), createBlock("span", {
										key: 0,
										class: "text-[11px] text-arbor-sage/70"
									}, toDisplayString(column.unit), 1)) : createCommentVNode("", true)
								]), createVNode("p", { class: "mt-1 text-sm text-arbor-sage" }, toDisplayString(column.description), 1)]);
							}), 128))])])])])) : createCommentVNode("", true),
							activeTab.value === "listening-points" ? (openBlock(), createBlock("div", {
								key: 2,
								class: "space-y-6 animate-fade-in"
							}, [createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
								createVNode("div", { class: "glass-card p-5 text-center" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Points d'écoute"), createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-cream" }, toDisplayString(props.listeningPoints?.total_points ?? 0), 1)]),
								createVNode("div", { class: "glass-card p-5 text-center" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Avec enregistrements"), createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-emerald" }, toDisplayString(props.listeningPoints?.points_with_recordings ?? 0), 1)]),
								createVNode("div", { class: "glass-card p-5 text-center" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Habitats"), createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-cream" }, toDisplayString(props.listeningPoints?.by_habitat?.length ?? 0), 1)]),
								createVNode("div", { class: "glass-card p-5 text-center" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Espèces détectées"), createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-emerald" }, toDisplayString(props.stats?.total_species ?? props.speciesDistribution?.length ?? 0), 1)])
							]), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Répartition par habitat"), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(props.listeningPoints?.by_habitat, (item, i) => {
								return openBlock(), createBlock("div", {
									key: item.habitat,
									class: "flex items-center justify-between p-2 rounded-lg bg-arbor-deep/30"
								}, [createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "text-xs font-mono text-arbor-sage" }, toDisplayString(i + 1), 1), createVNode("span", { class: "text-sm text-arbor-cream capitalize" }, toDisplayString(item.habitat), 1)]), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(item.count), 1)]);
							}), 128))])]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Points les plus actifs"), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(props.listeningPoints?.most_active, (item) => {
								return openBlock(), createBlock(unref(Link), {
									key: item.slug,
									href: _ctx.route("listening-points.show", item.slug),
									class: "flex items-center justify-between p-2.5 rounded-lg bg-arbor-deep/30 hover:bg-arbor-deep/50 transition-colors"
								}, {
									default: withCtx(() => [createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "text-sm text-arbor-cream" }, toDisplayString(item.title), 1)]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(item.species_count) + " esp.", 1), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(item.recordings_count), 1)])]),
									_: 2
								}, 1032, ["href"]);
							}), 128))])])])])) : createCommentVNode("", true),
							activeTab.value === "species" ? (openBlock(), createBlock("div", {
								key: 3,
								class: "space-y-6 animate-fade-in"
							}, [createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
								createVNode("div", { class: "glass-card p-5 text-center" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Espèces détectées"), createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-cream" }, toDisplayString(props.speciesDistribution?.length ?? 0), 1)]),
								createVNode("div", { class: "glass-card p-5 text-center" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Détections totales"), createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-emerald" }, toDisplayString(props.speciesDistribution?.reduce((a, s) => a + s.detections_count, 0) ?? 0), 1)]),
								createVNode("div", { class: "glass-card p-5 text-center" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Confiance moy."), createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-cream" }, toDisplayString(props.speciesDistribution?.length ? Math.round(props.speciesDistribution.reduce((a, s) => a + s.mean_confidence, 0) / props.speciesDistribution.length * 100) : 0) + "% ", 1)]),
								createVNode("div", { class: "glass-card p-5 text-center" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Sons concernés"), createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-emerald" }, toDisplayString(props.speciesDistribution?.reduce((a, s) => a + s.sounds_count, 0) ?? 0), 1)])
							]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Top espèces détectées"), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(props.speciesDistribution?.slice(0, 30), (s) => {
								return openBlock(), createBlock("div", {
									key: s.scientific_name,
									class: "p-4 rounded-xl bg-arbor-deep/30 border border-arbor-glass-border/30"
								}, [createVNode("div", { class: "flex items-start justify-between" }, [createVNode("div", null, [createVNode("h4", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(s.common_name), 1), createVNode("p", { class: "text-xs text-arbor-sage italic" }, toDisplayString(s.scientific_name), 1)]), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(s.sounds_count) + " son" + toDisplayString(s.sounds_count > 1 ? "s" : ""), 1)]), createVNode("div", { class: "mt-2 flex items-center justify-between text-xs text-arbor-sage" }, [createVNode("span", null, toDisplayString(s.detections_count) + " détection" + toDisplayString(s.detections_count > 1 ? "s" : ""), 1), createVNode("span", null, "conf. " + toDisplayString(Math.round(s.mean_confidence * 100)) + "%", 1)])]);
							}), 128))])])])) : createCommentVNode("", true),
							activeTab.value === "models" ? (openBlock(), createBlock("div", {
								key: 4,
								class: "space-y-6 animate-fade-in"
							}, [
								createVNode("div", { class: "glass-card p-6" }, [createVNode("div", { class: "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6" }, [createVNode("div", null, [
									createVNode("p", { class: "text-xs uppercase tracking-widest text-arbor-emerald mb-2" }, "Model stats"),
									createVNode("h3", { class: "font-display text-2xl font-semibold text-arbor-cream" }, "Indicateurs descriptifs versionnés"),
									createVNode("p", { class: "mt-2 text-sm leading-relaxed text-arbor-sage max-w-3xl" }, " Les modèles Arborisis sont publiés comme variables explicables du dataset, pas comme vérité naturaliste. Chaque score expose son échantillon, ses bornes et son endpoint API. ")
								]), createVNode("div", { class: "rounded-xl border border-arbor-emerald/25 bg-arbor-emerald/10 px-4 py-3" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Endpoint"), createVNode("code", { class: "mt-1 block text-sm text-arbor-emerald" }, "/api/scientific-stats/model-stats")])]), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(modelCards.value, (model) => {
									return openBlock(), createBlock("div", {
										key: model.key,
										class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-5"
									}, [createVNode("div", { class: "flex items-start justify-between gap-4" }, [createVNode("div", null, [
										createVNode("p", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(model.title), 1),
										createVNode("h4", { class: "mt-1 text-lg font-semibold text-arbor-cream" }, toDisplayString(model.name), 1),
										createVNode("p", { class: "mt-2 text-sm leading-relaxed text-arbor-sage" }, toDisplayString(model.desc), 1)
									]), createVNode("div", { class: "text-right" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "N"), createVNode("p", { class: "mt-1 text-2xl font-bold text-arbor-cream font-mono" }, toDisplayString(model.metric.count ?? 0), 1)])]), createVNode("div", { class: "mt-5 grid grid-cols-2 md:grid-cols-4 gap-2" }, [
										createVNode("div", { class: "rounded-lg bg-arbor-night/70 p-3" }, [createVNode("p", { class: "text-[11px] uppercase tracking-wider text-arbor-sage" }, "Moy."), createVNode("p", { class: "mt-1 text-sm font-mono text-arbor-cream" }, toDisplayString(model.metric.mean ?? "-"), 1)]),
										createVNode("div", { class: "rounded-lg bg-arbor-night/70 p-3" }, [createVNode("p", { class: "text-[11px] uppercase tracking-wider text-arbor-sage" }, "Méd."), createVNode("p", { class: "mt-1 text-sm font-mono text-arbor-cream" }, toDisplayString(model.metric.median ?? "-"), 1)]),
										createVNode("div", { class: "rounded-lg bg-arbor-night/70 p-3" }, [createVNode("p", { class: "text-[11px] uppercase tracking-wider text-arbor-sage" }, "Min"), createVNode("p", { class: "mt-1 text-sm font-mono text-arbor-cream" }, toDisplayString(model.metric.min ?? "-"), 1)]),
										createVNode("div", { class: "rounded-lg bg-arbor-night/70 p-3" }, [createVNode("p", { class: "text-[11px] uppercase tracking-wider text-arbor-sage" }, "Max"), createVNode("p", { class: "mt-1 text-sm font-mono text-arbor-cream" }, toDisplayString(model.metric.max ?? "-"), 1)])
									])]);
								}), 128))])]),
								createVNode("div", { class: "glass-card p-6" }, [
									createVNode("div", { class: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6" }, [createVNode("div", null, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream" }, "Contexte météo des modèles"), createVNode("p", { class: "mt-2 text-sm leading-relaxed text-arbor-sage max-w-3xl" }, " Les scores sont croisés avec les observations météo publiques issues des coordonnées approximées. Ces variables servent à contextualiser l'activité acoustique et la biodiversité sonore. ")]), createVNode("div", { class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/45 px-4 py-3" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Couverture météo"), createVNode("p", { class: "mt-1 text-2xl font-bold text-arbor-emerald font-mono" }, toDisplayString(Math.round(modelWeatherSummary.value.coverage.percentage ?? 0)) + "%", 1)])]),
									createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" }, [
										createVNode("div", { class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Température moyenne"), createVNode("p", { class: "mt-2 text-xl font-semibold text-arbor-cream font-mono" }, [createTextVNode(toDisplayString(modelWeatherSummary.value.averages.temperature_c ?? "-"), 1), modelWeatherSummary.value.averages.temperature_c !== null && modelWeatherSummary.value.averages.temperature_c !== void 0 ? (openBlock(), createBlock("span", { key: 0 }, " °C")) : createCommentVNode("", true)])]),
										createVNode("div", { class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Humidité moyenne"), createVNode("p", { class: "mt-2 text-xl font-semibold text-arbor-cream font-mono" }, [createTextVNode(toDisplayString(modelWeatherSummary.value.averages.humidity_percent ?? "-"), 1), modelWeatherSummary.value.averages.humidity_percent !== null && modelWeatherSummary.value.averages.humidity_percent !== void 0 ? (openBlock(), createBlock("span", { key: 0 }, "%")) : createCommentVNode("", true)])]),
										createVNode("div", { class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Vent moyen"), createVNode("p", { class: "mt-2 text-xl font-semibold text-arbor-cream font-mono" }, [createTextVNode(toDisplayString(modelWeatherSummary.value.averages.wind_speed_kmh ?? "-"), 1), modelWeatherSummary.value.averages.wind_speed_kmh !== null && modelWeatherSummary.value.averages.wind_speed_kmh !== void 0 ? (openBlock(), createBlock("span", { key: 0 }, " km/h")) : createCommentVNode("", true)])])
									]),
									createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-4" }, [
										createVNode("div", { class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" }, [createVNode("h4", { class: "text-sm font-semibold text-arbor-cream mb-3" }, "Conditions météo"), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(modelWeatherSummary.value.conditions.slice(0, 8), (condition) => {
											return openBlock(), createBlock("div", {
												key: condition.condition,
												class: "flex items-center justify-between gap-3 text-sm"
											}, [createVNode("span", { class: "text-arbor-sage" }, toDisplayString(condition.condition), 1), createVNode("span", { class: "font-mono text-arbor-emerald" }, toDisplayString(condition.count), 1)]);
										}), 128)), modelWeatherSummary.value.conditions.length === 0 ? (openBlock(), createBlock("p", {
											key: 0,
											class: "text-sm text-arbor-sage"
										}, "Aucune météo associée pour le moment.")) : createCommentVNode("", true)])]),
										createVNode("div", { class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" }, [createVNode("h4", { class: "text-sm font-semibold text-arbor-cream mb-3" }, "AAS par météo"), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(modelWeatherSummary.value.activityByCondition.slice(0, 8), (row) => {
											return openBlock(), createBlock("div", {
												key: row.condition,
												class: "flex items-center justify-between gap-3 text-sm"
											}, [createVNode("span", { class: "text-arbor-sage" }, toDisplayString(row.condition), 1), createVNode("span", { class: "font-mono text-arbor-emerald" }, toDisplayString(row.mean_acoustic_activity_score), 1)]);
										}), 128)), modelWeatherSummary.value.activityByCondition.length === 0 ? (openBlock(), createBlock("p", {
											key: 0,
											class: "text-sm text-arbor-sage"
										}, "Aucun score AAS croisé météo.")) : createCommentVNode("", true)])]),
										createVNode("div", { class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" }, [createVNode("h4", { class: "text-sm font-semibold text-arbor-cream mb-3" }, "SBS par météo"), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(modelWeatherSummary.value.biodiversityByCondition.slice(0, 8), (row) => {
											return openBlock(), createBlock("div", {
												key: row.condition,
												class: "flex items-center justify-between gap-3 text-sm"
											}, [createVNode("span", { class: "text-arbor-sage" }, toDisplayString(row.condition), 1), createVNode("span", { class: "font-mono text-arbor-emerald" }, toDisplayString(row.mean_value), 1)]);
										}), 128)), modelWeatherSummary.value.biodiversityByCondition.length === 0 ? (openBlock(), createBlock("p", {
											key: 0,
											class: "text-sm text-arbor-sage"
										}, "Aucun score SBS croisé météo.")) : createCommentVNode("", true)])])
									]),
									createVNode("div", { class: "mt-6 rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" }, [createVNode("div", { class: "flex items-center justify-between gap-4 mb-3" }, [createVNode("h4", { class: "text-sm font-semibold text-arbor-cream" }, "Sons individuels enrichis"), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(modelWeatherSummary.value.individualSounds.length), 1)]), createVNode("div", { class: "overflow-x-auto" }, [createVNode("table", { class: "w-full text-sm text-left" }, [createVNode("thead", { class: "text-xs text-arbor-sage uppercase border-b border-arbor-glass-border" }, [createVNode("tr", null, [
										createVNode("th", { class: "px-3 py-2" }, "Son"),
										createVNode("th", { class: "px-3 py-2" }, "Coordonnées publiques"),
										createVNode("th", { class: "px-3 py-2" }, "Temp."),
										createVNode("th", { class: "px-3 py-2" }, "Humidité"),
										createVNode("th", { class: "px-3 py-2" }, "Vent"),
										createVNode("th", { class: "px-3 py-2" }, "Condition")
									])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(modelWeatherSummary.value.individualSounds.slice(0, 25), (sound) => {
										return openBlock(), createBlock("tr", {
											key: sound.sound_id,
											class: "border-b border-arbor-glass-border/40"
										}, [
											createVNode("td", { class: "px-3 py-2 text-arbor-cream max-w-[260px] truncate" }, toDisplayString(sound.title), 1),
											createVNode("td", { class: "px-3 py-2 text-arbor-sage font-mono text-xs" }, toDisplayString(Number(sound.public_latitude).toFixed(2)) + ", " + toDisplayString(Number(sound.public_longitude).toFixed(2)), 1),
											createVNode("td", { class: "px-3 py-2 text-arbor-sage font-mono" }, toDisplayString(sound.weather?.temperature_c ?? "-"), 1),
											createVNode("td", { class: "px-3 py-2 text-arbor-sage font-mono" }, toDisplayString(sound.weather?.humidity_percent ?? "-"), 1),
											createVNode("td", { class: "px-3 py-2 text-arbor-sage font-mono" }, toDisplayString(sound.weather?.wind_speed_kmh ?? "-"), 1),
											createVNode("td", { class: "px-3 py-2 text-arbor-emerald" }, toDisplayString(sound.weather?.weather_condition ?? "à enrichir"), 1)
										]);
									}), 128)), modelWeatherSummary.value.individualSounds.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
										colspan: "6",
										class: "px-3 py-6 text-center text-arbor-sage"
									}, "Aucun son public avec météo individuelle pour le moment.")])) : createCommentVNode("", true)])])])])
								]),
								createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Score de biodiversité sonore (SBS)"), props.globalMetrics?.biodiversity_score?.count ? (openBlock(), createBlock("div", {
									key: 0,
									class: "space-y-3"
								}, [
									createVNode("div", { class: "flex justify-between text-sm" }, [createVNode("span", { class: "text-arbor-sage" }, "Moyenne"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(props.globalMetrics.biodiversity_score.mean), 1)]),
									createVNode("div", { class: "flex justify-between text-sm" }, [createVNode("span", { class: "text-arbor-sage" }, "Médiane"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(props.globalMetrics.biodiversity_score.median), 1)]),
									createVNode("div", { class: "flex justify-between text-sm" }, [createVNode("span", { class: "text-arbor-sage" }, "Min / Max"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(props.globalMetrics.biodiversity_score.min) + " / " + toDisplayString(props.globalMetrics.biodiversity_score.max), 1)]),
									createVNode("div", { class: "flex justify-between text-sm" }, [createVNode("span", { class: "text-arbor-sage" }, "Échantillon"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(props.globalMetrics.biodiversity_score.count), 1)])
								])) : (openBlock(), createBlock("p", {
									key: 1,
									class: "text-sm text-arbor-sage"
								}, "Aucune métrique de biodiversité calculée pour le moment."))]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Score d'activité acoustique (AAS)"), props.globalMetrics?.acoustic_activity_score?.count ? (openBlock(), createBlock("div", {
									key: 0,
									class: "space-y-3"
								}, [
									createVNode("div", { class: "flex justify-between text-sm" }, [createVNode("span", { class: "text-arbor-sage" }, "Moyenne"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(props.globalMetrics.acoustic_activity_score.mean), 1)]),
									createVNode("div", { class: "flex justify-between text-sm" }, [createVNode("span", { class: "text-arbor-sage" }, "Médiane"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(props.globalMetrics.acoustic_activity_score.median), 1)]),
									createVNode("div", { class: "flex justify-between text-sm" }, [createVNode("span", { class: "text-arbor-sage" }, "Min / Max"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(props.globalMetrics.acoustic_activity_score.min) + " / " + toDisplayString(props.globalMetrics.acoustic_activity_score.max), 1)]),
									createVNode("div", { class: "flex justify-between text-sm" }, [createVNode("span", { class: "text-arbor-sage" }, "Échantillon"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(props.globalMetrics.acoustic_activity_score.count), 1)])
								])) : (openBlock(), createBlock("p", {
									key: 1,
									class: "text-sm text-arbor-sage"
								}, "Aucune métrique d'activité calculée pour le moment."))])]),
								createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Méthodologie des modèles"), createVNode("div", { class: "space-y-4 text-sm text-arbor-sage" }, [createVNode("p", null, [
									createTextVNode("Les scores présentés sont des "),
									createVNode("strong", { class: "text-arbor-cream" }, "indicateurs descriptifs"),
									createTextVNode(" calculés à partir des features audio et des détections d'espèces. Ils ne remplacent pas une expertise naturaliste.")
								]), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, [createVNode("div", { class: "p-4 rounded-xl bg-arbor-deep/30 border border-arbor-glass-border/30" }, [createVNode("h4", { class: "text-arbor-cream font-medium mb-2" }, "SBS — Sound Biodiversity Score"), createVNode("p", null, "Combinaison pondérée du nombre d'espèces, de l'ADI (Acoustic Diversity Index), de la diversité des tags et de l'équilibre spectral.")]), createVNode("div", { class: "p-4 rounded-xl bg-arbor-deep/30 border border-arbor-glass-border/30" }, [createVNode("h4", { class: "text-arbor-cream font-medium mb-2" }, "AAS — Acoustic Activity Score"), createVNode("p", null, "Basé sur la loudness LUFS, la densité d'événements sonores, le ratio de silence et l'énergie RMS moyenne.")])])])])
							])) : createCommentVNode("", true),
							activeTab.value === "geo" ? (openBlock(), createBlock("div", {
								key: 5,
								class: "space-y-6 animate-fade-in"
							}, [createVNode(unref(GeoHeatmap), { points: props.geoHeatmap }, null, 8, ["points"]), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [createVNode("div", { class: "glass-card p-6 lg:col-span-2" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Densité par région"), createVNode("div", { class: "space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(props.geoHeatmap.slice(0, 50), (loc, i) => {
								return openBlock(), createBlock("div", {
									key: i,
									class: "flex items-center justify-between p-2 rounded-lg bg-arbor-deep/30"
								}, [createVNode("div", { class: "flex items-center gap-3" }, [
									createVNode("span", { class: "text-xs font-mono text-arbor-sage" }, toDisplayString(i + 1), 1),
									createVNode("span", { class: "text-sm text-arbor-cream font-mono" }, toDisplayString(loc.lat.toFixed(1)) + ", " + toDisplayString(loc.lng.toFixed(1)), 1),
									createVNode("span", { class: "text-xs text-arbor-sage/70 truncate max-w-[200px]" }, toDisplayString(loc.categories), 1)
								]), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(loc.count), 1)]);
							}), 128))])]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Méthodologie"), createVNode("div", { class: "space-y-3 text-sm text-arbor-sage" }, [
								createVNode("p", null, [
									createTextVNode("Les coordonnées sont agrégées par cellules de "),
									createVNode("strong", { class: "text-arbor-cream" }, "0.1°"),
									createTextVNode(" (environ 11 km) pour préserver la confidentialité des lieux sensibles.")
								]),
								createVNode("p", null, "Les coordonnées exactes des enregistrements ne sont jamais exposées publiquement."),
								createVNode("p", null, [
									createTextVNode("Seuls les enregistrements "),
									createVNode("strong", { class: "text-arbor-cream" }, "publics"),
									createTextVNode(" et "),
									createVNode("strong", { class: "text-arbor-cream" }, "publiés"),
									createTextVNode(" sont comptabilisés.")
								])
							])])])])) : createCommentVNode("", true),
							activeTab.value === "audio" ? (openBlock(), createBlock("div", {
								key: 6,
								class: "space-y-6 animate-fade-in"
							}, [
								createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 gap-4" }, [
									createVNode("div", { class: "glass-card p-5" }, [
										createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Analyses terminées"),
										createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-cream" }, toDisplayString(audioSummary.value.completedAnalyses.toLocaleString("fr-FR")), 1),
										createVNode("p", { class: "mt-1 text-xs text-arbor-sage" }, "sur " + toDisplayString(audioSummary.value.totalAnalyses.toLocaleString("fr-FR")) + " analyses créées", 1)
									]),
									createVNode("div", { class: "glass-card p-5" }, [
										createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Couverture dataset"),
										createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-emerald" }, toDisplayString(audioSummary.value.coverage) + "%", 1),
										createVNode("div", { class: "mt-3 h-1.5 rounded-full bg-arbor-deep overflow-hidden" }, [createVNode("div", {
											class: "h-full rounded-full bg-arbor-emerald",
											style: { width: `${Math.min(audioSummary.value.coverage, 100)}%` }
										}, null, 4)])
									]),
									createVNode("div", { class: "glass-card p-5" }, [
										createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "Features publiées"),
										createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-cream" }, toDisplayString(audioSummary.value.featureCount), 1),
										createVNode("p", { class: "mt-1 text-xs text-arbor-sage" }, toDisplayString(audioSummary.value.distributionCount) + " distributions disponibles", 1)
									]),
									createVNode("div", { class: "glass-card p-5" }, [
										createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage" }, "File d'attente"),
										createVNode("p", { class: "mt-2 font-display text-3xl font-bold text-arbor-amber" }, toDisplayString(audioSummary.value.pendingAnalyses.toLocaleString("fr-FR")), 1),
										createVNode("p", { class: "mt-1 text-xs text-arbor-sage" }, "analyses non finalisées")
									])
								]),
								audioSummary.value.hasFeatures ? (openBlock(), createBlock("div", {
									key: 0,
									class: "space-y-6"
								}, [createVNode(unref(AudioFeaturesChart), {
									features: audioFeaturesSafe.value,
									distributions: audioDistributionsSafe.value
								}, null, 8, ["features", "distributions"])])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "glass-card p-8 overflow-hidden relative"
								}, [createVNode("div", { class: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arbor-emerald/60 to-transparent" }), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center" }, [createVNode("div", null, [
									createVNode("p", { class: "text-xs uppercase tracking-widest text-arbor-emerald mb-3" }, "Analyse audio"),
									createVNode("h3", { class: "font-display text-2xl font-semibold text-arbor-cream mb-3" }, "Aucune feature exploitable n'est encore publiée"),
									createVNode("p", { class: "text-sm leading-relaxed text-arbor-sage" }, [
										createTextVNode(" La page reste prête pour les résultats du pipeline. Dès que les analyses auront des métriques dans "),
										createVNode("code", { class: "px-1.5 py-0.5 rounded bg-arbor-deep text-arbor-cream" }, "features_json"),
										createTextVNode(", les graphiques, histogrammes et statistiques descriptives apparaîtront automatiquement. ")
									])
								]), createVNode("div", { class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/50 p-5" }, [createVNode("p", { class: "text-xs uppercase tracking-wider text-arbor-sage mb-4" }, "À vérifier côté pipeline"), createVNode("div", { class: "space-y-3" }, [
									createVNode("div", { class: "flex items-start gap-3" }, [createVNode("span", { class: "mt-1 h-2 w-2 rounded-full bg-arbor-emerald" }), createVNode("p", { class: "text-sm text-arbor-sage" }, [
										createTextVNode("Les analyses sont marquées comme traitées via "),
										createVNode("code", { class: "text-arbor-cream" }, "processed_at"),
										createTextVNode(".")
									])]),
									createVNode("div", { class: "flex items-start gap-3" }, [createVNode("span", { class: "mt-1 h-2 w-2 rounded-full bg-arbor-amber" }), createVNode("p", { class: "text-sm text-arbor-sage" }, "Le JSON contient les chemins attendus : temporal, spectral, stats et values.")]),
									createVNode("div", { class: "flex items-start gap-3" }, [createVNode("span", { class: "mt-1 h-2 w-2 rounded-full bg-arbor-moss" }), createVNode("p", { class: "text-sm text-arbor-sage" }, "Les sons associés sont publics et publiés, sinon ils restent exclus.")])
								])])])])),
								createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Pipeline d'analyse"), createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList(pipelineSteps, (step, index) => {
									return createVNode("div", {
										key: step.title,
										class: "flex gap-4 rounded-xl border border-arbor-glass-border/70 bg-arbor-deep/35 p-4"
									}, [createVNode("div", { class: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-arbor-emerald/10 text-xs font-mono text-arbor-emerald" }, toDisplayString(index + 1), 1), createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-arbor-cream" }, toDisplayString(step.title), 1), createVNode("p", { class: "mt-1 text-sm leading-relaxed text-arbor-sage" }, toDisplayString(step.desc), 1)])]);
								}), 64))])]), createVNode("div", { class: "glass-card p-6" }, [
									createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Qualité & confidentialité"),
									createVNode("div", { class: "space-y-3" }, [(openBlock(), createBlock(Fragment, null, renderList(qualityChecks, (check) => {
										return createVNode("div", {
											key: check,
											class: "flex items-start gap-3 rounded-lg bg-arbor-deep/35 px-3 py-2.5"
										}, [createVNode("span", { class: "mt-1 h-2 w-2 rounded-full bg-arbor-emerald" }), createVNode("p", { class: "text-sm text-arbor-sage" }, toDisplayString(check), 1)]);
									}), 64))]),
									createVNode("div", { class: "mt-5 rounded-xl border border-arbor-amber/25 bg-arbor-amber/10 p-4" }, [createVNode("p", { class: "text-sm leading-relaxed text-arbor-sage" }, " Les métriques audio sont des indicateurs descriptifs. Elles ne remplacent pas une annotation naturaliste ni une validation experte des espèces ou habitats. ")])
								])]),
								createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Statistiques descriptives — Features audio"), createVNode("div", { class: "overflow-x-auto" }, [createVNode("table", { class: "w-full text-sm text-left" }, [createVNode("thead", { class: "text-xs text-arbor-sage uppercase border-b border-arbor-glass-border" }, [createVNode("tr", null, [
									createVNode("th", { class: "px-4 py-3" }, "Feature"),
									createVNode("th", { class: "px-4 py-3" }, "N"),
									createVNode("th", { class: "px-4 py-3" }, "Moyenne"),
									createVNode("th", { class: "px-4 py-3" }, "Médiane"),
									createVNode("th", { class: "px-4 py-3" }, "Écart-type"),
									createVNode("th", { class: "px-4 py-3" }, "Min"),
									createVNode("th", { class: "px-4 py-3" }, "Max")
								])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(audioFeatureRows.value, (row) => {
									return openBlock(), createBlock("tr", {
										key: row.key,
										class: "border-b border-arbor-glass-border/50 hover:bg-arbor-glass/20 transition-colors"
									}, [
										createVNode("td", { class: "px-4 py-3" }, [createVNode("div", { class: "text-arbor-cream font-medium" }, toDisplayString(row.label), 1), createVNode("div", { class: "mt-1 max-w-sm text-xs text-arbor-sage/70" }, toDisplayString(row.description), 1)]),
										createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(row.stats.count), 1),
										createVNode("td", { class: "px-4 py-3 text-arbor-emerald font-mono" }, toDisplayString(Number(row.stats.mean).toExponential(3)), 1),
										createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(Number(row.stats.median).toExponential(3)), 1),
										createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(Number(row.stats.std).toExponential(3)), 1),
										createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(Number(row.stats.min).toExponential(3)), 1),
										createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(Number(row.stats.max).toExponential(3)), 1)
									]);
								}), 128)), audioFeatureRows.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
									colspan: "7",
									class: "px-4 py-8 text-center text-arbor-sage"
								}, " Aucune statistique descriptive disponible pour le moment. ")])) : createCommentVNode("", true)])])])]),
								createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Dictionnaire des features"), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" }, [(openBlock(), createBlock(Fragment, null, renderList(featureDescriptions, (description, key) => {
									return createVNode("div", {
										key,
										class: "rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4"
									}, [
										createVNode("code", { class: "text-xs text-arbor-emerald" }, toDisplayString(key), 1),
										createVNode("h4", { class: "mt-2 text-sm font-semibold text-arbor-cream" }, toDisplayString(featureLabels[key] ?? key), 1),
										createVNode("p", { class: "mt-1 text-sm leading-relaxed text-arbor-sage" }, toDisplayString(description), 1)
									]);
								}), 64))])])
							])) : createCommentVNode("", true),
							activeTab.value === "data" ? (openBlock(), createBlock("div", {
								key: 7,
								class: "space-y-6 animate-fade-in"
							}, [createVNode(unref(DataTable), { data: props.rawDataSample }, null, 8, ["data"]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-2" }, "Licence d'utilisation des données"), createVNode("p", { class: "text-sm text-arbor-sage" }, [
								createTextVNode(" Les données exposées sur cette page et via l'API sont agrégées et anonymisées. Elles sont mises à disposition à des fins de recherche scientifique, d'éducation et de conservation. Merci de citer "),
								createVNode("strong", { class: "text-arbor-cream" }, "Arborisis"),
								createTextVNode(" dans vos publications. Pour un accès à des données plus granulaires ou spécifiques, contactez l'équipe. ")
							])])])) : createCommentVNode("", true),
							activeTab.value === "api" ? (openBlock(), createBlock("div", {
								key: 8,
								class: "space-y-6 animate-fade-in"
							}, [createVNode(unref(ApiDocs))])) : createCommentVNode("", true)
						])
					])];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ScientificStats/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Index_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-f664a2df"]]);
//#endregion
export { Index_default as default };
