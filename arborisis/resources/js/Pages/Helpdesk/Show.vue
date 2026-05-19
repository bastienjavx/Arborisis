<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { computed } from 'vue';

const props = defineProps({
    ticket: Object,
    flash: Object,
});

const replyForm = useForm({
    message: '',
});

function submitReply() {
    replyForm.post(route('helpdesk.reply', props.ticket.ticket_number), {
        preserveScroll: true,
        onSuccess: () => replyForm.reset('message'),
    });
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

const statusBadgeClass = computed(() => {
    return {
        new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        resolved: 'bg-arbor-emerald/10 text-arbor-emerald border-arbor-emerald/20',
        spam: 'bg-red-500/10 text-red-400 border-red-500/20',
    }[props.ticket.status] || 'bg-arbor-glass/30 text-arbor-sage border-arbor-glass-border';
});

const isOpen = computed(() => ['new', 'in_progress'].includes(props.ticket.status));
</script>

<template>
    <Head :title="`Ticket ${ticket.ticket_number}`" />

    <AuthenticatedLayout>
        <div class="relative min-h-screen bg-arbor-night">
            <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-30" />
            </div>

            <div class="relative z-10 pt-24 pb-24 px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl mx-auto">
                    <!-- Back link -->
                    <Link
                        :href="route('helpdesk.index')"
                        class="inline-flex items-center gap-1.5 text-sm text-arbor-sage hover:text-arbor-cream transition-colors mb-6"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux tickets
                    </Link>

                    <!-- Ticket header -->
                    <div class="glass-card-glow p-6 mb-6">
                        <div class="flex flex-wrap items-center gap-3 mb-3">
                            <span class="text-sm font-mono text-arbor-sage">{{ ticket.ticket_number }}</span>
                            <span
                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                                :class="statusBadgeClass"
                            >
                                {{ ticket.status_label }}
                            </span>
                            <span class="text-xs text-arbor-sage">{{ ticket.category_label }}</span>
                            <span class="text-xs" :class="{
                                'text-arbor-sage': ticket.priority === 'low',
                                'text-blue-400': ticket.priority === 'medium',
                                'text-amber-400': ticket.priority === 'high',
                                'text-red-400': ticket.priority === 'urgent',
                            }">{{ ticket.priority_label }}</span>
                        </div>
                        <h1 class="font-display text-xl font-semibold text-arbor-cream mb-2">{{ ticket.subject }}</h1>
                        <p class="text-sm text-arbor-sage whitespace-pre-wrap">{{ ticket.message }}</p>
                        <div class="mt-4 pt-4 border-t border-arbor-glass-border flex flex-wrap items-center gap-4 text-xs text-arbor-sage">
                            <span>Ouvert le {{ formatDate(ticket.created_at) }}</span>
                            <span v-if="ticket.resolved_at">Résolu le {{ formatDate(ticket.resolved_at) }}</span>
                            <span v-if="ticket.assigned_to">Assigné à {{ ticket.assigned_to }}</span>
                        </div>
                    </div>

                    <!-- Replies -->
                    <div v-if="ticket.replies.length > 0" class="space-y-4 mb-8">
                        <h2 class="text-sm font-medium text-arbor-cream uppercase tracking-wider">Conversation</h2>
                        <div
                            v-for="reply in ticket.replies"
                            :key="reply.id"
                            class="flex gap-4"
                            :class="reply.source === 'customer' ? 'flex-row' : 'flex-row-reverse'"
                        >
                            <div
                                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                                :class="reply.source === 'customer'
                                    ? 'bg-arbor-moss/30 text-arbor-emerald'
                                    : 'bg-arbor-emerald/20 text-arbor-emerald'"
                            >
                                {{ reply.author.charAt(0).toUpperCase() }}
                            </div>
                            <div
                                class="flex-1 max-w-[85%] sm:max-w-[75%]"
                                :class="reply.source === 'customer' ? '' : 'text-right'"
                            >
                                <div
                                    class="inline-block p-4 rounded-2xl text-sm whitespace-pre-wrap"
                                    :class="reply.source === 'customer'
                                        ? 'bg-arbor-glass/30 border border-arbor-glass-border text-arbor-cream rounded-tl-none'
                                        : 'bg-arbor-emerald/10 border border-arbor-emerald/20 text-arbor-cream rounded-tr-none'"
                                >
                                    {{ reply.reply }}
                                </div>
                                <div class="mt-1.5 text-xs text-arbor-sage">
                                    <span class="font-medium">{{ reply.author }}</span> — {{ formatDate(reply.created_at) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Reply form -->
                    <div v-if="isOpen" class="glass-card-glow p-6">
                        <h2 class="text-sm font-medium text-arbor-cream uppercase tracking-wider mb-4">Répondre</h2>

                        <div v-if="$page.props.flash?.success" class="mb-4 p-3 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 text-arbor-emerald text-sm">
                            {{ $page.props.flash.success }}
                        </div>

                        <form @submit.prevent="submitReply" class="space-y-4">
                            <div>
                                <textarea
                                    v-model="replyForm.message"
                                    rows="4"
                                    required
                                    maxlength="5000"
                                    class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-3 text-sm text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors resize-none"
                                    placeholder="Écrivez votre message..."
                                ></textarea>
                                <div class="mt-1 flex justify-between">
                                    <span v-if="replyForm.errors.message" class="text-sm text-red-400">{{ replyForm.errors.message }}</span>
                                    <span class="text-xs text-arbor-sage ml-auto">{{ replyForm.message.length }} / 5000</span>
                                </div>
                            </div>
                            <div class="flex justify-end">
                                <button
                                    type="submit"
                                    :disabled="replyForm.processing"
                                    class="btn-primary px-5 py-2.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span v-if="replyForm.processing">Envoi...</span>
                                    <span v-else>Envoyer</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div v-else class="glass-card-glow p-6 text-center">
                        <p class="text-arbor-sage text-sm">
                            Ce ticket est <span class="text-arbor-emerald font-medium">résolu</span>.
                            Si vous avez besoin d'aide supplémentaire, veuillez créer un nouveau ticket.
                        </p>
                        <Link :href="route('helpdesk.create')" class="btn-primary text-sm px-4 py-2 mt-4 inline-block">
                            Nouveau ticket
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
