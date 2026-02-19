<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import * as Icons from 'lucide-vue-next';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const props = defineProps({
    stats: Object,
    attendanceTrend: { type: Array, default: () => [] },
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

const formatWeekLabel = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const gradientFill = (context) => {
    const chart = context.chart;
    const fallback = 'rgba(37, 99, 235, 0.15)';

    if (!chart) {
        return fallback;
    }

    const { ctx, chartArea } = chart;

    if (!chartArea) {
        return fallback;
    }

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.35)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

    return gradient;
};

const chartData = computed(() => ({
    labels: props.attendanceTrend.map((week) => formatWeekLabel(week.week_start)),
    datasets: [
        {
            label: 'Weekly attendance',
            data: props.attendanceTrend.map((week) => week.present_count ?? 0),
            borderColor: '#2563eb',
            backgroundColor: gradientFill,
            borderWidth: 2,
            tension: 0.45,
            pointRadius: 0,
            fill: 'start',
        },
    ],
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                title: (items) => {
                    const item = items?.[0];
                    if (!item) {
                        return '';
                    }
                    const week = props.attendanceTrend[item.dataIndex];
                    return week ? `Week of ${formatWeekLabel(week.week_start)}` : item.label;
                },
                label: (context) => `${context.parsed.y ?? 0} present`,
            },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { maxTicksLimit: 6 },
        },
        y: {
            beginAtZero: true,
            ticks: { stepSize: 5 },
            grid: { color: 'rgba(15, 23, 42, 0.05)' },
        },
    },
};
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
                            <p class="text-sm font-semibold text-slate-900">Attendance trend</p>
                            <p class="text-xs text-slate-500">Weekly presence over time</p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <Line
                            v-if="attendanceTrend.length"
                            :data="chartData"
                            :options="chartOptions"
                            height="200"
                        />
                        <p v-else class="text-sm text-slate-500">Log attendance to visualise weekly growth.</p>
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
