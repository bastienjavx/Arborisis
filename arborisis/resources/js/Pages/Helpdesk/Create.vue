<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { computed } from 'vue';

const form = useForm({
    type: 'support',
    category: 'general',
    subject: '',
    message: '',
});

const types = [
    { value: 'contact', label: 'Contact général' },
    { value: 'support', label: 'Support technique' },
    { value: 'privacy', label: 'Données personnelles / RGPD' },
];

const categories = [
    { value: 'general', label: 'Général' },
    { value: 'bug', label: 'Bug / Problème technique' },
    { value: 'feature_request', label: 'Suggestion / Fonctionnalité' },
    { value: 'account', label: 'Compte utilisateur' },
    { value: 'billing', label: 'Paiement / ECHO' },
    { value: 'privacy', label: 'Confidentialité / RGPD' },
    { value: 'audio', label: 'Upload / Audio' },
    { value: 'map', label: 'Carte / Géolocalisation' },
];

function submit() {
    form.post(route('helpdesk.store'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
}

const selectedTypeLabel = computed(() => types.find(t => t.value === form.type)?.label ?? '');
</script>

<template>
    <Head title="Nouveau ticket" />

    <AuthenticatedLayout>
        <div class="relative min-h-screen bg-arbor-night">
            <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-30" />
            </div>

            <div class="relative z-10 pt-24 pb-24 px-4 sm:px-6 lg:px-8">
                <div class="max-w-2xl mx-auto">
                    <Link
                        :href="route('helpdesk.index')"
                        class="inline-flex items-center gap-1.5 text-sm text-arbor-sage hover:text-arbor-cream transition-colors mb-6"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux tickets
                    </Link>

                    <div class="glass-card-glow p-6 sm:p-8">
                        <h1 class="font-display text-2xl font-semibold text-arbor-cream mb-2">Nouveau ticket</h1>
                        <p class="text-arbor-sage text-sm mb-8">
                            Décrivez votre problème et notre équipe vous répondra dans les plus brefs délais.
                        </p>

                        <div v-if="$page.props.flash?.success" class="mb-6 p-4 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 text-arbor-emerald text-sm">
                            {{ $page.props.flash.success }}
                        </div>

                        <form @submit.prevent="submit" class="space-y-6">
                            <!-- Type -->
                            <div>
                                <label class="block text-sm font-medium text-arbor-cream mb-3">Type de demande</label>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <button
                                        v-for="t in types"
                                        :key="t.value"
                                        type="button"
                                        @click="form.type = t.value"
                                        :class="[
                                            'text-left p-3 rounded-xl border transition-colors duration-200 text-sm',
                                            form.type === t.value
                                                ? 'border-arbor-emerald bg-arbor-emerald/10 text-arbor-emerald'
                                                : 'border-arbor-glass-border bg-arbor-glass/30 text-arbor-sage hover:bg-white/10'
                                        ]"
                                    >
                                        {{ t.label }}
                                    </button>
                                </div>
                                <div v-if="form.errors.type" class="mt-2 text-sm text-red-400">{{ form.errors.type }}</div>
                            </div>

                            <!-- Category -->
                            <div>
                                <label for="category" class="block text-sm font-medium text-arbor-cream mb-2">Catégorie</label>
                                <select
                                    id="category"
                                    v-model="form.category"
                                    class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-sm text-arbor-cream focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors"
                                >
                                    <option v-for="c in categories" :key="c.value" :value="c.value">
                                        {{ c.label }}
                                    </option>
                                </select>
                                <div v-if="form.errors.category" class="mt-2 text-sm text-red-400">{{ form.errors.category }}</div>
                            </div>

                            <!-- Subject -->
                            <div>
                                <label for="subject" class="block text-sm font-medium text-arbor-cream mb-2">Sujet</label>
                                <input
                                    id="subject"
                                    v-model="form.subject"
                                    type="text"
                                    required
                                    class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-sm text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors"
                                    placeholder="Résumez votre demande en une phrase"
                                />
                                <div v-if="form.errors.subject" class="mt-2 text-sm text-red-400">{{ form.errors.subject }}</div>
                            </div>

                            <!-- Message -->
                            <div>
                                <label for="message" class="block text-sm font-medium text-arbor-cream mb-2">Message</label>
                                <textarea
                                    id="message"
                                    v-model="form.message"
                                    rows="6"
                                    required
                                    maxlength="5000"
                                    class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-2.5 text-sm text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors resize-none"
                                    placeholder="Décrivez votre problème en détail..."
                                ></textarea>
                                <div class="mt-1 flex justify-between">
                                    <span v-if="form.errors.message" class="text-sm text-red-400">{{ form.errors.message }}</span>
                                    <span class="text-xs text-arbor-sage ml-auto">{{ form.message.length }} / 5000</span>
                                </div>
                            </div>

                            <!-- Submit -->
                            <div class="pt-2 flex items-center gap-4">
                                <button
                                    type="submit"
                                    :disabled="form.processing"
                                    class="btn-primary px-6 py-2.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span v-if="form.processing">Envoi en cours...</span>
                                    <span v-else>Créer le ticket</span>
                                </button>
                                <Link
                                    :href="route('helpdesk.index')"
                                    class="text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
                                >
                                    Annuler
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
