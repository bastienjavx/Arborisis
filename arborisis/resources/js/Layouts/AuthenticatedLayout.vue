<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import MiniPlayer from '@/Components/Audio/MiniPlayer.vue';
import { Link } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);
const showingExploreDropdown = ref(false);
</script>

<template>
    <div class="min-h-screen bg-arbor-night text-arbor-cream">
        <nav class="fixed top-0 left-0 right-0 z-50 bg-arbor-night/80 backdrop-blur-md border-b border-arbor-glass-border">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 justify-between">
                    <div class="flex items-center gap-8">
                        <!-- Logo -->
                        <Link :href="route('landing')" class="flex items-center gap-3">
                            <ApplicationLogo class="block h-8 w-8 text-arbor-emerald shrink-0" />
                            <span class="font-display text-lg font-semibold hidden sm:block">Arborisis</span>
                        </Link>

                        <!-- Desktop Navigation Links -->
                        <div class="hidden space-x-1 sm:-my-px sm:ms-6 sm:flex sm:items-center">
                            <NavLink
                                :href="route('dashboard')"
                                :active="route().current('dashboard')"
                            >
                                Dashboard
                            </NavLink>

                            <!-- Explorer Dropdown -->
                            <div class="relative ms-1">
                                <Dropdown align="left" width="48">
                                    <template #trigger>
                                        <button
                                            type="button"
                                            class="inline-flex items-center px-3 py-2 text-sm font-medium leading-5 text-arbor-sage hover:text-arbor-cream transition duration-150 ease-in-out"
                                            :class="route().current('sounds.*') || route().current('map') || route().current('creators.*') ? 'text-arbor-cream' : ''"
                                        >
                                            Explorer
                                            <svg class="-me-0.5 ms-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </template>

                                    <template #content>
                                        <DropdownLink :href="route('sounds.index')">
                                            <span class="flex items-center gap-2">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                </svg>
                                                Sons naturels
                                            </span>
                                        </DropdownLink>
                                        <DropdownLink :href="route('map')">
                                            <span class="flex items-center gap-2">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7" />
                                                </svg>
                                                Carte sonore
                                            </span>
                                        </DropdownLink>
                                        <DropdownLink :href="route('creators.index')">
                                            <span class="flex items-center gap-2">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Créateurs
                                            </span>
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                            </div>

                            <NavLink
                                :href="route('sounds.create')"
                                :active="route().current('sounds.create')"
                            >
                                <span class="flex items-center gap-1.5">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Publier
                                </span>
                            </NavLink>
                        </div>
                    </div>

                    <div class="hidden sm:ms-6 sm:flex sm:items-center">
                        <!-- Settings Dropdown -->
                        <div class="relative ms-3">
                            <Dropdown align="right" width="48">
                                <template #trigger>
                                    <span class="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            class="inline-flex items-center gap-2 rounded-xl border border-arbor-glass-border bg-arbor-glass px-3 py-2 text-sm font-medium leading-4 text-arbor-cream transition duration-150 ease-in-out hover:bg-arbor-glass/50 focus:outline-none"
                                        >
                                            <div class="w-7 h-7 rounded-full bg-arbor-moss/30 flex items-center justify-center text-xs font-medium text-arbor-emerald">
                                                {{ $page.props.auth.user.name.charAt(0).toUpperCase() }}
                                            </div>
                                            <span class="hidden md:block">{{ $page.props.auth.user.name }}</span>
                                            <svg class="-me-0.5 ms-1 h-4 w-4 text-arbor-sage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </template>

                                <template #content>
                                    <DropdownLink :href="route('profile.edit')">
                                        <span class="flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profil
                                        </span>
                                    </DropdownLink>
                                    <div class="border-t border-arbor-glass-border my-1"></div>
                                    <DropdownLink :href="route('logout')" method="post" as="button">
                                        <span class="flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Déconnexion
                                        </span>
                                    </DropdownLink>
                                </template>
                            </Dropdown>
                        </div>
                    </div>

                    <!-- Hamburger -->
                    <div class="-me-2 flex items-center sm:hidden">
                        <button
                            @click="showingNavigationDropdown = !showingNavigationDropdown"
                            class="inline-flex items-center justify-center rounded-xl p-2 text-arbor-sage transition duration-150 ease-in-out hover:bg-arbor-glass hover:text-arbor-cream focus:bg-arbor-glass focus:text-arbor-cream focus:outline-none"
                        >
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    :class="{ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    :class="{ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
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

            <!-- Responsive Navigation Menu -->
            <div
                :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                class="sm:hidden bg-arbor-deep/95 backdrop-blur-md border-b border-arbor-glass-border"
            >
                <div class="space-y-1 pb-3 pt-2 px-4">
                    <ResponsiveNavLink
                        :href="route('dashboard')"
                        :active="route().current('dashboard')"
                    >
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        :href="route('sounds.index')"
                        :active="route().current('sounds.*')"
                    >
                        Sons naturels
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        :href="route('map')"
                        :active="route().current('map')"
                    >
                        Carte sonore
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        :href="route('creators.index')"
                        :active="route().current('creators.*')"
                    >
                        Créateurs
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        :href="route('sounds.create')"
                        :active="route().current('sounds.create')"
                    >
                        <span class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Publier
                        </span>
                    </ResponsiveNavLink>
                </div>

                <div class="border-t border-arbor-glass-border pb-1 pt-4 px-4">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-full bg-arbor-moss/30 flex items-center justify-center text-sm font-medium text-arbor-emerald">
                            {{ $page.props.auth.user.name.charAt(0).toUpperCase() }}
                        </div>
                        <div>
                            <div class="text-base font-medium text-arbor-cream">
                                {{ $page.props.auth.user.name }}
                            </div>
                            <div class="text-sm font-medium text-arbor-sage">
                                {{ $page.props.auth.user.email }}
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 space-y-1">
                        <ResponsiveNavLink :href="route('profile.edit')">
                            Profil
                        </ResponsiveNavLink>
                        <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                            Déconnexion
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page Heading -->
        <header class="bg-arbor-deep/50 border-b border-arbor-glass-border mt-16" v-if="$slots.header">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <slot name="header" />
            </div>
        </header>

        <!-- Page Content -->
        <main class="pt-16">
            <slot />
        </main>

        <MiniPlayer />
    </div>
</template>
