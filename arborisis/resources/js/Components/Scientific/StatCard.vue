<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: '' },
    decimals: { type: Number, default: 0 },
    icon: { type: String, default: '' },
});

const displayValue = ref(0);

function animateCount(target, duration = 1200) {
    const start = performance.now();
    const from = 0;

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        displayValue.value = from + (target - from) * eased;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

onMounted(() => {
    animateCount(props.value);
});
</script>

<template>
    <div class="glass-card p-6 hover-lift transition-all duration-300">
        <div class="flex items-start justify-between">
            <div>
                <p class="text-arbor-sage text-sm font-medium tracking-wide uppercase">{{ label }}</p>
                <p class="mt-2 text-3xl font-display font-bold text-arbor-cream">
                    {{ decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString('fr-FR') }}
                    <span v-if="suffix" class="text-lg text-arbor-sage ml-1">{{ suffix }}</span>
                </p>
            </div>
            <div v-if="icon" class="text-arbor-emerald/80 text-2xl">
                {{ icon }}
            </div>
        </div>
    </div>
</template>
