<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import * as Icons from 'lucide-vue-next';

const props = defineProps({
    youth: Object,
    filters: Object,
});

const search = ref(props.filters?.search ?? '');

watch(search, (value) => {
    router.get(route('admin.youth.index'), { search: value }, { preserveState: true, replace: true });
});

const createForm = useForm({
    first_name: '',
    last_name: '',
    preferred_name: '',
    date_of_birth: '',
    gender: '',
});

const showDrawer = ref(false);

const submit = () => {
    createForm.post(route('admin.youth.store'), {
        onSuccess: () => {
            createForm.reset();
            showDrawer.value = false;
        },
    });
};

const remove = (id) => {
    if (!confirm('Are you sure you want to delete this young person?')) {
        return;
    }
    router.delete(route('admin.youth.destroy', id), {
        preserveScroll: true,
    });
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Young People" />
        <div class="space-y-6">
            <section class="panel">
                <div class="toolbar">
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Directory</p>
                        <p class="text-xs text-slate-500">{{ youth.total }} records</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                        <div class="relative flex items-center rounded-2xl border border-border/80 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm">
                            <Icons.Search class="mr-2 h-4 w-4 text-slate-400" />
                            <input
                                v-model="search"
                                class="w-40 bg-transparent text-sm focus:outline-none"
                                placeholder="Search by name"
                            />
                        </div>
                        <button class="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" @click="showDrawer = true">
                            Add young person
                        </button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-border/80 text-sm">
                        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th class="px-4 py-3">Name</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">Tokens</th>
                                <th class="px-4 py-3">Guardians</th>
                                <th class="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 bg-white">
                            <tr v-for="person in youth.data" :key="person.id" class="hover:bg-slate-50">
                                <td class="px-4 py-4">
                                    <p class="font-semibold text-slate-900">{{ person.first_name }} {{ person.last_name }}</p>
                                    <p class="text-xs text-slate-500" v-if="person.preferred_name">Prefers {{ person.preferred_name }}</p>
                                </td>
                                <td class="px-4 py-4">
                                    <span
                                        class="rounded-full px-3 py-1 text-xs font-semibold"
                                        :class="person.status === 'active'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : person.status === 'pending'
                                                ? 'bg-amber-100 text-amber-700'
                                                : 'bg-slate-100 text-slate-600'"
                                    >
                                        {{ person.status }}
                                    </span>
                                </td>
                                <td class="px-4 py-4 font-semibold text-slate-800">{{ person.token_account?.balance ?? 0 }}</td>
                                <td class="px-4 py-4 text-slate-600">
                                    <p v-for="guardian in person.guardians" :key="guardian.id">{{ guardian.first_name }} {{ guardian.last_name }}</p>
                                </td>
                                <td class="px-4 py-4 text-right">
                                    <div class="flex items-center justify-end gap-3">
                                        <Link :href="route('admin.youth.show', person.id)" class="text-sm font-semibold text-indigo-600">Open</Link>
                                        <button class="text-sm font-semibold text-rose-500 hover:text-rose-600" @click="remove(person.id)">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="border-t border-border/60 px-4 py-3 text-sm text-slate-500">
                    Showing {{ youth.from }}-{{ youth.to }} of {{ youth.total }} people
                </div>
            </section>
        </div>

        <div v-if="showDrawer" class="fixed inset-0 z-40 flex">
            <div class="w-full flex-1" @click="showDrawer = false"></div>
            <div class="h-full w-full max-w-md bg-white shadow-2xl">
                <div class="flex items-center justify-between border-b border-border px-6 py-4">
                    <div>
                        <p class="text-lg font-semibold text-slate-900">Add young person</p>
                        <p class="text-xs text-slate-500">Capture their preferred name and DOB</p>
                    </div>
                    <button class="rounded-full border border-slate-200 p-2" @click="showDrawer = false">
                        <Icons.X class="h-4 w-4" />
                    </button>
                </div>
                <form class="space-y-4 px-6 py-6" @submit.prevent="submit">
                    <div>
                        <label class="form-label">First name</label>
                        <input v-model="createForm.first_name" class="form-input" />
                        <p class="form-error" v-if="createForm.errors.first_name">{{ createForm.errors.first_name }}</p>
                    </div>
                    <div>
                        <label class="form-label">Last name</label>
                        <input v-model="createForm.last_name" class="form-input" />
                        <p class="form-error" v-if="createForm.errors.last_name">{{ createForm.errors.last_name }}</p>
                    </div>
                    <div>
                        <label class="form-label">Preferred name</label>
                        <input v-model="createForm.preferred_name" class="form-input" />
                    </div>
                    <div>
                        <label class="form-label">Date of birth</label>
                        <input v-model="createForm.date_of_birth" type="date" class="form-input" />
                    </div>
                    <div>
                        <label class="form-label">Gender</label>
                        <input v-model="createForm.gender" class="form-input" />
                    </div>
                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold" @click="showDrawer = false">
                            Cancel
                        </button>
                        <button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" :disabled="createForm.processing">
                            Save
                        </button>
                    </div>
                </form>
            </div>
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
