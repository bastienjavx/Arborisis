import { t as _sfc_main$1 } from "./GuestLayout-pnlb6vqh.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/SoundWalks/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	setup(__props) {
		const soundWalks = ref([]);
		const loading = ref(true);
		async function fetchSoundWalks() {
			try {
				const res = await fetch("/api/sound-walks", { headers: { Accept: "application/json" } });
				if (res.ok) soundWalks.value = (await res.json()).features ?? [];
			} catch (e) {
				console.warn("Failed to load sound walks", e);
			} finally {
				loading.value = false;
			}
		}
		onMounted(fetchSoundWalks);
		function formatDuration(minutes) {
			if (!minutes) return "-";
			const h = Math.floor(minutes / 60);
			const m = minutes % 60;
			if (h > 0) return `${h}h ${m}min`;
			return `${m} min`;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Balades field recording" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="min-h-screen bg-arbor-night"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"${_scopeId}><div class="mb-10"${_scopeId}><h1 class="font-display text-3xl md:text-4xl font-bold text-arbor-cream"${_scopeId}> Balades field recording </h1><p class="mt-3 text-arbor-sage max-w-2xl"${_scopeId}> Explore les itinéraires sonores partagés par la communauté Arborisis. Chaque balade est un parcours de points d&#39;écoute dans la nature. </p></div>`);
						if (loading.value) _push(`<div class="text-arbor-sage text-sm"${_scopeId}>Chargement…</div>`);
						else if (soundWalks.value.length === 0) _push(`<div class="text-arbor-sage text-sm"${_scopeId}> Aucune balade disponible pour le moment. </div>`);
						else {
							_push(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
							ssrRenderList(soundWalks.value, (walk) => {
								_push(ssrRenderComponent(unref(Link), {
									key: walk.properties.id,
									href: `/sound-walks/${walk.properties.slug}`,
									class: "group block rounded-[12px] border border-arbor-mineral/15 bg-arbor-ink/40 p-5 transition hover:border-arbor-firefly/30 hover:bg-arbor-ink/60"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="flex items-start justify-between gap-3"${_scopeId}><h2 class="font-display text-lg font-semibold text-arbor-cream group-hover:text-arbor-firefly transition"${_scopeId}>${ssrInterpolate(walk.properties.title)}</h2>`);
											if (walk.properties.moderation_status === "pending") _push(`<span class="shrink-0 rounded-[6px] bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400"${_scopeId}> En attente </span>`);
											else _push(`<!---->`);
											_push(`</div>`);
											if (walk.properties.description) _push(`<p class="mt-2 text-sm text-arbor-sage line-clamp-2"${_scopeId}>${ssrInterpolate(walk.properties.description)}</p>`);
											else _push(`<!---->`);
											_push(`<div class="mt-4 flex flex-wrap gap-2 text-xs text-arbor-sage"${_scopeId}>`);
											if (walk.properties.estimated_duration_minutes) _push(`<span class="flex items-center gap-1"${_scopeId}><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${_scopeId}><circle cx="12" cy="12" r="10"${_scopeId}></circle><path d="M12 6v6l4 2"${_scopeId}></path></svg> ${ssrInterpolate(formatDuration(walk.properties.estimated_duration_minutes))}</span>`);
											else _push(`<!---->`);
											if (walk.properties.difficulty_level) _push(`<span class="flex items-center gap-1"${_scopeId}><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${_scopeId}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"${_scopeId}></path></svg> ${ssrInterpolate(walk.properties.difficulty_level)}/5 </span>`);
											else _push(`<!---->`);
											if (walk.properties.waypoints_count) _push(`<span class="flex items-center gap-1"${_scopeId}><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${_scopeId}><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg> ${ssrInterpolate(walk.properties.waypoints_count)} arrêts </span>`);
											else _push(`<!---->`);
											_push(`</div>`);
											if (walk.properties.user) _push(`<div class="mt-3 pt-3 border-t border-arbor-mineral/10 text-xs text-arbor-sage"${_scopeId}> par ${ssrInterpolate(walk.properties.user.name)}</div>`);
											else _push(`<!---->`);
										} else return [
											createVNode("div", { class: "flex items-start justify-between gap-3" }, [createVNode("h2", { class: "font-display text-lg font-semibold text-arbor-cream group-hover:text-arbor-firefly transition" }, toDisplayString(walk.properties.title), 1), walk.properties.moderation_status === "pending" ? (openBlock(), createBlock("span", {
												key: 0,
												class: "shrink-0 rounded-[6px] bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400"
											}, " En attente ")) : createCommentVNode("", true)]),
											walk.properties.description ? (openBlock(), createBlock("p", {
												key: 0,
												class: "mt-2 text-sm text-arbor-sage line-clamp-2"
											}, toDisplayString(walk.properties.description), 1)) : createCommentVNode("", true),
											createVNode("div", { class: "mt-4 flex flex-wrap gap-2 text-xs text-arbor-sage" }, [
												walk.properties.estimated_duration_minutes ? (openBlock(), createBlock("span", {
													key: 0,
													class: "flex items-center gap-1"
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
												}), createVNode("path", { d: "M12 6v6l4 2" })])), createTextVNode(" " + toDisplayString(formatDuration(walk.properties.estimated_duration_minutes)), 1)])) : createCommentVNode("", true),
												walk.properties.difficulty_level ? (openBlock(), createBlock("span", {
													key: 1,
													class: "flex items-center gap-1"
												}, [(openBlock(), createBlock("svg", {
													class: "h-3.5 w-3.5",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													"stroke-width": "2"
												}, [createVNode("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" })])), createTextVNode(" " + toDisplayString(walk.properties.difficulty_level) + "/5 ", 1)])) : createCommentVNode("", true),
												walk.properties.waypoints_count ? (openBlock(), createBlock("span", {
													key: 2,
													class: "flex items-center gap-1"
												}, [(openBlock(), createBlock("svg", {
													class: "h-3.5 w-3.5",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													"stroke-width": "2"
												}, [createVNode("path", { d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), createVNode("path", { d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })])), createTextVNode(" " + toDisplayString(walk.properties.waypoints_count) + " arrêts ", 1)])) : createCommentVNode("", true)
											]),
											walk.properties.user ? (openBlock(), createBlock("div", {
												key: 1,
												class: "mt-3 pt-3 border-t border-arbor-mineral/10 text-xs text-arbor-sage"
											}, " par " + toDisplayString(walk.properties.user.name), 1)) : createCommentVNode("", true)
										];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						}
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "min-h-screen bg-arbor-night" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16" }, [createVNode("div", { class: "mb-10" }, [createVNode("h1", { class: "font-display text-3xl md:text-4xl font-bold text-arbor-cream" }, " Balades field recording "), createVNode("p", { class: "mt-3 text-arbor-sage max-w-2xl" }, " Explore les itinéraires sonores partagés par la communauté Arborisis. Chaque balade est un parcours de points d'écoute dans la nature. ")]), loading.value ? (openBlock(), createBlock("div", {
						key: 0,
						class: "text-arbor-sage text-sm"
					}, "Chargement…")) : soundWalks.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 1,
						class: "text-arbor-sage text-sm"
					}, " Aucune balade disponible pour le moment. ")) : (openBlock(), createBlock("div", {
						key: 2,
						class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(soundWalks.value, (walk) => {
						return openBlock(), createBlock(unref(Link), {
							key: walk.properties.id,
							href: `/sound-walks/${walk.properties.slug}`,
							class: "group block rounded-[12px] border border-arbor-mineral/15 bg-arbor-ink/40 p-5 transition hover:border-arbor-firefly/30 hover:bg-arbor-ink/60"
						}, {
							default: withCtx(() => [
								createVNode("div", { class: "flex items-start justify-between gap-3" }, [createVNode("h2", { class: "font-display text-lg font-semibold text-arbor-cream group-hover:text-arbor-firefly transition" }, toDisplayString(walk.properties.title), 1), walk.properties.moderation_status === "pending" ? (openBlock(), createBlock("span", {
									key: 0,
									class: "shrink-0 rounded-[6px] bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400"
								}, " En attente ")) : createCommentVNode("", true)]),
								walk.properties.description ? (openBlock(), createBlock("p", {
									key: 0,
									class: "mt-2 text-sm text-arbor-sage line-clamp-2"
								}, toDisplayString(walk.properties.description), 1)) : createCommentVNode("", true),
								createVNode("div", { class: "mt-4 flex flex-wrap gap-2 text-xs text-arbor-sage" }, [
									walk.properties.estimated_duration_minutes ? (openBlock(), createBlock("span", {
										key: 0,
										class: "flex items-center gap-1"
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
									}), createVNode("path", { d: "M12 6v6l4 2" })])), createTextVNode(" " + toDisplayString(formatDuration(walk.properties.estimated_duration_minutes)), 1)])) : createCommentVNode("", true),
									walk.properties.difficulty_level ? (openBlock(), createBlock("span", {
										key: 1,
										class: "flex items-center gap-1"
									}, [(openBlock(), createBlock("svg", {
										class: "h-3.5 w-3.5",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										"stroke-width": "2"
									}, [createVNode("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" })])), createTextVNode(" " + toDisplayString(walk.properties.difficulty_level) + "/5 ", 1)])) : createCommentVNode("", true),
									walk.properties.waypoints_count ? (openBlock(), createBlock("span", {
										key: 2,
										class: "flex items-center gap-1"
									}, [(openBlock(), createBlock("svg", {
										class: "h-3.5 w-3.5",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										"stroke-width": "2"
									}, [createVNode("path", { d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), createVNode("path", { d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })])), createTextVNode(" " + toDisplayString(walk.properties.waypoints_count) + " arrêts ", 1)])) : createCommentVNode("", true)
								]),
								walk.properties.user ? (openBlock(), createBlock("div", {
									key: 1,
									class: "mt-3 pt-3 border-t border-arbor-mineral/10 text-xs text-arbor-sage"
								}, " par " + toDisplayString(walk.properties.user.name), 1)) : createCommentVNode("", true)
							]),
							_: 2
						}, 1032, ["href"]);
					}), 128))]))])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoundWalks/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
