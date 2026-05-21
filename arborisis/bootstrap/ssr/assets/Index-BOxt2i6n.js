/* empty css             */
import { t as _sfc_main$1 } from "./GuestLayout-pnlb6vqh.js";
import { Head } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineAsyncComponent, nextTick, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelText, watch, withCtx, withDirectives } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Map/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: { categories: Array },
	setup(__props) {
		const SoundMap = defineAsyncComponent(() => import("./SoundMap-Dtx1WMjf.js"));
		const props = __props;
		const sounds = ref([]);
		const loading = ref(false);
		const searchQuery = ref("");
		const selectedCategory = ref("");
		const searchTimeout = ref(null);
		const initialLoad = ref(true);
		const sidebarOpen = ref(false);
		const titleHidden = ref(false);
		const activeSoundId = ref(null);
		const titleTimeout = ref(null);
		const soundMapRef = ref(null);
		const activeMode = ref("discover");
		const mapModes = [
			{
				key: "discover",
				label: "Découverte"
			},
			{
				key: "species",
				label: "Espèces"
			},
			{
				key: "places",
				label: "Lieux"
			},
			{
				key: "seasons",
				label: "Saisons"
			},
			{
				key: "archives",
				label: "Archives"
			}
		];
		const categoryColorMap = {
			"Forêts": {
				bg: "bg-emerald-500/15",
				text: "text-emerald-400",
				border: "border-emerald-500/30",
				glow: "shadow-emerald-500/5"
			},
			"Océans": {
				bg: "bg-sky-500/15",
				text: "text-sky-400",
				border: "border-sky-500/30",
				glow: "shadow-sky-500/5"
			},
			"Montagnes": {
				bg: "bg-stone-500/15",
				text: "text-stone-400",
				border: "border-stone-500/30",
				glow: "shadow-stone-500/5"
			},
			"Déserts": {
				bg: "bg-amber-500/15",
				text: "text-amber-400",
				border: "border-amber-500/30",
				glow: "shadow-amber-500/5"
			},
			"Rivières": {
				bg: "bg-cyan-500/15",
				text: "text-cyan-400",
				border: "border-cyan-500/30",
				glow: "shadow-cyan-500/5"
			},
			"Urbain": {
				bg: "bg-pink-500/15",
				text: "text-pink-400",
				border: "border-pink-500/30",
				glow: "shadow-pink-500/5"
			},
			"Cavernes": {
				bg: "bg-violet-500/15",
				text: "text-violet-400",
				border: "border-violet-500/30",
				glow: "shadow-violet-500/5"
			},
			"Prairies": {
				bg: "bg-lime-500/15",
				text: "text-lime-400",
				border: "border-lime-500/30",
				glow: "shadow-lime-500/5"
			},
			"Lacs": {
				bg: "bg-blue-400/15",
				text: "text-blue-400",
				border: "border-blue-400/30",
				glow: "shadow-blue-400/5"
			},
			"Marais": {
				bg: "bg-teal-500/15",
				text: "text-teal-400",
				border: "border-teal-500/30",
				glow: "shadow-teal-500/5"
			},
			"Jungles": {
				bg: "bg-green-500/15",
				text: "text-green-400",
				border: "border-green-500/30",
				glow: "shadow-green-500/5"
			},
			"Glaciers": {
				bg: "bg-indigo-300/15",
				text: "text-indigo-300",
				border: "border-indigo-300/30",
				glow: "shadow-indigo-300/5"
			}
		};
		const getCategoryStyle = (name) => {
			return categoryColorMap[name] || {
				bg: "bg-arbor-emerald/15",
				text: "text-arbor-emerald",
				border: "border-arbor-emerald/30",
				glow: "shadow-arbor-emerald/5"
			};
		};
		const hasSounds = computed(() => sounds.value.length > 0);
		const activeCategoryName = computed(() => {
			if (!selectedCategory.value) return "";
			return props.categories.find((c) => String(c.id) === String(selectedCategory.value))?.name || "";
		});
		const fetchSounds = async () => {
			loading.value = true;
			try {
				const params = new URLSearchParams();
				if (selectedCategory.value) params.append("category", selectedCategory.value);
				sounds.value = (await (await fetch(`/api/map/sounds?${params.toString()}`)).json()).features ?? [];
			} catch (e) {
				console.error("Failed to load sounds:", e);
				sounds.value = [];
			} finally {
				loading.value = false;
				initialLoad.value = false;
			}
		};
		const searchSounds = async () => {
			if (!searchQuery.value || searchQuery.value.length < 2) {
				fetchSounds();
				return;
			}
			loading.value = true;
			try {
				sounds.value = (await (await fetch(`/api/map/sounds/search?q=${encodeURIComponent(searchQuery.value)}`)).json()).features ?? [];
			} catch (e) {
				console.error("Search failed:", e);
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
			searchQuery.value = "";
			fetchSounds();
		};
		const selectCategory = (id) => {
			selectedCategory.value = selectedCategory.value === id ? "" : id;
		};
		watch(selectedCategory, fetchSounds);
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
		};
		const onSoundClick = (sound) => {
			const p = sound.properties;
			const coords = sound.geometry.coordinates;
			activeSoundId.value = p.id;
			hideTitle();
			if (soundMapRef.value && coords && isFinite(coords[0]) && isFinite(coords[1])) {
				soundMapRef.value.flyToSound(coords, 14);
				soundMapRef.value.highlightMarker(p.id);
				nextTick(() => {
					soundMapRef.value.openPopup(p.id);
				});
			}
			if (window.innerWidth < 768) sidebarOpen.value = false;
		};
		const onSoundHover = (sound) => {
			if (soundMapRef.value) soundMapRef.value.highlightMarker(sound.properties.id);
		};
		const onSoundHoverLeave = () => {
			if (soundMapRef.value) soundMapRef.value.highlightMarker(activeSoundId.value);
		};
		const hideTitle = () => {
			titleHidden.value = true;
			if (titleTimeout.value) clearTimeout(titleTimeout.value);
		};
		onMounted(() => {
			fetchSounds();
			titleTimeout.value = setTimeout(() => {
				titleHidden.value = true;
			}, 4e3);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Carte sonore" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative isolate h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden"${_scopeId}><div class="absolute inset-0 z-[5] pointer-events-none bg-gradient-radial from-arbor-moss/10 via-transparent to-transparent"${_scopeId}></div><div class="absolute inset-0 z-[6] pointer-events-none map-grain"${_scopeId}></div><div class="absolute inset-0 z-[5] pointer-events-none map-fog-vignette"${_scopeId}></div><div class="${ssrRenderClass([{ "map-title-hidden": titleHidden.value }, "absolute top-6 left-1/2 -translate-x-1/2 z-map text-center map-title-fade pointer-events-none"])}"${_scopeId}><h1 class="font-display text-3xl md:text-4xl font-semibold text-arbor-cream tracking-tight"${_scopeId}> Carte vivante </h1><p class="text-arbor-sage/70 text-sm mt-1 font-light"${_scopeId}> Les traces sonores publiques du monde vivant </p></div><button class="${ssrRenderClass([{ "ring-2 ring-arbor-emerald/40": sidebarOpen.value }, "md:hidden fixed bottom-6 left-4 z-map w-12 h-12 rounded-xl glass-card flex items-center justify-center shadow-lg shadow-black/30"])}" aria-label="Ouvrir le panneau de l&#39;explorateur"${_scopeId}>`);
						if (!sidebarOpen.value) _push(`<svg class="w-5 h-5 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"${_scopeId}></path></svg>`);
						else _push(`<svg class="w-5 h-5 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg>`);
						_push(`</button><div class="${ssrRenderClass([sidebarOpen.value ? "mobile-sidebar-open" : "mobile-sidebar-closed md:mobile-sidebar-open", "absolute top-4 left-4 z-map w-[340px] lg:w-[380px] max-w-[calc(100vw-2rem)] mobile-sidebar"])}"${_scopeId}><div class="trace-frame shadow-2xl shadow-black/25 overflow-hidden flex flex-col max-h-[calc(100vh-7rem)]"${_scopeId}><div class="p-4 border-b border-arbor-glass-border animate-fade-in-up"${_scopeId}><div class="mb-4"${_scopeId}><p class="atlas-kicker mb-1"${_scopeId}>Atlas acoustique</p><h2 class="font-display text-2xl font-semibold text-arbor-cream"${_scopeId}>Explorer les traces</h2><p class="mt-1 text-xs leading-5 text-arbor-sage/75"${_scopeId}> Coordonnées publiques approximées pour protéger les lieux sensibles. </p></div><div class="mb-4 flex gap-2 overflow-x-auto pb-1"${_scopeId}><!--[-->`);
						ssrRenderList(mapModes, (mode) => {
							_push(`<button class="${ssrRenderClass([{ "map-mode-pill-active": activeMode.value === mode.key }, "map-mode-pill shrink-0"])}"${_scopeId}>${ssrInterpolate(mode.label)}</button>`);
						});
						_push(`<!--]--></div><div class="relative"${_scopeId}><svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-arbor-sage/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Espèce, forêt, aube, créateur..." class="w-full pl-10 pr-9 py-2.5 bg-arbor-ink/50 border border-arbor-mineral/10 rounded-lg text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:border-arbor-lichen/50 focus:ring-2 focus:ring-arbor-lichen/10 transition-colors search-pulse" aria-label="Rechercher un son ou un lieu"${_scopeId}>`);
						if (searchQuery.value) _push(`<button class="absolute right-2 top-1/2 -translate-y-1/2 text-arbor-sage/50 hover:text-arbor-cream transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Effacer la recherche"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button>`);
						else _push(`<!---->`);
						_push(`</div></div><div class="px-4 py-3 border-b border-arbor-glass-border animate-fade-in-up stagger-1"${_scopeId}><div class="flex flex-wrap gap-1.5"${_scopeId}><button class="${ssrRenderClass(["px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-colors duration-200 flex items-center", selectedCategory.value === "" ? "bg-arbor-lichen/15 text-arbor-lichen border border-arbor-lichen/30 shadow-sm shadow-arbor-lichen/5" : "bg-arbor-ink/45 text-arbor-sage border border-arbor-mineral/10 hover:border-arbor-mineral/25 hover:bg-arbor-mist/5"])}"${_scopeId}> Tous </button><!--[-->`);
						ssrRenderList(__props.categories, (category) => {
							_push(`<button class="${ssrRenderClass(["px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-colors duration-200 border flex items-center", selectedCategory.value == category.id ? `${getCategoryStyle(category.name).bg} ${getCategoryStyle(category.name).text} ${getCategoryStyle(category.name).border} shadow-sm ${getCategoryStyle(category.name).glow}` : "bg-arbor-ink/45 text-arbor-sage border-arbor-mineral/10 hover:border-arbor-mineral/25 hover:bg-arbor-mist/5"])}"${_scopeId}>${ssrInterpolate(category.name)}</button>`);
						});
						_push(`<!--]--></div></div><div class="px-4 py-2.5 border-b border-arbor-glass-border flex items-center justify-between animate-fade-in-up stagger-2"${_scopeId}><span class="text-xs"${_scopeId}>`);
						if (initialLoad.value) _push(`<span class="text-arbor-sage/70"${_scopeId}>Chargement...</span>`);
						else if (hasSounds.value) {
							_push(`<span class="text-arbor-sage"${_scopeId}><span class="text-arbor-lichen font-semibold tabular-nums"${_scopeId}>${ssrInterpolate(sounds.value.length)}</span> trace${ssrInterpolate(sounds.value.length > 1 ? "s" : "")} trouvée${ssrInterpolate(sounds.value.length > 1 ? "s" : "")} `);
							if (activeCategoryName.value) _push(`<span class="text-arbor-sage/60"${_scopeId}> dans <span class="text-arbor-sage"${_scopeId}>${ssrInterpolate(activeCategoryName.value)}</span></span>`);
							else _push(`<!---->`);
							_push(`</span>`);
						} else _push(`<span class="text-arbor-sage/60"${_scopeId}>Aucun son trouvé</span>`);
						_push(`</span>`);
						if (loading.value && !initialLoad.value) _push(`<div class="waveform-loader"${_scopeId}><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span></div>`);
						else _push(`<!---->`);
						_push(`</div><div class="flex-1 overflow-y-auto min-h-0 custom-scrollbar"${_scopeId}>`);
						if (initialLoad.value || loading.value) {
							_push(`<div class="p-3 space-y-3"${_scopeId}><!--[-->`);
							ssrRenderList(6, (n) => {
								_push(`<div class="flex items-center gap-3"${_scopeId}><div class="w-11 h-11 rounded-lg bg-arbor-charcoal animate-pulse shrink-0"${_scopeId}></div><div class="flex-1 space-y-2"${_scopeId}><div class="h-3 bg-arbor-charcoal rounded animate-pulse w-3/4"${_scopeId}></div><div class="h-2.5 bg-arbor-charcoal rounded animate-pulse w-1/2"${_scopeId}></div></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else if (hasSounds.value) {
							_push(`<div class="p-3 space-y-1.5"${_scopeId}><!--[-->`);
							ssrRenderList(sounds.value, (sound, index) => {
								_push(`<div class="${ssrRenderClass([{ "map-sound-item-active": activeSoundId.value == sound.properties.id }, "map-sound-item animate-sound-item-enter"])}" style="${ssrRenderStyle(`animation-delay: ${index * .04}s; opacity: 0;`)}"${_scopeId}><div class="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-arbor-charcoal"${_scopeId}>`);
								if (sound.properties.cover_url) _push(`<img${ssrRenderAttr("src", sound.properties.cover_url)}${ssrRenderAttr("alt", sound.properties.title)} class="w-full h-full object-cover" loading="lazy"${_scopeId}>`);
								else _push(`<div class="w-full h-full flex items-center justify-center text-arbor-sage/30"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div>`);
								_push(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-1.5 mb-0.5"${_scopeId}>`);
								if (sound.properties.category) _push(`<span class="${ssrRenderClass([`${getCategoryStyle(sound.properties.category).bg} ${getCategoryStyle(sound.properties.category).text}`, "text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"])}"${_scopeId}>${ssrInterpolate(sound.properties.category)}</span>`);
								else _push(`<!---->`);
								_push(`</div><h4 class="text-sm font-medium text-arbor-cream truncate"${_scopeId}>${ssrInterpolate(sound.properties.title)}</h4><div class="flex items-center gap-2 text-[11px] text-arbor-sage/70"${_scopeId}><span class="truncate"${_scopeId}>${ssrInterpolate(sound.properties.user_name)}</span><span class="shrink-0"${_scopeId}>·</span><span class="tabular-nums shrink-0"${_scopeId}>${ssrInterpolate(formatDuration(sound.properties.duration))}</span></div></div><svg class="w-4 h-4 text-arbor-sage/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						if (!loading.value && !hasSounds.value && !initialLoad.value) _push(`<div class="p-6 text-center animate-scale-in"${_scopeId}><svg class="w-12 h-12 text-arbor-moss/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7"${_scopeId}></path></svg><p class="text-sm text-arbor-sage mb-1"${_scopeId}>Aucun enregistrement ici</p><p class="text-xs text-arbor-sage/70 mb-4"${_scopeId}>Essayez une autre recherche ou catégorie</p><button class="text-xs text-arbor-emerald hover:text-arbor-emerald-dark transition-colors font-medium"${_scopeId}> Réinitialiser les filtres → </button></div>`);
						else _push(`<!---->`);
						_push(`</div></div></div>`);
						_push(ssrRenderComponent(unref(SoundMap), {
							ref_key: "soundMapRef",
							ref: soundMapRef,
							sounds: sounds.value,
							"active-sound-id": activeSoundId.value,
							onMarkerClick: ($event) => activeSoundId.value = $event
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "relative isolate h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden" }, [
						createVNode("div", { class: "absolute inset-0 z-[5] pointer-events-none bg-gradient-radial from-arbor-moss/10 via-transparent to-transparent" }),
						createVNode("div", { class: "absolute inset-0 z-[6] pointer-events-none map-grain" }),
						createVNode("div", { class: "absolute inset-0 z-[5] pointer-events-none map-fog-vignette" }),
						createVNode("div", { class: ["absolute top-6 left-1/2 -translate-x-1/2 z-map text-center map-title-fade pointer-events-none", { "map-title-hidden": titleHidden.value }] }, [createVNode("h1", { class: "font-display text-3xl md:text-4xl font-semibold text-arbor-cream tracking-tight" }, " Carte vivante "), createVNode("p", { class: "text-arbor-sage/70 text-sm mt-1 font-light" }, " Les traces sonores publiques du monde vivant ")], 2),
						createVNode("button", {
							class: ["md:hidden fixed bottom-6 left-4 z-map w-12 h-12 rounded-xl glass-card flex items-center justify-center shadow-lg shadow-black/30", { "ring-2 ring-arbor-emerald/40": sidebarOpen.value }],
							"aria-label": "Ouvrir le panneau de l'explorateur",
							onClick: ($event) => sidebarOpen.value = !sidebarOpen.value
						}, [!sidebarOpen.value ? (openBlock(), createBlock("svg", {
							key: 0,
							class: "w-5 h-5 text-arbor-sage",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M4 6h16M4 12h16M4 18h16"
						})])) : (openBlock(), createBlock("svg", {
							key: 1,
							class: "w-5 h-5 text-arbor-sage",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M6 18L18 6M6 6l12 12"
						})]))], 10, ["onClick"]),
						createVNode("div", {
							class: ["absolute top-4 left-4 z-map w-[340px] lg:w-[380px] max-w-[calc(100vw-2rem)] mobile-sidebar", sidebarOpen.value ? "mobile-sidebar-open" : "mobile-sidebar-closed md:mobile-sidebar-open"],
							onMouseenter: hideTitle,
							onClick: hideTitle
						}, [createVNode("div", { class: "trace-frame shadow-2xl shadow-black/25 overflow-hidden flex flex-col max-h-[calc(100vh-7rem)]" }, [
							createVNode("div", { class: "p-4 border-b border-arbor-glass-border animate-fade-in-up" }, [
								createVNode("div", { class: "mb-4" }, [
									createVNode("p", { class: "atlas-kicker mb-1" }, "Atlas acoustique"),
									createVNode("h2", { class: "font-display text-2xl font-semibold text-arbor-cream" }, "Explorer les traces"),
									createVNode("p", { class: "mt-1 text-xs leading-5 text-arbor-sage/75" }, " Coordonnées publiques approximées pour protéger les lieux sensibles. ")
								]),
								createVNode("div", { class: "mb-4 flex gap-2 overflow-x-auto pb-1" }, [(openBlock(), createBlock(Fragment, null, renderList(mapModes, (mode) => {
									return createVNode("button", {
										key: mode.key,
										class: ["map-mode-pill shrink-0", { "map-mode-pill-active": activeMode.value === mode.key }],
										onClick: ($event) => activeMode.value = mode.key
									}, toDisplayString(mode.label), 11, ["onClick"]);
								}), 64))]),
								createVNode("div", { class: "relative" }, [
									(openBlock(), createBlock("svg", {
										class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-arbor-sage/60",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									})])),
									withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => searchQuery.value = $event,
										type: "text",
										placeholder: "Espèce, forêt, aube, créateur...",
										class: "w-full pl-10 pr-9 py-2.5 bg-arbor-ink/50 border border-arbor-mineral/10 rounded-lg text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:border-arbor-lichen/50 focus:ring-2 focus:ring-arbor-lichen/10 transition-colors search-pulse",
										"aria-label": "Rechercher un son ou un lieu",
										onInput: onSearchInput
									}, null, 40, ["onUpdate:modelValue"]), [[vModelText, searchQuery.value]]),
									searchQuery.value ? (openBlock(), createBlock("button", {
										key: 0,
										class: "absolute right-2 top-1/2 -translate-y-1/2 text-arbor-sage/50 hover:text-arbor-cream transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center",
										"aria-label": "Effacer la recherche",
										onClick: clearSearch
									}, [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M6 18L18 6M6 6l12 12"
									})]))])) : createCommentVNode("", true)
								])
							]),
							createVNode("div", { class: "px-4 py-3 border-b border-arbor-glass-border animate-fade-in-up stagger-1" }, [createVNode("div", { class: "flex flex-wrap gap-1.5" }, [createVNode("button", {
								class: ["px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-colors duration-200 flex items-center", selectedCategory.value === "" ? "bg-arbor-lichen/15 text-arbor-lichen border border-arbor-lichen/30 shadow-sm shadow-arbor-lichen/5" : "bg-arbor-ink/45 text-arbor-sage border border-arbor-mineral/10 hover:border-arbor-mineral/25 hover:bg-arbor-mist/5"],
								onClick: ($event) => selectCategory("")
							}, " Tous ", 10, ["onClick"]), (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
								return openBlock(), createBlock("button", {
									key: category.id,
									class: ["px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-colors duration-200 border flex items-center", selectedCategory.value == category.id ? `${getCategoryStyle(category.name).bg} ${getCategoryStyle(category.name).text} ${getCategoryStyle(category.name).border} shadow-sm ${getCategoryStyle(category.name).glow}` : "bg-arbor-ink/45 text-arbor-sage border-arbor-mineral/10 hover:border-arbor-mineral/25 hover:bg-arbor-mist/5"],
									onClick: ($event) => selectCategory(category.id)
								}, toDisplayString(category.name), 11, ["onClick"]);
							}), 128))])]),
							createVNode("div", { class: "px-4 py-2.5 border-b border-arbor-glass-border flex items-center justify-between animate-fade-in-up stagger-2" }, [createVNode("span", { class: "text-xs" }, [initialLoad.value ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-arbor-sage/70"
							}, "Chargement...")) : hasSounds.value ? (openBlock(), createBlock("span", {
								key: 1,
								class: "text-arbor-sage"
							}, [
								createVNode("span", { class: "text-arbor-lichen font-semibold tabular-nums" }, toDisplayString(sounds.value.length), 1),
								createTextVNode(" trace" + toDisplayString(sounds.value.length > 1 ? "s" : "") + " trouvée" + toDisplayString(sounds.value.length > 1 ? "s" : "") + " ", 1),
								activeCategoryName.value ? (openBlock(), createBlock("span", {
									key: 0,
									class: "text-arbor-sage/60"
								}, [createTextVNode(" dans "), createVNode("span", { class: "text-arbor-sage" }, toDisplayString(activeCategoryName.value), 1)])) : createCommentVNode("", true)
							])) : (openBlock(), createBlock("span", {
								key: 2,
								class: "text-arbor-sage/60"
							}, "Aucun son trouvé"))]), loading.value && !initialLoad.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "waveform-loader"
							}, [
								createVNode("span"),
								createVNode("span"),
								createVNode("span"),
								createVNode("span"),
								createVNode("span")
							])) : createCommentVNode("", true)]),
							createVNode("div", { class: "flex-1 overflow-y-auto min-h-0 custom-scrollbar" }, [initialLoad.value || loading.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "p-3 space-y-3"
							}, [(openBlock(), createBlock(Fragment, null, renderList(6, (n) => {
								return createVNode("div", {
									key: n,
									class: "flex items-center gap-3"
								}, [createVNode("div", { class: "w-11 h-11 rounded-lg bg-arbor-charcoal animate-pulse shrink-0" }), createVNode("div", { class: "flex-1 space-y-2" }, [createVNode("div", { class: "h-3 bg-arbor-charcoal rounded animate-pulse w-3/4" }), createVNode("div", { class: "h-2.5 bg-arbor-charcoal rounded animate-pulse w-1/2" })])]);
							}), 64))])) : hasSounds.value ? (openBlock(), createBlock("div", {
								key: 1,
								class: "p-3 space-y-1.5"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(sounds.value, (sound, index) => {
								return openBlock(), createBlock("div", {
									key: sound.properties.id,
									class: ["map-sound-item animate-sound-item-enter", { "map-sound-item-active": activeSoundId.value == sound.properties.id }],
									style: `animation-delay: ${index * .04}s; opacity: 0;`,
									onClick: ($event) => onSoundClick(sound),
									onMouseenter: ($event) => onSoundHover(sound),
									onMouseleave: onSoundHoverLeave
								}, [
									createVNode("div", { class: "w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-arbor-charcoal" }, [sound.properties.cover_url ? (openBlock(), createBlock("img", {
										key: 0,
										src: sound.properties.cover_url,
										alt: sound.properties.title,
										class: "w-full h-full object-cover",
										loading: "lazy"
									}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
										key: 1,
										class: "w-full h-full flex items-center justify-center text-arbor-sage/30"
									}, [(openBlock(), createBlock("svg", {
										class: "w-5 h-5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "1.5",
										d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
									})]))]))]),
									createVNode("div", { class: "flex-1 min-w-0" }, [
										createVNode("div", { class: "flex items-center gap-1.5 mb-0.5" }, [sound.properties.category ? (openBlock(), createBlock("span", {
											key: 0,
											class: ["text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded", `${getCategoryStyle(sound.properties.category).bg} ${getCategoryStyle(sound.properties.category).text}`]
										}, toDisplayString(sound.properties.category), 3)) : createCommentVNode("", true)]),
										createVNode("h4", { class: "text-sm font-medium text-arbor-cream truncate" }, toDisplayString(sound.properties.title), 1),
										createVNode("div", { class: "flex items-center gap-2 text-[11px] text-arbor-sage/70" }, [
											createVNode("span", { class: "truncate" }, toDisplayString(sound.properties.user_name), 1),
											createVNode("span", { class: "shrink-0" }, "·"),
											createVNode("span", { class: "tabular-nums shrink-0" }, toDisplayString(formatDuration(sound.properties.duration)), 1)
										])
									]),
									(openBlock(), createBlock("svg", {
										class: "w-4 h-4 text-arbor-sage/30 shrink-0",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M9 5l7 7-7 7"
									})]))
								], 46, ["onClick", "onMouseenter"]);
							}), 128))])) : createCommentVNode("", true), !loading.value && !hasSounds.value && !initialLoad.value ? (openBlock(), createBlock("div", {
								key: 2,
								class: "p-6 text-center animate-scale-in"
							}, [
								(openBlock(), createBlock("svg", {
									class: "w-12 h-12 text-arbor-moss/30 mx-auto mb-3",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1",
									d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7"
								})])),
								createVNode("p", { class: "text-sm text-arbor-sage mb-1" }, "Aucun enregistrement ici"),
								createVNode("p", { class: "text-xs text-arbor-sage/70 mb-4" }, "Essayez une autre recherche ou catégorie"),
								createVNode("button", {
									class: "text-xs text-arbor-emerald hover:text-arbor-emerald-dark transition-colors font-medium",
									onClick: ($event) => {
										clearSearch();
										selectedCategory.value = "";
										fetchSounds();
									}
								}, " Réinitialiser les filtres → ", 8, ["onClick"])
							])) : createCommentVNode("", true)])
						])], 34),
						createVNode(unref(SoundMap), {
							ref_key: "soundMapRef",
							ref: soundMapRef,
							sounds: sounds.value,
							"active-sound-id": activeSoundId.value,
							onMarkerClick: ($event) => activeSoundId.value = $event
						}, null, 8, [
							"sounds",
							"active-sound-id",
							"onMarkerClick"
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Map/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
