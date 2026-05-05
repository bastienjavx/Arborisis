<script setup>
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
</script>

<template>
    <div class="min-h-screen bg-arbor-night text-arbor-cream">
        <nav class="fixed top-0 left-0 right-0 z-50 bg-arbor-night/80 backdrop-blur-md border-b border-arbor-glass-border">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <Link href="/" class="flex items-center gap-3">
                        <ApplicationLogo class="h-8 w-8 text-arbor-emerald shrink-0" />
                        <span class="font-display text-xl font-semibold tracking-tight">Arborisis</span>
                    </Link>
                    <div class="flex items-center gap-4">
                        <Link
                            v-if="$page.props.auth.user"
                            href="/dashboard"
                            class="text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
                        >
                            Dashboard
                        </Link>
                        <template v-else>
                            <Link
                                href="/login"
                                class="text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
                            >
                                Connexion
                            </Link>
                            <Link
                                href="/register"
                                class="btn-primary text-sm px-4 py-2"
                            >
                                Rejoindre
                            </Link>
                        </template>
                    </div>
                </div>
            </div>
        </nav>

        <main>
            <slot />
        </main>

        <footer class="border-t border-arbor-glass-border bg-arbor-deep">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div class="md:col-span-2">
                        <div class="flex items-center gap-3 mb-4">
                            <ApplicationLogo class="h-8 w-8 text-arbor-emerald shrink-0" />
                            <span class="font-display text-lg font-semibold">Arborisis</span>
                        </div>
                        <p class="text-arbor-sage text-sm max-w-sm leading-relaxed">
                            Une archive sonore vivante dédiée aux créateurs de field recording et aux amoureux de la nature.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-medium text-arbor-cream mb-4 text-sm">Explorer</h4>
                        <ul class="space-y-2 text-sm text-arbor-sage">
                            <li><Link href="/map" class="hover:text-arbor-emerald transition-colors">Carte sonore</Link></li>
                            <li><Link href="/sounds" class="hover:text-arbor-emerald transition-colors">Tous les sons</Link></li>
                            <li><Link href="/creators" class="hover:text-arbor-emerald transition-colors">Créateurs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-medium text-arbor-cream mb-4 text-sm">Communauté</h4>
                        <ul class="space-y-2 text-sm text-arbor-sage">
                            <li><Link href="/echo" class="hover:text-arbor-emerald transition-colors">Crédits ECHO</Link></li>
                            <li><Link href="/about" class="hover:text-arbor-emerald transition-colors">Notre mission</Link></li>
                            <li><Link href="/guidelines" class="hover:text-arbor-emerald transition-colors">Charte</Link></li>
                        </ul>
                    </div>
                </div>
                <div class="mt-12 pt-8 border-t border-arbor-glass-border text-center text-xs text-arbor-sage">
                    <p>&copy; {{ new Date().getFullYear() }} Arborisis. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    </div>
</template>
