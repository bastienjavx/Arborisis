<script setup>
import { ref, onMounted, watch, computed, nextTick, onUnmounted } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import PointDetailDrawer from '@/Components/Gamification/PointDetailDrawer.vue';
import CreateArborisisPointForm from '@/Components/Gamification/CreateArborisisPointForm.vue';
import VisitButton from '@/Components/Gamification/VisitButton.vue';
import VisitSuccessModal from '@/Components/Gamification/VisitSuccessModal.vue';
import PresenceToggle from '@/Components/Gamification/PresenceToggle.vue';
import PrivacyModeSelector from '@/Components/Gamification/PrivacyModeSelector.vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({
    auth: Object,
});

const points = ref([]);
const loading = ref(false);
const selectedPoint = ref(null);
const drawerOpen = ref(false);
const createMode = ref(false);
const mapContainer = ref(null);
const map = ref(null);
const markersLayer = ref(null);
const visitSuccessOpen = ref(false);
const visitSuccessTitle = ref('');
const createLat = ref(null);
const createLng = ref(null);
const tempMarker = ref(null);

const presenceActive = ref(false);
const presenceMode = ref('invisible');

/* ── Real-time location ─────────────────────────────── */
const userLocationMarker = ref(null);
const userLocationWatchId = ref(null);
const userLocationAccuracyCircle = ref(null);
const presenceUpdateInterval = ref(null);
const lastSentPosition = ref(null);

/* ── Category colors ─────────────────────────────────── */
const categoryColors = {
    birds: '#FBBF24',
    forest: '#34D399',
    water: '#60A5FA',
    insects: '#A3E635',
    wind: '#C7D2FE',
    night_ambience: '#A78BFA',
    meeting_point: '#F472B6',
    quiet_spot: '#8FA68E',
    educational_zone: '#38BDF8',
    other: '#9CA3AF',
};

const getCategoryColor = (cat) => categoryColors[cat] || '#9CA3AF';

/* ── Data fetching ──────────────────────────────────── */
const fetchPoints = async () => {
    loading.value = true;
    try {
        const response = await fetch('/api/<redacted>-points');
        const data = await response.json();
        points.value = data.features ?? [];
    } catch (e) {
        console.error('Failed to load points:', e);
        points.value = [];
    } finally {
        loading.value = false;
    }
};

/* ── Map ────────────────────────────────────────────── */
const initMap = () => {
    if (!mapContainer.value) return;

    map.value = L.map(mapContainer.value, {
        zoomControl: false,
        attributionControl: false,
    }).setView([46.603354, 1.888334], 5);

    L.control.zoom({ position: 'bottomright' }).addTo(map.value);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
    }).addTo(map.value);

    markersLayer.value = L.layerGroup().addTo(map.value);
    updateMarkers();

    map.value.on('click', handleMapClick);
};

const clearTempMarker = () => {
    if (tempMarker.value) {
        map.value?.removeLayer(tempMarker.value);
        tempMarker.value = null;
    }
    createLat.value = null;
    createLng.value = null;
};

const handleMapClick = (e) => {
    if (!map.value) return;

    createMode.value = true;
    drawerOpen.value = true;
    selectedPoint.value = null;

    createLat.value = e.latlng.lat;
    createLng.value = e.latlng.lng;

    if (!tempMarker.value) {
        const tempIcon = L.divIcon({
            className: 'temp-create-marker',
            html: `<div class="w-5 h-5 rounded-full bg-arbor-emerald border-2 border-white shadow-lg relative">
                <div class="absolute inset-0 rounded-full bg-arbor-emerald animate-ping opacity-50"></div>
            </div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
        });
        tempMarker.value = L.marker([e.latlng.lat, e.latlng.lng], {
            icon: tempIcon,
            draggable: true,
            zIndexOffset: 2000,
        }).addTo(map.value);

        tempMarker.value.on('dragend', (event) => {
            const latLng = event.target.getLatLng();
            createLat.value = latLng.lat;
            createLng.value = latLng.lng;
        });
    } else {
        tempMarker.value.setLatLng([e.latlng.lat, e.latlng.lng]);
    }
};

const updateMarkers = () => {
    if (!markersLayer.value || !map.value) return;
    markersLayer.value.clearLayers();

    points.value.forEach((point) => {
        const coords = point.geometry.coordinates;
        const p = point.properties;
        const color = getCategoryColor(p.category_value);

        const marker = L.circleMarker([coords[1], coords[0]], {
            radius: 8,
            fillColor: color,
            color: color,
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.4,
        });

        marker.on('click', (e) => {
            e.originalEvent.stopPropagation();
            clearTempMarker();
            selectedPoint.value = {
                ...p,
                latitude: coords[1],
                longitude: coords[0],
            };
            drawerOpen.value = true;
            createMode.value = false;
        });

        markersLayer.value.addLayer(marker);
    });
};

watch(points, updateMarkers, { deep: true });

watch(drawerOpen, (open) => {
    if (!open) {
        createMode.value = false;
        clearTempMarker();
    }
});

/* ── User location marker ───────────────────────────── */
const updateUserLocationMarker = (lat, lng, accuracy = 0) => {
    if (!map.value) return;

    if (!userLocationMarker.value) {
        const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: `<div class="w-4 h-4 rounded-full bg-arbor-emerald border-2 border-white shadow-lg shadow-arbor-emerald/50 relative">
                <div class="absolute inset-0 rounded-full bg-arbor-emerald animate-ping opacity-40"></div>
            </div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
        });
        userLocationMarker.value = L.marker([lat, lng], { icon: userIcon, zIndexOffset: 1000 }).addTo(map.value);
    } else {
        userLocationMarker.value.setLatLng([lat, lng]);
    }

    if (accuracy > 0) {
        if (!userLocationAccuracyCircle.value) {
            userLocationAccuracyCircle.value = L.circle([lat, lng], {
                radius: accuracy,
                fillColor: '#10B981',
                color: '#10B981',
                weight: 1,
                opacity: 0.3,
                fillOpacity: 0.1,
            }).addTo(map.value);
        } else {
            userLocationAccuracyCircle.value.setLatLng([lat, lng]);
            userLocationAccuracyCircle.value.setRadius(accuracy);
        }
    }
};

const clearUserLocationMarker = () => {
    if (userLocationMarker.value) {
        map.value?.removeLayer(userLocationMarker.value);
        userLocationMarker.value = null;
    }
    if (userLocationAccuracyCircle.value) {
        map.value?.removeLayer(userLocationAccuracyCircle.value);
        userLocationAccuracyCircle.value = null;
    }
};

const sendPresenceUpdate = async (lat, lng) => {
    try {
        await fetch('/api/presence/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
            },
            body: JSON.stringify({
                latitude: lat,
                longitude: lng,
                visibility_mode: presenceMode.value,
            }),
        });
    } catch (e) {
        console.error('Presence update failed:', e);
    }
};

/* ── Actions ────────────────────────────────────────── */
const handleVisit = async () => {
    if (!selectedPoint.value) return;

    try {
        const response = await fetch(`/api/<redacted>-points/${selectedPoint.value.slug}/visit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                latitude: selectedPoint.value.latitude,
                longitude: selectedPoint.value.longitude,
                accuracy: 10,
                consent_given: true,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            visitSuccessTitle.value = selectedPoint.value.title;
            visitSuccessOpen.value = true;
            drawerOpen.value = false;
        } else {
            alert(data.message || 'Visite impossible');
        }
    } catch (e) {
        console.error(e);
        alert('Erreur lors de la visite');
    }
};

const handleCreatePoint = async (formData) => {
    try {
        const response = await fetch('/api/<redacted>-points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            createMode.value = false;
            drawerOpen.value = false;
            clearTempMarker();
            fetchPoints();
            alert(data.message);
        } else {
            alert(Object.values(data.errors || {}).flat().join('\n'));
        }
    } catch (e) {
        console.error(e);
        alert('Erreur lors de la création');
    }
};

const startCreateMode = () => {
    createMode.value = true;
    drawerOpen.value = true;
    selectedPoint.value = null;
};

const togglePresence = async () => {
    if (presenceActive.value) {
        // Turn off
        if (userLocationWatchId.value !== null) {
            navigator.geolocation.clearWatch(userLocationWatchId.value);
            userLocationWatchId.value = null;
        }
        if (presenceUpdateInterval.value) {
            clearInterval(presenceUpdateInterval.value);
            presenceUpdateInterval.value = null;
        }
        await fetch('/api/presence', { method: 'DELETE' });
        presenceActive.value = false;
        clearUserLocationMarker();
        lastSentPosition.value = null;
    } else {
        // Turn on - real-time tracking
        if (!navigator.geolocation) {
            console.warn('Géolocalisation non supportée par ce navigateur');
            return;
        }

        userLocationWatchId.value = navigator.geolocation.watchPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const accuracy = pos.coords.accuracy;

                updateUserLocationMarker(lat, lng, accuracy);

                // Send first update immediately
                if (!lastSentPosition.value) {
                    sendPresenceUpdate(lat, lng);
                    lastSentPosition.value = { lat, lng };
                }

                presenceActive.value = true;
            },
            (err) => {
                console.error('Geolocation error:', err);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );

        // Periodic server updates every 30s
        presenceUpdateInterval.value = setInterval(() => {
            if (userLocationMarker.value) {
                const latLng = userLocationMarker.value.getLatLng();
                sendPresenceUpdate(latLng.lat, latLng.lng);
                lastSentPosition.value = { lat: latLng.lat, lng: latLng.lng };
            }
        }, 30000);
    }
};

onMounted(() => {
    fetchPoints();
    nextTick(() => initMap());
});

onUnmounted(() => {
    if (userLocationWatchId.value !== null) {
        navigator.geolocation.clearWatch(userLocationWatchId.value);
    }
    if (presenceUpdateInterval.value) {
        clearInterval(presenceUpdateInterval.value);
    }
});
</script>

<template>
    <Head title="Carte Arborisis" />
    <AuthenticatedLayout>
        <div class="relative isolate h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden">
            <!-- Map -->
            <div ref="mapContainer" class="w-full h-full" />

            <!-- Floating header -->
            <div class="absolute top-6 left-1/2 -translate-x-1/2 z-[800] text-center pointer-events-none">
                <h1 class="font-display text-3xl font-semibold text-arbor-cream tracking-tight drop-shadow-lg">
                    Carte Arborisis
                </h1>
                <p class="text-arbor-sage/80 text-sm mt-1 font-light drop-shadow">
                    Découvre les échos naturels autour de toi
                </p>
            </div>

            <!-- Controls sidebar -->
            <div class="absolute top-4 left-4 z-[800] w-80 max-w-[calc(100vw-2rem)]">
                <div class="glass-card shadow-2xl shadow-black/25 p-4 space-y-4">
                    <!-- Create button -->
                    <button
                        @click="createMode = true; drawerOpen = true; selectedPoint = null;"
                        class="w-full py-2.5 rounded-xl bg-arbor-emerald text-arbor-night font-semibold text-sm hover:bg-arbor-emerald/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Proposer un lieu
                    </button>

                    <!-- Presence -->
                    <div class="pt-3 border-t border-white/10">
                        <PresenceToggle
                            :is-active="presenceActive"
                            :mode="presenceMode"
                            @toggle="togglePresence"
                        />
                        <div v-if="presenceActive" class="mt-3">
                            <PrivacyModeSelector v-model="presenceMode" />
                        </div>
                    </div>

                    <!-- Stats -->
                    <div class="pt-3 border-t border-white/10 text-xs text-arbor-sage/60">
                        <p>{{ points.length }} point{{ points.length > 1 ? 's' : '' }} sur la carte</p>
                    </div>
                </div>
            </div>

            <!-- Point Detail Drawer -->
            <PointDetailDrawer
                :point="selectedPoint"
                :is-open="drawerOpen && !createMode"
                @close="drawerOpen = false"
                @visit="handleVisit"
            />

            <!-- Create Point Drawer -->
            <Transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="translate-x-full opacity-0"
                enter-to-class="translate-x-0 opacity-100"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="translate-x-0 opacity-100"
                leave-to-class="translate-x-full opacity-0"
            >
                <div
                    v-if="drawerOpen && createMode"
                    class="absolute top-4 right-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] z-[800] bg-arbor-night/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-5"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-arbor-cream">Proposer un lieu</h2>
                        <button @click="drawerOpen = false" class="text-arbor-sage/50 hover:text-arbor-cream">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto">
                        <div
                            v-if="createLat == null || createLng == null"
                            class="mb-4 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 px-3 py-2.5 text-center"
                        >
                            <p class="text-xs text-arbor-emerald font-medium">
                                👆 Cliquez sur la carte pour positionner votre point
                            </p>
                        </div>
                        <CreateArborisisPointForm
                            :initial-lat="createLat"
                            :initial-lng="createLng"
                            @submit="handleCreatePoint"
                            @cancel="drawerOpen = false"
                        />
                    </div>
                </div>
            </Transition>

            <!-- Visit Success Modal -->
            <VisitSuccessModal
                :is-open="visitSuccessOpen"
                :point-title="visitSuccessTitle"
                :xp-gained="10"
                @close="visitSuccessOpen = false"
            />
        </div>
    </AuthenticatedLayout>
</template>
