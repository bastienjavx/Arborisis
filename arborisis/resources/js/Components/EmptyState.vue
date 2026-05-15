<script setup>
const props = defineProps({
    icon: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    cta: {
        type: Object,
        default: null,
    },
});
</script>

<template>
    <div class="text-center py-16">
        <div v-if="icon" class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" :d="icon" />
            </svg>
        </div>
        <h3 class="font-display text-xl text-arbor-cream mb-2">{{ title }}</h3>
        <p v-if="description" class="text-arbor-sage text-sm mb-6 max-w-sm mx-auto">{{ description }}</p>
        <slot />
    </div>
</template>
