<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { ref } from 'vue';

const props = defineProps({
    categories: Array,
    environments: Array,
});

const form = useForm({
    audio_file: null,
    title: '',
    description: '',
    recorded_at: '',
    recorded_time: '',
    latitude: '',
    longitude: '',
    location_name: '',
    is_sensitive_location: false,
    tags: '',
    category_id: '',
    environment_id: '',
    equipment: '',
    license: 'all_rights_reserved',
    visibility: 'public',
    cover_image: null,
});

const audioPreview = ref(null);
const coverPreview = ref(null);
const isDragging = ref(false);

const licenses = [
    { value: 'all_rights_reserved', label: 'Tous droits réservés' },
    { value: 'cc_by', label: 'CC BY' },
    { value: 'cc_by_sa', label: 'CC BY-SA' },
    { value: 'cc_by_nc', label: 'CC BY-NC' },
    { value: 'cc0', label: 'CC0 (Domaine public)' },
];

const visibilities = [
    { value: 'public', label: 'Public' },
    { value: 'followers', label: 'Abonnés uniquement' },
    { value: 'private', label: 'Privé' },
];

const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        form.audio_file = file;
        audioPreview.value = URL.createObjectURL(file);
    }
};

const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        form.cover_image = file;
        coverPreview.value = URL.createObjectURL(file);
    }
};

const handleDrop = (e) => {
    e.preventDefault();
    isDragging.value = false;
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
        form.audio_file = file;
        audioPreview.value = URL.createObjectURL(file);
    }
};

const getCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            form.latitude = position.coords.latitude.toFixed(6);
            form.longitude = position.coords.longitude.toFixed(6);
        },
        () => {
            alert('Impossible d\'obtenir votre position.');
        }
    );
};

const submit = () => {
    form.post(route('sounds.store'), {
        forceFormData: true,
        onSuccess: () => {
            form.reset();
            audioPreview.value = null;
            coverPreview.value = null;
        },
    });
};
</script>

<template>
    <Head title="Publier un son" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-display text-xl font-semibold text-arbor-cream">
                Publier un son
            </h2>
        </template>

        <div class="py-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <form @submit.prevent="submit" class="space-y-8">
                    <!-- Audio Upload -->
                    <div>
                        <InputLabel value="Fichier audio *" />
                        <div
                            class="mt-2 border-2 border-dashed rounded-2xl p-8 text-center transition-colors"
                            :class="isDragging ? 'border-arbor-emerald bg-arbor-emerald/5' : 'border-arbor-glass-border hover:border-arbor-sage/50'"
                            @dragover.prevent="isDragging = true"
                            @dragleave.prevent="isDragging = false"
                            @drop="handleDrop"
                        >
                            <div v-if="!audioPreview">
                                <svg class="w-12 h-12 text-arbor-moss/40 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                                <p class="text-arbor-sage text-sm mb-2">
                                    Glissez-déposez votre fichier audio ici, ou
                                    <label class="text-arbor-emerald cursor-pointer hover:underline">
                                        parcourez
                                        <input type="file" accept="audio/mpeg,audio/wav,audio/flac,audio/mp4,audio/x-m4a" class="hidden" @change="handleAudioChange" />
                                    </label>
                                </p>
                                <p class="text-xs text-arbor-sage/60">MP3, WAV, FLAC, M4A — max 500 Mo</p>
                            </div>
                            <div v-else>
                                <audio :src="audioPreview" controls class="w-full" />
                                <button
                                    type="button"
                                    @click="audioPreview = null; form.audio_file = null"
                                    class="mt-3 text-sm text-arbor-sage hover:text-red-400 transition-colors"
                                >
                                    Supprimer le fichier
                                </button>
                            </div>
                        </div>
                        <InputError :message="form.errors.audio_file" />
                    </div>

                    <!-- Title -->
                    <div>
                        <InputLabel for="title" value="Titre *" />
                        <TextInput
                            id="title"
                            v-model="form.title"
                            type="text"
                            class="mt-2 block w-full"
                            placeholder="Ex: Aube dans la forêt de Fontainebleau"
                            required
                        />
                        <InputError :message="form.errors.title" />
                    </div>

                    <!-- Description -->
                    <div>
                        <InputLabel for="description" value="Description" />
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="4"
                            class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
                            placeholder="Décrivez le contexte de l'enregistrement, ce que vous entendez, l'ambiance..."
                        />
                        <InputError :message="form.errors.description" />
                    </div>

                    <!-- Location -->
                    <div class="glass-card p-6">
                        <h3 class="font-semibold text-arbor-cream mb-4">Localisation *</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <InputLabel for="latitude" value="Latitude" />
                                <TextInput
                                    id="latitude"
                                    v-model="form.latitude"
                                    type="text"
                                    class="mt-2 block w-full"
                                    placeholder="48.8566"
                                    required
                                />
                                <InputError :message="form.errors.latitude" />
                            </div>
                            <div>
                                <InputLabel for="longitude" value="Longitude" />
                                <TextInput
                                    id="longitude"
                                    v-model="form.longitude"
                                    type="text"
                                    class="mt-2 block w-full"
                                    placeholder="2.3522"
                                    required
                                />
                                <InputError :message="form.errors.longitude" />
                            </div>
                        </div>
                        <button
                            type="button"
                            @click="getCurrentLocation"
                            class="text-sm text-arbor-emerald hover:text-arbor-emerald-dark flex items-center gap-1 mb-4"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Utiliser ma position actuelle
                        </button>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel for="location_name" value="Nom du lieu" />
                                <TextInput
                                    id="location_name"
                                    v-model="form.location_name"
                                    type="text"
                                    class="mt-2 block w-full"
                                    placeholder="Ex: Forêt de Fontainebleau"
                                />
                            </div>
                        </div>
                        <div class="mt-4 flex items-center gap-2">
                            <input
                                id="is_sensitive_location"
                                v-model="form.is_sensitive_location"
                                type="checkbox"
                                class="rounded border-arbor-glass-border bg-arbor-deep text-arbor-emerald focus:ring-arbor-emerald"
                            />
                            <label for="is_sensitive_location" class="text-sm text-arbor-sage">
                                Ce lieu est sensible — afficher une localisation approximative uniquement
                            </label>
                        </div>
                    </div>

                    <!-- Recording Details -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <InputLabel for="recorded_at" value="Date d'enregistrement" />
                            <TextInput
                                id="recorded_at"
                                v-model="form.recorded_at"
                                type="date"
                                class="mt-2 block w-full"
                            />
                        </div>
                        <div>
                            <InputLabel for="recorded_time" value="Heure d'enregistrement" />
                            <TextInput
                                id="recorded_time"
                                v-model="form.recorded_time"
                                type="time"
                                class="mt-2 block w-full"
                            />
                        </div>
                    </div>

                    <!-- Category & Environment -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <InputLabel for="category_id" value="Catégorie" />
                            <select
                                id="category_id"
                                v-model="form.category_id"
                                class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
                            >
                                <option value="">Choisir une catégorie</option>
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                    {{ cat.name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <InputLabel for="environment_id" value="Environnement" />
                            <select
                                id="environment_id"
                                v-model="form.environment_id"
                                class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
                            >
                                <option value="">Choisir un environnement</option>
                                <option v-for="env in environments" :key="env.id" :value="env.id">
                                    {{ env.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Equipment & Tags -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <InputLabel for="equipment" value="Matériel utilisé" />
                            <TextInput
                                id="equipment"
                                v-model="form.equipment"
                                type="text"
                                class="mt-2 block w-full"
                                placeholder="Ex: Zoom H6 + Sennheiser MKH 416"
                            />
                        </div>
                        <div>
                            <InputLabel for="tags" value="Tags (séparés par des virgules)" />
                            <TextInput
                                id="tags"
                                v-model="form.tags"
                                type="text"
                                class="mt-2 block w-full"
                                placeholder="Ex: oiseaux, matin, printemps"
                            />
                        </div>
                    </div>

                    <!-- License & Visibility -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <InputLabel for="license" value="Licence *" />
                            <select
                                id="license"
                                v-model="form.license"
                                class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
                                required
                            >
                                <option v-for="lic in licenses" :key="lic.value" :value="lic.value">
                                    {{ lic.label }}
                                </option>
                            </select>
                            <InputError :message="form.errors.license" />
                        </div>
                        <div>
                            <InputLabel for="visibility" value="Visibilité *" />
                            <select
                                id="visibility"
                                v-model="form.visibility"
                                class="mt-2 block w-full rounded-xl border-arbor-glass-border bg-arbor-deep text-arbor-cream shadow-sm focus:border-arbor-emerald focus:ring-arbor-emerald"
                                required
                            >
                                <option v-for="vis in visibilities" :key="vis.value" :value="vis.value">
                                    {{ vis.label }}
                                </option>
                            </select>
                            <InputError :message="form.errors.visibility" />
                        </div>
                    </div>

                    <!-- Cover Image -->
                    <div>
                        <InputLabel value="Image de couverture" />
                        <div class="mt-2">
                            <div
                                v-if="coverPreview"
                                class="relative w-48 aspect-square rounded-xl overflow-hidden mb-3"
                            >
                                <img :src="coverPreview" class="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    @click="coverPreview = null; form.cover_image = null"
                                    class="absolute top-2 right-2 w-8 h-8 rounded-full bg-arbor-night/80 flex items-center justify-center text-arbor-cream hover:bg-red-500/80 transition-colors"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <label class="inline-flex items-center px-4 py-2 rounded-xl border border-arbor-glass-border bg-arbor-glass text-sm text-arbor-cream cursor-pointer hover:bg-arbor-glass/50 transition-colors">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Choisir une image
                                <input type="file" accept="image/*" class="hidden" @change="handleCoverChange" />
                            </label>
                            <p class="text-xs text-arbor-sage mt-2">JPG, PNG, WebP — max 10 Mo</p>
                        </div>
                        <InputError :message="form.errors.cover_image" />
                    </div>

                    <!-- Submit -->
                    <div class="flex items-center justify-end gap-4 pt-4 border-t border-arbor-glass-border">
                        <Link
                            href="/sounds"
                            class="text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
                        >
                            Annuler
                        </Link>
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="form.processing">Publication en cours...</span>
                            <span v-else>Publier le son</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
