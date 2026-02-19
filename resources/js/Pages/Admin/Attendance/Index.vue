<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router, useForm } from '@inertiajs/vue3';

const props = defineProps({
    sessions: Array,
    archivedSessions: Array,
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

const archive = (id) => {
    if (!confirm('Archive this register?')) return;
    router.post(route('admin.attendance.archive', id), {}, { preserveScroll: true });
};

const destroySession = (id) => {
    if (!confirm('Delete this register? This cannot be undone.')) return;
    router.delete(route('admin.attendance.destroy', id));
};

const restore = (id) => {
    router.post(route('admin.attendance.restore', id), {}, { preserveScroll: true });
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Attendance" />
        <div class="space-y-6">
            <div class="grid gap-6 lg:grid-cols-3">
                <section class="panel p-6 lg:col-span-2">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-slate-900">Registers</p>
                            <p class="text-xs text-slate-500">Past and upcoming sessions</p>
                        </div>
                        <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{{ sessions.length }} active</span>
                    </div>
                    <div class="mt-4 overflow-x-auto">
                        <table class="min-w-full divide-y divide-border text-sm">
                            <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th class="py-2">Date</th>
                                    <th class="py-2">Type</th>
                                    <th class="py-2">Present</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 bg-white">
                                <tr v-for="session in sessions" :key="session.id" class="hover:bg-slate-50">
                                    <td class="py-3">
                                        <p class="font-semibold text-slate-900">{{ new Date(session.session_date).toLocaleDateString() }}</p>
                                        <p class="text-xs text-slate-500">{{ session.name }}</p>
                                    </td>
                                    <td class="py-3 text-slate-600">{{ session.session_type }}</td>
                                    <td class="py-3">{{ session.present_count ?? 0 }}</td>
                                    <td class="py-3 text-right">
                                        <div class="flex flex-wrap justify-end gap-3 text-sm font-semibold">
                                            <Link :href="route('admin.attendance.show', session.id)" class="text-indigo-600">Open</Link>
                                            <button class="text-amber-600" @click="archive(session.id)">Archive</button>
                                            <button class="text-rose-600" @click="destroySession(session.id)">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="!sessions.length">
                                    <td colspan="4" class="py-6 text-center text-sm text-slate-500">No sessions yet.</td>
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

            <section class="panel p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Archived sessions</p>
                        <p class="text-xs text-slate-500">Stored for reference</p>
                    </div>
                </div>
                <div class="mt-4 overflow-x-auto">
                    <table class="min-w-full divide-y divide-border text-sm">
                        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th class="py-2">Date</th>
                                <th class="py-2">Type</th>
                                <th class="py-2">Present</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 bg-white">
                            <tr v-for="session in archivedSessions" :key="`arch-${session.id}`" class="hover:bg-slate-50">
                                <td class="py-3">{{ new Date(session.session_date).toLocaleDateString() }}</td>
                                <td class="py-3 text-slate-600">{{ session.session_type }}</td>
                                <td class="py-3">{{ session.present_count ?? 0 }}</td>
                                <td class="py-3 text-right">
                                    <div class="flex flex-wrap justify-end gap-3 text-sm font-semibold">
                                        <Link :href="route('admin.attendance.show', session.id)" class="text-indigo-600">Open</Link>
                                        <button class="text-emerald-600" @click="restore(session.id)">Restore</button>
                                        <button class="text-rose-600" @click="destroySession(session.id)">Delete</button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="!archivedSessions.length">
                                <td colspan="4" class="py-6 text-center text-sm text-slate-500">No archived sessions.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
