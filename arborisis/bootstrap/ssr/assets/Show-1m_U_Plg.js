/* empty css                 */
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-sK8SLxpB.js";
import { t as _sfc_main$1 } from "./GuestLayout-pnlb6vqh.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import L from "leaflet";
//#region resources/js/Pages/SoundWalks/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: { soundWalk: Object },
	setup(__props) {
		const props = __props;
		const mapContainer = ref(null);
		const map = ref(null);
		function formatDuration(minutes) {
			if (!minutes) return "-";
			const h = Math.floor(minutes / 60);
			const m = minutes % 60;
			if (h > 0) return `${h}h ${m}min`;
			return `${m} min`;
		}
		function formatRouteDistance(meters) {
			if (!meters) return null;
			if (meters >= 1e3) return `${(meters / 1e3).toFixed(1)} km`;
			return `${Math.round(meters)} m`;
		}
		function formatRouteDuration(seconds) {
			if (!seconds) return null;
			return formatDuration(Math.round(seconds / 60));
		}
		function routeCoordinatesFromGeometry(geometry) {
			if (Array.isArray(geometry?.coordinates)) return geometry.coordinates;
			if (Array.isArray(geometry)) return geometry.map((waypoint) => {
				const lat = waypoint.lat ?? waypoint.latitude;
				const lng = waypoint.lng ?? waypoint.longitude;
				if (lat === void 0 || lng === void 0) return null;
				return [Number(lng), Number(lat)];
			}).filter(Boolean);
			return [];
		}
		onMounted(() => {
			const routeCoordinates = routeCoordinatesFromGeometry(props.soundWalk.route_geometry);
			if (!mapContainer.value || !routeCoordinates.length) return;
			const start = routeCoordinates[0];
			const lat = start[1] ?? 46.6;
			const lng = start[0] ?? 1.9;
			map.value = L.map(mapContainer.value).setView([lat, lng], 13);
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: "&copy; OpenStreetMap contributors",
				maxZoom: 18
			}).addTo(map.value);
			const coords = routeCoordinates.map((coordinate) => [coordinate[1], coordinate[0]]);
			L.polyline(coords, {
				color: "#34D399",
				weight: 4,
				opacity: .85
			}).addTo(map.value);
			props.soundWalk.points.forEach((point, index) => {
				L.circleMarker([point.latitude, point.longitude], {
					radius: 10,
					fillColor: "#34D399",
					color: "#065f46",
					weight: 2,
					opacity: 1,
					fillOpacity: .85
				}).addTo(map.value).bindPopup(`<div class="font-sans text-sm">
                <p class="font-semibold text-arbor-night">${index + 1}. ${point.title || "Arrêt"}</p>
                ${point.description ? `<p class="text-xs text-gray-600 mt-1">${point.description}</p>` : ""}
            </div>`, { closeButton: false });
			});
			map.value.fitBounds(coords, { padding: [40, 40] });
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: __props.soundWalk.title }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="min-h-screen bg-arbor-night" data-v-5c0245fd${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16" data-v-5c0245fd${_scopeId}><div class="flex flex-col lg:flex-row gap-8" data-v-5c0245fd${_scopeId}><div class="lg:w-1/3 space-y-6" data-v-5c0245fd${_scopeId}><div data-v-5c0245fd${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/sound-walks",
							class: "text-xs text-arbor-sage hover:text-arbor-cream transition"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` ← Toutes les balades `);
								else return [createTextVNode(" ← Toutes les balades ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<h1 class="mt-3 font-display text-3xl md:text-4xl font-bold text-arbor-cream leading-tight" data-v-5c0245fd${_scopeId}>${ssrInterpolate(__props.soundWalk.title)}</h1>`);
						if (__props.soundWalk.description) _push(`<p class="mt-3 text-arbor-sage leading-relaxed" data-v-5c0245fd${_scopeId}>${ssrInterpolate(__props.soundWalk.description)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="flex flex-wrap gap-3" data-v-5c0245fd${_scopeId}>`);
						if (__props.soundWalk.estimated_duration_minutes) _push(`<span class="inline-flex items-center gap-1.5 rounded-[8px] border border-arbor-mineral/20 bg-arbor-ink/60 px-3 py-1.5 text-xs text-arbor-sage" data-v-5c0245fd${_scopeId}><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5c0245fd${_scopeId}><circle cx="12" cy="12" r="10" data-v-5c0245fd${_scopeId}></circle><path d="M12 6v6l4 2" data-v-5c0245fd${_scopeId}></path></svg> ${ssrInterpolate(formatDuration(__props.soundWalk.estimated_duration_minutes))}</span>`);
						else _push(`<!---->`);
						if (formatRouteDistance(__props.soundWalk.route_distance_meters)) _push(`<span class="inline-flex items-center gap-1.5 rounded-[8px] border border-arbor-mineral/20 bg-arbor-ink/60 px-3 py-1.5 text-xs text-arbor-sage" data-v-5c0245fd${_scopeId}><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5c0245fd${_scopeId}><path d="M3 11l18-5-5 18-4-8-9-5z" data-v-5c0245fd${_scopeId}></path></svg> ${ssrInterpolate(formatRouteDistance(__props.soundWalk.route_distance_meters))}</span>`);
						else _push(`<!---->`);
						if (formatRouteDuration(__props.soundWalk.route_duration_seconds)) _push(`<span class="inline-flex items-center gap-1.5 rounded-[8px] border border-arbor-mineral/20 bg-arbor-ink/60 px-3 py-1.5 text-xs text-arbor-sage" data-v-5c0245fd${_scopeId}><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5c0245fd${_scopeId}><path d="M6 3h12M6 21h12M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" data-v-5c0245fd${_scopeId}></path></svg> ${ssrInterpolate(formatRouteDuration(__props.soundWalk.route_duration_seconds))}</span>`);
						else _push(`<!---->`);
						if (__props.soundWalk.difficulty_level) _push(`<span class="inline-flex items-center gap-1.5 rounded-[8px] border border-arbor-mineral/20 bg-arbor-ink/60 px-3 py-1.5 text-xs text-arbor-sage" data-v-5c0245fd${_scopeId}><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5c0245fd${_scopeId}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" data-v-5c0245fd${_scopeId}></path></svg> Difficulté ${ssrInterpolate(__props.soundWalk.difficulty_level)}/5 </span>`);
						else _push(`<!---->`);
						if (__props.soundWalk.moderation_status === "pending") _push(`<span class="inline-flex items-center gap-1.5 rounded-[8px] border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-400" data-v-5c0245fd${_scopeId}> En attente de modération </span>`);
						else _push(`<!---->`);
						_push(`</div>`);
						if (__props.soundWalk.tags?.length) {
							_push(`<div class="flex flex-wrap gap-2" data-v-5c0245fd${_scopeId}><!--[-->`);
							ssrRenderList(__props.soundWalk.tags, (tag) => {
								_push(`<span class="rounded-[6px] bg-arbor-emerald/10 px-2 py-1 text-[11px] text-arbor-emerald" data-v-5c0245fd${_scopeId}>${ssrInterpolate(tag)}</span>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						if (__props.soundWalk.user) _push(`<div class="flex items-center gap-3 pt-4 border-t border-arbor-mineral/10" data-v-5c0245fd${_scopeId}><div class="h-8 w-8 rounded-full bg-arbor-emerald/20 grid place-items-center text-arbor-emerald text-xs font-bold" data-v-5c0245fd${_scopeId}>${ssrInterpolate(__props.soundWalk.user.name?.charAt(0).toUpperCase())}</div><div data-v-5c0245fd${_scopeId}><p class="text-sm text-arbor-cream" data-v-5c0245fd${_scopeId}>${ssrInterpolate(__props.soundWalk.user.name)}</p><p class="text-xs text-arbor-sage" data-v-5c0245fd${_scopeId}>Créée le ${ssrInterpolate(__props.soundWalk.created_at)}</p></div></div>`);
						else _push(`<!---->`);
						_push(`<div class="pt-4 border-t border-arbor-mineral/10" data-v-5c0245fd${_scopeId}><h2 class="text-sm font-semibold text-arbor-cream mb-3" data-v-5c0245fd${_scopeId}>Arrêts de la balade</h2><div class="space-y-3" data-v-5c0245fd${_scopeId}><!--[-->`);
						ssrRenderList(__props.soundWalk.points, (point, index) => {
							_push(`<div class="flex gap-3 rounded-[8px] border border-arbor-mineral/10 bg-arbor-ink/40 p-3" data-v-5c0245fd${_scopeId}><div class="shrink-0 h-6 w-6 rounded-full bg-arbor-firefly/20 grid place-items-center text-arbor-firefly text-xs font-bold" data-v-5c0245fd${_scopeId}>${ssrInterpolate(index + 1)}</div><div class="min-w-0" data-v-5c0245fd${_scopeId}><p class="text-sm text-arbor-cream font-medium" data-v-5c0245fd${_scopeId}>${ssrInterpolate(point.title || `Arrêt ${index + 1}`)}</p>`);
							if (point.description) _push(`<p class="text-xs text-arbor-sage mt-0.5" data-v-5c0245fd${_scopeId}>${ssrInterpolate(point.description)}</p>`);
							else _push(`<!---->`);
							if (point.stop_metadata?.recording_tips) _push(`<p class="text-xs text-arbor-emerald mt-1 italic" data-v-5c0245fd${_scopeId}> 💡 ${ssrInterpolate(point.stop_metadata.recording_tips)}</p>`);
							else _push(`<!---->`);
							_push(`</div></div>`);
						});
						_push(`<!--]--></div></div></div><div class="relative z-0 lg:w-2/3" data-v-5c0245fd${_scopeId}><div class="soundwalk-map relative z-0 h-[min(600px,60vh)] w-full overflow-hidden rounded-[12px] border border-arbor-mineral/15" data-v-5c0245fd${_scopeId}></div></div></div></div></div>`);
					} else return [createVNode("div", { class: "min-h-screen bg-arbor-night" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16" }, [createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [createVNode("div", { class: "lg:w-1/3 space-y-6" }, [
						createVNode("div", null, [
							createVNode(unref(Link), {
								href: "/sound-walks",
								class: "text-xs text-arbor-sage hover:text-arbor-cream transition"
							}, {
								default: withCtx(() => [createTextVNode(" ← Toutes les balades ")]),
								_: 1
							}),
							createVNode("h1", { class: "mt-3 font-display text-3xl md:text-4xl font-bold text-arbor-cream leading-tight" }, toDisplayString(__props.soundWalk.title), 1),
							__props.soundWalk.description ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-3 text-arbor-sage leading-relaxed"
							}, toDisplayString(__props.soundWalk.description), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "flex flex-wrap gap-3" }, [
							__props.soundWalk.estimated_duration_minutes ? (openBlock(), createBlock("span", {
								key: 0,
								class: "inline-flex items-center gap-1.5 rounded-[8px] border border-arbor-mineral/20 bg-arbor-ink/60 px-3 py-1.5 text-xs text-arbor-sage"
							}, [(openBlock(), createBlock("svg", {
								class: "h-3.5 w-3.5",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2"
							}, [createVNode("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}), createVNode("path", { d: "M12 6v6l4 2" })])), createTextVNode(" " + toDisplayString(formatDuration(__props.soundWalk.estimated_duration_minutes)), 1)])) : createCommentVNode("", true),
							formatRouteDistance(__props.soundWalk.route_distance_meters) ? (openBlock(), createBlock("span", {
								key: 1,
								class: "inline-flex items-center gap-1.5 rounded-[8px] border border-arbor-mineral/20 bg-arbor-ink/60 px-3 py-1.5 text-xs text-arbor-sage"
							}, [(openBlock(), createBlock("svg", {
								class: "h-3.5 w-3.5",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2"
							}, [createVNode("path", { d: "M3 11l18-5-5 18-4-8-9-5z" })])), createTextVNode(" " + toDisplayString(formatRouteDistance(__props.soundWalk.route_distance_meters)), 1)])) : createCommentVNode("", true),
							formatRouteDuration(__props.soundWalk.route_duration_seconds) ? (openBlock(), createBlock("span", {
								key: 2,
								class: "inline-flex items-center gap-1.5 rounded-[8px] border border-arbor-mineral/20 bg-arbor-ink/60 px-3 py-1.5 text-xs text-arbor-sage"
							}, [(openBlock(), createBlock("svg", {
								class: "h-3.5 w-3.5",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2"
							}, [createVNode("path", { d: "M6 3h12M6 21h12M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" })])), createTextVNode(" " + toDisplayString(formatRouteDuration(__props.soundWalk.route_duration_seconds)), 1)])) : createCommentVNode("", true),
							__props.soundWalk.difficulty_level ? (openBlock(), createBlock("span", {
								key: 3,
								class: "inline-flex items-center gap-1.5 rounded-[8px] border border-arbor-mineral/20 bg-arbor-ink/60 px-3 py-1.5 text-xs text-arbor-sage"
							}, [(openBlock(), createBlock("svg", {
								class: "h-3.5 w-3.5",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2"
							}, [createVNode("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" })])), createTextVNode(" Difficulté " + toDisplayString(__props.soundWalk.difficulty_level) + "/5 ", 1)])) : createCommentVNode("", true),
							__props.soundWalk.moderation_status === "pending" ? (openBlock(), createBlock("span", {
								key: 4,
								class: "inline-flex items-center gap-1.5 rounded-[8px] border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-400"
							}, " En attente de modération ")) : createCommentVNode("", true)
						]),
						__props.soundWalk.tags?.length ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex flex-wrap gap-2"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.soundWalk.tags, (tag) => {
							return openBlock(), createBlock("span", {
								key: tag,
								class: "rounded-[6px] bg-arbor-emerald/10 px-2 py-1 text-[11px] text-arbor-emerald"
							}, toDisplayString(tag), 1);
						}), 128))])) : createCommentVNode("", true),
						__props.soundWalk.user ? (openBlock(), createBlock("div", {
							key: 1,
							class: "flex items-center gap-3 pt-4 border-t border-arbor-mineral/10"
						}, [createVNode("div", { class: "h-8 w-8 rounded-full bg-arbor-emerald/20 grid place-items-center text-arbor-emerald text-xs font-bold" }, toDisplayString(__props.soundWalk.user.name?.charAt(0).toUpperCase()), 1), createVNode("div", null, [createVNode("p", { class: "text-sm text-arbor-cream" }, toDisplayString(__props.soundWalk.user.name), 1), createVNode("p", { class: "text-xs text-arbor-sage" }, "Créée le " + toDisplayString(__props.soundWalk.created_at), 1)])])) : createCommentVNode("", true),
						createVNode("div", { class: "pt-4 border-t border-arbor-mineral/10" }, [createVNode("h2", { class: "text-sm font-semibold text-arbor-cream mb-3" }, "Arrêts de la balade"), createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.soundWalk.points, (point, index) => {
							return openBlock(), createBlock("div", {
								key: point.id,
								class: "flex gap-3 rounded-[8px] border border-arbor-mineral/10 bg-arbor-ink/40 p-3"
							}, [createVNode("div", { class: "shrink-0 h-6 w-6 rounded-full bg-arbor-firefly/20 grid place-items-center text-arbor-firefly text-xs font-bold" }, toDisplayString(index + 1), 1), createVNode("div", { class: "min-w-0" }, [
								createVNode("p", { class: "text-sm text-arbor-cream font-medium" }, toDisplayString(point.title || `Arrêt ${index + 1}`), 1),
								point.description ? (openBlock(), createBlock("p", {
									key: 0,
									class: "text-xs text-arbor-sage mt-0.5"
								}, toDisplayString(point.description), 1)) : createCommentVNode("", true),
								point.stop_metadata?.recording_tips ? (openBlock(), createBlock("p", {
									key: 1,
									class: "text-xs text-arbor-emerald mt-1 italic"
								}, " 💡 " + toDisplayString(point.stop_metadata.recording_tips), 1)) : createCommentVNode("", true)
							])]);
						}), 128))])])
					]), createVNode("div", { class: "relative z-0 lg:w-2/3" }, [createVNode("div", {
						ref_key: "mapContainer",
						ref: mapContainer,
						class: "soundwalk-map relative z-0 h-[min(600px,60vh)] w-full overflow-hidden rounded-[12px] border border-arbor-mineral/15"
					}, null, 512)])])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoundWalks/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Show_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-5c0245fd"]]);
//#endregion
export { Show_default as default };
