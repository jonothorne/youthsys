<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, router } from '@inertiajs/vue3';

const props = defineProps({
    users: Array,
    roles: Array,
});

const createForm = useForm({
    name: '',
    email: '',
    password: '',
    role: 'token_operator',
});

const updateForms = props.users.reduce((acc, user) => {
    acc[user.id] = useForm({
        name: user.name,
        role: user.roles[0]?.name ?? 'token_operator',
        password: '',
    });
    return acc;
}, {});

const store = () => {
    createForm.post(route('admin.users.store'), {
        onSuccess: () => createForm.reset('name', 'email', 'password'),
    });
};

const updateUser = (userId) => {
    updateForms[userId].put(route('admin.users.update', userId), {
        preserveScroll: true,
        onSuccess: () => updateForms[userId].reset('password'),
    });
};

const removeUser = (userId) => {
    if (!confirm('Remove this team member?')) return;
    router.delete(route('admin.users.destroy', userId));
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Team" />
        <div class="grid gap-6 py-4 lg:grid-cols-3">
            <section class="panel p-6 lg:col-span-2">
                <h3 class="text-lg font-semibold text-slate-900">Current team</h3>
                <p class="text-sm text-slate-500">Promote or reset passwords.</p>
                <div class="mt-4 divide-y divide-slate-100">
                    <div v-for="user in users" :key="user.id" class="py-4">
                        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p class="text-base font-semibold text-slate-900">{{ user.name }}</p>
                                <p class="text-sm text-slate-500">{{ user.email }}</p>
                            </div>
                            <div class="flex flex-col gap-2 md:flex-row md:items-center">
                                <select v-model="updateForms[user.id].role" class="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                                    <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                                </select>
                                <input
                                    v-model="updateForms[user.id].password"
                                    type="password"
                                    placeholder="New password (optional)"
                                    class="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                                />
                                <button
                                    class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                                    @click="updateUser(user.id)"
                                    :disabled="updateForms[user.id].processing"
                                >
                                    Save
                                </button>
                                <button
                                    class="rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600"
                                    @click="removeUser(user.id)"
                                    :disabled="user.id === $page.props.auth.user.id"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                        <p v-if="updateForms[user.id].errors.role" class="text-sm text-rose-600">{{ updateForms[user.id].errors.role }}</p>
                    </div>
                    <p v-if="!users.length" class="py-4 text-sm text-slate-500">No team members yet.</p>
                </div>
            </section>

            <section class="panel p-6">
                <h3 class="text-lg font-semibold text-slate-900">Invite leader</h3>
                <form class="mt-4 space-y-4" @submit.prevent="store">
                    <div>
                        <label class="form-label">Name</label>
                        <input v-model="createForm.name" class="form-input" />
                        <p class="form-error" v-if="createForm.errors.name">{{ createForm.errors.name }}</p>
                    </div>
                    <div>
                        <label class="form-label">Email</label>
                        <input v-model="createForm.email" type="email" class="form-input" />
                        <p class="form-error" v-if="createForm.errors.email">{{ createForm.errors.email }}</p>
                    </div>
                    <div>
                        <label class="form-label">Temporary password</label>
                        <input v-model="createForm.password" type="password" class="form-input" />
                        <p class="form-error" v-if="createForm.errors.password">{{ createForm.errors.password }}</p>
                    </div>
                    <div>
                        <label class="form-label">Role</label>
                        <select v-model="createForm.role" class="form-input">
                            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white" :disabled="createForm.processing">
                        Add team member
                    </button>
                </form>
            </section>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.form-label {
    @apply mb-1 block text-sm font-semibold text-slate-700;
}
.form-input {
    @apply w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500;
}
.form-error {
    @apply mt-1 text-sm text-rose-600;
}
</style>
