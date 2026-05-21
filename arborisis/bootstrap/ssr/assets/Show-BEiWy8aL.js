import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-sK8SLxpB.js";
import { t as _sfc_main$1 } from "./GuestLayout-pnlb6vqh.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/ListeningPoints/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		point: Object,
		timeline: Array,
		species: Array,
		metrics: Object,
		currentWeather: Object,
		versions: Array,
		nearbyPoints: Array
	},
	setup(__props) {
		const props = __props;
		const activeTab = ref("timeline");
		const selectedSound = ref(props.timeline[0] ?? null);
		const tabs = [
			{
				key: "timeline",
				label: "Timeline"
			},
			{
				key: "species",
				label: "Espèces"
			},
			{
				key: "weather",
				label: "Météo"
			},
			{
				key: "stats",
				label: "Statistiques"
			},
			{
				key: "archives",
				label: "Archives"
			}
		];
		const habitatEmoji = computed(() => {
			return {
				forest: "🌲",
				wetland: "💧",
				river: "🌊",
				meadow: "🌾",
				ocean: "🌊",
				mountain: "⛰️",
				urban_nature: "🏙️",
				desert: "🏜️"
			}[props.point.habitat_type] ?? "📍";
		});
		function formatDate(iso) {
			if (!iso) return "-";
			return new Date(iso).toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "long",
				year: "numeric"
			});
		}
		function formatMonthYear(iso) {
			if (!iso) return "-";
			return new Date(iso).toLocaleDateString("fr-FR", {
				month: "short",
				year: "numeric"
			});
		}
		function formatDateTime(iso) {
			if (!iso) return "-";
			return new Date(iso).toLocaleString("fr-FR", {
				day: "numeric",
				month: "short",
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function weatherLabel(condition) {
			return {
				clear: "Ciel clair",
				cloudy: "Nuageux",
				fog: "Brume",
				drizzle: "Bruine",
				rain: "Pluie",
				snow: "Neige",
				storm: "Orage"
			}[condition] ?? "Conditions inconnues";
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: __props.point.title }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="min-h-screen bg-arbor-night" data-v-5efcd40d${_scopeId}><div class="relative overflow-hidden" data-v-5efcd40d${_scopeId}><div class="absolute inset-0 bg-gradient-to-b from-arbor-moss/10 via-transparent to-transparent pointer-events-none" data-v-5efcd40d${_scopeId}></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10" data-v-5efcd40d${_scopeId}><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4" data-v-5efcd40d${_scopeId}><div data-v-5efcd40d${_scopeId}><div class="flex items-center gap-2 mb-3" data-v-5efcd40d${_scopeId}><span class="text-2xl" data-v-5efcd40d${_scopeId}>${ssrInterpolate(habitatEmoji.value)}</span><span class="text-xs font-medium text-arbor-emerald uppercase tracking-widest" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.point.habitat_type)}</span></div><h1 class="font-display text-3xl md:text-4xl font-bold text-arbor-cream leading-tight" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.point.title)}</h1>`);
						if (__props.point.description) _push(`<p class="mt-3 text-arbor-sage text-lg max-w-2xl" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.point.description)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="text-right hidden md:block" data-v-5efcd40d${_scopeId}><p class="text-xs text-arbor-sage/70 font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.point.public_latitude?.toFixed(2))}, ${ssrInterpolate(__props.point.public_longitude?.toFixed(2))}</p><p class="text-xs text-arbor-sage/70 font-mono mt-1" data-v-5efcd40d${_scopeId}> ~${ssrInterpolate(__props.point.public_accuracy_meters)}m de précision </p><div class="mt-3 flex justify-end gap-2" data-v-5efcd40d${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("sounds.record", { listening_point_id: __props.point.id }),
							class: "inline-block px-4 py-2 bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30 rounded-lg hover:bg-arbor-emerald/30 transition-colors text-sm font-medium"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` + Enregistrer une nouvelle prise `);
								else return [createTextVNode(" + Enregistrer une nouvelle prise ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("sounds.create", { listening_point_id: __props.point.id }),
							class: "inline-block px-4 py-2 bg-arbor-glass/30 text-arbor-sage border border-arbor-glass-border rounded-lg hover:text-arbor-cream transition-colors text-sm font-medium"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Importer `);
								else return [createTextVNode(" Importer ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8" data-v-5efcd40d${_scopeId}><div class="glass-card p-4 text-center" data-v-5efcd40d${_scopeId}><p class="text-2xl font-display font-bold text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.point.recordings_count)}</p><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Enregistrements</p></div><div class="glass-card p-4 text-center" data-v-5efcd40d${_scopeId}><p class="text-2xl font-display font-bold text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.species.length)}</p><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Espèces détectées</p></div><div class="glass-card p-4 text-center" data-v-5efcd40d${_scopeId}><p class="text-2xl font-display font-bold text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(formatDate(__props.point.first_recorded_at))}</p><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Premier enregistrement</p></div><div class="glass-card p-4 text-center" data-v-5efcd40d${_scopeId}><p class="text-2xl font-display font-bold text-arbor-emerald" data-v-5efcd40d${_scopeId}>${ssrInterpolate(Math.round(__props.metrics.biodiversity_score ?? 0))}</p><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Score biodiversité</p></div></div>`);
						if (__props.currentWeather) {
							_push(`<div class="mt-4 glass-card p-4" data-v-5efcd40d${_scopeId}><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3" data-v-5efcd40d${_scopeId}><div data-v-5efcd40d${_scopeId}><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Météo temps réel</p><p class="mt-1 text-lg font-display text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(weatherLabel(__props.currentWeather.weather_condition))} `);
							if (__props.currentWeather.temperature_c !== null) _push(`<span class="text-arbor-emerald" data-v-5efcd40d${_scopeId}> · ${ssrInterpolate(Math.round(__props.currentWeather.temperature_c))}°C </span>`);
							else _push(`<!---->`);
							_push(`</p></div><div class="grid grid-cols-3 gap-3 text-center" data-v-5efcd40d${_scopeId}><div data-v-5efcd40d${_scopeId}><p class="text-sm font-mono text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.currentWeather.humidity_percent ?? "-")}%</p><p class="text-[10px] text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Humidité</p></div><div data-v-5efcd40d${_scopeId}><p class="text-sm font-mono text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.currentWeather.wind_speed_kmh ?? "-")} km/h</p><p class="text-[10px] text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Vent</p></div><div data-v-5efcd40d${_scopeId}><p class="text-sm font-mono text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.currentWeather.wind_direction ?? "-")}</p><p class="text-[10px] text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Direction</p></div></div></div></div>`);
						} else _push(`<!---->`);
						_push(`</div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4" data-v-5efcd40d${_scopeId}><div class="flex flex-wrap gap-1 p-1 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border backdrop-blur-sm" data-v-5efcd40d${_scopeId}><!--[-->`);
						ssrRenderList(tabs, (tab) => {
							_push(`<button class="${ssrRenderClass(["px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200", activeTab.value === tab.key ? "bg-arbor-moss/20 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30"])}" data-v-5efcd40d${_scopeId}>${ssrInterpolate(tab.label)}</button>`);
						});
						_push(`<!--]--></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" data-v-5efcd40d${_scopeId}>`);
						if (activeTab.value === "timeline") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-5efcd40d${_scopeId}>`);
							if (selectedSound.value) {
								_push(`<div class="glass-card p-6" data-v-5efcd40d${_scopeId}><div class="flex items-center gap-4" data-v-5efcd40d${_scopeId}>`);
								if (selectedSound.value.cover_url) _push(`<img${ssrRenderAttr("src", selectedSound.value.cover_url)} class="w-16 h-16 rounded-lg object-cover" alt="" data-v-5efcd40d${_scopeId}>`);
								else _push(`<div class="w-16 h-16 rounded-lg bg-arbor-deep flex items-center justify-center text-2xl" data-v-5efcd40d${_scopeId}> 🎵 </div>`);
								_push(`<div class="flex-1 min-w-0" data-v-5efcd40d${_scopeId}><h3 class="font-display text-lg font-semibold text-arbor-cream truncate" data-v-5efcd40d${_scopeId}>`);
								_push(ssrRenderComponent(unref(Link), {
									href: _ctx.route("sounds.show", selectedSound.value.slug),
									class: "hover:text-arbor-emerald transition-colors"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`${ssrInterpolate(selectedSound.value.title)}`);
										else return [createTextVNode(toDisplayString(selectedSound.value.title), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</h3><p class="text-sm text-arbor-sage" data-v-5efcd40d${_scopeId}>${ssrInterpolate(formatDate(selectedSound.value.recorded_at))} · ${ssrInterpolate(selectedSound.value.duration)}s · ${ssrInterpolate(selectedSound.value.user.name)}</p></div>`);
								_push(ssrRenderComponent(unref(Link), {
									href: _ctx.route("sounds.show", selectedSound.value.slug),
									class: "px-4 py-2 bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30 rounded-lg hover:bg-arbor-emerald/30 transition-colors text-sm font-medium"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(` Écouter `);
										else return [createTextVNode(" Écouter ")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div></div>`);
							} else _push(`<!---->`);
							_push(`<div class="relative" data-v-5efcd40d${_scopeId}><div class="absolute left-4 top-0 bottom-0 w-px bg-arbor-glass-border" data-v-5efcd40d${_scopeId}></div><div class="space-y-4" data-v-5efcd40d${_scopeId}><!--[-->`);
							ssrRenderList(__props.timeline, (sound, i) => {
								_push(`<div class="relative pl-12 cursor-pointer group" data-v-5efcd40d${_scopeId}><div class="${ssrRenderClass([selectedSound.value?.id === sound.id ? "bg-arbor-emerald border-arbor-emerald" : "bg-arbor-deep border-arbor-glass-border group-hover:border-arbor-emerald/50", "absolute left-2 top-2 w-5 h-5 rounded-full border-2 transition-colors"])}" data-v-5efcd40d${_scopeId}></div><div class="${ssrRenderClass([selectedSound.value?.id === sound.id ? "border-arbor-emerald/30" : "hover:border-arbor-glass-border/80", "glass-card p-4 transition-all duration-200"])}" data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between" data-v-5efcd40d${_scopeId}><div data-v-5efcd40d${_scopeId}><p class="text-sm font-medium text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(sound.title)}</p><p class="text-xs text-arbor-sage mt-1" data-v-5efcd40d${_scopeId}>${ssrInterpolate(formatDate(sound.recorded_at))} · ${ssrInterpolate(sound.duration)}s </p></div><div class="flex items-center gap-3" data-v-5efcd40d${_scopeId}>`);
								if (sound.species_count > 0) _push(`<span class="text-xs text-arbor-emerald" data-v-5efcd40d${_scopeId}>${ssrInterpolate(sound.species_count)} espèce${ssrInterpolate(sound.species_count > 1 ? "s" : "")}</span>`);
								else _push(`<!---->`);
								if (sound.biodiversity_score) _push(`<span class="text-xs font-mono text-arbor-sage" data-v-5efcd40d${_scopeId}> SBS ${ssrInterpolate(Math.round(sound.biodiversity_score))}</span>`);
								else _push(`<!---->`);
								_push(`</div></div></div></div>`);
							});
							_push(`<!--]--></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "species") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-5efcd40d${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-5efcd40d${_scopeId}><!--[-->`);
							ssrRenderList(__props.species, (s) => {
								_push(`<div class="glass-card p-5" data-v-5efcd40d${_scopeId}><div class="flex items-start justify-between" data-v-5efcd40d${_scopeId}><div data-v-5efcd40d${_scopeId}><h4 class="font-display text-lg font-semibold text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(s.common_name)}</h4><p class="text-sm text-arbor-sage italic" data-v-5efcd40d${_scopeId}>${ssrInterpolate(s.scientific_name)}</p></div><span class="text-xs font-mono text-arbor-emerald" data-v-5efcd40d${_scopeId}>${ssrInterpolate(s.count)}×</span></div><div class="mt-3" data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-xs text-arbor-sage mb-1" data-v-5efcd40d${_scopeId}><span data-v-5efcd40d${_scopeId}>Confiance moy.</span><span data-v-5efcd40d${_scopeId}>${ssrInterpolate(Math.round(s.avg_confidence * 100))}%</span></div><div class="h-1.5 rounded-full bg-arbor-deep overflow-hidden" data-v-5efcd40d${_scopeId}><div class="h-full rounded-full bg-arbor-emerald" style="${ssrRenderStyle({ width: `${s.avg_confidence * 100}%` })}" data-v-5efcd40d${_scopeId}></div></div></div><div class="mt-3 flex gap-1 flex-wrap" data-v-5efcd40d${_scopeId}><!--[-->`);
								ssrRenderList(s.detections.slice(0, 5), (det) => {
									_push(`<span class="text-[10px] px-2 py-0.5 rounded-full bg-arbor-deep text-arbor-sage" data-v-5efcd40d${_scopeId}>${ssrInterpolate(formatMonthYear(det.recorded_at))}</span>`);
								});
								_push(`<!--]--></div></div>`);
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "stats") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-5efcd40d${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-5efcd40d${_scopeId}><div class="glass-card p-6" data-v-5efcd40d${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-5efcd40d${_scopeId}>Scores acoustiques</h3><div class="space-y-4" data-v-5efcd40d${_scopeId}><div data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-sm mb-2" data-v-5efcd40d${_scopeId}><span class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Biodiversité sonore (SBS)</span><span class="text-arbor-cream font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate(Math.round(__props.metrics.biodiversity_score ?? 0))}/100</span></div><div class="h-2 rounded-full bg-arbor-deep overflow-hidden" data-v-5efcd40d${_scopeId}><div class="h-full rounded-full bg-gradient-to-r from-arbor-emerald to-arbor-moss" style="${ssrRenderStyle({ width: `${Math.min(__props.metrics.biodiversity_score ?? 0, 100)}%` })}" data-v-5efcd40d${_scopeId}></div></div></div><div data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-sm mb-2" data-v-5efcd40d${_scopeId}><span class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Activité acoustique (AAS)</span><span class="text-arbor-cream font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate(Math.round(__props.metrics.acoustic_activity_score ?? 0))}/100</span></div><div class="h-2 rounded-full bg-arbor-deep overflow-hidden" data-v-5efcd40d${_scopeId}><div class="h-full rounded-full bg-gradient-to-r from-arbor-amber to-arbor-emerald" style="${ssrRenderStyle({ width: `${Math.min(__props.metrics.acoustic_activity_score ?? 0, 100)}%` })}" data-v-5efcd40d${_scopeId}></div></div></div></div></div><div class="glass-card p-6" data-v-5efcd40d${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-5efcd40d${_scopeId}>Indices de diversité</h3><div class="space-y-4" data-v-5efcd40d${_scopeId}>`);
							if (__props.metrics.shannon_index !== null) _push(`<div data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-sm mb-2" data-v-5efcd40d${_scopeId}><span class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Shannon (H&#39;)</span><span class="text-arbor-cream font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.metrics.shannon_index.toFixed(2))}</span></div><div class="h-2 rounded-full bg-arbor-deep overflow-hidden" data-v-5efcd40d${_scopeId}><div class="h-full rounded-full bg-gradient-to-r from-arbor-emerald to-arbor-moss" style="${ssrRenderStyle({ width: `${Math.min(__props.metrics.shannon_index / 3 * 100, 100)}%` })}" data-v-5efcd40d${_scopeId}></div></div></div>`);
							else _push(`<!---->`);
							if (__props.metrics.simpson_index !== null) _push(`<div data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-sm mb-2" data-v-5efcd40d${_scopeId}><span class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Simpson (1-D)</span><span class="text-arbor-cream font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.metrics.simpson_index.toFixed(2))}</span></div><div class="h-2 rounded-full bg-arbor-deep overflow-hidden" data-v-5efcd40d${_scopeId}><div class="h-full rounded-full bg-gradient-to-r from-arbor-amber to-arbor-emerald" style="${ssrRenderStyle({ width: `${__props.metrics.simpson_index * 100}%` })}" data-v-5efcd40d${_scopeId}></div></div></div>`);
							else _push(`<!---->`);
							if (__props.metrics.species_richness !== null) _push(`<div data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-sm mb-2" data-v-5efcd40d${_scopeId}><span class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Richesse spécifique</span><span class="text-arbor-cream font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate(Math.round(__props.metrics.species_richness))} espèces</span></div></div>`);
							else _push(`<!---->`);
							if (__props.metrics.acoustic_complexity_index !== null) _push(`<div data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-sm mb-2" data-v-5efcd40d${_scopeId}><span class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Complexité acoustique (ACI)</span><span class="text-arbor-cream font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.metrics.acoustic_complexity_index.toFixed(2))}</span></div></div>`);
							else _push(`<!---->`);
							if (__props.metrics.temporal_turnover !== null) _push(`<div data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-sm mb-2" data-v-5efcd40d${_scopeId}><span class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Turnover temporel</span><span class="text-arbor-cream font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate((__props.metrics.temporal_turnover * 100).toFixed(1))}%</span></div><p class="text-xs text-arbor-sage" data-v-5efcd40d${_scopeId}>Taux de remplacement des espèces entre la première et la dernière période.</p></div>`);
							else _push(`<!---->`);
							if (__props.metrics.acoustic_consistency_score !== null) _push(`<div data-v-5efcd40d${_scopeId}><div class="flex items-center justify-between text-sm mb-2" data-v-5efcd40d${_scopeId}><span class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Cohérence acoustique</span><span class="text-arbor-cream font-mono" data-v-5efcd40d${_scopeId}>${ssrInterpolate(Math.round(__props.metrics.acoustic_consistency_score))}/100</span></div><div class="h-2 rounded-full bg-arbor-deep overflow-hidden" data-v-5efcd40d${_scopeId}><div class="h-full rounded-full bg-arbor-emerald" style="${ssrRenderStyle({ width: `${Math.min(__props.metrics.acoustic_consistency_score, 100)}%` })}" data-v-5efcd40d${_scopeId}></div></div></div>`);
							else _push(`<!---->`);
							_push(`</div></div><div class="glass-card p-6" data-v-5efcd40d${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-5efcd40d${_scopeId}>Répartition temporelle</h3><div class="space-y-2" data-v-5efcd40d${_scopeId}><!--[-->`);
							ssrRenderList(__props.timeline.slice(0, 10), (sound) => {
								_push(`<div class="flex items-center gap-3" data-v-5efcd40d${_scopeId}><span class="text-xs text-arbor-sage w-20" data-v-5efcd40d${_scopeId}>${ssrInterpolate(formatMonthYear(sound.recorded_at))}</span><div class="flex-1 h-1.5 rounded-full bg-arbor-deep overflow-hidden" data-v-5efcd40d${_scopeId}><div class="h-full rounded-full bg-arbor-emerald/60" style="${ssrRenderStyle({ width: `${Math.min((sound.duration || 60) / 300 * 100, 100)}%` })}" data-v-5efcd40d${_scopeId}></div></div><span class="text-xs text-arbor-sage w-8 text-right" data-v-5efcd40d${_scopeId}>${ssrInterpolate(sound.duration)}s</span></div>`);
							});
							_push(`<!--]--></div></div></div></div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "weather") {
							_push(`<div class="space-y-6 animate-fade-in" data-v-5efcd40d${_scopeId}>`);
							if (__props.currentWeather) _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-4" data-v-5efcd40d${_scopeId}><div class="glass-card p-6 lg:col-span-1" data-v-5efcd40d${_scopeId}><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Maintenant</p><p class="mt-3 text-4xl font-display font-bold text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.currentWeather.temperature_c !== null ? `${Math.round(__props.currentWeather.temperature_c)}°C` : "-")}</p><p class="mt-2 text-arbor-emerald" data-v-5efcd40d${_scopeId}>${ssrInterpolate(weatherLabel(__props.currentWeather.weather_condition))}</p><p class="mt-4 text-xs text-arbor-sage" data-v-5efcd40d${_scopeId}> Relevé vers ${ssrInterpolate(formatDateTime(__props.currentWeather.observed_at))}</p></div><div class="glass-card p-6 lg:col-span-2" data-v-5efcd40d${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-5efcd40d${_scopeId}>Conditions du point</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-5efcd40d${_scopeId}><div class="rounded-lg bg-arbor-deep/50 p-4" data-v-5efcd40d${_scopeId}><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Humidité</p><p class="mt-2 text-xl font-mono text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.currentWeather.humidity_percent ?? "-")}%</p></div><div class="rounded-lg bg-arbor-deep/50 p-4" data-v-5efcd40d${_scopeId}><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Vent</p><p class="mt-2 text-xl font-mono text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.currentWeather.wind_speed_kmh ?? "-")} km/h</p></div><div class="rounded-lg bg-arbor-deep/50 p-4" data-v-5efcd40d${_scopeId}><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Direction</p><p class="mt-2 text-xl font-mono text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.currentWeather.wind_direction ?? "-")}</p></div><div class="rounded-lg bg-arbor-deep/50 p-4" data-v-5efcd40d${_scopeId}><p class="text-xs text-arbor-sage uppercase tracking-wider" data-v-5efcd40d${_scopeId}>Précip.</p><p class="mt-2 text-xl font-mono text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(__props.currentWeather.is_snowing ? "Neige" : __props.currentWeather.is_raining ? "Pluie" : "Non")}</p></div></div><p class="mt-4 text-xs text-arbor-sage" data-v-5efcd40d${_scopeId}> Source ${ssrInterpolate(__props.currentWeather.source)} · coordonnées publiques approximées. </p></div></div>`);
							else _push(`<div class="glass-card p-6" data-v-5efcd40d${_scopeId}><p class="text-arbor-sage" data-v-5efcd40d${_scopeId}>La météo temps réel n&#39;est pas disponible pour ce point.</p></div>`);
							_push(`</div>`);
						} else _push(`<!---->`);
						if (activeTab.value === "archives") {
							_push(`<div class="space-y-4 animate-fade-in" data-v-5efcd40d${_scopeId}>`);
							if (__props.versions.length > 0) {
								_push(`<div class="relative" data-v-5efcd40d${_scopeId}><div class="absolute left-4 top-0 bottom-0 w-px bg-arbor-glass-border" data-v-5efcd40d${_scopeId}></div><div class="space-y-4" data-v-5efcd40d${_scopeId}><!--[-->`);
								ssrRenderList(__props.versions, (version) => {
									_push(`<div class="relative pl-12" data-v-5efcd40d${_scopeId}><div class="absolute left-2 top-2 w-5 h-5 rounded-full bg-arbor-deep border-2 border-arbor-emerald/50" data-v-5efcd40d${_scopeId}></div><div class="glass-card p-5" data-v-5efcd40d${_scopeId}><div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3" data-v-5efcd40d${_scopeId}><div data-v-5efcd40d${_scopeId}><p class="text-sm font-display font-semibold text-arbor-cream" data-v-5efcd40d${_scopeId}> v${ssrInterpolate(version.version_number)} · ${ssrInterpolate(version.event_label)}</p><p class="mt-1 text-xs text-arbor-sage" data-v-5efcd40d${_scopeId}>${ssrInterpolate(formatDateTime(version.captured_at))} `);
									if (version.actor) _push(`<span data-v-5efcd40d${_scopeId}> · ${ssrInterpolate(version.actor.name)}</span>`);
									else _push(`<!---->`);
									_push(`</p></div><div class="text-left md:text-right" data-v-5efcd40d${_scopeId}><p class="font-mono text-xs text-arbor-emerald" data-v-5efcd40d${_scopeId}>${ssrInterpolate(version.short_hash)}</p>`);
									if (version.short_parent_hash) _push(`<p class="font-mono text-[10px] text-arbor-sage" data-v-5efcd40d${_scopeId}> parent ${ssrInterpolate(version.short_parent_hash)}</p>`);
									else _push(`<!---->`);
									_push(`</div></div>`);
									if (version.changed_fields.length > 0) {
										_push(`<div class="mt-3 flex flex-wrap gap-2" data-v-5efcd40d${_scopeId}><!--[-->`);
										ssrRenderList(version.changed_fields.slice(0, 8), (field) => {
											_push(`<span class="px-2 py-1 rounded bg-arbor-deep/60 text-[10px] font-mono text-arbor-sage" data-v-5efcd40d${_scopeId}>${ssrInterpolate(field)}</span>`);
										});
										_push(`<!--]--></div>`);
									} else _push(`<!---->`);
									_push(`</div></div>`);
								});
								_push(`<!--]--></div></div>`);
							} else _push(`<div class="glass-card p-6" data-v-5efcd40d${_scopeId}><p class="text-arbor-sage" data-v-5efcd40d${_scopeId}>Aucune archive n&#39;a encore été capturée pour ce point.</p></div>`);
							_push(`</div>`);
						} else _push(`<!---->`);
						if (__props.nearbyPoints.length > 0) {
							_push(`<div class="mt-10" data-v-5efcd40d${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4" data-v-5efcd40d${_scopeId}>Points d&#39;écoute proches</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-5efcd40d${_scopeId}><!--[-->`);
							ssrRenderList(__props.nearbyPoints, (np) => {
								_push(ssrRenderComponent(unref(Link), {
									key: np.slug,
									href: _ctx.route("listening-points.show", np.slug),
									class: "glass-card p-4 hover:border-arbor-emerald/30 transition-colors"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h4 class="text-sm font-medium text-arbor-cream" data-v-5efcd40d${_scopeId}>${ssrInterpolate(np.title)}</h4><p class="text-xs text-arbor-sage mt-1" data-v-5efcd40d${_scopeId}>${ssrInterpolate(Math.round(np.distance_meters))}m</p>`);
										else return [createVNode("h4", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(np.title), 1), createVNode("p", { class: "text-xs text-arbor-sage mt-1" }, toDisplayString(Math.round(np.distance_meters)) + "m", 1)];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "min-h-screen bg-arbor-night" }, [
						createVNode("div", { class: "relative overflow-hidden" }, [createVNode("div", { class: "absolute inset-0 bg-gradient-to-b from-arbor-moss/10 via-transparent to-transparent pointer-events-none" }), createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10" }, [
							createVNode("div", { class: "flex flex-col md:flex-row md:items-end md:justify-between gap-4" }, [createVNode("div", null, [
								createVNode("div", { class: "flex items-center gap-2 mb-3" }, [createVNode("span", { class: "text-2xl" }, toDisplayString(habitatEmoji.value), 1), createVNode("span", { class: "text-xs font-medium text-arbor-emerald uppercase tracking-widest" }, toDisplayString(__props.point.habitat_type), 1)]),
								createVNode("h1", { class: "font-display text-3xl md:text-4xl font-bold text-arbor-cream leading-tight" }, toDisplayString(__props.point.title), 1),
								__props.point.description ? (openBlock(), createBlock("p", {
									key: 0,
									class: "mt-3 text-arbor-sage text-lg max-w-2xl"
								}, toDisplayString(__props.point.description), 1)) : createCommentVNode("", true)
							]), createVNode("div", { class: "text-right hidden md:block" }, [
								createVNode("p", { class: "text-xs text-arbor-sage/70 font-mono" }, toDisplayString(__props.point.public_latitude?.toFixed(2)) + ", " + toDisplayString(__props.point.public_longitude?.toFixed(2)), 1),
								createVNode("p", { class: "text-xs text-arbor-sage/70 font-mono mt-1" }, " ~" + toDisplayString(__props.point.public_accuracy_meters) + "m de précision ", 1),
								createVNode("div", { class: "mt-3 flex justify-end gap-2" }, [createVNode(unref(Link), {
									href: _ctx.route("sounds.record", { listening_point_id: __props.point.id }),
									class: "inline-block px-4 py-2 bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30 rounded-lg hover:bg-arbor-emerald/30 transition-colors text-sm font-medium"
								}, {
									default: withCtx(() => [createTextVNode(" + Enregistrer une nouvelle prise ")]),
									_: 1
								}, 8, ["href"]), createVNode(unref(Link), {
									href: _ctx.route("sounds.create", { listening_point_id: __props.point.id }),
									class: "inline-block px-4 py-2 bg-arbor-glass/30 text-arbor-sage border border-arbor-glass-border rounded-lg hover:text-arbor-cream transition-colors text-sm font-medium"
								}, {
									default: withCtx(() => [createTextVNode(" Importer ")]),
									_: 1
								}, 8, ["href"])])
							])]),
							createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-8" }, [
								createVNode("div", { class: "glass-card p-4 text-center" }, [createVNode("p", { class: "text-2xl font-display font-bold text-arbor-cream" }, toDisplayString(__props.point.recordings_count), 1), createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Enregistrements")]),
								createVNode("div", { class: "glass-card p-4 text-center" }, [createVNode("p", { class: "text-2xl font-display font-bold text-arbor-cream" }, toDisplayString(__props.species.length), 1), createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Espèces détectées")]),
								createVNode("div", { class: "glass-card p-4 text-center" }, [createVNode("p", { class: "text-2xl font-display font-bold text-arbor-cream" }, toDisplayString(formatDate(__props.point.first_recorded_at)), 1), createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Premier enregistrement")]),
								createVNode("div", { class: "glass-card p-4 text-center" }, [createVNode("p", { class: "text-2xl font-display font-bold text-arbor-emerald" }, toDisplayString(Math.round(__props.metrics.biodiversity_score ?? 0)), 1), createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Score biodiversité")])
							]),
							__props.currentWeather ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-4 glass-card p-4"
							}, [createVNode("div", { class: "flex flex-col md:flex-row md:items-center md:justify-between gap-3" }, [createVNode("div", null, [createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Météo temps réel"), createVNode("p", { class: "mt-1 text-lg font-display text-arbor-cream" }, [createTextVNode(toDisplayString(weatherLabel(__props.currentWeather.weather_condition)) + " ", 1), __props.currentWeather.temperature_c !== null ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-arbor-emerald"
							}, " · " + toDisplayString(Math.round(__props.currentWeather.temperature_c)) + "°C ", 1)) : createCommentVNode("", true)])]), createVNode("div", { class: "grid grid-cols-3 gap-3 text-center" }, [
								createVNode("div", null, [createVNode("p", { class: "text-sm font-mono text-arbor-cream" }, toDisplayString(__props.currentWeather.humidity_percent ?? "-") + "%", 1), createVNode("p", { class: "text-[10px] text-arbor-sage uppercase tracking-wider" }, "Humidité")]),
								createVNode("div", null, [createVNode("p", { class: "text-sm font-mono text-arbor-cream" }, toDisplayString(__props.currentWeather.wind_speed_kmh ?? "-") + " km/h", 1), createVNode("p", { class: "text-[10px] text-arbor-sage uppercase tracking-wider" }, "Vent")]),
								createVNode("div", null, [createVNode("p", { class: "text-sm font-mono text-arbor-cream" }, toDisplayString(__props.currentWeather.wind_direction ?? "-"), 1), createVNode("p", { class: "text-[10px] text-arbor-sage uppercase tracking-wider" }, "Direction")])
							])])])) : createCommentVNode("", true)
						])]),
						createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4" }, [createVNode("div", { class: "flex flex-wrap gap-1 p-1 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border backdrop-blur-sm" }, [(openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
							return createVNode("button", {
								key: tab.key,
								onClick: ($event) => activeTab.value = tab.key,
								class: ["px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200", activeTab.value === tab.key ? "bg-arbor-moss/20 text-arbor-emerald border border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30"]
							}, toDisplayString(tab.label), 11, ["onClick"]);
						}), 64))])]),
						createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" }, [
							activeTab.value === "timeline" ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-6 animate-fade-in"
							}, [selectedSound.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "glass-card p-6"
							}, [createVNode("div", { class: "flex items-center gap-4" }, [
								selectedSound.value.cover_url ? (openBlock(), createBlock("img", {
									key: 0,
									src: selectedSound.value.cover_url,
									class: "w-16 h-16 rounded-lg object-cover",
									alt: ""
								}, null, 8, ["src"])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "w-16 h-16 rounded-lg bg-arbor-deep flex items-center justify-center text-2xl"
								}, " 🎵 ")),
								createVNode("div", { class: "flex-1 min-w-0" }, [createVNode("h3", { class: "font-display text-lg font-semibold text-arbor-cream truncate" }, [createVNode(unref(Link), {
									href: _ctx.route("sounds.show", selectedSound.value.slug),
									class: "hover:text-arbor-emerald transition-colors"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(selectedSound.value.title), 1)]),
									_: 1
								}, 8, ["href"])]), createVNode("p", { class: "text-sm text-arbor-sage" }, toDisplayString(formatDate(selectedSound.value.recorded_at)) + " · " + toDisplayString(selectedSound.value.duration) + "s · " + toDisplayString(selectedSound.value.user.name), 1)]),
								createVNode(unref(Link), {
									href: _ctx.route("sounds.show", selectedSound.value.slug),
									class: "px-4 py-2 bg-arbor-emerald/20 text-arbor-emerald border border-arbor-emerald/30 rounded-lg hover:bg-arbor-emerald/30 transition-colors text-sm font-medium"
								}, {
									default: withCtx(() => [createTextVNode(" Écouter ")]),
									_: 1
								}, 8, ["href"])
							])])) : createCommentVNode("", true), createVNode("div", { class: "relative" }, [createVNode("div", { class: "absolute left-4 top-0 bottom-0 w-px bg-arbor-glass-border" }), createVNode("div", { class: "space-y-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.timeline, (sound, i) => {
								return openBlock(), createBlock("div", {
									key: sound.id,
									class: "relative pl-12 cursor-pointer group",
									onClick: ($event) => selectedSound.value = sound
								}, [createVNode("div", { class: ["absolute left-2 top-2 w-5 h-5 rounded-full border-2 transition-colors", selectedSound.value?.id === sound.id ? "bg-arbor-emerald border-arbor-emerald" : "bg-arbor-deep border-arbor-glass-border group-hover:border-arbor-emerald/50"] }, null, 2), createVNode("div", { class: ["glass-card p-4 transition-all duration-200", selectedSound.value?.id === sound.id ? "border-arbor-emerald/30" : "hover:border-arbor-glass-border/80"] }, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("div", null, [createVNode("p", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(sound.title), 1), createVNode("p", { class: "text-xs text-arbor-sage mt-1" }, toDisplayString(formatDate(sound.recorded_at)) + " · " + toDisplayString(sound.duration) + "s ", 1)]), createVNode("div", { class: "flex items-center gap-3" }, [sound.species_count > 0 ? (openBlock(), createBlock("span", {
									key: 0,
									class: "text-xs text-arbor-emerald"
								}, toDisplayString(sound.species_count) + " espèce" + toDisplayString(sound.species_count > 1 ? "s" : ""), 1)) : createCommentVNode("", true), sound.biodiversity_score ? (openBlock(), createBlock("span", {
									key: 1,
									class: "text-xs font-mono text-arbor-sage"
								}, " SBS " + toDisplayString(Math.round(sound.biodiversity_score)), 1)) : createCommentVNode("", true)])])], 2)], 8, ["onClick"]);
							}), 128))])])])) : createCommentVNode("", true),
							activeTab.value === "species" ? (openBlock(), createBlock("div", {
								key: 1,
								class: "space-y-6 animate-fade-in"
							}, [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.species, (s) => {
								return openBlock(), createBlock("div", {
									key: s.scientific_name,
									class: "glass-card p-5"
								}, [
									createVNode("div", { class: "flex items-start justify-between" }, [createVNode("div", null, [createVNode("h4", { class: "font-display text-lg font-semibold text-arbor-cream" }, toDisplayString(s.common_name), 1), createVNode("p", { class: "text-sm text-arbor-sage italic" }, toDisplayString(s.scientific_name), 1)]), createVNode("span", { class: "text-xs font-mono text-arbor-emerald" }, toDisplayString(s.count) + "×", 1)]),
									createVNode("div", { class: "mt-3" }, [createVNode("div", { class: "flex items-center justify-between text-xs text-arbor-sage mb-1" }, [createVNode("span", null, "Confiance moy."), createVNode("span", null, toDisplayString(Math.round(s.avg_confidence * 100)) + "%", 1)]), createVNode("div", { class: "h-1.5 rounded-full bg-arbor-deep overflow-hidden" }, [createVNode("div", {
										class: "h-full rounded-full bg-arbor-emerald",
										style: { width: `${s.avg_confidence * 100}%` }
									}, null, 4)])]),
									createVNode("div", { class: "mt-3 flex gap-1 flex-wrap" }, [(openBlock(true), createBlock(Fragment, null, renderList(s.detections.slice(0, 5), (det) => {
										return openBlock(), createBlock("span", {
											key: det.sound_id,
											class: "text-[10px] px-2 py-0.5 rounded-full bg-arbor-deep text-arbor-sage"
										}, toDisplayString(formatMonthYear(det.recorded_at)), 1);
									}), 128))])
								]);
							}), 128))])])) : createCommentVNode("", true),
							activeTab.value === "stats" ? (openBlock(), createBlock("div", {
								key: 2,
								class: "space-y-6 animate-fade-in"
							}, [createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
								createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Scores acoustiques"), createVNode("div", { class: "space-y-4" }, [createVNode("div", null, [createVNode("div", { class: "flex items-center justify-between text-sm mb-2" }, [createVNode("span", { class: "text-arbor-sage" }, "Biodiversité sonore (SBS)"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(Math.round(__props.metrics.biodiversity_score ?? 0)) + "/100", 1)]), createVNode("div", { class: "h-2 rounded-full bg-arbor-deep overflow-hidden" }, [createVNode("div", {
									class: "h-full rounded-full bg-gradient-to-r from-arbor-emerald to-arbor-moss",
									style: { width: `${Math.min(__props.metrics.biodiversity_score ?? 0, 100)}%` }
								}, null, 4)])]), createVNode("div", null, [createVNode("div", { class: "flex items-center justify-between text-sm mb-2" }, [createVNode("span", { class: "text-arbor-sage" }, "Activité acoustique (AAS)"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(Math.round(__props.metrics.acoustic_activity_score ?? 0)) + "/100", 1)]), createVNode("div", { class: "h-2 rounded-full bg-arbor-deep overflow-hidden" }, [createVNode("div", {
									class: "h-full rounded-full bg-gradient-to-r from-arbor-amber to-arbor-emerald",
									style: { width: `${Math.min(__props.metrics.acoustic_activity_score ?? 0, 100)}%` }
								}, null, 4)])])])]),
								createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Indices de diversité"), createVNode("div", { class: "space-y-4" }, [
									__props.metrics.shannon_index !== null ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("div", { class: "flex items-center justify-between text-sm mb-2" }, [createVNode("span", { class: "text-arbor-sage" }, "Shannon (H')"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(__props.metrics.shannon_index.toFixed(2)), 1)]), createVNode("div", { class: "h-2 rounded-full bg-arbor-deep overflow-hidden" }, [createVNode("div", {
										class: "h-full rounded-full bg-gradient-to-r from-arbor-emerald to-arbor-moss",
										style: { width: `${Math.min(__props.metrics.shannon_index / 3 * 100, 100)}%` }
									}, null, 4)])])) : createCommentVNode("", true),
									__props.metrics.simpson_index !== null ? (openBlock(), createBlock("div", { key: 1 }, [createVNode("div", { class: "flex items-center justify-between text-sm mb-2" }, [createVNode("span", { class: "text-arbor-sage" }, "Simpson (1-D)"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(__props.metrics.simpson_index.toFixed(2)), 1)]), createVNode("div", { class: "h-2 rounded-full bg-arbor-deep overflow-hidden" }, [createVNode("div", {
										class: "h-full rounded-full bg-gradient-to-r from-arbor-amber to-arbor-emerald",
										style: { width: `${__props.metrics.simpson_index * 100}%` }
									}, null, 4)])])) : createCommentVNode("", true),
									__props.metrics.species_richness !== null ? (openBlock(), createBlock("div", { key: 2 }, [createVNode("div", { class: "flex items-center justify-between text-sm mb-2" }, [createVNode("span", { class: "text-arbor-sage" }, "Richesse spécifique"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(Math.round(__props.metrics.species_richness)) + " espèces", 1)])])) : createCommentVNode("", true),
									__props.metrics.acoustic_complexity_index !== null ? (openBlock(), createBlock("div", { key: 3 }, [createVNode("div", { class: "flex items-center justify-between text-sm mb-2" }, [createVNode("span", { class: "text-arbor-sage" }, "Complexité acoustique (ACI)"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(__props.metrics.acoustic_complexity_index.toFixed(2)), 1)])])) : createCommentVNode("", true),
									__props.metrics.temporal_turnover !== null ? (openBlock(), createBlock("div", { key: 4 }, [createVNode("div", { class: "flex items-center justify-between text-sm mb-2" }, [createVNode("span", { class: "text-arbor-sage" }, "Turnover temporel"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString((__props.metrics.temporal_turnover * 100).toFixed(1)) + "%", 1)]), createVNode("p", { class: "text-xs text-arbor-sage" }, "Taux de remplacement des espèces entre la première et la dernière période.")])) : createCommentVNode("", true),
									__props.metrics.acoustic_consistency_score !== null ? (openBlock(), createBlock("div", { key: 5 }, [createVNode("div", { class: "flex items-center justify-between text-sm mb-2" }, [createVNode("span", { class: "text-arbor-sage" }, "Cohérence acoustique"), createVNode("span", { class: "text-arbor-cream font-mono" }, toDisplayString(Math.round(__props.metrics.acoustic_consistency_score)) + "/100", 1)]), createVNode("div", { class: "h-2 rounded-full bg-arbor-deep overflow-hidden" }, [createVNode("div", {
										class: "h-full rounded-full bg-arbor-emerald",
										style: { width: `${Math.min(__props.metrics.acoustic_consistency_score, 100)}%` }
									}, null, 4)])])) : createCommentVNode("", true)
								])]),
								createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Répartition temporelle"), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.timeline.slice(0, 10), (sound) => {
									return openBlock(), createBlock("div", {
										key: sound.id,
										class: "flex items-center gap-3"
									}, [
										createVNode("span", { class: "text-xs text-arbor-sage w-20" }, toDisplayString(formatMonthYear(sound.recorded_at)), 1),
										createVNode("div", { class: "flex-1 h-1.5 rounded-full bg-arbor-deep overflow-hidden" }, [createVNode("div", {
											class: "h-full rounded-full bg-arbor-emerald/60",
											style: { width: `${Math.min((sound.duration || 60) / 300 * 100, 100)}%` }
										}, null, 4)]),
										createVNode("span", { class: "text-xs text-arbor-sage w-8 text-right" }, toDisplayString(sound.duration) + "s", 1)
									]);
								}), 128))])])
							])])) : createCommentVNode("", true),
							activeTab.value === "weather" ? (openBlock(), createBlock("div", {
								key: 3,
								class: "space-y-6 animate-fade-in"
							}, [__props.currentWeather ? (openBlock(), createBlock("div", {
								key: 0,
								class: "grid grid-cols-1 lg:grid-cols-3 gap-4"
							}, [createVNode("div", { class: "glass-card p-6 lg:col-span-1" }, [
								createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Maintenant"),
								createVNode("p", { class: "mt-3 text-4xl font-display font-bold text-arbor-cream" }, toDisplayString(__props.currentWeather.temperature_c !== null ? `${Math.round(__props.currentWeather.temperature_c)}°C` : "-"), 1),
								createVNode("p", { class: "mt-2 text-arbor-emerald" }, toDisplayString(weatherLabel(__props.currentWeather.weather_condition)), 1),
								createVNode("p", { class: "mt-4 text-xs text-arbor-sage" }, " Relevé vers " + toDisplayString(formatDateTime(__props.currentWeather.observed_at)), 1)
							]), createVNode("div", { class: "glass-card p-6 lg:col-span-2" }, [
								createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Conditions du point"),
								createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
									createVNode("div", { class: "rounded-lg bg-arbor-deep/50 p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Humidité"), createVNode("p", { class: "mt-2 text-xl font-mono text-arbor-cream" }, toDisplayString(__props.currentWeather.humidity_percent ?? "-") + "%", 1)]),
									createVNode("div", { class: "rounded-lg bg-arbor-deep/50 p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Vent"), createVNode("p", { class: "mt-2 text-xl font-mono text-arbor-cream" }, toDisplayString(__props.currentWeather.wind_speed_kmh ?? "-") + " km/h", 1)]),
									createVNode("div", { class: "rounded-lg bg-arbor-deep/50 p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Direction"), createVNode("p", { class: "mt-2 text-xl font-mono text-arbor-cream" }, toDisplayString(__props.currentWeather.wind_direction ?? "-"), 1)]),
									createVNode("div", { class: "rounded-lg bg-arbor-deep/50 p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Précip."), createVNode("p", { class: "mt-2 text-xl font-mono text-arbor-cream" }, toDisplayString(__props.currentWeather.is_snowing ? "Neige" : __props.currentWeather.is_raining ? "Pluie" : "Non"), 1)])
								]),
								createVNode("p", { class: "mt-4 text-xs text-arbor-sage" }, " Source " + toDisplayString(__props.currentWeather.source) + " · coordonnées publiques approximées. ", 1)
							])])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "glass-card p-6"
							}, [createVNode("p", { class: "text-arbor-sage" }, "La météo temps réel n'est pas disponible pour ce point.")]))])) : createCommentVNode("", true),
							activeTab.value === "archives" ? (openBlock(), createBlock("div", {
								key: 4,
								class: "space-y-4 animate-fade-in"
							}, [__props.versions.length > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "relative"
							}, [createVNode("div", { class: "absolute left-4 top-0 bottom-0 w-px bg-arbor-glass-border" }), createVNode("div", { class: "space-y-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.versions, (version) => {
								return openBlock(), createBlock("div", {
									key: version.version_hash,
									class: "relative pl-12"
								}, [createVNode("div", { class: "absolute left-2 top-2 w-5 h-5 rounded-full bg-arbor-deep border-2 border-arbor-emerald/50" }), createVNode("div", { class: "glass-card p-5" }, [createVNode("div", { class: "flex flex-col md:flex-row md:items-start md:justify-between gap-3" }, [createVNode("div", null, [createVNode("p", { class: "text-sm font-display font-semibold text-arbor-cream" }, " v" + toDisplayString(version.version_number) + " · " + toDisplayString(version.event_label), 1), createVNode("p", { class: "mt-1 text-xs text-arbor-sage" }, [createTextVNode(toDisplayString(formatDateTime(version.captured_at)) + " ", 1), version.actor ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(version.actor.name), 1)) : createCommentVNode("", true)])]), createVNode("div", { class: "text-left md:text-right" }, [createVNode("p", { class: "font-mono text-xs text-arbor-emerald" }, toDisplayString(version.short_hash), 1), version.short_parent_hash ? (openBlock(), createBlock("p", {
									key: 0,
									class: "font-mono text-[10px] text-arbor-sage"
								}, " parent " + toDisplayString(version.short_parent_hash), 1)) : createCommentVNode("", true)])]), version.changed_fields.length > 0 ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-3 flex flex-wrap gap-2"
								}, [(openBlock(true), createBlock(Fragment, null, renderList(version.changed_fields.slice(0, 8), (field) => {
									return openBlock(), createBlock("span", {
										key: field,
										class: "px-2 py-1 rounded bg-arbor-deep/60 text-[10px] font-mono text-arbor-sage"
									}, toDisplayString(field), 1);
								}), 128))])) : createCommentVNode("", true)])]);
							}), 128))])])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "glass-card p-6"
							}, [createVNode("p", { class: "text-arbor-sage" }, "Aucune archive n'a encore été capturée pour ce point.")]))])) : createCommentVNode("", true),
							__props.nearbyPoints.length > 0 ? (openBlock(), createBlock("div", {
								key: 5,
								class: "mt-10"
							}, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream mb-4" }, "Points d'écoute proches"), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.nearbyPoints, (np) => {
								return openBlock(), createBlock(unref(Link), {
									key: np.slug,
									href: _ctx.route("listening-points.show", np.slug),
									class: "glass-card p-4 hover:border-arbor-emerald/30 transition-colors"
								}, {
									default: withCtx(() => [createVNode("h4", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(np.title), 1), createVNode("p", { class: "text-xs text-arbor-sage mt-1" }, toDisplayString(Math.round(np.distance_meters)) + "m", 1)]),
									_: 2
								}, 1032, ["href"]);
							}), 128))])])) : createCommentVNode("", true)
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ListeningPoints/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Show_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-5efcd40d"]]);
//#endregion
export { Show_default as default };
