<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import * as Icons from 'lucide-vue-next';

const props = defineProps({
    youth: Object,
    guardians: Array,
});

const form = useForm({
    first_name: props.youth.first_name,
    last_name: props.youth.last_name,
    preferred_name: props.youth.preferred_name,
    status: props.youth.status,
    active: props.youth.active,
    photo_consent: props.youth.photo_consent,
});

const submit = () => {
    form.put(route('admin.youth.update', props.youth.id));
};

const remove = () => {
    if (!confirm('Are you sure you want to delete this young person?')) {
        return;
    }
    router.delete(route('admin.youth.destroy', props.youth.id));
};
</script>

<template>
    <AuthenticatedLayout>
        <Head :title="props.youth.first_name" />
        <div class="space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p class="text-xs uppercase tracking-wide text-slate-500">Young person</p>
                    <h1 class="text-2xl font-semibold text-slate-900">{{ props.youth.first_name }} {{ props.youth.last_name }}</h1>
                    <p class="text-sm text-slate-500">Preferred name: {{ props.youth.preferred_name || '—' }}</p>
                </div>
                <div class="flex flex-wrap gap-3">
                    <button class="rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600" @click="remove">
                        Delete
                    </button>
                    <Link :href="route('admin.youth.index')" class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
                        ← Back to directory
                    </Link>
                </div>
            </div>

            <section class="grid gap-6 lg:grid-cols-3">
                <div class="panel p-6 lg:col-span-2">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-slate-900">Profile & status</p>
                            <p class="text-xs text-slate-500">Update status or preferred name</p>
                        </div>
                        <span class="rounded-full px-3 py-1 text-xs font-semibold"
                            :class="props.youth.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                        >
                            {{ props.youth.status }}
                        </span>
                    </div>
                    <form class="mt-6 grid gap-4 md:grid-cols-2" @submit.prevent="submit">
                        <div>
                            <label class="form-label">First name</label>
                            <input v-model="form.first_name" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Last name</label>
                            <input v-model="form.last_name" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Preferred name</label>
                            <input v-model="form.preferred_name" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Status</label>
                            <select v-model="form.status" class="form-input">
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <label class="flex items-center gap-2 text-sm text-slate-600">
                            <input v-model="form.active" type="checkbox" class="rounded" /> Active on register
                        </label>
                        <label class="flex items-center gap-2 text-sm text-slate-600">
                            <input v-model="form.photo_consent" type="checkbox" class="rounded" /> Photo consent
                        </label>
                        <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                            <button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" :disabled="form.processing">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
                <div class="panel p-6">
                    <p class="text-sm font-semibold text-slate-900">Guardians</p>
                    <p class="text-xs text-slate-500">Primary contacts</p>
                    <div class="mt-4 space-y-3">
                        <div v-for="guardian in youth.guardians" :key="guardian.id" class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p class="text-sm font-semibold text-slate-900">{{ guardian.first_name }} {{ guardian.last_name }}</p>
                            <p class="text-xs text-slate-500">{{ guardian.relationship }}</p>
                            <p class="text-sm text-slate-600">{{ guardian.primary_phone }}</p>
                        </div>
                        <p v-if="!youth.guardians.length" class="text-sm text-slate-500">No guardians linked yet.</p>
                    </div>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-3">
                <div class="panel p-6 lg:col-span-2">
                    <p class="text-sm font-semibold text-slate-900">Recent attendance</p>
                    <ul class="mt-4 divide-y divide-slate-100">
                        <li v-for="record in youth.attendance_records" :key="record.id" class="flex items-center justify-between py-3 text-sm">
                            <span class="text-slate-600">{{ new Date(record.session.session_date).toLocaleDateString() }}</span>
                            <span class="text-sm font-semibold text-slate-900">{{ record.status }}</span>
                        </li>
                        <li v-if="!youth.attendance_records?.length" class="py-4 text-sm text-slate-500">No attendance yet.</li>
                    </ul>
                </div>
                <div class="panel p-6">
                    <p class="text-sm font-semibold text-slate-900">Consents</p>
                    <div class="mt-4 space-y-3">
                        <div v-for="consent in youth.consents" :key="consent.id" class="rounded-2xl border border-slate-100 p-3 text-sm">
                            <p class="font-semibold text-slate-900">Signed {{ new Date(consent.signed_at).toLocaleDateString() }}</p>
                            <div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                                <span :class="consent.general_attendance ? 'text-emerald-600' : 'text-rose-500'">Weekly</span>
                                <span :class="consent.offsite_events ? 'text-emerald-600' : 'text-rose-500'">Offsite</span>
                                <span :class="consent.media_consent ? 'text-emerald-600' : 'text-rose-500'">Media</span>
                            </div>
                        </div>
                        <p v-if="!youth.consents.length" class="text-sm text-slate-500">Awaiting guardian consent.</p>
                    </div>
                    <div class="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <p class="text-xs uppercase tracking-wide text-slate-500">Tokens</p>
                        <p class="text-3xl font-semibold text-slate-900">{{ youth.token_account?.balance ?? 0 }}</p>
                        <Link :href="route('admin.tokens.index')" class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                            Token console
                            <Icons.ArrowUpRight class="h-4 w-4" />
                        </Link>
                    </div>
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
</style>
