<script setup>
import { computed, ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { navigationItems } from '@/navigation/menu';
import * as Icons from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import CommandPalette from '@/Components/ui/CommandPalette.vue';

const page = usePage();
const showUserMenu = ref(false);
const showMobileNav = ref(false);
const showCommand = ref(false);

document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        showCommand.value = true;
    }
    if (event.key === 'Escape') {
        showCommand.value = false;
    }
});

const abilities = computed(() => page.props.auth?.abilities ?? []);

const filteredNavigation = computed(() =>
    navigationItems.filter((item) => {
        if (!item.permissions || !item.permissions.length) {
            return true;
        }
        return item.permissions.some((permission) => abilities.value.includes(permission));
    })
);

const isRouteActive = (routeName) => route().current(routeName);

const currentNav = computed(() =>
    filteredNavigation.value.find((item) => isRouteActive(item.route))
);

const initials = computed(() => {
    const name = page.props.auth?.user?.name ?? 'Alive Youth';
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
});

const quickLinks = [
    { label: 'New register', route: 'admin.attendance.index' },
    { label: 'Add youth', route: 'admin.youth.index' },
    { label: 'Token console', route: 'admin.tokens.index' },
];
</script>

<template>
    <div class="flex min-h-screen bg-slate-950 text-foreground">
        <aside
            class="hidden w-72 flex-shrink-0 border-r border-slate-800/70 bg-slate-900 px-5 py-8 shadow-xl shadow-black/30 lg:flex lg:flex-col"
        >
            <div class="flex items-center justify-center">
                <Link :href="route('dashboard')">
                    <img src="/build/assets/logo.png" alt="Alive Youth" class="w-auto" />
                </Link>
            </div>

            <nav class="mt-10 space-y-2">
                <p class="px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Navigate</p>
                <Link
                    v-for="nav in filteredNavigation"
                    :key="nav.route"
                    :href="route(nav.route)"
                    class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition"
                    :class="isRouteActive(nav.route)
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-600/40'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
                >
                    <component
                        :is="Icons[nav.icon] ?? Icons.Circle"
                        class="h-4 w-4"
                        :class="isRouteActive(nav.route) ? 'text-white' : 'text-slate-500'"
                    />
                    <div class="flex flex-col">
                        <span>{{ nav.label }}</span>
                        <span class="text-xs font-normal text-slate-500" v-if="nav.description && !isRouteActive(nav.route)">
                            {{ nav.description }}
                        </span>
                    </div>
                </Link>
            </nav>

            <div class="mt-auto rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 shadow-inner shadow-black/40">
                <p class="text-sm font-semibold text-white">Quick links</p>
                <div class="mt-3 space-y-2">
                    <Link
                        v-for="link in quickLinks"
                        :key="link.label"
                        :href="route(link.route)"
                        class="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:border-rose-300 hover:text-white"
                    >
                        {{ link.label }}
                        <Icons.ArrowUpRight class="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </aside>

        <div class="flex w-full flex-col lg:pl-0">
            <header class="sticky top-0 z-30 border-b border-white/15 bg-gradient-to-r from-[#eb008b] via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30">
                <div class="flex items-center justify-between px-4 py-4 sm:px-8">
                    <div class="flex items-center gap-3">
                        <button class="rounded-xl border border-white/30 p-2 lg:hidden" @click="showMobileNav = !showMobileNav">
                            <Icons.Menu class="h-5 w-5 text-white" />
                        </button>
                        <div class="hidden lg:block">
                            <p class="text-xs uppercase tracking-wide text-white/75">Currently viewing</p>
                            <h1 class="text-lg font-semibold text-white">{{ currentNav?.label ?? 'Overview' }}</h1>
                            <p class="text-xs text-white/70" v-if="currentNav?.description">{{ currentNav.description }}</p>
                        </div>
                    </div>
                    <div class="flex flex-1 items-center justify-end gap-3">
                        <div class="relative hidden max-w-sm flex-1 items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-3 py-2 text-sm text-white sm:flex" @click="showCommand = true">
                            <Icons.Search class="h-4 w-4 text-white/70" />
                            <input
                                class="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
                                placeholder="Search people, events, tokens"
                                readonly
                            />
                            <span class="rounded-lg border border-white/25 px-1.5 py-0.5 text-xs text-white/70">⌘K</span>
                        </div>
                        <Link
                            class="hidden rounded-2xl border border-white/25 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-black/30 hover:bg-white/10 sm:inline-flex"
                            :href="route('enrolment.form')"
                            target="_blank"
                        >
                            Share parent form
                        </Link>
                        <button
                            class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-sm font-semibold uppercase tracking-wide"
                            @click="showUserMenu = !showUserMenu"
                        >
                            {{ initials }}
                        </button>
                        <div v-if="showUserMenu" class="absolute right-4 top-16 w-64 rounded-2xl border border-white/20 bg-slate-900/95 p-4 text-white shadow-2xl">
                            <p class="text-sm font-semibold text-white">{{ page.props.auth.user?.name }}</p>
                            <p class="text-xs text-white/70">{{ page.props.auth.user?.email }}</p>
                            <div class="mt-4 space-y-2 text-sm">
                                <Link class="block rounded-xl px-3 py-2 text-white/90 hover:bg-white/10" :href="route('profile.edit')">
                                    Profile & security
                                </Link>
                                <Link
                                    class="block rounded-xl px-3 py-2 text-rose-400 hover:bg-rose-500/20"
                                    :href="route('logout')"
                                    method="post"
                                    as="button"
                                >
                                    Log out
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main class="flex-1 bg-slate-950/70 px-4 py-6 sm:px-8">
                <slot />
            </main>
        </div>

        <div
            v-if="showMobileNav"
            class="fixed inset-0 z-40 bg-slate-900/70 backdrop-blur"
            @click="showMobileNav = false"
        >
            <div class="absolute left-0 top-0 h-full w-72 bg-slate-900 p-6 shadow-2xl" @click.stop>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <Link :href="route('dashboard')">
                            <img src="/build/assets/logo.png" alt="Alive Youth" class="h-10 w-auto" />
                        </Link>
                    </div>
                    <button class="rounded-full border border-white/20 p-2 text-white" @click="showMobileNav = false">
                        <Icons.X class="h-4 w-4" />
                    </button>
                </div>
                <nav class="mt-6 space-y-2">
                    <Link
                        v-for="nav in filteredNavigation"
                        :key="`mobile-${nav.route}`"
                        :href="route(nav.route)"
                        class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold"
                        :class="isRouteActive(nav.route) ? 'bg-rose-500 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
                        @click="showMobileNav = false"
                    >
                        <component :is="Icons[nav.icon] ?? Icons.Circle" class="h-4 w-4" />
                        {{ nav.label }}
                    </Link>
                </nav>
            </div>
        </div>

        <CommandPalette :show="showCommand" @close="showCommand = false" />
    </div>
</template>
