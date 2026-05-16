<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import NewsletterForm from '@/Components/NewsletterForm.vue';
import NowPlayingWidget from '@/Components/Radio/NowPlayingWidget.vue';
import { useConsentStore } from '@/Stores/consent';

const showingMobileMenu = ref(false);
const showingMoreDropdown = ref(false);
const consentStore = useConsentStore();
const isScrolled = ref(false);
const moreDropdownContainer = ref(null);

function handleClickOutside(event) {
    if (moreDropdownContainer.value && !moreDropdownContainer.value.contains(event.target)) {
        showingMoreDropdown.value = false;
    }
}

function openCookieSettings() {
    consentStore.openBanner();
}

function handleScroll() {
    isScrolled.value = window.scrollY > 50;
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="min-h-screen bg-arbor-night text-arbor-cream">
        <nav
            class="fixed top-0 left-0 right-0 z-fixed-nav transition-colors duration-300"
            :class="isScrolled
                ? 'bg-arbor-night/80 backdrop-blur-xl border-b border-arbor-glass-border h-14'
                : 'bg-transparent h-16'"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div class="flex items-center justify-between h-full">
                    <Link href="/" class="flex items-center">
                        <ApplicationLogo class="h-10 w-auto shrink-0" />
                    </Link>

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center gap-1">
                        <Link href="/sounds" class="nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night">
                            Sons
                        </Link>
                        <Link href="/map" class="nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night">
                            Carte
                        </Link>
                        <Link href="/creators" class="nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night">
                            Créateurs
                        </Link>
                        <Link href="/radio" class="nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night">
                            Radio
                        </Link>

                        <!-- More Dropdown -->
                        <div ref="moreDropdownContainer" class="relative">
                            <button
                                @click="showingMoreDropdown = !showingMoreDropdown"
                                class="nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors inline-flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night"
                                aria-haspopup="true"
                                :aria-expanded="showingMoreDropdown"
                            >
                                Plus
                                <svg class="w-3 h-3 transition-transform" :class="showingMoreDropdown ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                v-if="showingMoreDropdown"
                                class="absolute right-0 mt-2 w-48 bg-arbor-deep/95 backdrop-blur-xl border border-arbor-glass-border rounded-xl shadow-xl py-1 z-dropdown"
                            >
                                <Link href="/blog" class="block px-4 py-2 text-sm text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night">
                                    Chroniques
                                </Link>
                                <Link href="/mission" class="block px-4 py-2 text-sm text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night">
                                    Mission
                                </Link>
                                <Link href="/contact" class="block px-4 py-2 text-sm text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night">
                                    Contact
                                </Link>
                            </div>
                        </div>

                        <div class="w-px h-5 bg-arbor-glass-border mx-2"></div>

                        <template v-if="$page.props.auth.user">
                            <Link
                                href="/dashboard"
                                class="nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
                            >
                                Dashboard
                            </Link>
                        </template>
                        <template v-else>
                            <Link
                                href="/login"
                                class="nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
                            >
                                Connexion
                            </Link>
                            <Link
                                href="/register"
                                class="btn-primary text-sm px-4 py-2 ml-1"
                            >
                                Rejoindre
                            </Link>
                        </template>
                    </div>

                    <!-- Mobile Hamburger -->
                    <div class="flex items-center md:hidden">
                        <button
                            @click="showingMobileMenu = !showingMobileMenu"
                            :aria-label="showingMobileMenu ? 'Fermer le menu' : 'Ouvrir le menu'"
                            :aria-expanded="showingMobileMenu"
                            class="inline-flex items-center justify-center rounded-xl p-2.5 text-arbor-sage transition duration-150 ease-in-out hover:bg-arbor-glass hover:text-arbor-cream focus:outline-none min-h-[44px] min-w-[44px]"
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
                class="md:hidden bg-arbor-deep/95 backdrop-blur-xl border-b border-arbor-glass-border"
            >
                <div class="space-y-1 pb-3 pt-2 px-4">
                    <Link
                        href="/sounds"
                        class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('sounds.*') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Sons naturels
                    </Link>
                    <Link
                        href="/map"
                        class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('map') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Carte des sons
                    </Link>
                    <Link
                        href="/creators"
                        class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('creators.*') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Créateurs
                    </Link>
                    <Link
                        href="/radio"
                        class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('radio.*') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Radio
                    </Link>
                    <div class="border-t border-arbor-glass-border my-1"></div>
                    <Link
                        href="/blog"
                        class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('blog.*') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Chroniques
                    </Link>
                    <Link
                        href="/mission"
                        class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('mission') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Mission
                    </Link>
                    <Link
                        href="/contact"
                        class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        :class="route().current('contact') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Contact
                    </Link>
                </div>
                <div class="border-t border-arbor-glass-border pb-3 pt-2 px-4">
                    <template v-if="$page.props.auth.user">
                        <Link
                            href="/dashboard"
                            class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        >
                            Dashboard
                        </Link>
                    </template>
                    <template v-else>
                        <Link
                            href="/login"
                            class="block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
                        >
                            Connexion
                        </Link>
                        <Link
                            href="/register"
                            class="block px-3 py-2.5 mt-1 rounded-lg text-arbor-emerald bg-arbor-emerald/10 hover:bg-arbor-emerald/15 transition-colors font-medium"
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

        <NowPlayingWidget />

        <footer class="border-t border-arbor-glass-border bg-arbor-deep">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div class="flex items-center mb-4">
                            <ApplicationLogo class="h-12 w-auto shrink-0" />
                        </div>
                        <p class="text-arbor-sage text-sm max-w-sm leading-relaxed mb-6">
                            Une archive sonore vivante dédiée aux créateurs de field recording et aux amoureux de la nature.
                        </p>
                        <div class="max-w-sm">
                            <h4 class="text-xs font-medium text-arbor-cream uppercase tracking-wider mb-3">Newsletter</h4>
                            <NewsletterForm />
                        </div>
                    </div>
                    <div>
                        <h3 class="font-medium text-arbor-cream mb-4 text-sm">Explorer</h3>
                        <ul class="space-y-2.5 text-sm text-arbor-sage">
                            <li><Link href="/map" class="hover:text-arbor-emerald transition-colors">Carte des sons</Link></li>
                            <li><Link href="/sounds" class="hover:text-arbor-emerald transition-colors">Tous les sons</Link></li>
                            <li><Link href="/creators" class="hover:text-arbor-emerald transition-colors">Créateurs</Link></li>
                            <li><Link href="/radio" class="hover:text-arbor-emerald transition-colors">Radio</Link></li>
                            <li><Link href="/blog" class="hover:text-arbor-emerald transition-colors">Chroniques</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-medium text-arbor-cream mb-4 text-sm">À propos</h3>
                        <ul class="space-y-2.5 text-sm text-arbor-sage">
                            <li><Link href="/transparency" class="hover:text-arbor-emerald transition-colors">Crédits ECHO</Link></li>
                            <li><Link href="/mission" class="hover:text-arbor-emerald transition-colors">Notre mission</Link></li>
                            <li><Link href="/charte" class="hover:text-arbor-emerald transition-colors">Charte</Link></li>
                            <li><Link href="/contact" class="hover:text-arbor-emerald transition-colors">Contact</Link></li>
                            <li><button @click="openCookieSettings" class="hover:text-arbor-emerald transition-colors text-left">Cookies</button></li>
                        </ul>
                    </div>
                </div>
                <div class="mt-12 pt-8 border-t border-arbor-glass-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-arbor-sage">
                    <p>&copy; {{ new Date().getFullYear() }} Arborisis. Tous droits réservés.</p>
                    <div class="flex items-center gap-4">
                        <Link href="/privacy" class="hover:text-arbor-emerald transition-colors">Confidentialité</Link>
                        <Link href="/charte" class="hover:text-arbor-emerald transition-colors">Charte</Link>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
