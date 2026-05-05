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
        default: 5,
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
        html: `<div class="w-8 h-8 rounded-full bg-arbor-emerald border-2 border-arbor-night flex items-center justify-center shadow-lg shadow-arbor-emerald/30">
            <svg class="w-4 h-4 text-arbor-night" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
};

const buildPopupContent = (sound) => {
    const coverHtml = sound.cover_image
        ? `<div class="w-full h-24 bg-cover bg-center rounded-t-lg mb-3" style="background-image: url('${sound.cover_image}')"></div>`
        : `<div class="w-full h-24 bg-arbor-deep rounded-t-lg mb-3 flex items-center justify-center">
            <svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
           </div>`;

    return `
        <div class="w-64">
            ${coverHtml}
            <div class="px-1">
                <h3 class="font-semibold text-arbor-cream text-sm mb-1 truncate">${sound.title}</h3>
                <p class="text-xs text-arbor-sage mb-2">${sound.user_name}</p>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-arbor-sage">${formatDuration(sound.duration)}</span>
                    <a href="/sounds/${sound.slug}"
                       class="text-xs font-medium text-arbor-emerald hover:text-arbor-emerald-dark transition-colors"
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

    props.sounds.forEach((sound) => {
        const coords = sound.geometry.coordinates;
        const marker = L.marker([coords[1], coords[0]], {
            icon: createCustomIcon(),
        });

        marker.bindPopup(buildPopupContent(sound.properties), {
            className: 'sound-popup',
            closeButton: true,
        });

        marker.on('popupopen', () => {
            activePopupSound.value = sound.properties;
        });

        marker.on('popupclose', () => {
            activePopupSound.value = null;
        });

        markerClusterGroup.value.addLayer(marker);
    });

    if (props.sounds.length > 0) {
        const group = L.featureGroup(markerClusterGroup.value.getLayers());
        map.value.fitBounds(group.getBounds().pad(0.1));
    }
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
                className: 'marker-cluster',
                html: `<div class="w-10 h-10 rounded-full bg-arbor-emerald/80 border-2 border-arbor-night flex items-center justify-center shadow-lg shadow-arbor-emerald/20 text-arbor-night font-bold text-sm">
                    ${count}
                </div>`,
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
    <div ref="mapContainer" class="w-full h-full" />
</template>
