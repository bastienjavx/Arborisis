<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Link } from '@inertiajs/vue3';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

const props = defineProps({
    sounds: {
        type: Array,
        default: () => [],
    },
    initialCenter: {
        type: Array,
        default: () => [46.603354, 1.888334],
    },
    initialZoom: {
        type: Number,
        default: () => 5,
    },
});

const mapContainer = ref(null);
const map = ref(null);
const markerClusterGroup = ref(null);
const activePopupSound = ref(null);

const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const createCustomIcon = () => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div class="sound-marker">
            <div class="sound-marker-pulse"></div>
            <div class="sound-marker-dot"></div>
        </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -12],
    });
};

const buildPopupContent = (sound) => {
    const p = sound.properties;
    const coverHtml = p.cover_url
        ? `<div class="map-popup-cover" style="background-image: url('${p.cover_url}')"></div>`
        : `<div class="map-popup-cover map-popup-cover-empty">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
           </div>`;

    return `
        <div class="map-popup">
            ${coverHtml}
            <div class="map-popup-body">
                <h3 class="map-popup-title">${p.title}</h3>
                <p class="map-popup-user">${p.user_name}</p>
                <div class="map-popup-meta">
                    <span class="map-popup-duration">${formatDuration(p.duration)}</span>
                    <a href="/sounds/${p.slug}"
                       class="map-popup-link"
                    >
                        Écouter →
                    </a>
                </div>
            </div>
        </div>
    `;
};

const updateMarkers = () => {
    if (!map.value || !markerClusterGroup.value) return;

    markerClusterGroup.value.clearLayers();

    if (props.sounds.length === 0) return;

    props.sounds.forEach((sound) => {
        const coords = sound.geometry.coordinates;
        const marker = L.marker([coords[1], coords[0]], {
            icon: createCustomIcon(),
        });

        marker.bindPopup(buildPopupContent(sound), {
            className: 'sound-popup-wrapper',
            closeButton: false,
            offset: [0, -8],
        });

        marker.on('popupopen', () => {
            activePopupSound.value = sound.properties;
        });

        marker.on('popupclose', () => {
            activePopupSound.value = null;
        });

        markerClusterGroup.value.addLayer(marker);
    });

    const group = L.featureGroup(markerClusterGroup.value.getLayers());
    map.value.fitBounds(group.getBounds().pad(0.15), {
        animate: true,
        duration: 1,
    });
};

onMounted(() => {
    if (!mapContainer.value) return;

    map.value = L.map(mapContainer.value, {
        zoomControl: false,
        attributionControl: false,
    }).setView(props.initialCenter, props.initialZoom);

    L.control.zoom({ position: 'bottomright' }).addTo(map.value);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
    }).addTo(map.value);

    markerClusterGroup.value = L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        maxClusterRadius: 60,
        iconCreateFunction: (cluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
                className: 'marker-cluster-custom',
                html: `<div class="marker-cluster-inner">${count}</div>`,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
            });
        },
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
</script>

<template>
    <div class="relative w-full h-full">
        <div ref="mapContainer" class="w-full h-full" />

        <!-- Empty state overlay -->
        <div
            v-if="sounds.length === 0"
            class="absolute inset-0 z-[500] flex items-center justify-center pointer-events-none"
        >
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-arbor-moss/10 mb-5 ring-1 ring-arbor-emerald/10">
                    <svg class="w-10 h-10 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7" />
                    </svg>
                </div>
                <p class="text-arbor-sage text-sm font-medium">Aucun son sur cette zone</p>
                <p class="text-arbor-sage/50 text-xs mt-1">Les enregistrements apparaîtront ici</p>
            </div>
        </div>
    </div>
</template>

<style>
/* Marker styles */
.sound-marker {
    position: relative;
    width: 20px;
    height: 20px;
}

.sound-marker-dot {
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: #34D399;
    box-shadow: 0 0 12px rgba(52, 211, 153, 0.5), 0 0 4px rgba(52, 211, 153, 0.8);
    transition: transform 0.2s ease;
}

.sound-marker:hover .sound-marker-dot {
    transform: scale(1.3);
}

.sound-marker-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(52, 211, 153, 0.3);
    animation: markerPulse 2s ease-out infinite;
}

@keyframes markerPulse {
    0% { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
}

/* Cluster styles */
.marker-cluster-custom {
    background: transparent !important;
}

.marker-cluster-inner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(52, 211, 153, 0.85);
    backdrop-filter: blur(4px);
    border: 2px solid rgba(11, 18, 32, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0B1220;
    font-weight: 700;
    font-size: 13px;
    box-shadow: 0 0 20px rgba(52, 211, 153, 0.3);
    transition: transform 0.2s ease;
}

.marker-cluster-custom:hover .marker-cluster-inner {
    transform: scale(1.1);
}

/* Popup styles */
.sound-popup-wrapper .leaflet-popup-content-wrapper {
    background: #111827 !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 14px !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
    overflow: hidden;
    padding: 0 !important;
}

.sound-popup-wrapper .leaflet-popup-content {
    margin: 0 !important;
    width: 220px !important;
}

.sound-popup-wrapper .leaflet-popup-tip {
    background: #111827 !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    width: 12px !important;
    height: 12px !important;
    margin: -7px auto 0 !important;
}

.map-popup-cover {
    width: 100%;
    height: 100px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.map-popup-cover::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to top, #111827, transparent);
}

.map-popup-cover-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1f2e, #2a3142);
    color: rgba(143, 166, 142, 0.3);
}

.map-popup-body {
    padding: 12px 14px 14px;
}

.map-popup-title {
    font-weight: 600;
    color: #F3F0E7;
    font-size: 13px;
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.map-popup-user {
    color: #8FA68E;
    font-size: 11px;
    margin-bottom: 10px;
}

.map-popup-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.map-popup-duration {
    font-size: 11px;
    color: #8FA68E;
    font-variant-numeric: tabular-nums;
}

.map-popup-link {
    font-size: 11px;
    font-weight: 600;
    color: #34D399;
    text-decoration: none;
    transition: color 0.2s;
}

.map-popup-link:hover {
    color: #10B981;
}

/* Leaflet controls override */
.leaflet-control-zoom {
    border: none !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
    border-radius: 12px !important;
    overflow: hidden;
}

.leaflet-control-zoom a {
    background: #111827 !important;
    color: #8FA68E !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    width: 36px !important;
    height: 36px !important;
    line-height: 36px !important;
    font-size: 18px !important;
    transition: all 0.2s ease;
}

.leaflet-control-zoom a:hover {
    background: #1a1f2e !important;
    color: #F3F0E7 !important;
}

.leaflet-control-zoom-in {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 12px 12px 0 0 !important;
}

.leaflet-control-zoom-out {
    border-radius: 0 0 12px 12px !important;
}
</style>
