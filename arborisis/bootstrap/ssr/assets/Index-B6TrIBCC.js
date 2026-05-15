import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-D-F0WtqU.js";
import { t as _sfc_main$2 } from "./GuestLayout-zlBIN9S_.js";
import { Head } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineAsyncComponent, mergeProps, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
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
		function animateCount(target, duration = 1200) {
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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6 hover-lift transition-all duration-300" }, _attrs))}><div class="flex items-start justify-between"><div><p class="text-arbor-sage text-sm font-medium tracking-wide uppercase">${ssrInterpolate(__props.label)}</p><p class="mt-2 text-3xl font-display font-bold text-arbor-cream">${ssrInterpolate(__props.decimals > 0 ? displayValue.value.toFixed(__props.decimals) : Math.round(displayValue.value).toLocaleString("fr-FR"))} `);
			if (__props.suffix) _push(`<span class="text-lg text-arbor-sage ml-1">${ssrInterpolate(__props.suffix)}</span>`);
			else _push(`<!---->`);
			_push(`</p></div>`);
			if (__props.icon) _push(`<div class="text-arbor-emerald/80 text-2xl">${ssrInterpolate(__props.icon)}</div>`);
			else _push(`<!---->`);
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
		rawDataSample: Array
	},
	setup(__props) {
		const CategoryChart = defineAsyncComponent(() => import("./CategoryChart-CFwS_pZn.js"));
		const EnvironmentChart = defineAsyncComponent(() => import("./EnvironmentChart-CF4xy0LA.js"));
		const TemporalChart = defineAsyncComponent(() => import("./TemporalChart-Dh1aeIgm.js"));
		const GeoHeatmap = defineAsyncComponent(() => import("./GeoHeatmap-CvdAjABl.js"));
		const AudioFeaturesChart = defineAsyncComponent(() => import("./AudioFeaturesChart-iegpdor4.js"));
		const DataTable = defineAsyncComponent(() => import("./DataTable-CBZPywX_.js"));
		const ApiDocs = defineAsyncComponent(() => import("./ApiDocs-yibSXQr3.js"));
		const EquipmentChart = defineAsyncComponent(() => import("./EquipmentChart-DOOJuqKb.js"));
		const props = __props;
		const activeTab = ref("overview");
		const audioFeaturesSafe = computed(() => props.audioFeatures ?? {});
		const audioDistributionsSafe = computed(() => props.audioFeatureDistribution ?? {});
		const statsSafe = computed(() => props.stats ?? {});
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
						_push(`<div class="min-h-screen bg-arbor-night" data-v-af7753fc${_scopeId}><div class="relative overflow-hidden" data-v-af7753fc${_scopeId}><div class="absolute inset-0 bg-gradient-to-b from-arbor-moss/10 via-transparent to-transparent pointer-events-none" data-v-af7753fc${_scopeId}></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10" data-v-af7753fc${_scopeId}><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4" data-v-af7753fc${_scopeId}><div data-v-af7753fc${_scopeId}><div class="flex items-center gap-2 mb-3" data-v-af7753fc${_scopeId}><span class="inline-block w-2 h-2 rounded-full bg-arbor-emerald animate-pulse" data-v-af7753fc${_scopeId}></span><span class="text-xs font-medium text-arbor-emerald uppercase tracking-widest" data-v-af7753fc${_scopeId}>Open Data</span></div><h1 class="font-display text-4xl md:text-5xl font-bold text-arbor-cream leading-tight" data-v-af7753fc${_scopeId}> Données scientifiques </h1><p class="mt-3 text-arbor-sage text-lg max-w-2xl" data-v-af7753fc${_scopeId}> Statistiques agrégées et anonymisées de la plateforme Arborisis, destinées à la recherche, la data science et la conservation. </p></div><div class="text-right hidden md:block" data-v-af7753fc${_scopeId}><p class="text-xs text-arbor-sage/60 font-mono" data-v-af7753fc${_scopeId}> Mis à jour : ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"))}</p><p class="text-xs text-arbor-sage/60 font-mono" data-v-af7753fc${_scopeId}>${ssrInterpolate(props.stats.total_sounds?.toLocaleString("fr-FR"))} sons indexés </p></div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" data-v-af7753fc${_scopeId}><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-v-af7753fc${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Enregistrements",
							value: props.stats.total_sounds,
							icon: "🎙️"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Durée totale",
							value: Math.round((props.stats.total_duration_seconds || 0) / 3600),
							suffix: "h",
							icon: "⏱️"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Créateurs",
							value: props.stats.total_creators,
							icon: "👤"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Lieux uniques",
							value: props.stats.total_locations,
							icon: "📍"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Analyses",
							value: props.stats.completed_analyses,
							icon: "📊"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							label: "Durée moy.",
							value: Math.round(props.stats.avg_duration_seconds || 0),
							suffix: "s",
							icon: "📏"
						}, null, _parent, _scopeId));
						_push(`</div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4" data-v-af7753fc${_scopeId}><div class="flex flex-wrap gap-1 p-1 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border backdrop-blur-sm" data-v-af7753fc${_scopeId}><!--[-->`);
						ssrRenderList(tabs, (tab) => {
							_push(`<button class="${ssrRenderClass(["px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200", activeTab.value === tab.key ? "bg-arbor-moss/20 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30"])}" data-v-af7753fc${_scopeId}>${ssrInterpolate(tab.label)}</button>`);
						});
						_push(`<!--]--></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" data-v-af7753fc${_scopeId}>`);
						if (activeTab.value === "overview") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-af7753fc${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-af7753fc${_scopeId}>`);
							_push(ssrRenderComponent(unref(CategoryChart), { categories: props.categoryDistribution }, null, _parent, _scopeId));
							_push(ssrRenderComponent(unref(EnvironmentChart), { data: props.environmentDistribution }, null, _parent, _scopeId));
							_push(`</div>`);
							_push(ssrRenderComponent(unref(TemporalChart), { data: props.temporalDistribution }, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-af7753fc${_scopeId}><div class="glass-card p-6" data-v-af7753fc${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-af7753fc${_scopeId}>Lieux les plus enregistrés</h3><div class="space-y-2" data-v-af7753fc${_scopeId}><!--[-->`);
							ssrRenderList(props.topLocations.slice(0, 10), (loc, i) => {
								_push(`<div class="flex items-center justify-between p-2.5 rounded-lg bg-arbor-deep/50 border border-arbor-glass-border/50 hover:border-arbor-emerald/30 transition-colors" data-v-af7753fc${_scopeId}><div class="flex items-center gap-3" data-v-af7753fc${_scopeId}><span class="text-xs font-mono text-arbor-sage w-5" data-v-af7753fc${_scopeId}>${ssrInterpolate(i + 1)}</span><span class="text-sm text-arbor-cream" data-v-af7753fc${_scopeId}>${ssrInterpolate(loc.name)}</span></div><span class="text-xs font-mono text-arbor-emerald" data-v-af7753fc${_scopeId}>${ssrInterpolate(loc.count)}</span></div>`);
							});
							_push(`<!--]--></div></div>`);
							_push(ssrRenderComponent(unref(EquipmentChart), { data: props.equipmentDistribution }, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "geo") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-af7753fc${_scopeId}>`);
							_push(ssrRenderComponent(unref(GeoHeatmap), { points: props.geoHeatmap }, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-af7753fc${_scopeId}><div class="glass-card p-6 lg:col-span-2" data-v-af7753fc${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-af7753fc${_scopeId}>Densité par région</h3><div class="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2" data-v-af7753fc${_scopeId}><!--[-->`);
							ssrRenderList(props.geoHeatmap.slice(0, 50), (loc, i) => {
								_push(`<div class="flex items-center justify-between p-2 rounded-lg bg-arbor-deep/30" data-v-af7753fc${_scopeId}><div class="flex items-center gap-3" data-v-af7753fc${_scopeId}><span class="text-xs font-mono text-arbor-sage" data-v-af7753fc${_scopeId}>${ssrInterpolate(i + 1)}</span><span class="text-sm text-arbor-cream font-mono" data-v-af7753fc${_scopeId}>${ssrInterpolate(loc.lat.toFixed(1))}, ${ssrInterpolate(loc.lng.toFixed(1))}</span><span class="text-xs text-arbor-sage/70 truncate max-w-[200px]" data-v-af7753fc${_scopeId}>${ssrInterpolate(loc.categories)}</span></div><span class="text-xs font-mono text-arbor-emerald" data-v-af7753fc${_scopeId}>${ssrInterpolate(loc.count)}</span></div>`);
							});
							_push(`<!--]--></div></div><div class="glass-card p-6" data-v-af7753fc${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-af7753fc${_scopeId}>Méthodologie</h3><div class="space-y-3 text-sm text-arbor-sage" data-v-af7753fc${_scopeId}><p data-v-af7753fc${_scopeId}>Les coordonnées sont agrégées par cellules de <strong class="text-arbor-cream" data-v-af7753fc${_scopeId}>0.1°</strong> (environ 11 km) pour préserver la confidentialité des lieux sensibles.</p><p data-v-af7753fc${_scopeId}>Les coordonnées exactes des enregistrements ne sont jamais exposées publiquement.</p><p data-v-af7753fc${_scopeId}>Seuls les enregistrements <strong class="text-arbor-cream" data-v-af7753fc${_scopeId}>publics</strong> et <strong class="text-arbor-cream" data-v-af7753fc${_scopeId}>publiés</strong> sont comptabilisés.</p></div></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "audio") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-af7753fc${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-4 gap-4" data-v-af7753fc${_scopeId}><div class="glass-card p-5" data-v-af7753fc${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-af7753fc${_scopeId}>Analyses terminées</p><p class="mt-2 font-display text-3xl font-bold text-arbor-cream" data-v-af7753fc${_scopeId}>${ssrInterpolate(audioSummary.value.completedAnalyses.toLocaleString("fr-FR"))}</p><p class="mt-1 text-xs text-arbor-sage" data-v-af7753fc${_scopeId}>sur ${ssrInterpolate(audioSummary.value.totalAnalyses.toLocaleString("fr-FR"))} analyses créées</p></div><div class="glass-card p-5" data-v-af7753fc${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-af7753fc${_scopeId}>Couverture dataset</p><p class="mt-2 font-display text-3xl font-bold text-arbor-emerald" data-v-af7753fc${_scopeId}>${ssrInterpolate(audioSummary.value.coverage)}%</p><div class="mt-3 h-1.5 rounded-full bg-arbor-deep overflow-hidden" data-v-af7753fc${_scopeId}><div class="h-full rounded-full bg-arbor-emerald" style="${ssrRenderStyle({ width: `${Math.min(audioSummary.value.coverage, 100)}%` })}" data-v-af7753fc${_scopeId}></div></div></div><div class="glass-card p-5" data-v-af7753fc${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-af7753fc${_scopeId}>Features publiées</p><p class="mt-2 font-display text-3xl font-bold text-arbor-cream" data-v-af7753fc${_scopeId}>${ssrInterpolate(audioSummary.value.featureCount)}</p><p class="mt-1 text-xs text-arbor-sage" data-v-af7753fc${_scopeId}>${ssrInterpolate(audioSummary.value.distributionCount)} distributions disponibles</p></div><div class="glass-card p-5" data-v-af7753fc${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage" data-v-af7753fc${_scopeId}>File d&#39;attente</p><p class="mt-2 font-display text-3xl font-bold text-arbor-amber" data-v-af7753fc${_scopeId}>${ssrInterpolate(audioSummary.value.pendingAnalyses.toLocaleString("fr-FR"))}</p><p class="mt-1 text-xs text-arbor-sage" data-v-af7753fc${_scopeId}>analyses non finalisées</p></div></div>`);
							if (audioSummary.value.hasFeatures) {
								_push(`<div class="space-y-6" data-v-af7753fc${_scopeId}>`);
								_push(ssrRenderComponent(unref(AudioFeaturesChart), {
									features: audioFeaturesSafe.value,
									distributions: audioDistributionsSafe.value
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<div class="glass-card p-8 overflow-hidden relative" data-v-af7753fc${_scopeId}><div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arbor-emerald/60 to-transparent" data-v-af7753fc${_scopeId}></div><div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center" data-v-af7753fc${_scopeId}><div data-v-af7753fc${_scopeId}><p class="text-xs uppercase tracking-widest text-arbor-emerald mb-3" data-v-af7753fc${_scopeId}>Analyse audio</p><h3 class="font-display text-2xl font-semibold text-arbor-cream mb-3" data-v-af7753fc${_scopeId}>Aucune feature exploitable n&#39;est encore publiée</h3><p class="text-sm leading-relaxed text-arbor-sage" data-v-af7753fc${_scopeId}> La page reste prête pour les résultats du pipeline. Dès que les analyses auront des métriques dans <code class="px-1.5 py-0.5 rounded bg-arbor-deep text-arbor-cream" data-v-af7753fc${_scopeId}>features_json</code>, les graphiques, histogrammes et statistiques descriptives apparaîtront automatiquement. </p></div><div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/50 p-5" data-v-af7753fc${_scopeId}><p class="text-xs uppercase tracking-wider text-arbor-sage mb-4" data-v-af7753fc${_scopeId}>À vérifier côté pipeline</p><div class="space-y-3" data-v-af7753fc${_scopeId}><div class="flex items-start gap-3" data-v-af7753fc${_scopeId}><span class="mt-1 h-2 w-2 rounded-full bg-arbor-emerald" data-v-af7753fc${_scopeId}></span><p class="text-sm text-arbor-sage" data-v-af7753fc${_scopeId}>Les analyses sont marquées comme traitées via <code class="text-arbor-cream" data-v-af7753fc${_scopeId}>processed_at</code>.</p></div><div class="flex items-start gap-3" data-v-af7753fc${_scopeId}><span class="mt-1 h-2 w-2 rounded-full bg-arbor-amber" data-v-af7753fc${_scopeId}></span><p class="text-sm text-arbor-sage" data-v-af7753fc${_scopeId}>Le JSON contient les chemins attendus : temporal, spectral, stats et values.</p></div><div class="flex items-start gap-3" data-v-af7753fc${_scopeId}><span class="mt-1 h-2 w-2 rounded-full bg-arbor-moss" data-v-af7753fc${_scopeId}></span><p class="text-sm text-arbor-sage" data-v-af7753fc${_scopeId}>Les sons associés sont publics et publiés, sinon ils restent exclus.</p></div></div></div></div></div>`);
							_push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-af7753fc${_scopeId}><div class="glass-card p-6" data-v-af7753fc${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-af7753fc${_scopeId}>Pipeline d&#39;analyse</h3><div class="space-y-4" data-v-af7753fc${_scopeId}><!--[-->`);
							ssrRenderList(pipelineSteps, (step, index) => {
								_push(`<div class="flex gap-4 rounded-xl border border-arbor-glass-border/70 bg-arbor-deep/35 p-4" data-v-af7753fc${_scopeId}><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-arbor-emerald/10 text-xs font-mono text-arbor-emerald" data-v-af7753fc${_scopeId}>${ssrInterpolate(index + 1)}</div><div data-v-af7753fc${_scopeId}><h4 class="text-sm font-semibold text-arbor-cream" data-v-af7753fc${_scopeId}>${ssrInterpolate(step.title)}</h4><p class="mt-1 text-sm leading-relaxed text-arbor-sage" data-v-af7753fc${_scopeId}>${ssrInterpolate(step.desc)}</p></div></div>`);
							});
							_push(`<!--]--></div></div><div class="glass-card p-6" data-v-af7753fc${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-af7753fc${_scopeId}>Qualité &amp; confidentialité</h3><div class="space-y-3" data-v-af7753fc${_scopeId}><!--[-->`);
							ssrRenderList(qualityChecks, (check) => {
								_push(`<div class="flex items-start gap-3 rounded-lg bg-arbor-deep/35 px-3 py-2.5" data-v-af7753fc${_scopeId}><span class="mt-1 h-2 w-2 rounded-full bg-arbor-emerald" data-v-af7753fc${_scopeId}></span><p class="text-sm text-arbor-sage" data-v-af7753fc${_scopeId}>${ssrInterpolate(check)}</p></div>`);
							});
							_push(`<!--]--></div><div class="mt-5 rounded-xl border border-arbor-amber/25 bg-arbor-amber/10 p-4" data-v-af7753fc${_scopeId}><p class="text-sm leading-relaxed text-arbor-sage" data-v-af7753fc${_scopeId}> Les métriques audio sont des indicateurs descriptifs. Elles ne remplacent pas une annotation naturaliste ni une validation experte des espèces ou habitats. </p></div></div></div><div class="glass-card p-6" data-v-af7753fc${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-af7753fc${_scopeId}>Statistiques descriptives — Features audio</h3><div class="overflow-x-auto" data-v-af7753fc${_scopeId}><table class="w-full text-sm text-left" data-v-af7753fc${_scopeId}><thead class="text-xs text-arbor-sage uppercase border-b border-arbor-glass-border" data-v-af7753fc${_scopeId}><tr data-v-af7753fc${_scopeId}><th class="px-4 py-3" data-v-af7753fc${_scopeId}>Feature</th><th class="px-4 py-3" data-v-af7753fc${_scopeId}>N</th><th class="px-4 py-3" data-v-af7753fc${_scopeId}>Moyenne</th><th class="px-4 py-3" data-v-af7753fc${_scopeId}>Médiane</th><th class="px-4 py-3" data-v-af7753fc${_scopeId}>Écart-type</th><th class="px-4 py-3" data-v-af7753fc${_scopeId}>Min</th><th class="px-4 py-3" data-v-af7753fc${_scopeId}>Max</th></tr></thead><tbody data-v-af7753fc${_scopeId}><!--[-->`);
							ssrRenderList(audioFeatureRows.value, (row) => {
								_push(`<tr class="border-b border-arbor-glass-border/50 hover:bg-arbor-glass/20 transition-colors" data-v-af7753fc${_scopeId}><td class="px-4 py-3" data-v-af7753fc${_scopeId}><div class="text-arbor-cream font-medium" data-v-af7753fc${_scopeId}>${ssrInterpolate(row.label)}</div><div class="mt-1 max-w-sm text-xs text-arbor-sage/70" data-v-af7753fc${_scopeId}>${ssrInterpolate(row.description)}</div></td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-af7753fc${_scopeId}>${ssrInterpolate(row.stats.count)}</td><td class="px-4 py-3 text-arbor-emerald font-mono" data-v-af7753fc${_scopeId}>${ssrInterpolate(Number(row.stats.mean).toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-af7753fc${_scopeId}>${ssrInterpolate(Number(row.stats.median).toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-af7753fc${_scopeId}>${ssrInterpolate(Number(row.stats.std).toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-af7753fc${_scopeId}>${ssrInterpolate(Number(row.stats.min).toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-af7753fc${_scopeId}>${ssrInterpolate(Number(row.stats.max).toExponential(3))}</td></tr>`);
							});
							_push(`<!--]-->`);
							if (audioFeatureRows.value.length === 0) _push(`<tr data-v-af7753fc${_scopeId}><td colspan="7" class="px-4 py-8 text-center text-arbor-sage" data-v-af7753fc${_scopeId}> Aucune statistique descriptive disponible pour le moment. </td></tr>`);
							else _push(`<!---->`);
							_push(`</tbody></table></div></div><div class="glass-card p-6" data-v-af7753fc${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-af7753fc${_scopeId}>Dictionnaire des features</h3><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" data-v-af7753fc${_scopeId}><!--[-->`);
							ssrRenderList(featureDescriptions, (description, key) => {
								_push(`<div class="rounded-xl border border-arbor-glass-border bg-arbor-deep/35 p-4" data-v-af7753fc${_scopeId}><code class="text-xs text-arbor-emerald" data-v-af7753fc${_scopeId}>${ssrInterpolate(key)}</code><h4 class="mt-2 text-sm font-semibold text-arbor-cream" data-v-af7753fc${_scopeId}>${ssrInterpolate(featureLabels[key] ?? key)}</h4><p class="mt-1 text-sm leading-relaxed text-arbor-sage" data-v-af7753fc${_scopeId}>${ssrInterpolate(description)}</p></div>`);
							});
							_push(`<!--]--></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "data") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-af7753fc${_scopeId}>`);
							_push(ssrRenderComponent(unref(DataTable), { data: props.rawDataSample }, null, _parent, _scopeId));
							_push(`<div class="glass-card p-6" data-v-af7753fc${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-2" data-v-af7753fc${_scopeId}>Licence d&#39;utilisation des données</h3><p class="text-sm text-arbor-sage" data-v-af7753fc${_scopeId}> Les données exposées sur cette page et via l&#39;API sont agrégées et anonymisées. Elles sont mises à disposition à des fins de recherche scientifique, d&#39;éducation et de conservation. Merci de citer <strong class="text-arbor-cream" data-v-af7753fc${_scopeId}>Arborisis</strong> dans vos publications. Pour un accès à des données plus granulaires ou spécifiques, contactez l&#39;équipe. </p></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "api") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-af7753fc${_scopeId}>`);
							_push(ssrRenderComponent(unref(ApiDocs), null, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "min-h-screen bg-arbor-night" }, [
						createVNode("div", { class: "relative overflow-hidden" }, [createVNode("div", { class: "absolute inset-0 bg-gradient-to-b from-arbor-moss/10 via-transparent to-transparent pointer-events-none" }), createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10" }, [createVNode("div", { class: "flex flex-col md:flex-row md:items-end md:justify-between gap-4" }, [createVNode("div", null, [
							createVNode("div", { class: "flex items-center gap-2 mb-3" }, [createVNode("span", { class: "inline-block w-2 h-2 rounded-full bg-arbor-emerald animate-pulse" }), createVNode("span", { class: "text-xs font-medium text-arbor-emerald uppercase tracking-widest" }, "Open Data")]),
							createVNode("h1", { class: "font-display text-4xl md:text-5xl font-bold text-arbor-cream leading-tight" }, " Données scientifiques "),
							createVNode("p", { class: "mt-3 text-arbor-sage text-lg max-w-2xl" }, " Statistiques agrégées et anonymisées de la plateforme Arborisis, destinées à la recherche, la data science et la conservation. ")
						]), createVNode("div", { class: "text-right hidden md:block" }, [createVNode("p", { class: "text-xs text-arbor-sage/60 font-mono" }, " Mis à jour : " + toDisplayString((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")), 1), createVNode("p", { class: "text-xs text-arbor-sage/60 font-mono" }, toDisplayString(props.stats.total_sounds?.toLocaleString("fr-FR")) + " sons indexés ", 1)])])])]),
						createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" }, [createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" }, [
							createVNode(_sfc_main$1, {
								label: "Enregistrements",
								value: props.stats.total_sounds,
								icon: "🎙️"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Durée totale",
								value: Math.round((props.stats.total_duration_seconds || 0) / 3600),
								suffix: "h",
								icon: "⏱️"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Créateurs",
								value: props.stats.total_creators,
								icon: "👤"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Lieux uniques",
								value: props.stats.total_locations,
								icon: "📍"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Analyses",
								value: props.stats.completed_analyses,
								icon: "📊"
							}, null, 8, ["value"]),
							createVNode(_sfc_main$1, {
								label: "Durée moy.",
								value: Math.round(props.stats.avg_duration_seconds || 0),
								suffix: "s",
								icon: "📏"
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
							activeTab.value === "geo" ? (openBlock(), createBlock("div", {
								key: 1,
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
								key: 2,
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
								key: 3,
								class: "space-y-6 animate-fade-in"
							}, [createVNode(unref(DataTable), { data: props.rawDataSample }, null, 8, ["data"]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-2" }, "Licence d'utilisation des données"), createVNode("p", { class: "text-sm text-arbor-sage" }, [
								createTextVNode(" Les données exposées sur cette page et via l'API sont agrégées et anonymisées. Elles sont mises à disposition à des fins de recherche scientifique, d'éducation et de conservation. Merci de citer "),
								createVNode("strong", { class: "text-arbor-cream" }, "Arborisis"),
								createTextVNode(" dans vos publications. Pour un accès à des données plus granulaires ou spécifiques, contactez l'équipe. ")
							])])])) : createCommentVNode("", true),
							activeTab.value === "api" ? (openBlock(), createBlock("div", {
								key: 4,
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
var Index_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-af7753fc"]]);
//#endregion
export { Index_default as default };
