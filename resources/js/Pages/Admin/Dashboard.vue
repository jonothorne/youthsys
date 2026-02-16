<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import * as Icons from 'lucide-vue-next';

const props = defineProps({
    stats: Object,
    attendanceRecent: Array,
    ageBuckets: Object,
});

const metricCards = [
    { key: 'active_youth', label: 'Active youth', icon: 'Users' },
    { key: 'pending_youth', label: 'Pending approvals', icon: 'UserPlus' },
    { key: 'sessions_this_month', label: 'Sessions this month', icon: 'CalendarRange' },
    { key: 'token_liability', label: 'Tokens outstanding', icon: 'Coins', prefix: '' },
];

const quickActions = [
    { label: 'Start weekly register', description: 'Open the attendance grid', route: 'admin.attendance.index' },
    { label: 'Invite leader', description: 'Add a new admin/token operator', route: 'admin.users.index' },
    { label: 'Send parent form', description: 'Share registration link', route: 'enrolment.form', external: true },
];
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Overview" />
        <div class="space-y-8">
            <section class="grid gap-4 lg:grid-cols-4">
                <div
                    v-for="metric in metricCards"
                    :key="metric.key"
                    class="stat-card flex items-start justify-between"
                >
                    <div>
                        <p class="text-xs uppercase tracking-wide text-slate-500">{{ metric.label }}</p>
                        <p class="mt-2 text-3xl font-semibold text-slate-900">
                            {{ props.stats?.[metric.key] ?? 0 }}
                        </p>
                    </div>
                    <div class="rounded-2xl bg-slate-100 p-3 text-slate-500">
                        <component :is="Icons[metric.icon]" class="h-5 w-5" />
                    </div>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-3">
                <div class="panel p-6 lg:col-span-2">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-slate-900">Attendance pulse</p>
                            <p class="text-xs text-slate-500">Past six gatherings</p>
                        </div>
                        <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Live</span>
                    </div>
                    <div class="mt-6 space-y-4">
                        <div v-for="session in attendanceRecent" :key="session.id" class="flex items-center gap-4">
                            <div class="w-24 text-sm text-slate-600">{{ new Date(session.session_date).toLocaleDateString() }}</div>
                            <div class="flex-1">
                                <div class="h-3 rounded-full bg-slate-100">
                                    <div
                                        class="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                        :style="{ width: `${Math.min(session.present_count * 3, 100)}%` }"
                                    ></div>
                                </div>
                            </div>
                            <div class="w-12 text-right text-sm font-semibold text-slate-800">{{ session.present_count }}</div>
                        </div>
                        <p v-if="!attendanceRecent?.length" class="text-sm text-slate-500">No sessions logged yet.</p>
                    </div>
                </div>
                <div class="panel p-6">
                    <p class="text-sm font-semibold text-slate-900">Age distribution</p>
                    <ul class="mt-6 space-y-4">
                        <li v-for="(count, label) in ageBuckets" :key="label" class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-semibold text-slate-800">{{ label }}</p>
                            </div>
                            <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{{ count }}</span>
                        </li>
                        <li v-if="!Object.keys(ageBuckets).length" class="text-sm text-slate-500">Add DOBs to view age spread.</li>
                    </ul>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-3">
                <div class="panel p-6 lg:col-span-2">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-slate-900">Quick actions</p>
                            <p class="text-xs text-slate-500">Shortcuts for the team</p>
                        </div>
                    </div>
                    <div class="mt-5 grid gap-3 md:grid-cols-3">
                        <Link
                            v-for="action in quickActions"
                            :key="action.label"
                            :href="route(action.route)"
                            :target="action.external ? '_blank' : undefined"
                            class="rounded-2xl border border-border/80 p-4 text-sm text-slate-600 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600"
                        >
                            <p class="font-semibold text-slate-900">{{ action.label }}</p>
                            <p class="mt-1 text-xs text-slate-500">{{ action.description }}</p>
                        </Link>
                    </div>
                </div>
                <div class="panel p-6">
                    <p class="text-sm font-semibold text-slate-900">Tokens snapshot</p>
                    <p class="text-xs text-slate-500">Outstanding balances</p>
                    <div class="mt-6 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                        <p class="text-3xl font-semibold text-slate-900">{{ props.stats?.token_liability ?? 0 }}</p>
                        <p class="text-xs text-slate-500">tokens ready to redeem</p>
                    </div>
                    <Link
                        :href="route('admin.tokens.index')"
                        class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
                    >
                        Open token console
                        <Icons.ArrowRight class="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    </AuthenticatedLayout>
</template>
