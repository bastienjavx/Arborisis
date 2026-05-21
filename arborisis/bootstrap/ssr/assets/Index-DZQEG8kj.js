/* empty css                 */
import { t as _sfc_main$1 } from "./GuestLayout-pnlb6vqh.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, nextTick, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, watch, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import L from "leaflet";
import "leaflet.markercluster";
//#region resources/js/Pages/ListeningPoints/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		points: Object,
		filters: Object,
		catalog: Object
	},
	setup(__props) {
		const props = __props;
		const search = ref(props.filters?.q ?? "");
		const habitat = ref(props.filters?.habitat ?? "");
		const sort = ref(props.filters?.sort ?? "recent");
		const viewMode = ref(props.filters?.view ?? "map");
		const mapContainer = ref(null);
		const activeMapPoint = ref(null);
		let map = null;
		let markerClusterGroup = null;
		let heatmapLayer = null;
		const showHeatmap = ref(false);
		const timelineData = ref([]);
		const loadingTimeline = ref(false);
		const baseHabitats = [
			{
				value: "",
				label: "Tous",
				longLabel: "Tous les habitats",
				emoji: "◎"
			},
			{
				value: "forest",
				label: "Forêt",
				longLabel: "Forêt",
				emoji: "🌲"
			},
			{
				value: "wetland",
				label: "Zone humide",
				longLabel: "Zone humide",
				emoji: "💧"
			},
			{
				value: "river",
				label: "Rivière",
				longLabel: "Rivière",
				emoji: "🌊"
			},
			{
				value: "meadow",
				label: "Prairie",
				longLabel: "Prairie",
				emoji: "🌾"
			},
			{
				value: "ocean",
				label: "Océan",
				longLabel: "Océan",
				emoji: "🌊"
			},
			{
				value: "mountain",
				label: "Montagne",
				longLabel: "Montagne",
				emoji: "⛰️"
			},
			{
				value: "urban_nature",
				label: "Urbain",
				longLabel: "Nature urbaine",
				emoji: "⌂"
			},
			{
				value: "desert",
				label: "Désert",
				longLabel: "Désert",
				emoji: "◌"
			}
		];
		const sortOptions = [
			{
				value: "recent",
				label: "Dernière écoute"
			},
			{
				value: "active",
				label: "Plus documentés"
			},
			{
				value: "species",
				label: "Biodiversité"
			},
			{
				value: "oldest",
				label: "Archives anciennes"
			},
			{
				value: "alpha",
				label: "A à Z"
			}
		];
		const allPoints = computed(() => props.points?.data ?? []);
		const hasFilters = computed(() => Boolean(search.value || habitat.value || sort.value !== "recent" || viewMode.value !== "map"));
		const habitatCounts = computed(() => {
			const counts = /* @__PURE__ */ new Map();
			for (const row of props.catalog?.habitats ?? []) counts.set(row.value, row);
			return counts;
		});
		const habitatOptions = computed(() => baseHabitats.map((option) => ({
			...option,
			points_count: option.value === "" ? props.catalog?.total_points ?? 0 : habitatCounts.value.get(option.value)?.points_count ?? 0,
			recordings_count: option.value === "" ? props.catalog?.total_recordings ?? 0 : habitatCounts.value.get(option.value)?.recordings_count ?? 0
		})));
		const selectedHabitat = computed(() => habitatOptions.value.find((option) => option.value === habitat.value) ?? habitatOptions.value[0]);
		const queryParams = computed(() => {
			const params = {};
			if (search.value.trim() !== "") params.q = search.value.trim();
			if (habitat.value !== "") params.habitat = habitat.value;
			if (sort.value !== "recent") params.sort = sort.value;
			if (viewMode.value !== "map") params.view = viewMode.value;
			return params;
		});
		const habitatQuery = (value) => {
			const params = { ...queryParams.value };
			if (value) params.habitat = value;
			else delete params.habitat;
			return params;
		};
		const habitatEmoji = (type) => habitatOptions.value.find((option) => option.value === type)?.emoji ?? "📍";
		const habitatLabel = (type) => habitatOptions.value.find((option) => option.value === type)?.longLabel ?? "Habitat non classé";
		const formatNumber = (value) => new Intl.NumberFormat("fr-FR").format(value ?? 0);
		const formatDate = (value) => {
			if (!value) return "date inconnue";
			return new Intl.DateTimeFormat("fr-FR", {
				day: "2-digit",
				month: "short",
				year: "numeric"
			}).format(new Date(value));
		};
		const formatYear = (value) => value ? new Date(value).getFullYear() : "nouveau";
		const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
		const submitFilters = () => {
			router.get(route("listening-points.index"), queryParams.value, {
				preserveScroll: true,
				replace: true
			});
		};
		const resetFilters = () => {
			search.value = "";
			habitat.value = "";
			sort.value = "recent";
			viewMode.value = "map";
			router.get(route("listening-points.index"), {}, {
				preserveScroll: true,
				replace: true
			});
		};
		const setViewMode = (mode) => {
			viewMode.value = mode;
			router.get(route("listening-points.index"), queryParams.value, {
				preserveScroll: true,
				replace: true
			});
		};
		const fetchTimeline = async () => {
			if (timelineData.value.length > 0) return;
			loadingTimeline.value = true;
			try {
				timelineData.value = (await (await fetch(route("listening-points.timeline"))).json()).data ?? [];
			} catch (e) {
				timelineData.value = [];
			} finally {
				loadingTimeline.value = false;
			}
		};
		const fetchHeatmap = async () => {
			try {
				return (await (await fetch(route("listening-points.heatmap"))).json()).data ?? [];
			} catch (e) {
				return [];
			}
		};
		const toggleHeatmap = async () => {
			showHeatmap.value = !showHeatmap.value;
			if (!map) return;
			if (showHeatmap.value) {
				const data = await fetchHeatmap();
				if (heatmapLayer) map.removeLayer(heatmapLayer);
				heatmapLayer = L.layerGroup();
				data.forEach((cell) => {
					const intensity = Math.min(1, Math.log10(cell.count + 1) / 2);
					const radius = 8e3 + cell.count * 2e3;
					const circle = L.circle([cell.lat, cell.lng], {
						radius,
						fillColor: `rgba(52, 211, 153, ${.15 + intensity * .5})`,
						color: `rgba(52, 211, 153, ${.3 + intensity * .4})`,
						weight: 1,
						fillOpacity: .6
					});
					circle.bindPopup(`<strong>${cell.count}</strong> enregistrements`);
					heatmapLayer.addLayer(circle);
				});
				heatmapLayer.addTo(map);
				if (markerClusterGroup) map.removeLayer(markerClusterGroup);
			} else {
				if (heatmapLayer) {
					map.removeLayer(heatmapLayer);
					heatmapLayer = null;
				}
				if (markerClusterGroup) map.addLayer(markerClusterGroup);
			}
		};
		const initMap = () => {
			if (!mapContainer.value || allPoints.value.length === 0) return;
			map = L.map(mapContainer.value, {
				zoomControl: false,
				attributionControl: false,
				scrollWheelZoom: window.innerWidth >= 768
			});
			L.control.zoom({ position: "bottomright" }).addTo(map);
			L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
				attribution: "&copy; OpenStreetMap & CARTO",
				subdomains: "abcd",
				maxZoom: 19
			}).addTo(map);
			markerClusterGroup = L.markerClusterGroup({
				showCoverageOnHover: false,
				zoomToBoundsOnClick: true,
				spiderfyOnMaxZoom: true,
				removeOutsideVisibleBounds: true,
				animate: true,
				animateAddingMarkers: true,
				disableClusteringAtZoom: 16,
				maxClusterRadius: 60,
				iconCreateFunction: (cluster) => {
					const count = cluster.getChildCount();
					const size = count < 10 ? "small" : count < 50 ? "medium" : "large";
					return L.divIcon({
						className: "lp-cluster-icon",
						html: `<div class="lp-cluster lp-cluster-${size}"><span>${count}</span></div>`,
						iconSize: [40, 40],
						iconAnchor: [20, 20]
					});
				}
			});
			allPoints.value.forEach((point) => {
				const lat = parseFloat(point.public_latitude);
				const lng = parseFloat(point.public_longitude);
				if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
				const recordings = Number(point.recordings_count ?? 0);
				const intensity = recordings >= 20 ? "high" : recordings >= 6 ? "medium" : "low";
				const icon = L.divIcon({
					className: "listening-point-marker",
					html: `<div class="lp-marker lp-marker-${intensity}"><span class="lp-marker-emoji">${habitatEmoji(point.habitat_type)}</span></div>`,
					iconSize: [38, 38],
					iconAnchor: [19, 19]
				});
				const marker = L.marker([lat, lng], { icon }).bindPopup(`
                <div class="lp-popup-card">
                    <p class="lp-popup-kicker">${escapeHtml(habitatLabel(point.habitat_type))}</p>
                    <a href="/listening-points/${escapeHtml(point.slug)}" class="lp-popup-title">${escapeHtml(point.title)}</a>
                    <p class="lp-popup-meta">${formatNumber(recordings)} enregistrement${recordings > 1 ? "s" : ""} · précision publique ${formatNumber(point.public_accuracy_meters ?? 0)} m</p>
                </div>
            `, {
					className: "lp-popup",
					closeButton: false,
					offset: [0, -10]
				});
				marker.on("click", () => {
					activeMapPoint.value = point;
					marker.openPopup();
				});
				markerClusterGroup.addLayer(marker);
			});
			map.addLayer(markerClusterGroup);
			if (markerClusterGroup.getLayers().length > 0) map.fitBounds(markerClusterGroup.getBounds().pad(.18), { animate: true });
			else map.setView([46.603354, 1.888334], 5);
		};
		const destroyMap = () => {
			if (map) {
				map.remove();
				map = null;
				markerClusterGroup = null;
				heatmapLayer = null;
			}
		};
		watch(viewMode, async (mode) => {
			if (mode === "map") {
				showHeatmap.value = false;
				await nextTick();
				initMap();
			} else {
				destroyMap();
				fetchTimeline();
			}
		});
		onMounted(() => {
			if (viewMode.value === "map") initMap();
			else fetchTimeline();
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Points d'écoute" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<main class="min-h-screen bg-arbor-night text-arbor-cream"${_scopeId}><section class="relative overflow-hidden border-b border-arbor-glass-border/60"${_scopeId}><div class="absolute inset-0 lp-hero-texture pointer-events-none"${_scopeId}></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"${_scopeId}><div class="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-8 items-end"${_scopeId}><div${_scopeId}><div class="flex flex-wrap items-center gap-3 mb-5"${_scopeId}><span class="inline-flex h-2.5 w-2.5 rounded-full bg-arbor-emerald shadow-[0_0_20px_rgba(52,211,153,0.8)]"${_scopeId}></span><span class="text-xs font-semibold text-arbor-emerald uppercase tracking-widest"${_scopeId}>Atlas acoustique public</span><span class="text-xs text-arbor-sage"${_scopeId}>coordonnées publiques approximées</span></div><h1 class="font-display text-4xl md:text-6xl font-bold leading-[0.95]"${_scopeId}> Points d&#39;écoute </h1><p class="mt-5 max-w-3xl text-base md:text-lg text-arbor-sage leading-relaxed"${_scopeId}> Une carte vivante des lieux suivis dans le temps: habitats, séries d&#39;enregistrements, signaux d&#39;espèces et archives de modification pour comprendre l&#39;évolution sonore des milieux. </p></div><div class="grid grid-cols-3 gap-3"${_scopeId}><div class="lp-stat"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatNumber(__props.catalog?.total_points))}</span><p${_scopeId}>points</p></div><div class="lp-stat"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatNumber(__props.catalog?.total_recordings))}</span><p${_scopeId}>sons</p></div><div class="lp-stat"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatNumber(__props.catalog?.total_species_signals))}</span><p${_scopeId}>signaux</p></div></div></div></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10"${_scopeId}><div class="flex flex-wrap items-center gap-3 mb-4 relative"${_scopeId}><div class="inline-flex bg-arbor-glass/30 rounded-lg p-1 border border-arbor-glass-border/40"${_scopeId}><button type="button" class="${ssrRenderClass([viewMode.value === "map" ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:text-arbor-cream", "px-3 py-1.5 rounded-md text-sm font-medium transition-colors"])}"${_scopeId}> ◎ Carte </button><button type="button" class="${ssrRenderClass([viewMode.value === "aggregator" ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:text-arbor-cream", "px-3 py-1.5 rounded-md text-sm font-medium transition-colors"])}"${_scopeId}> ▣ Agrégateur </button></div>`);
						if (viewMode.value === "map") _push(`<button type="button" class="${ssrRenderClass([showHeatmap.value ? "bg-arbor-amber/20 text-arbor-amber border-arbor-amber/40" : "border-arbor-glass-border/40 text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30", "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"])}"${_scopeId}> 🔥 Heatmap </button>`);
						else _push(`<!---->`);
						_push(`</div><form class="lp-filter-panel"${_scopeId}><div class="lg:col-span-2"${_scopeId}><label for="listening-point-search" class="sr-only"${_scopeId}>Rechercher un point d&#39;écoute</label><input id="listening-point-search"${ssrRenderAttr("value", search.value)} type="search" placeholder="Rechercher un lieu, une région, un pays, une note..." class="lp-input"${_scopeId}></div><div${_scopeId}><label for="listening-point-sort" class="sr-only"${_scopeId}>Trier</label><select id="listening-point-sort" class="lp-input"${_scopeId}><!--[-->`);
						ssrRenderList(sortOptions, (option) => {
							_push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(sort.value) ? ssrLooseContain(sort.value, option.value) : ssrLooseEqual(sort.value, option.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(option.label)}</option>`);
						});
						_push(`<!--]--></select></div><button type="submit" class="lp-filter-button"${_scopeId}> Filtrer </button>`);
						if (hasFilters.value) _push(`<button type="button" class="lp-reset-button"${_scopeId}> Réinitialiser </button>`);
						else _push(`<!---->`);
						_push(`</form><div class="mt-4 flex gap-2 overflow-x-auto pb-2"${_scopeId}><!--[-->`);
						ssrRenderList(habitatOptions.value, (option) => {
							_push(ssrRenderComponent(unref(Link), {
								key: option.value || "all",
								href: _ctx.route("listening-points.index", habitatQuery(option.value)),
								class: ["lp-habitat-chip", { "lp-habitat-chip-active": option.value === habitat.value }],
								"preserve-scroll": ""
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<span${_scopeId}>${ssrInterpolate(option.emoji)}</span><strong${_scopeId}>${ssrInterpolate(option.label)}</strong><small${_scopeId}>${ssrInterpolate(formatNumber(option.points_count))}</small>`);
									else return [
										createVNode("span", null, toDisplayString(option.emoji), 1),
										createVNode("strong", null, toDisplayString(option.label), 1),
										createVNode("small", null, toDisplayString(formatNumber(option.points_count)), 1)
									];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]--></div></section>`);
						if (viewMode.value === "map") {
							_push(`<!--[--><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"${_scopeId}><div class="lp-map-shell"${_scopeId}>`);
							if (allPoints.value.length > 0) _push(`<div class="w-full h-[460px] md:h-[560px]"${_scopeId}></div>`);
							else _push(`<div class="h-[360px] flex items-center justify-center text-center px-6"${_scopeId}><div${_scopeId}><p class="font-display text-2xl text-arbor-cream"${_scopeId}>Aucun point ne correspond à cette recherche.</p><p class="mt-2 text-sm text-arbor-sage"${_scopeId}>Essayez un habitat plus large ou retirez quelques termes.</p></div></div>`);
							_push(`<div class="lp-map-panel"${_scopeId}><p class="text-xs uppercase tracking-widest text-arbor-emerald"${_scopeId}>${ssrInterpolate(selectedHabitat.value.longLabel)}</p><p class="mt-2 font-display text-2xl text-arbor-cream"${_scopeId}>${ssrInterpolate(formatNumber(__props.points.total))} point${ssrInterpolate(__props.points.total > 1 ? "s" : "")}</p><p class="mt-2 text-sm text-arbor-sage"${_scopeId}> Les marqueurs sont regroupés automatiquement par zone. Zoomez pour explorer. </p>`);
							if (activeMapPoint.value) {
								_push(`<div class="mt-5 border-t border-arbor-glass-border pt-4"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}>Sélection carte</p>`);
								_push(ssrRenderComponent(unref(Link), {
									href: _ctx.route("listening-points.show", activeMapPoint.value.slug),
									class: "mt-1 block font-semibold text-arbor-cream hover:text-arbor-emerald"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`${ssrInterpolate(activeMapPoint.value.title)}`);
										else return [createTextVNode(toDisplayString(activeMapPoint.value.title), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<p class="mt-1 text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatNumber(activeMapPoint.value.recordings_count))} sons · précision ${ssrInterpolate(formatNumber(activeMapPoint.value.public_accuracy_meters))} m </p></div>`);
							} else _push(`<!---->`);
							_push(`</div></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"${_scopeId}><div class="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"${_scopeId}><div${_scopeId}><p class="text-xs uppercase tracking-widest text-arbor-emerald"${_scopeId}>Catalogue</p><h2 class="font-display text-3xl text-arbor-cream"${_scopeId}>Stations disponibles</h2></div><p class="text-sm text-arbor-sage"${_scopeId}> Page ${ssrInterpolate(__props.points.current_page)} / ${ssrInterpolate(__props.points.last_page)} · ${ssrInterpolate(formatNumber(__props.points.total))} résultat${ssrInterpolate(__props.points.total > 1 ? "s" : "")}</p></div>`);
							if (allPoints.value.length > 0) {
								_push(`<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"${_scopeId}><!--[-->`);
								ssrRenderList(allPoints.value, (point) => {
									_push(ssrRenderComponent(unref(Link), {
										key: point.id,
										href: _ctx.route("listening-points.show", point.slug),
										class: "lp-point-card group"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<div class="flex items-start justify-between gap-4"${_scopeId}><div class="min-w-0"${_scopeId}><div class="flex items-center gap-2 text-xs text-arbor-sage uppercase tracking-wider"${_scopeId}><span class="text-lg leading-none"${_scopeId}>${ssrInterpolate(habitatEmoji(point.habitat_type))}</span><span${_scopeId}>${ssrInterpolate(habitatLabel(point.habitat_type))}</span></div><h3 class="mt-3 font-display text-2xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(point.title)}</h3></div><span class="lp-accuracy"${_scopeId}>${ssrInterpolate(formatNumber(point.public_accuracy_meters))} m</span></div><p class="mt-3 text-sm text-arbor-sage line-clamp-3 min-h-[3.9rem]"${_scopeId}>${ssrInterpolate(point.description || "Point public documenté par les enregistrements de la communauté Arborisis.")}</p><div class="mt-5 grid grid-cols-3 gap-2"${_scopeId}><div class="lp-card-metric"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatNumber(point.recordings_count))}</span><p${_scopeId}>sons</p></div><div class="lp-card-metric"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatNumber(point.species_detected_count))}</span><p${_scopeId}>espèces</p></div><div class="lp-card-metric"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatNumber(point.versions_count))}</span><p${_scopeId}>versions</p></div></div><div class="mt-4 flex flex-wrap gap-2 min-h-[1.75rem]"${_scopeId}><!--[-->`);
												ssrRenderList(point.dominant_tags, (tag) => {
													_push(`<span class="lp-tag"${_scopeId}>${ssrInterpolate(tag)}</span>`);
												});
												_push(`<!--]--></div><div class="mt-5 flex items-center justify-between gap-3 text-xs text-arbor-sage/80"${_scopeId}><span${_scopeId}>${ssrInterpolate(point.admin_level_1 || point.country_code || "zone publique")}</span><span${_scopeId}>depuis ${ssrInterpolate(formatYear(point.first_recorded_at))} · maj ${ssrInterpolate(formatDate(point.last_recorded_at))}</span></div><div class="mt-4 flex items-center gap-2 border-t border-arbor-glass-border pt-4"${_scopeId}><div class="flex -space-x-2"${_scopeId}><!--[-->`);
												ssrRenderList(point.contributors, (contributor) => {
													_push(`<div class="lp-avatar"${_scopeId}>${ssrInterpolate(contributor.name?.charAt(0)?.toUpperCase())}</div>`);
												});
												_push(`<!--]--></div><span class="text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatNumber(point.contributors_count || point.contributors?.length || 1))} contributeur${ssrInterpolate((point.contributors_count || point.contributors?.length || 1) > 1 ? "s" : "")}</span></div>`);
											} else return [
												createVNode("div", { class: "flex items-start justify-between gap-4" }, [createVNode("div", { class: "min-w-0" }, [createVNode("div", { class: "flex items-center gap-2 text-xs text-arbor-sage uppercase tracking-wider" }, [createVNode("span", { class: "text-lg leading-none" }, toDisplayString(habitatEmoji(point.habitat_type)), 1), createVNode("span", null, toDisplayString(habitatLabel(point.habitat_type)), 1)]), createVNode("h3", { class: "mt-3 font-display text-2xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors" }, toDisplayString(point.title), 1)]), createVNode("span", { class: "lp-accuracy" }, toDisplayString(formatNumber(point.public_accuracy_meters)) + " m", 1)]),
												createVNode("p", { class: "mt-3 text-sm text-arbor-sage line-clamp-3 min-h-[3.9rem]" }, toDisplayString(point.description || "Point public documenté par les enregistrements de la communauté Arborisis."), 1),
												createVNode("div", { class: "mt-5 grid grid-cols-3 gap-2" }, [
													createVNode("div", { class: "lp-card-metric" }, [createVNode("span", null, toDisplayString(formatNumber(point.recordings_count)), 1), createVNode("p", null, "sons")]),
													createVNode("div", { class: "lp-card-metric" }, [createVNode("span", null, toDisplayString(formatNumber(point.species_detected_count)), 1), createVNode("p", null, "espèces")]),
													createVNode("div", { class: "lp-card-metric" }, [createVNode("span", null, toDisplayString(formatNumber(point.versions_count)), 1), createVNode("p", null, "versions")])
												]),
												createVNode("div", { class: "mt-4 flex flex-wrap gap-2 min-h-[1.75rem]" }, [(openBlock(true), createBlock(Fragment, null, renderList(point.dominant_tags, (tag) => {
													return openBlock(), createBlock("span", {
														key: tag,
														class: "lp-tag"
													}, toDisplayString(tag), 1);
												}), 128))]),
												createVNode("div", { class: "mt-5 flex items-center justify-between gap-3 text-xs text-arbor-sage/80" }, [createVNode("span", null, toDisplayString(point.admin_level_1 || point.country_code || "zone publique"), 1), createVNode("span", null, "depuis " + toDisplayString(formatYear(point.first_recorded_at)) + " · maj " + toDisplayString(formatDate(point.last_recorded_at)), 1)]),
												createVNode("div", { class: "mt-4 flex items-center gap-2 border-t border-arbor-glass-border pt-4" }, [createVNode("div", { class: "flex -space-x-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(point.contributors, (contributor) => {
													return openBlock(), createBlock("div", {
														key: contributor.id,
														class: "lp-avatar"
													}, toDisplayString(contributor.name?.charAt(0)?.toUpperCase()), 1);
												}), 128))]), createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(formatNumber(point.contributors_count || point.contributors?.length || 1)) + " contributeur" + toDisplayString((point.contributors_count || point.contributors?.length || 1) > 1 ? "s" : ""), 1)])
											];
										}),
										_: 2
									}, _parent, _scopeId));
								});
								_push(`<!--]--></div>`);
							} else _push(`<div class="lp-empty"${_scopeId}><p class="font-display text-3xl text-arbor-cream"${_scopeId}>Aucune station trouvée</p><p class="mt-2 text-arbor-sage"${_scopeId}>La carte publique reste volontairement filtrée aux points approuvés avec sons publiés.</p><button class="mt-5 lp-filter-button" type="button"${_scopeId}>Voir tout l&#39;atlas</button></div>`);
							if (__props.points.links.length > 3) {
								_push(`<div class="mt-10 flex justify-center"${_scopeId}><div class="flex flex-wrap justify-center gap-2"${_scopeId}><!--[-->`);
								ssrRenderList(__props.points.links.filter((item) => item.url), (link) => {
									_push(ssrRenderComponent(unref(Link), {
										key: link.label,
										href: link.url,
										class: ["px-3 py-1.5 rounded-lg text-sm transition-colors border", link.active ? "bg-arbor-emerald/20 text-arbor-emerald border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30 border-transparent"],
										"preserve-scroll": ""
									}, null, _parent, _scopeId));
								});
								_push(`<!--]--></div></div>`);
							} else _push(`<!---->`);
							_push(`</section><!--]-->`);
						} else {
							_push(`<!--[--><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"${_scopeId}><div class="mb-4"${_scopeId}><p class="text-xs uppercase tracking-widest text-arbor-emerald"${_scopeId}>Timeline globale</p><h2 class="font-display text-2xl text-arbor-cream"${_scopeId}>Évolution des enregistrements</h2></div><div class="lp-timeline-shell"${_scopeId}>`);
							if (loadingTimeline.value) _push(`<div class="h-40 flex items-center justify-center text-arbor-sage text-sm"${_scopeId}> Chargement de la timeline… </div>`);
							else if (timelineData.value.length === 0) _push(`<div class="h-40 flex items-center justify-center text-arbor-sage text-sm"${_scopeId}> Pas assez de données pour construire la timeline. </div>`);
							else {
								_push(`<div class="lp-timeline-chart"${_scopeId}><!--[-->`);
								ssrRenderList(timelineData.value, (bar) => {
									_push(`<div class="lp-timeline-bar" style="${ssrRenderStyle({ height: `${Math.min(100, bar.count / Math.max(...timelineData.value.map((d) => d.count)) * 100)}%` })}"${ssrRenderAttr("title", `${bar.month}: ${bar.count} enregistrements`)}${_scopeId}><span class="lp-timeline-label"${_scopeId}>${ssrInterpolate(bar.month.slice(5))}</span></div>`);
								});
								_push(`<!--]--></div>`);
							}
							_push(`</div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"${_scopeId}><div class="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"${_scopeId}><div${_scopeId}><p class="text-xs uppercase tracking-widest text-arbor-emerald"${_scopeId}>Atlas visuel</p><h2 class="font-display text-3xl text-arbor-cream"${_scopeId}>Stations en images</h2></div><p class="text-sm text-arbor-sage"${_scopeId}> Page ${ssrInterpolate(__props.points.current_page)} / ${ssrInterpolate(__props.points.last_page)} · ${ssrInterpolate(formatNumber(__props.points.total))} résultat${ssrInterpolate(__props.points.total > 1 ? "s" : "")}</p></div>`);
							if (allPoints.value.length > 0) {
								_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"${_scopeId}><!--[-->`);
								ssrRenderList(allPoints.value, (point) => {
									_push(ssrRenderComponent(unref(Link), {
										key: point.id,
										href: _ctx.route("listening-points.show", point.slug),
										class: "lp-photo-card group"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<div class="lp-photo-image"${_scopeId}>`);
												if (point.last_cover_url) _push(`<img${ssrRenderAttr("src", point.last_cover_url)}${ssrRenderAttr("alt", point.title)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"${_scopeId}>`);
												else _push(`<div class="w-full h-full flex items-center justify-center bg-arbor-moss/20"${_scopeId}><span class="text-5xl"${_scopeId}>${ssrInterpolate(habitatEmoji(point.habitat_type))}</span></div>`);
												_push(`<div class="lp-photo-overlay"${_scopeId}></div><div class="lp-photo-badge"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatNumber(point.recordings_count))} sons</span></div></div><div class="lp-photo-info"${_scopeId}><div class="flex items-center gap-2 text-xs text-arbor-sage uppercase tracking-wider"${_scopeId}><span${_scopeId}>${ssrInterpolate(habitatEmoji(point.habitat_type))}</span><span${_scopeId}>${ssrInterpolate(habitatLabel(point.habitat_type))}</span></div><h3 class="mt-2 font-display text-xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(point.title)}</h3><div class="mt-3 flex items-center gap-3 text-xs text-arbor-sage/80"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatNumber(point.species_detected_count))} espèces</span><span${_scopeId}>·</span><span${_scopeId}>depuis ${ssrInterpolate(formatYear(point.first_recorded_at))}</span></div></div>`);
											} else return [createVNode("div", { class: "lp-photo-image" }, [
												point.last_cover_url ? (openBlock(), createBlock("img", {
													key: 0,
													src: point.last_cover_url,
													alt: point.title,
													class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
													loading: "lazy"
												}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
													key: 1,
													class: "w-full h-full flex items-center justify-center bg-arbor-moss/20"
												}, [createVNode("span", { class: "text-5xl" }, toDisplayString(habitatEmoji(point.habitat_type)), 1)])),
												createVNode("div", { class: "lp-photo-overlay" }),
												createVNode("div", { class: "lp-photo-badge" }, [createVNode("span", null, toDisplayString(formatNumber(point.recordings_count)) + " sons", 1)])
											]), createVNode("div", { class: "lp-photo-info" }, [
												createVNode("div", { class: "flex items-center gap-2 text-xs text-arbor-sage uppercase tracking-wider" }, [createVNode("span", null, toDisplayString(habitatEmoji(point.habitat_type)), 1), createVNode("span", null, toDisplayString(habitatLabel(point.habitat_type)), 1)]),
												createVNode("h3", { class: "mt-2 font-display text-xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors line-clamp-2" }, toDisplayString(point.title), 1),
												createVNode("div", { class: "mt-3 flex items-center gap-3 text-xs text-arbor-sage/80" }, [
													createVNode("span", null, toDisplayString(formatNumber(point.species_detected_count)) + " espèces", 1),
													createVNode("span", null, "·"),
													createVNode("span", null, "depuis " + toDisplayString(formatYear(point.first_recorded_at)), 1)
												])
											])];
										}),
										_: 2
									}, _parent, _scopeId));
								});
								_push(`<!--]--></div>`);
							} else _push(`<div class="lp-empty"${_scopeId}><p class="font-display text-3xl text-arbor-cream"${_scopeId}>Aucune station trouvée</p><p class="mt-2 text-arbor-sage"${_scopeId}>La carte publique reste volontairement filtrée aux points approuvés avec sons publiés.</p><button class="mt-5 lp-filter-button" type="button"${_scopeId}>Voir tout l&#39;atlas</button></div>`);
							if (__props.points.links.length > 3) {
								_push(`<div class="mt-10 flex justify-center"${_scopeId}><div class="flex flex-wrap justify-center gap-2"${_scopeId}><!--[-->`);
								ssrRenderList(__props.points.links.filter((item) => item.url), (link) => {
									_push(ssrRenderComponent(unref(Link), {
										key: link.label,
										href: link.url,
										class: ["px-3 py-1.5 rounded-lg text-sm transition-colors border", link.active ? "bg-arbor-emerald/20 text-arbor-emerald border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30 border-transparent"],
										"preserve-scroll": ""
									}, null, _parent, _scopeId));
								});
								_push(`<!--]--></div></div>`);
							} else _push(`<!---->`);
							_push(`</section><!--]-->`);
						}
						_push(`</main>`);
					} else return [createVNode("main", { class: "min-h-screen bg-arbor-night text-arbor-cream" }, [
						createVNode("section", { class: "relative overflow-hidden border-b border-arbor-glass-border/60" }, [createVNode("div", { class: "absolute inset-0 lp-hero-texture pointer-events-none" }), createVNode("div", { class: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8" }, [createVNode("div", { class: "grid lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-8 items-end" }, [createVNode("div", null, [
							createVNode("div", { class: "flex flex-wrap items-center gap-3 mb-5" }, [
								createVNode("span", { class: "inline-flex h-2.5 w-2.5 rounded-full bg-arbor-emerald shadow-[0_0_20px_rgba(52,211,153,0.8)]" }),
								createVNode("span", { class: "text-xs font-semibold text-arbor-emerald uppercase tracking-widest" }, "Atlas acoustique public"),
								createVNode("span", { class: "text-xs text-arbor-sage" }, "coordonnées publiques approximées")
							]),
							createVNode("h1", { class: "font-display text-4xl md:text-6xl font-bold leading-[0.95]" }, " Points d'écoute "),
							createVNode("p", { class: "mt-5 max-w-3xl text-base md:text-lg text-arbor-sage leading-relaxed" }, " Une carte vivante des lieux suivis dans le temps: habitats, séries d'enregistrements, signaux d'espèces et archives de modification pour comprendre l'évolution sonore des milieux. ")
						]), createVNode("div", { class: "grid grid-cols-3 gap-3" }, [
							createVNode("div", { class: "lp-stat" }, [createVNode("span", null, toDisplayString(formatNumber(__props.catalog?.total_points)), 1), createVNode("p", null, "points")]),
							createVNode("div", { class: "lp-stat" }, [createVNode("span", null, toDisplayString(formatNumber(__props.catalog?.total_recordings)), 1), createVNode("p", null, "sons")]),
							createVNode("div", { class: "lp-stat" }, [createVNode("span", null, toDisplayString(formatNumber(__props.catalog?.total_species_signals)), 1), createVNode("p", null, "signaux")])
						])])])]),
						createVNode("section", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10" }, [
							createVNode("div", { class: "flex flex-wrap items-center gap-3 mb-4 relative" }, [createVNode("div", { class: "inline-flex bg-arbor-glass/30 rounded-lg p-1 border border-arbor-glass-border/40" }, [createVNode("button", {
								type: "button",
								onClick: ($event) => setViewMode("map"),
								class: ["px-3 py-1.5 rounded-md text-sm font-medium transition-colors", viewMode.value === "map" ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:text-arbor-cream"]
							}, " ◎ Carte ", 10, ["onClick"]), createVNode("button", {
								type: "button",
								onClick: ($event) => setViewMode("aggregator"),
								class: ["px-3 py-1.5 rounded-md text-sm font-medium transition-colors", viewMode.value === "aggregator" ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:text-arbor-cream"]
							}, " ▣ Agrégateur ", 10, ["onClick"])]), viewMode.value === "map" ? (openBlock(), createBlock("button", {
								key: 0,
								type: "button",
								onClick: toggleHeatmap,
								class: ["px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors", showHeatmap.value ? "bg-arbor-amber/20 text-arbor-amber border-arbor-amber/40" : "border-arbor-glass-border/40 text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30"]
							}, " 🔥 Heatmap ", 2)) : createCommentVNode("", true)]),
							createVNode("form", {
								class: "lp-filter-panel",
								onSubmit: withModifiers(submitFilters, ["prevent"])
							}, [
								createVNode("div", { class: "lg:col-span-2" }, [createVNode("label", {
									for: "listening-point-search",
									class: "sr-only"
								}, "Rechercher un point d'écoute"), withDirectives(createVNode("input", {
									id: "listening-point-search",
									"onUpdate:modelValue": ($event) => search.value = $event,
									type: "search",
									placeholder: "Rechercher un lieu, une région, un pays, une note...",
									class: "lp-input"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, search.value]])]),
								createVNode("div", null, [createVNode("label", {
									for: "listening-point-sort",
									class: "sr-only"
								}, "Trier"), withDirectives(createVNode("select", {
									id: "listening-point-sort",
									"onUpdate:modelValue": ($event) => sort.value = $event,
									class: "lp-input"
								}, [(openBlock(), createBlock(Fragment, null, renderList(sortOptions, (option) => {
									return createVNode("option", {
										key: option.value,
										value: option.value
									}, toDisplayString(option.label), 9, ["value"]);
								}), 64))], 8, ["onUpdate:modelValue"]), [[vModelSelect, sort.value]])]),
								createVNode("button", {
									type: "submit",
									class: "lp-filter-button"
								}, " Filtrer "),
								hasFilters.value ? (openBlock(), createBlock("button", {
									key: 0,
									type: "button",
									class: "lp-reset-button",
									onClick: resetFilters
								}, " Réinitialiser ")) : createCommentVNode("", true)
							], 32),
							createVNode("div", { class: "mt-4 flex gap-2 overflow-x-auto pb-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(habitatOptions.value, (option) => {
								return openBlock(), createBlock(unref(Link), {
									key: option.value || "all",
									href: _ctx.route("listening-points.index", habitatQuery(option.value)),
									class: ["lp-habitat-chip", { "lp-habitat-chip-active": option.value === habitat.value }],
									"preserve-scroll": ""
								}, {
									default: withCtx(() => [
										createVNode("span", null, toDisplayString(option.emoji), 1),
										createVNode("strong", null, toDisplayString(option.label), 1),
										createVNode("small", null, toDisplayString(formatNumber(option.points_count)), 1)
									]),
									_: 2
								}, 1032, ["href", "class"]);
							}), 128))])
						]),
						viewMode.value === "map" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("section", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" }, [createVNode("div", { class: "lp-map-shell" }, [allPoints.value.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							ref_key: "mapContainer",
							ref: mapContainer,
							class: "w-full h-[460px] md:h-[560px]"
						}, null, 512)) : (openBlock(), createBlock("div", {
							key: 1,
							class: "h-[360px] flex items-center justify-center text-center px-6"
						}, [createVNode("div", null, [createVNode("p", { class: "font-display text-2xl text-arbor-cream" }, "Aucun point ne correspond à cette recherche."), createVNode("p", { class: "mt-2 text-sm text-arbor-sage" }, "Essayez un habitat plus large ou retirez quelques termes.")])])), createVNode("div", { class: "lp-map-panel" }, [
							createVNode("p", { class: "text-xs uppercase tracking-widest text-arbor-emerald" }, toDisplayString(selectedHabitat.value.longLabel), 1),
							createVNode("p", { class: "mt-2 font-display text-2xl text-arbor-cream" }, toDisplayString(formatNumber(__props.points.total)) + " point" + toDisplayString(__props.points.total > 1 ? "s" : ""), 1),
							createVNode("p", { class: "mt-2 text-sm text-arbor-sage" }, " Les marqueurs sont regroupés automatiquement par zone. Zoomez pour explorer. "),
							activeMapPoint.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-5 border-t border-arbor-glass-border pt-4"
							}, [
								createVNode("p", { class: "text-xs text-arbor-sage" }, "Sélection carte"),
								createVNode(unref(Link), {
									href: _ctx.route("listening-points.show", activeMapPoint.value.slug),
									class: "mt-1 block font-semibold text-arbor-cream hover:text-arbor-emerald"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(activeMapPoint.value.title), 1)]),
									_: 1
								}, 8, ["href"]),
								createVNode("p", { class: "mt-1 text-xs text-arbor-sage" }, toDisplayString(formatNumber(activeMapPoint.value.recordings_count)) + " sons · précision " + toDisplayString(formatNumber(activeMapPoint.value.public_accuracy_meters)) + " m ", 1)
							])) : createCommentVNode("", true)
						])])]), createVNode("section", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" }, [
							createVNode("div", { class: "mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3" }, [createVNode("div", null, [createVNode("p", { class: "text-xs uppercase tracking-widest text-arbor-emerald" }, "Catalogue"), createVNode("h2", { class: "font-display text-3xl text-arbor-cream" }, "Stations disponibles")]), createVNode("p", { class: "text-sm text-arbor-sage" }, " Page " + toDisplayString(__props.points.current_page) + " / " + toDisplayString(__props.points.last_page) + " · " + toDisplayString(formatNumber(__props.points.total)) + " résultat" + toDisplayString(__props.points.total > 1 ? "s" : ""), 1)]),
							allPoints.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(allPoints.value, (point) => {
								return openBlock(), createBlock(unref(Link), {
									key: point.id,
									href: _ctx.route("listening-points.show", point.slug),
									class: "lp-point-card group"
								}, {
									default: withCtx(() => [
										createVNode("div", { class: "flex items-start justify-between gap-4" }, [createVNode("div", { class: "min-w-0" }, [createVNode("div", { class: "flex items-center gap-2 text-xs text-arbor-sage uppercase tracking-wider" }, [createVNode("span", { class: "text-lg leading-none" }, toDisplayString(habitatEmoji(point.habitat_type)), 1), createVNode("span", null, toDisplayString(habitatLabel(point.habitat_type)), 1)]), createVNode("h3", { class: "mt-3 font-display text-2xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors" }, toDisplayString(point.title), 1)]), createVNode("span", { class: "lp-accuracy" }, toDisplayString(formatNumber(point.public_accuracy_meters)) + " m", 1)]),
										createVNode("p", { class: "mt-3 text-sm text-arbor-sage line-clamp-3 min-h-[3.9rem]" }, toDisplayString(point.description || "Point public documenté par les enregistrements de la communauté Arborisis."), 1),
										createVNode("div", { class: "mt-5 grid grid-cols-3 gap-2" }, [
											createVNode("div", { class: "lp-card-metric" }, [createVNode("span", null, toDisplayString(formatNumber(point.recordings_count)), 1), createVNode("p", null, "sons")]),
											createVNode("div", { class: "lp-card-metric" }, [createVNode("span", null, toDisplayString(formatNumber(point.species_detected_count)), 1), createVNode("p", null, "espèces")]),
											createVNode("div", { class: "lp-card-metric" }, [createVNode("span", null, toDisplayString(formatNumber(point.versions_count)), 1), createVNode("p", null, "versions")])
										]),
										createVNode("div", { class: "mt-4 flex flex-wrap gap-2 min-h-[1.75rem]" }, [(openBlock(true), createBlock(Fragment, null, renderList(point.dominant_tags, (tag) => {
											return openBlock(), createBlock("span", {
												key: tag,
												class: "lp-tag"
											}, toDisplayString(tag), 1);
										}), 128))]),
										createVNode("div", { class: "mt-5 flex items-center justify-between gap-3 text-xs text-arbor-sage/80" }, [createVNode("span", null, toDisplayString(point.admin_level_1 || point.country_code || "zone publique"), 1), createVNode("span", null, "depuis " + toDisplayString(formatYear(point.first_recorded_at)) + " · maj " + toDisplayString(formatDate(point.last_recorded_at)), 1)]),
										createVNode("div", { class: "mt-4 flex items-center gap-2 border-t border-arbor-glass-border pt-4" }, [createVNode("div", { class: "flex -space-x-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(point.contributors, (contributor) => {
											return openBlock(), createBlock("div", {
												key: contributor.id,
												class: "lp-avatar"
											}, toDisplayString(contributor.name?.charAt(0)?.toUpperCase()), 1);
										}), 128))]), createVNode("span", { class: "text-xs text-arbor-sage" }, toDisplayString(formatNumber(point.contributors_count || point.contributors?.length || 1)) + " contributeur" + toDisplayString((point.contributors_count || point.contributors?.length || 1) > 1 ? "s" : ""), 1)])
									]),
									_: 2
								}, 1032, ["href"]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "lp-empty"
							}, [
								createVNode("p", { class: "font-display text-3xl text-arbor-cream" }, "Aucune station trouvée"),
								createVNode("p", { class: "mt-2 text-arbor-sage" }, "La carte publique reste volontairement filtrée aux points approuvés avec sons publiés."),
								createVNode("button", {
									class: "mt-5 lp-filter-button",
									type: "button",
									onClick: resetFilters
								}, "Voir tout l'atlas")
							])),
							__props.points.links.length > 3 ? (openBlock(), createBlock("div", {
								key: 2,
								class: "mt-10 flex justify-center"
							}, [createVNode("div", { class: "flex flex-wrap justify-center gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.points.links.filter((item) => item.url), (link) => {
								return openBlock(), createBlock(unref(Link), {
									key: link.label,
									href: link.url,
									innerHTML: link.label,
									class: ["px-3 py-1.5 rounded-lg text-sm transition-colors border", link.active ? "bg-arbor-emerald/20 text-arbor-emerald border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30 border-transparent"],
									"preserve-scroll": ""
								}, null, 8, [
									"href",
									"innerHTML",
									"class"
								]);
							}), 128))])])) : createCommentVNode("", true)
						])], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("section", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" }, [createVNode("div", { class: "mb-4" }, [createVNode("p", { class: "text-xs uppercase tracking-widest text-arbor-emerald" }, "Timeline globale"), createVNode("h2", { class: "font-display text-2xl text-arbor-cream" }, "Évolution des enregistrements")]), createVNode("div", { class: "lp-timeline-shell" }, [loadingTimeline.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "h-40 flex items-center justify-center text-arbor-sage text-sm"
						}, " Chargement de la timeline… ")) : timelineData.value.length === 0 ? (openBlock(), createBlock("div", {
							key: 1,
							class: "h-40 flex items-center justify-center text-arbor-sage text-sm"
						}, " Pas assez de données pour construire la timeline. ")) : (openBlock(), createBlock("div", {
							key: 2,
							class: "lp-timeline-chart"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(timelineData.value, (bar) => {
							return openBlock(), createBlock("div", {
								key: bar.month,
								class: "lp-timeline-bar",
								style: { height: `${Math.min(100, bar.count / Math.max(...timelineData.value.map((d) => d.count)) * 100)}%` },
								title: `${bar.month}: ${bar.count} enregistrements`
							}, [createVNode("span", { class: "lp-timeline-label" }, toDisplayString(bar.month.slice(5)), 1)], 12, ["title"]);
						}), 128))]))])]), createVNode("section", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" }, [
							createVNode("div", { class: "mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3" }, [createVNode("div", null, [createVNode("p", { class: "text-xs uppercase tracking-widest text-arbor-emerald" }, "Atlas visuel"), createVNode("h2", { class: "font-display text-3xl text-arbor-cream" }, "Stations en images")]), createVNode("p", { class: "text-sm text-arbor-sage" }, " Page " + toDisplayString(__props.points.current_page) + " / " + toDisplayString(__props.points.last_page) + " · " + toDisplayString(formatNumber(__props.points.total)) + " résultat" + toDisplayString(__props.points.total > 1 ? "s" : ""), 1)]),
							allPoints.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(allPoints.value, (point) => {
								return openBlock(), createBlock(unref(Link), {
									key: point.id,
									href: _ctx.route("listening-points.show", point.slug),
									class: "lp-photo-card group"
								}, {
									default: withCtx(() => [createVNode("div", { class: "lp-photo-image" }, [
										point.last_cover_url ? (openBlock(), createBlock("img", {
											key: 0,
											src: point.last_cover_url,
											alt: point.title,
											class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
											loading: "lazy"
										}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
											key: 1,
											class: "w-full h-full flex items-center justify-center bg-arbor-moss/20"
										}, [createVNode("span", { class: "text-5xl" }, toDisplayString(habitatEmoji(point.habitat_type)), 1)])),
										createVNode("div", { class: "lp-photo-overlay" }),
										createVNode("div", { class: "lp-photo-badge" }, [createVNode("span", null, toDisplayString(formatNumber(point.recordings_count)) + " sons", 1)])
									]), createVNode("div", { class: "lp-photo-info" }, [
										createVNode("div", { class: "flex items-center gap-2 text-xs text-arbor-sage uppercase tracking-wider" }, [createVNode("span", null, toDisplayString(habitatEmoji(point.habitat_type)), 1), createVNode("span", null, toDisplayString(habitatLabel(point.habitat_type)), 1)]),
										createVNode("h3", { class: "mt-2 font-display text-xl font-semibold text-arbor-cream group-hover:text-arbor-emerald transition-colors line-clamp-2" }, toDisplayString(point.title), 1),
										createVNode("div", { class: "mt-3 flex items-center gap-3 text-xs text-arbor-sage/80" }, [
											createVNode("span", null, toDisplayString(formatNumber(point.species_detected_count)) + " espèces", 1),
											createVNode("span", null, "·"),
											createVNode("span", null, "depuis " + toDisplayString(formatYear(point.first_recorded_at)), 1)
										])
									])]),
									_: 2
								}, 1032, ["href"]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "lp-empty"
							}, [
								createVNode("p", { class: "font-display text-3xl text-arbor-cream" }, "Aucune station trouvée"),
								createVNode("p", { class: "mt-2 text-arbor-sage" }, "La carte publique reste volontairement filtrée aux points approuvés avec sons publiés."),
								createVNode("button", {
									class: "mt-5 lp-filter-button",
									type: "button",
									onClick: resetFilters
								}, "Voir tout l'atlas")
							])),
							__props.points.links.length > 3 ? (openBlock(), createBlock("div", {
								key: 2,
								class: "mt-10 flex justify-center"
							}, [createVNode("div", { class: "flex flex-wrap justify-center gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.points.links.filter((item) => item.url), (link) => {
								return openBlock(), createBlock(unref(Link), {
									key: link.label,
									href: link.url,
									innerHTML: link.label,
									class: ["px-3 py-1.5 rounded-lg text-sm transition-colors border", link.active ? "bg-arbor-emerald/20 text-arbor-emerald border-arbor-emerald/30" : "text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass/30 border-transparent"],
									"preserve-scroll": ""
								}, null, 8, [
									"href",
									"innerHTML",
									"class"
								]);
							}), 128))])])) : createCommentVNode("", true)
						])], 64))
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ListeningPoints/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
