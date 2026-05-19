<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const props = defineProps({
    tickets: Array,
    stats: Object,
});

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function statusBadgeClass(status) {
    return {
        new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        resolved: 'bg-arbor-emerald/10 text-arbor-emerald border-arbor-emerald/20',
        spam: 'bg-red-500/10 text-red-400 border-red-500/20',
    }[status] || 'bg-arbor-glass/30 text-arbor-sage border-arbor-glass-border';
}

function statusLabel(status) {
    return {
        new: 'Nouveau',
        in_progress: 'En cours',
        resolved: 'Résolu',
        spam: 'Spam',
    }[status] || status;
}

function priorityClass(priority) {
    return {
        low: 'text-arbor-sage',
        medium: 'text-blue-400',
        high: 'text-amber-400',
        urgent: 'text-red-400',
    }[priority] || 'text-arbor-sage';
}

function priorityLabel(priority) {
    return {
        low: 'Basse',
        medium: 'Moyenne',
        high: 'Haute',
        urgent: 'Urgente',
    }[priority] || priority;
}
</script>

<template>
    <Head title="Helpdesk" />

    <AuthenticatedLayout>
        <div class="relative min-h-screen bg-arbor-night">
            <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-30" />
            </div>

            <div class="relative z-10 pt-24 pb-24 px-4 sm:px-6 lg:px-8">
                <div class="max-w-5xl mx-auto">
                    <!-- Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                        <div>
                            <h1 class="font-display text-3xl sm:text-4xl font-semibold text-arbor-cream">
                                Centre d'aide
                            </h1>
                            <p class="text-arbor-sage mt-2">
                                Suivez vos demandes et contactez notre équipe.
                            </p>
                        </div>
                        <Link
                            :href="route('helpdesk.create')"
                            class="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Nouveau ticket
                        </Link>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-4 mb-10">
                        <div class="glass-card-glow p-5 text-center">
                            <div class="font-display text-2xl font-semibold text-arbor-cream">{{ stats.total }}</div>
                            <div class="text-xs text-arbor-sage mt-1 uppercase tracking-wider">Total</div>
                        </div>
                        <div class="glass-card-glow p-5 text-center">
                            <div class="font-display text-2xl font-semibold text-amber-400">{{ stats.open }}</div>
                            <div class="text-xs text-arbor-sage mt-1 uppercase tracking-wider">En cours</div>
                        </div>
                        <div class="glass-card-glow p-5 text-center">
                            <div class="font-display text-2xl font-semibold text-arbor-emerald">{{ stats.resolved }}</div>
                            <div class="text-xs text-arbor-sage mt-1 uppercase tracking-wider">Résolus</div>
                        </div>
                    </div>

                    <!-- Tickets list -->
                    <div class="glass-card-glow overflow-hidden">
                        <div class="px-6 py-4 border-b border-arbor-glass-border flex items-center justify-between">
                            <h2 class="font-display text-lg font-semibold text-arbor-cream">Mes tickets</h2>
                        </div>

                        <div v-if="tickets.length > 0" class="divide-y divide-arbor-glass-border">
                            <Link
                                v-for="ticket in tickets"
                                :key="ticket.id"
                                :href="route('helpdesk.show', ticket.ticket_number)"
                                class="flex flex-col sm:flex-row sm:items-center gap-3 p-5 hover:bg-arbor-charcoal/30 transition-colors"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 flex-wrap mb-1">
                                        <span class="text-xs font-mono text-arbor-sage">{{ ticket.ticket_number }}</span>
                                        <span
                                            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
                                            :class="statusBadgeClass(ticket.status)"
                                        >
                                            {{ statusLabel(ticket.status) }}
                                        </span>
                                        <span class="text-xs" :class="priorityClass(ticket.priority)">
                                            {{ priorityLabel(ticket.priority) }}
                                        </span>
                                    </div>
                                    <h3 class="text-sm font-medium text-arbor-cream truncate">{{ ticket.subject }}</h3>
                                    <p class="text-xs text-arbor-sage mt-0.5">{{ ticket.category_label }}</p>
                                </div>
                                <div class="text-right shrink-0">
                                    <p class="text-xs text-arbor-sage">{{ formatDate(ticket.created_at) }}</p>
                                    <p v-if="ticket.assigned_to" class="text-xs text-arbor-emerald mt-0.5">
                                        Assigné à {{ ticket.assigned_to }}
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div v-else class="text-center py-16">
                            <div class="w-14 h-14 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4">
                                <svg class="w-7 h-7 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 class="font-display text-lg text-arbor-cream mb-1">Aucun ticket</h3>
                            <p class="text-arbor-sage text-sm mb-4">Vous n'avez pas encore créé de demande.</p>
                            <Link :href="route('helpdesk.create')" class="btn-primary text-sm px-4 py-2">
                                Créer un ticket
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
