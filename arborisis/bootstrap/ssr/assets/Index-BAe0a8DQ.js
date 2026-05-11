import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-D-F0WtqU.js";
import { t as _sfc_main$2 } from "./GuestLayout-D7OewCdf.js";
import { Head } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, defineAsyncComponent, mergeProps, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
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
		const ApiDocs = defineAsyncComponent(() => import("./ApiDocs-vDGpNt6f.js"));
		const EquipmentChart = defineAsyncComponent(() => import("./EquipmentChart-DOOJuqKb.js"));
		const props = __props;
		const activeTab = ref("overview");
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
						_push(`<div class="min-h-screen bg-arbor-night" data-v-021cda5e${_scopeId}><div class="relative overflow-hidden" data-v-021cda5e${_scopeId}><div class="absolute inset-0 bg-gradient-to-b from-arbor-moss/10 via-transparent to-transparent pointer-events-none" data-v-021cda5e${_scopeId}></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10" data-v-021cda5e${_scopeId}><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4" data-v-021cda5e${_scopeId}><div data-v-021cda5e${_scopeId}><div class="flex items-center gap-2 mb-3" data-v-021cda5e${_scopeId}><span class="inline-block w-2 h-2 rounded-full bg-arbor-emerald animate-pulse" data-v-021cda5e${_scopeId}></span><span class="text-xs font-medium text-arbor-emerald uppercase tracking-widest" data-v-021cda5e${_scopeId}>Open Data</span></div><h1 class="font-display text-4xl md:text-5xl font-bold text-arbor-cream leading-tight" data-v-021cda5e${_scopeId}> Données scientifiques </h1><p class="mt-3 text-arbor-sage text-lg max-w-2xl" data-v-021cda5e${_scopeId}> Statistiques agrégées et anonymisées de la plateforme Arborisis, destinées à la recherche, la data science et la conservation. </p></div><div class="text-right hidden md:block" data-v-021cda5e${_scopeId}><p class="text-xs text-arbor-sage/60 font-mono" data-v-021cda5e${_scopeId}> Mis à jour : ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"))}</p><p class="text-xs text-arbor-sage/60 font-mono" data-v-021cda5e${_scopeId}>${ssrInterpolate(props.stats.total_sounds?.toLocaleString("fr-FR"))} sons indexés </p></div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" data-v-021cda5e${_scopeId}><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-v-021cda5e${_scopeId}>`);
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
						_push(`</div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4" data-v-021cda5e${_scopeId}><div class="flex flex-wrap gap-1 p-1 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border backdrop-blur-sm" data-v-021cda5e${_scopeId}><!--[-->`);
						ssrRenderList(tabs, (tab) => {
							_push(`<button class="${ssrRenderClass(["px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200", activeTab.value === tab.key ? "bg-arbor-moss/20 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30"])}" data-v-021cda5e${_scopeId}>${ssrInterpolate(tab.label)}</button>`);
						});
						_push(`<!--]--></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" data-v-021cda5e${_scopeId}>`);
						if (activeTab.value === "overview") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-021cda5e${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-021cda5e${_scopeId}>`);
							_push(ssrRenderComponent(unref(CategoryChart), { categories: props.categoryDistribution }, null, _parent, _scopeId));
							_push(ssrRenderComponent(unref(EnvironmentChart), { data: props.environmentDistribution }, null, _parent, _scopeId));
							_push(`</div>`);
							_push(ssrRenderComponent(unref(TemporalChart), { data: props.temporalDistribution }, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-021cda5e${_scopeId}><div class="glass-card p-6" data-v-021cda5e${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-021cda5e${_scopeId}>Lieux les plus enregistrés</h3><div class="space-y-2" data-v-021cda5e${_scopeId}><!--[-->`);
							ssrRenderList(props.topLocations.slice(0, 10), (loc, i) => {
								_push(`<div class="flex items-center justify-between p-2.5 rounded-lg bg-arbor-deep/50 border border-arbor-glass-border/50 hover:border-arbor-emerald/30 transition-colors" data-v-021cda5e${_scopeId}><div class="flex items-center gap-3" data-v-021cda5e${_scopeId}><span class="text-xs font-mono text-arbor-sage w-5" data-v-021cda5e${_scopeId}>${ssrInterpolate(i + 1)}</span><span class="text-sm text-arbor-cream" data-v-021cda5e${_scopeId}>${ssrInterpolate(loc.name)}</span></div><span class="text-xs font-mono text-arbor-emerald" data-v-021cda5e${_scopeId}>${ssrInterpolate(loc.count)}</span></div>`);
							});
							_push(`<!--]--></div></div>`);
							_push(ssrRenderComponent(unref(EquipmentChart), { data: props.equipmentDistribution }, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "geo") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-021cda5e${_scopeId}>`);
							_push(ssrRenderComponent(unref(GeoHeatmap), { points: props.geoHeatmap }, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-021cda5e${_scopeId}><div class="glass-card p-6 lg:col-span-2" data-v-021cda5e${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-021cda5e${_scopeId}>Densité par région</h3><div class="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2" data-v-021cda5e${_scopeId}><!--[-->`);
							ssrRenderList(props.geoHeatmap.slice(0, 50), (loc, i) => {
								_push(`<div class="flex items-center justify-between p-2 rounded-lg bg-arbor-deep/30" data-v-021cda5e${_scopeId}><div class="flex items-center gap-3" data-v-021cda5e${_scopeId}><span class="text-xs font-mono text-arbor-sage" data-v-021cda5e${_scopeId}>${ssrInterpolate(i + 1)}</span><span class="text-sm text-arbor-cream font-mono" data-v-021cda5e${_scopeId}>${ssrInterpolate(loc.lat.toFixed(1))}, ${ssrInterpolate(loc.lng.toFixed(1))}</span><span class="text-xs text-arbor-sage/70 truncate max-w-[200px]" data-v-021cda5e${_scopeId}>${ssrInterpolate(loc.categories)}</span></div><span class="text-xs font-mono text-arbor-emerald" data-v-021cda5e${_scopeId}>${ssrInterpolate(loc.count)}</span></div>`);
							});
							_push(`<!--]--></div></div><div class="glass-card p-6" data-v-021cda5e${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-021cda5e${_scopeId}>Méthodologie</h3><div class="space-y-3 text-sm text-arbor-sage" data-v-021cda5e${_scopeId}><p data-v-021cda5e${_scopeId}>Les coordonnées sont agrégées par cellules de <strong class="text-arbor-cream" data-v-021cda5e${_scopeId}>0.1°</strong> (environ 11 km) pour préserver la confidentialité des lieux sensibles.</p><p data-v-021cda5e${_scopeId}>Les coordonnées exactes des enregistrements ne sont jamais exposées publiquement.</p><p data-v-021cda5e${_scopeId}>Seuls les enregistrements <strong class="text-arbor-cream" data-v-021cda5e${_scopeId}>publics</strong> et <strong class="text-arbor-cream" data-v-021cda5e${_scopeId}>publiés</strong> sont comptabilisés.</p></div></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "audio") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-021cda5e${_scopeId}>`);
							_push(ssrRenderComponent(unref(AudioFeaturesChart), {
								features: props.audioFeatures,
								distributions: props.audioFeatureDistribution
							}, null, _parent, _scopeId));
							_push(`<div class="glass-card p-6" data-v-021cda5e${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-021cda5e${_scopeId}>Statistiques descriptives — Features audio</h3><div class="overflow-x-auto" data-v-021cda5e${_scopeId}><table class="w-full text-sm text-left" data-v-021cda5e${_scopeId}><thead class="text-xs text-arbor-sage uppercase border-b border-arbor-glass-border" data-v-021cda5e${_scopeId}><tr data-v-021cda5e${_scopeId}><th class="px-4 py-3" data-v-021cda5e${_scopeId}>Feature</th><th class="px-4 py-3" data-v-021cda5e${_scopeId}>N</th><th class="px-4 py-3" data-v-021cda5e${_scopeId}>Moyenne</th><th class="px-4 py-3" data-v-021cda5e${_scopeId}>Médiane</th><th class="px-4 py-3" data-v-021cda5e${_scopeId}>Écart-type</th><th class="px-4 py-3" data-v-021cda5e${_scopeId}>Min</th><th class="px-4 py-3" data-v-021cda5e${_scopeId}>Max</th></tr></thead><tbody data-v-021cda5e${_scopeId}><!--[-->`);
							ssrRenderList(props.audioFeatures, (stats, key) => {
								_push(`<tr class="border-b border-arbor-glass-border/50 hover:bg-arbor-glass/20 transition-colors" data-v-021cda5e${_scopeId}><td class="px-4 py-3 text-arbor-cream font-medium" data-v-021cda5e${_scopeId}>${ssrInterpolate(key)}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-021cda5e${_scopeId}>${ssrInterpolate(stats.count)}</td><td class="px-4 py-3 text-arbor-emerald font-mono" data-v-021cda5e${_scopeId}>${ssrInterpolate(stats.mean.toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-021cda5e${_scopeId}>${ssrInterpolate(stats.median.toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-021cda5e${_scopeId}>${ssrInterpolate(stats.std.toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-021cda5e${_scopeId}>${ssrInterpolate(stats.min.toExponential(3))}</td><td class="px-4 py-3 text-arbor-sage font-mono" data-v-021cda5e${_scopeId}>${ssrInterpolate(stats.max.toExponential(3))}</td></tr>`);
							});
							_push(`<!--]-->`);
							if (Object.keys(props.audioFeatures).length === 0) _push(`<tr data-v-021cda5e${_scopeId}><td colspan="7" class="px-4 py-8 text-center text-arbor-sage" data-v-021cda5e${_scopeId}>Aucune analyse audio disponible pour le moment.</td></tr>`);
							else _push(`<!---->`);
							_push(`</tbody></table></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "data") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-021cda5e${_scopeId}>`);
							_push(ssrRenderComponent(unref(DataTable), { data: props.rawDataSample }, null, _parent, _scopeId));
							_push(`<div class="glass-card p-6" data-v-021cda5e${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-2" data-v-021cda5e${_scopeId}>Licence d&#39;utilisation des données</h3><p class="text-sm text-arbor-sage" data-v-021cda5e${_scopeId}> Les données exposées sur cette page et via l&#39;API sont agrégées et anonymisées. Elles sont mises à disposition à des fins de recherche scientifique, d&#39;éducation et de conservation. Merci de citer <strong class="text-arbor-cream" data-v-021cda5e${_scopeId}>Arborisis</strong> dans vos publications. Pour un accès à des données plus granulaires ou spécifiques, contactez l&#39;équipe. </p></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "api") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-021cda5e${_scopeId}>`);
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
							}, [createVNode(unref(AudioFeaturesChart), {
								features: props.audioFeatures,
								distributions: props.audioFeatureDistribution
							}, null, 8, ["features", "distributions"]), createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Statistiques descriptives — Features audio"), createVNode("div", { class: "overflow-x-auto" }, [createVNode("table", { class: "w-full text-sm text-left" }, [createVNode("thead", { class: "text-xs text-arbor-sage uppercase border-b border-arbor-glass-border" }, [createVNode("tr", null, [
								createVNode("th", { class: "px-4 py-3" }, "Feature"),
								createVNode("th", { class: "px-4 py-3" }, "N"),
								createVNode("th", { class: "px-4 py-3" }, "Moyenne"),
								createVNode("th", { class: "px-4 py-3" }, "Médiane"),
								createVNode("th", { class: "px-4 py-3" }, "Écart-type"),
								createVNode("th", { class: "px-4 py-3" }, "Min"),
								createVNode("th", { class: "px-4 py-3" }, "Max")
							])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(props.audioFeatures, (stats, key) => {
								return openBlock(), createBlock("tr", {
									key,
									class: "border-b border-arbor-glass-border/50 hover:bg-arbor-glass/20 transition-colors"
								}, [
									createVNode("td", { class: "px-4 py-3 text-arbor-cream font-medium" }, toDisplayString(key), 1),
									createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(stats.count), 1),
									createVNode("td", { class: "px-4 py-3 text-arbor-emerald font-mono" }, toDisplayString(stats.mean.toExponential(3)), 1),
									createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(stats.median.toExponential(3)), 1),
									createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(stats.std.toExponential(3)), 1),
									createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(stats.min.toExponential(3)), 1),
									createVNode("td", { class: "px-4 py-3 text-arbor-sage font-mono" }, toDisplayString(stats.max.toExponential(3)), 1)
								]);
							}), 128)), Object.keys(props.audioFeatures).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
								colspan: "7",
								class: "px-4 py-8 text-center text-arbor-sage"
							}, "Aucune analyse audio disponible pour le moment.")])) : createCommentVNode("", true)])])])])])) : createCommentVNode("", true),
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
var Index_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-021cda5e"]]);
//#endregion
export { Index_default as default };
