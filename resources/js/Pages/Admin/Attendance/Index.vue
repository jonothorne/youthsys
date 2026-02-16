<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    sessions: Object,
});

const form = useForm({
    session_date: new Date().toISOString().slice(0, 10),
    session_type: 'weekly',
    name: 'Alive Youth',
    location: 'Alive Church',
});

const submit = () => {
    form.post(route('admin.attendance.store'));
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Attendance" />
        <div class="grid gap-6 lg:grid-cols-3">
            <section class="panel p-6 lg:col-span-2">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Registers</p>
                        <p class="text-xs text-slate-500">Past and upcoming sessions</p>
                    </div>
                    <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{{ sessions.total }} sessions</span>
                </div>
                <div class="mt-4 overflow-x-auto">
                    <table class="min-w-full divide-y divide-border text-sm">
                        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th class="px-4 py-3">Date</th>
                                <th class="px-4 py-3">Type</th>
                                <th class="px-4 py-3">Present</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 bg-white">
                            <tr v-for="session in sessions.data" :key="session.id" class="hover:bg-slate-50">
                                <td class="px-4 py-4 text-sm font-semibold text-slate-900">{{ new Date(session.session_date).toLocaleDateString() }}</td>
                                <td class="px-4 py-4 text-slate-600">{{ session.session_type }}</td>
                                <td class="px-4 py-4">{{ session.present_count ?? 0 }}</td>
                                <td class="px-4 py-4 text-right">
                                    <Link :href="route('admin.attendance.show', session.id)" class="text-sm font-semibold text-indigo-600">Open register</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="panel p-6">
                <p class="text-sm font-semibold text-slate-900">Create session</p>
                <p class="text-xs text-slate-500">Prefill your weekly gatherings</p>
                <form class="mt-4 space-y-4" @submit.prevent="submit">
                    <div>
                        <label class="form-label">Date</label>
                        <input v-model="form.session_date" type="date" class="form-input" />
                        <p class="form-error" v-if="form.errors.session_date">{{ form.errors.session_date }}</p>
                    </div>
                    <div>
                        <label class="form-label">Name</label>
                        <input v-model="form.name" class="form-input" />
                    </div>
                    <div>
                        <label class="form-label">Location</label>
                        <input v-model="form.location" class="form-input" />
                    </div>
                    <div>
                        <label class="form-label">Session type</label>
                        <select v-model="form.session_type" class="form-input">
                            <option value="weekly">Weekly</option>
                            <option value="event">Event</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" :disabled="form.processing">
                        Create & open register
                    </button>
                </form>
            </section>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.form-label {
    @apply mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500;
}
.form-input {
    @apply w-full rounded-2xl border border-border px-3 py-2 text-sm shadow-inner focus:border-indigo-500 focus:outline-none;
}
.form-error {
    @apply mt-1 text-xs text-rose-600;
}
</style>
