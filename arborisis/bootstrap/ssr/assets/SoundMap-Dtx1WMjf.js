/* empty css                 */
import { defineAsyncComponent, mergeProps, onMounted, onUnmounted, ref, unref, useSSRContext, watch } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import L from "leaflet";
import "leaflet.markercluster";
//#region resources/js/Components/Map/SoundMap.vue
var _sfc_main = {
	__name: "SoundMap",
	__ssrInlineRender: true,
	props: {
		sounds: {
			type: Array,
			default: () => []
		},
		initialCenter: {
			type: Array,
			default: () => [46.603354, 1.888334]
		},
		initialZoom: {
			type: Number,
			default: () => 5
		},
		activeSoundId: {
			type: [String, Number],
			default: null
		}
	},
	emits: ["marker-click"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const MapParticleOverlay = defineAsyncComponent(() => import("./MapParticleOverlay-DrUkBG7p.js"));
		const props = __props;
		const emit = __emit;
		const mapContainer = ref(null);
		ref(null);
		const map = ref(null);
		const markerClusterGroup = ref(null);
		const activePopupSound = ref(null);
		const markersMap = ref(/* @__PURE__ */ new Map());
		const categoryColors = {
			"Forêts": "#34D399",
			"Océans": "#60A5FA",
			"Montagnes": "#A8A29E",
			"Déserts": "#D4A574",
			"Rivières": "#22D3EE",
			"Urbain": "#F472B6",
			"Cavernes": "#A78BFA",
			"Prairies": "#A3E635",
			"Lacs": "#38BDF8",
			"Marais": "#8FA68E",
			"Jungles": "#4ADE80",
			"Glaciers": "#C7D2FE"
		};
		const getCategoryColor = (categoryName) => {
			if (!categoryName) return "#34D399";
			return categoryColors[categoryName] || "#34D399";
		};
		const getCategoryClass = (categoryName) => {
			return {
				"Forêts": "marker-forest",
				"Océans": "marker-ocean",
				"Montagnes": "marker-mountain",
				"Déserts": "marker-desert",
				"Rivières": "marker-river",
				"Urbain": "marker-urban",
				"Cavernes": "marker-cave"
			}[categoryName] || "marker-default";
		};
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
		};
		const formatDate = (dateStr) => {
			if (!dateStr) return "";
			return new Date(dateStr).toLocaleDateString("fr-FR", {
				month: "short",
				year: "numeric"
			});
		};
		const createCustomIcon = (categoryName, isHighlighted = false) => {
			const color = getCategoryColor(categoryName);
			const catClass = getCategoryClass(categoryName);
			const scale = isHighlighted ? "scale(1.4)" : "scale(1)";
			const glow = isHighlighted ? `0 0 26px ${color}aa, 0 0 9px ${color}ff` : `0 0 16px ${color}80, 0 0 4px ${color}cc`;
			return L.divIcon({
				className: `custom-marker ${catClass}`,
				html: `<div class="sound-marker" style="transform: ${scale}; transition: transform 0.25s ease;">
            <div class="sound-marker-pulse" style="background: ${color}4d;"></div>
            <div class="sound-marker-pulse-slow" style="background: ${color}26;"></div>
            <div class="sound-marker-ring" style="border-color: ${color}66;"></div>
            <div class="sound-marker-dot" style="background: ${color}; box-shadow: ${glow};"></div>
        </div>`,
				iconSize: [20, 20],
				iconAnchor: [10, 10],
				popupAnchor: [0, -12]
			});
		};
		const buildPopupContent = (sound) => {
			const p = sound.properties;
			const color = getCategoryColor(p.category);
			const coverHtml = p.cover_url ? `<div class="map-popup-cover" style="background-image: url('${p.cover_url}')"></div>` : `<div class="map-popup-cover map-popup-cover-empty">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
           </div>`;
			const categoryBadge = p.category ? `<span class="map-popup-badge" style="background: ${color}20; color: ${color}; border: 1px solid ${color}40;">${p.category}</span>` : "";
			const locationMeta = p.location_name ? `<span class="map-popup-location">${p.location_name}</span>` : "";
			const dateMeta = p.recorded_at ? `<span class="map-popup-date">${formatDate(p.recorded_at)}</span>` : "";
			const metaSep = locationMeta && dateMeta ? "<span class=\"map-popup-meta-dot\">·</span>" : "";
			return `
        <div class="map-popup">
            ${coverHtml}
            <div class="map-popup-body">
                <div class="map-popup-header">
                    ${categoryBadge}
                </div>
                <h3 class="map-popup-title">${p.title}</h3>
                <p class="map-popup-user">${p.user_name}</p>
                <div class="map-popup-meta-row">
                    ${locationMeta}${metaSep}${dateMeta}
                </div>
                <div class="map-popup-footer">
                    <span class="map-popup-duration">${formatDuration(p.duration)}</span>
                    <a href="/sounds/${p.slug}" class="map-popup-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        Écouter
                    </a>
                </div>
            </div>
        </div>
    `;
		};
		const updateMarkers = () => {
			if (!map.value || !markerClusterGroup.value) return;
			markerClusterGroup.value.clearLayers();
			markersMap.value.clear();
			if (props.sounds.length === 0) return;
			props.sounds.forEach((sound) => {
				const coords = sound.geometry.coordinates;
				const p = sound.properties;
				if (!coords || !isFinite(coords[0]) || !isFinite(coords[1])) return;
				const marker = L.marker([coords[1], coords[0]], { icon: createCustomIcon(p.category, p.id === props.activeSoundId) });
				marker.bindPopup(buildPopupContent(sound), {
					className: "sound-popup-wrapper",
					closeButton: false,
					offset: [0, -8]
				});
				marker.on("popupopen", () => {
					activePopupSound.value = p;
				});
				marker.on("popupclose", () => {
					activePopupSound.value = null;
				});
				marker.on("click", () => {
					emit("marker-click", p.id);
				});
				markerClusterGroup.value.addLayer(marker);
				markersMap.value.set(String(p.id), marker);
			});
			const layers = markerClusterGroup.value.getLayers();
			if (layers.length > 0) {
				const bounds = L.featureGroup(layers).getBounds();
				if (bounds.isValid()) map.value.fitBounds(bounds.pad(.15), {
					animate: true,
					duration: 1
				});
			}
		};
		watch(() => props.activeSoundId, (newId) => {
			markersMap.value.forEach((marker, id) => {
				const sound = props.sounds.find((s) => String(s.properties.id) === id);
				if (sound) {
					const p = sound.properties;
					marker.setIcon(createCustomIcon(p.category, id === String(newId)));
				}
			});
		});
		const flyToSound = (coords, zoom = 14) => {
			if (!map.value || !coords || !isFinite(coords[0]) || !isFinite(coords[1])) return;
			map.value.flyTo([coords[1], coords[0]], zoom, {
				animate: true,
				duration: 1.2
			});
		};
		const highlightMarker = (soundId) => {
			markersMap.value.forEach((m, id) => {
				const sound = props.sounds.find((s) => String(s.properties.id) === id);
				if (sound) m.setIcon(createCustomIcon(sound.properties.category, id === String(soundId)));
			});
		};
		const openPopup = (soundId) => {
			const marker = markersMap.value.get(String(soundId));
			if (marker) marker.openPopup();
		};
		__expose({
			flyToSound,
			highlightMarker,
			openPopup
		});
		onMounted(() => {
			if (!mapContainer.value) return;
			map.value = L.map(mapContainer.value, {
				zoomControl: false,
				attributionControl: false,
				scrollWheelZoom: window.innerWidth >= 768
			}).setView(props.initialCenter, props.initialZoom);
			L.control.zoom({ position: "bottomright" }).addTo(map.value);
			L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
				attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
				subdomains: "abcd",
				maxZoom: 19
			}).addTo(map.value);
			markerClusterGroup.value = L.markerClusterGroup({
				showCoverageOnHover: false,
				zoomToBoundsOnClick: true,
				spiderfyOnMaxZoom: true,
				maxClusterRadius: 60,
				iconCreateFunction: (cluster) => {
					const count = cluster.getChildCount();
					return L.divIcon({
						className: "marker-cluster-custom",
						html: `<div class="marker-cluster-inner">${count}</div>`,
						iconSize: [40, 40],
						iconAnchor: [20, 20]
					});
				}
			});
			map.value.addLayer(markerClusterGroup.value);
			updateMarkers();
		});
		onUnmounted(() => {
			if (map.value) {
				map.value.remove();
				map.value = null;
			}
		});
		watch(() => props.sounds, updateMarkers, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full" }, _attrs))}><div class="w-full h-full"></div>`);
			_push(ssrRenderComponent(unref(MapParticleOverlay), null, null, _parent));
			_push(`<div class="map-ripple-container"></div>`);
			if (__props.sounds.length === 0) _push(`<div class="absolute inset-0 z-map flex items-center justify-center pointer-events-none"><div class="text-center animate-scale-in"><div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-arbor-moss/10 mb-6 ring-1 ring-arbor-emerald/10"><div class="relative"><div class="absolute inset-0 rounded-full bg-arbor-emerald/20 animate-ping" style="${ssrRenderStyle({ "animation-duration": "3s" })}"></div><svg class="w-12 h-12 text-arbor-moss/50 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7"></path></svg></div></div><p class="text-arbor-sage text-base font-medium">Aucun son sur cette zone</p><p class="text-arbor-sage/70 text-sm mt-2 max-w-xs mx-auto">Explorez d&#39;autres catégories ou élargissez votre recherche pour découvrir des enregistrements.</p></div></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Map/SoundMap.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
