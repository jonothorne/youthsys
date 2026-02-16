<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import * as Icons from 'lucide-vue-next';

const props = defineProps({
    accounts: Array,
    recentTransactions: Array,
});

const selected = ref([]);

const form = useForm({
    young_person_ids: [],
    amount: 1,
    reason: 'Reward earned',
});

const toggleSelect = (id) => {
    if (selected.value.includes(id)) {
        selected.value = selected.value.filter((item) => item !== id);
    } else {
        selected.value.push(id);
    }
};

const adjust = (amount, id = null) => {
    form.amount = amount;
    form.young_person_ids = id ? [id] : [...selected.value];
    if (!form.young_person_ids.length) return;
    form.post(route('admin.tokens.adjust'), {
        preserveScroll: true,
        onSuccess: () => {
            selected.value = [];
        },
    });
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Tokens" />
        <div class="grid gap-6 lg:grid-cols-3">
            <section class="panel p-6 lg:col-span-2">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Token balances</p>
                        <p class="text-xs text-slate-500">Select multiple and apply actions</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 text-xs">
                        <button class="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600" @click="selected = []">Clear</button>
                        <button class="rounded-full bg-emerald-600 px-3 py-1 font-semibold text-white" @click="adjust(1)">+1 selected</button>
                        <button class="rounded-full bg-emerald-700 px-3 py-1 font-semibold text-white" @click="adjust(5)">+5 selected</button>
                        <button class="rounded-full bg-rose-500 px-3 py-1 font-semibold text-white" @click="adjust(-5)">-5 selected</button>
                    </div>
                </div>
                <div class="mt-4 overflow-x-auto">
                    <table class="min-w-full divide-y divide-border text-sm">
                        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th class="px-4 py-3"></th>
                                <th class="px-4 py-3">Name</th>
                                <th class="px-4 py-3">Balance</th>
                                <th class="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 bg-white">
                            <tr v-for="account in accounts" :key="account.id" class="hover:bg-slate-50">
                                <td class="px-4 py-3">
                                    <input type="checkbox" :checked="selected.includes(account.id)" @change="toggleSelect(account.id)" />
                                </td>
                                <td class="px-4 py-3">
                                    <p class="font-semibold text-slate-900">{{ account.first_name }} {{ account.last_name }}</p>
                                    <p class="text-xs text-slate-500">{{ account.preferred_name }}</p>
                                </td>
                                <td class="px-4 py-3 text-lg font-semibold text-emerald-600">{{ account.token_account?.balance ?? 0 }}</td>
                                <td class="px-4 py-3 text-right">
                                    <div class="space-x-2">
                                        <button class="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white" @click="adjust(1, account.id)">+1</button>
                                        <button class="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white" @click="adjust(5, account.id)">+5</button>
                                        <button class="rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white" @click="adjust(-5, account.id)">-5</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="panel flex flex-col gap-6 p-6">
                <div>
                    <p class="text-sm font-semibold text-slate-900">Recent activity</p>
                    <ul class="mt-4 space-y-3 text-sm">
                        <li v-for="transaction in recentTransactions" :key="transaction.id" class="flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-2">
                            <div>
                                <p class="font-semibold text-slate-900">{{ transaction.young_person.first_name }}</p>
                                <p class="text-xs text-slate-500">{{ transaction.reason ?? transaction.type }}</p>
                            </div>
                            <span :class="transaction.amount > 0 ? 'text-emerald-600' : 'text-rose-500'" class="font-semibold">
                                {{ transaction.amount > 0 ? '+' : '' }}{{ transaction.amount }}
                            </span>
                        </li>
                        <li v-if="!recentTransactions.length" class="text-sm text-slate-500">No token movements yet.</li>
                    </ul>
                </div>
                <div>
                    <p class="text-sm font-semibold text-slate-900">Reason</p>
                    <input v-model="form.reason" class="form-input mt-2" placeholder="eg. Worship team" />
                </div>
                <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                    <p class="font-semibold text-slate-900">Tips</p>
                    <ul class="mt-2 list-disc space-y-1 pl-5">
                        <li>Select multiple youth for group rewards.</li>
                        <li>Use negative values to redeem in the shop.</li>
                        <li>Tie reasons to events for better reporting.</li>
                    </ul>
                </div>
            </section>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.form-input {
    @apply w-full rounded-2xl border border-border px-3 py-2 text-sm shadow-inner focus:border-indigo-500 focus:outline-none;
}
</style>
