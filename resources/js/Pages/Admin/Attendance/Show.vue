<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import * as Icons from 'lucide-vue-next';

const props = defineProps({
    session: Object,
});

const form = useForm({
    records: props.session.records.map((record) => ({
        id: record.id,
        status: record.status,
        notes: record.notes ?? '',
        young_person: record.young_person,
    })),
});

const statuses = ['present', 'late', 'absent', 'excused'];

const submit = () => {
    form.patch(route('admin.attendance.records.update', props.session.id));
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Attendance" />
        <div class="space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p class="text-xs uppercase tracking-wide text-slate-500">Register</p>
                    <h1 class="text-2xl font-semibold text-slate-900">{{ props.session.name }}</h1>
                    <p class="text-sm text-slate-500">{{ new Date(props.session.session_date).toLocaleDateString() }}</p>
                </div>
                <Link :href="route('admin.attendance.index')" class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
                    ← All sessions
                </Link>
            </div>

            <section class="panel p-0">
                <div class="toolbar flex-col gap-3 sm:flex-row">
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Mark attendance</p>
                        <p class="text-xs text-slate-500">Tap a status to toggle quickly</p>
                    </div>
                    <button class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" @click="submit" :disabled="form.processing">
                        Save attendance
                    </button>
                </div>
                <div class="divide-y divide-slate-100">
                    <div v-for="record in form.records" :key="record.id" class="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p class="text-base font-semibold text-slate-900">{{ record.young_person.first_name }} {{ record.young_person.last_name }}</p>
                            <p class="text-xs text-slate-500">
                                {{ record.young_person.guardians?.map((g) => g.first_name).join(', ') }}
                            </p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button
                                v-for="status in statuses"
                                :key="status"
                                type="button"
                                class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                                :class="record.status === status
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                    : 'bg-slate-100 text-slate-600'"
                                @click="record.status = status"
                            >
                                {{ status }}
                            </button>
                        </div>
                        <textarea
                            v-model="record.notes"
                            class="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                            rows="1"
                            placeholder="Notes (optional)"
                        />
                    </div>
                </div>
            </section>
        </div>
    </AuthenticatedLayout>
</template>
