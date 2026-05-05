<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);
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

                        <!-- Navigation Links -->
                        <div class="hidden space-x-1 sm:-my-px sm:ms-6 sm:flex">
                            <NavLink
                                :href="route('dashboard')"
                                :active="route().current('dashboard')"
                                class="text-arbor-sage hover:text-arbor-cream px-3 py-2 rounded-lg transition-colors"
                                :class="route().current('dashboard') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                            >
                                Dashboard
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
                                            class="inline-flex items-center rounded-xl border border-arbor-glass-border bg-arbor-glass px-3 py-2 text-sm font-medium leading-4 text-arbor-cream transition duration-150 ease-in-out hover:bg-arbor-glass/50 focus:outline-none"
                                        >
                                            {{ $page.props.auth.user.name }}
                                            <svg class="-me-0.5 ms-2 h-4 w-4 text-arbor-sage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </template>

                                <template #content>
                                    <DropdownLink :href="route('profile.edit')">
                                        Profil
                                    </DropdownLink>
                                    <DropdownLink :href="route('logout')" method="post" as="button">
                                        Déconnexion
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
                        class="block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass"
                        :class="route().current('dashboard') ? 'text-arbor-emerald bg-arbor-emerald/10' : ''"
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div class="border-t border-arbor-glass-border pb-1 pt-4 px-4">
                    <div class="text-base font-medium text-arbor-cream">
                        {{ $page.props.auth.user.name }}
                    </div>
                    <div class="text-sm font-medium text-arbor-sage">
                        {{ $page.props.auth.user.email }}
                    </div>

                    <div class="mt-3 space-y-1">
                        <ResponsiveNavLink :href="route('profile.edit')" class="block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass">
                            Profil
                        </ResponsiveNavLink>
                        <ResponsiveNavLink :href="route('logout')" method="post" as="button" class="block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass">
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
    </div>
</template>
