<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import MiniPlayer from '@/Components/Audio/MiniPlayer.vue';

const showingMobileMenu = ref(false);
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

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center gap-6">
                        <Link href="/sounds" class="text-sm text-arbor-sage hover:text-arbor-cream transition-colors">
                            Sons
                        </Link>
                        <Link href="/map" class="text-sm text-arbor-sage hover:text-arbor-cream transition-colors">
                            Carte
                        </Link>
                        <Link href="/creators" class="text-sm text-arbor-sage hover:text-arbor-cream transition-colors">
                            Créateurs
                        </Link>
                        <div class="w-px h-5 bg-arbor-glass-border"></div>
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

                    <!-- Mobile Hamburger -->
                    <div class="flex items-center md:hidden">
                        <button
                            @click="showingMobileMenu = !showingMobileMenu"
                            class="inline-flex items-center justify-center rounded-xl p-2 text-arbor-sage transition duration-150 ease-in-out hover:bg-arbor-glass hover:text-arbor-cream focus:outline-none"
                        >
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    :class="{ hidden: showingMobileMenu, 'inline-flex': !showingMobileMenu }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    :class="{ hidden: !showingMobileMenu, 'inline-flex': showingMobileMenu }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div
                :class="{ block: showingMobileMenu, hidden: !showingMobileMenu }"
                class="md:hidden bg-arbor-deep/95 backdrop-blur-md border-b border-arbor-glass-border"
            >
                <div class="space-y-1 pb-3 pt-2 px-4">
                    <Link
                        href="/sounds"
                        class="block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('sounds.*') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Sons naturels
                    </Link>
                    <Link
                        href="/map"
                        class="block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('map') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Carte sonore
                    </Link>
                    <Link
                        href="/creators"
                        class="block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('creators.*') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Créateurs
                    </Link>
                </div>
                <div class="border-t border-arbor-glass-border pb-3 pt-2 px-4">
                    <template v-if="$page.props.auth.user">
                        <Link
                            href="/dashboard"
                            class="block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        >
                            Dashboard
                        </Link>
                    </template>
                    <template v-else>
                        <Link
                            href="/login"
                            class="block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        >
                            Connexion
                        </Link>
                        <Link
                            href="/register"
                            class="block px-3 py-2 mt-1 rounded-lg text-arbor-emerald bg-arbor-emerald/10 hover:bg-arbor-emerald/15 transition-colors font-medium"
                        >
                            Rejoindre
                        </Link>
                    </template>
                </div>
            </div>
        </nav>

        <main>
            <slot />
        </main>

        <MiniPlayer />

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
                            <li><Link href="/transparency" class="hover:text-arbor-emerald transition-colors">Crédits ECHO</Link></li>
                            <li><Link href="/mission" class="hover:text-arbor-emerald transition-colors">Notre mission</Link></li>
                            <li><Link href="/charte" class="hover:text-arbor-emerald transition-colors">Charte</Link></li>
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
