<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { computed, ref, watch } from 'vue';
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import * as Icons from 'lucide-vue-next';

const props = defineProps({
    youth: Object,
    guardians: Array,
});

const profileDefaults = (youth) => ({
    first_name: youth.first_name ?? '',
    last_name: youth.last_name ?? '',
    preferred_name: youth.preferred_name ?? '',
    date_of_birth: youth.date_of_birth ?? '',
    gender: youth.gender ?? '',
    primary_language: youth.primary_language ?? '',
    school_year: youth.school_year ?? '',
    school_name: youth.school_name ?? '',
    status: youth.status ?? 'pending',
    active: Boolean(youth.active),
    photo_consent: Boolean(youth.photo_consent),
});

const healthDefaults = (youth) => ({
    allergies: youth.allergies ?? '',
    medical_notes: youth.medical_notes ?? '',
    medications: youth.medications ?? '',
    dietary_requirements: youth.dietary_requirements ?? '',
});

const consentDefaults = (youth) => {
    const consent = youth.consents?.[0] ?? null;

    return {
        guardian_id: consent?.guardian_id ?? youth.guardians?.[0]?.id ?? null,
        signature_name: consent?.signature_name ?? '',
        general_attendance: Boolean(consent?.general_attendance ?? false),
        offsite_events: Boolean(consent?.offsite_events ?? false),
        media_consent: Boolean(consent?.media_consent ?? false),
        medical_treatment: Boolean(consent?.medical_treatment ?? false),
        transport: Boolean(consent?.transport ?? false),
    };
};

const profileForm = useForm(profileDefaults(props.youth));
profileForm.transform((data) => ({
    ...data,
    date_of_birth: data.date_of_birth || null,
}));

const healthForm = useForm(healthDefaults(props.youth));

const consentForm = useForm(consentDefaults(props.youth));
consentForm.transform((data) => ({
    ...data,
    guardian_id: data.guardian_id || null,
}));

const syncForms = (youth) => {
    profileForm.defaults(profileDefaults(youth));
    profileForm.reset();

    healthForm.defaults(healthDefaults(youth));
    healthForm.reset();

    consentForm.defaults(consentDefaults(youth));
    consentForm.reset();
};

watch(
    () => props.youth,
    (youth) => {
        syncForms(youth);
    },
    { deep: true }
);

const updateProfile = () => {
    profileForm.put(route('admin.youth.update', props.youth.id), {
        preserveScroll: true,
    });
};

const updateHealth = () => {
    healthForm.put(route('admin.youth.update', props.youth.id), {
        preserveScroll: true,
    });
};

const saveConsent = () => {
    consentForm.post(route('admin.youth.consents.store', props.youth.id), {
        preserveScroll: true,
    });
};

const remove = () => {
    if (!confirm('Are you sure you want to delete this young person?')) {
        return;
    }
    router.delete(route('admin.youth.destroy', props.youth.id));
};

const latestConsent = computed(() => props.youth.consents?.[0] ?? null);

const guardianDrawerOpen = ref(false);
const editingGuardian = ref(null);

const guardianDefaults = (guardian) => ({
    first_name: guardian?.first_name ?? '',
    last_name: guardian?.last_name ?? '',
    preferred_name: guardian?.preferred_name ?? '',
    primary_phone: guardian?.primary_phone ?? '',
    secondary_phone: guardian?.secondary_phone ?? '',
    email: guardian?.email ?? '',
    address_line1: guardian?.address_line1 ?? '',
    address_line2: guardian?.address_line2 ?? '',
    city: guardian?.city ?? '',
    postcode: guardian?.postcode ?? '',
    relationship: guardian?.pivot?.relationship ?? guardian?.relationship ?? '',
    preferred_contact_method: guardian?.preferred_contact_method ?? 'phone',
    notes: guardian?.notes ?? '',
    is_emergency_contact: Boolean(guardian?.is_emergency_contact ?? true),
    is_primary: Boolean(guardian?.pivot?.is_primary ?? false),
    contact_order: guardian?.pivot?.contact_order ?? 1,
    can_pickup: Boolean(guardian?.pivot?.can_pickup ?? true),
    receives_notifications: Boolean(guardian?.pivot?.receives_notifications ?? true),
});

const guardianForm = useForm(guardianDefaults(null));
guardianForm.transform((data) => ({
    ...data,
    preferred_name: data.preferred_name || null,
    secondary_phone: data.secondary_phone || null,
    email: data.email || null,
    address_line1: data.address_line1 || null,
    address_line2: data.address_line2 || null,
    city: data.city || null,
    postcode: data.postcode || null,
    relationship: data.relationship || null,
    notes: data.notes || null,
    contact_order: data.contact_order || null,
}));

const openGuardianDrawer = (guardian) => {
    editingGuardian.value = guardian;
    guardianForm.defaults(guardianDefaults(guardian));
    guardianForm.reset();
    guardianDrawerOpen.value = true;
};

const closeGuardianDrawer = () => {
    guardianDrawerOpen.value = false;
    editingGuardian.value = null;
    guardianForm.reset();
    guardianForm.clearErrors();
};

const saveGuardian = () => {
    if (!editingGuardian.value) {
        return;
    }

    guardianForm.patch(
        route('admin.youth.guardians.update', {
            youngPerson: props.youth.id,
            guardian: editingGuardian.value.id,
        }),
        {
            preserveScroll: true,
            onSuccess: () => {
                closeGuardianDrawer();
            },
        }
    );
};

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '—');
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
                            <p class="text-sm font-semibold text-slate-900">Profile & basics</p>
                            <p class="text-xs text-slate-500">Names, school, language, and status</p>
                        </div>
                        <span class="rounded-full px-3 py-1 text-xs font-semibold"
                            :class="props.youth.status === 'active' ? 'bg-emerald-100 text-emerald-700' : props.youth.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'"
                        >
                            {{ props.youth.status }}
                        </span>
                    </div>
                    <form class="mt-6 space-y-5" @submit.prevent="updateProfile">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div>
                                <label class="form-label">First name</label>
                                <input v-model="profileForm.first_name" class="form-input" />
                                <p v-if="profileForm.errors.first_name" class="form-error">{{ profileForm.errors.first_name }}</p>
                            </div>
                            <div>
                                <label class="form-label">Last name</label>
                                <input v-model="profileForm.last_name" class="form-input" />
                                <p v-if="profileForm.errors.last_name" class="form-error">{{ profileForm.errors.last_name }}</p>
                            </div>
                            <div>
                                <label class="form-label">Preferred name</label>
                                <input v-model="profileForm.preferred_name" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">Status</label>
                                <select v-model="profileForm.status" class="form-input">
                                    <option value="pending">Pending</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Date of birth</label>
                                <input v-model="profileForm.date_of_birth" type="date" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">Gender</label>
                                <input v-model="profileForm.gender" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">Primary language</label>
                                <input v-model="profileForm.primary_language" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">School year</label>
                                <input v-model="profileForm.school_year" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">School name</label>
                                <input v-model="profileForm.school_name" class="form-input" />
                            </div>
                        </div>
                        <div class="grid gap-4 md:grid-cols-2">
                            <label class="flex items-center gap-2 text-sm text-slate-600">
                                <input v-model="profileForm.active" type="checkbox" class="rounded" /> Currently active
                            </label>
                            <label class="flex items-center gap-2 text-sm text-slate-600">
                                <input v-model="profileForm.photo_consent" type="checkbox" class="rounded" /> Photo consent
                            </label>
                        </div>
                        <div class="flex justify-end">
                            <button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" :disabled="profileForm.processing">
                                Save profile
                            </button>
                        </div>
                    </form>
                </div>
                <div class="panel p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-slate-900">Guardians</p>
                            <p class="text-xs text-slate-500">Edit parent contact details</p>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div v-for="guardian in youth.guardians" :key="guardian.id" class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <div class="flex items-center justify-between gap-3">
                                <div>
                                    <p class="text-sm font-semibold text-slate-900">{{ guardian.first_name }} {{ guardian.last_name }}</p>
                                    <p class="text-xs text-slate-500">{{ guardian.relationship || guardian.pivot?.relationship || 'Guardian' }}</p>
                                </div>
                                <button class="text-xs font-semibold text-indigo-600" @click="openGuardianDrawer(guardian)">
                                    Edit
                                </button>
                            </div>
                            <div class="mt-2 text-sm text-slate-600">
                                <p>{{ guardian.primary_phone }}</p>
                                <p v-if="guardian.email" class="text-xs text-slate-500">{{ guardian.email }}</p>
                                <p class="mt-2 text-xs text-slate-500">
                                    {{ guardian.pivot?.is_primary ? 'Primary' : 'Additional' }} ·
                                    {{ guardian.pivot?.can_pickup ? 'Can collect' : 'Pickup restricted' }}
                                </p>
                            </div>
                        </div>
                        <p v-if="!youth.guardians.length" class="text-sm text-slate-500">No guardians linked yet.</p>
                    </div>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-3">
                <div class="panel p-6 lg:col-span-2">
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Health & safety</p>
                        <p class="text-xs text-slate-500">Medical notes, allergies, medications, and dietary info</p>
                    </div>
                    <form class="mt-6 space-y-4" @submit.prevent="updateHealth">
                        <div>
                            <label class="form-label">Allergies</label>
                            <textarea v-model="healthForm.allergies" rows="2" class="form-input"></textarea>
                        </div>
                        <div>
                            <label class="form-label">Medications</label>
                            <textarea v-model="healthForm.medications" rows="2" class="form-input"></textarea>
                        </div>
                        <div>
                            <label class="form-label">Medical notes</label>
                            <textarea v-model="healthForm.medical_notes" rows="3" class="form-input"></textarea>
                        </div>
                        <div>
                            <label class="form-label">Dietary requirements</label>
                            <textarea v-model="healthForm.dietary_requirements" rows="2" class="form-input"></textarea>
                        </div>
                        <div class="flex justify-end">
                            <button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" :disabled="healthForm.processing">
                                Save health info
                            </button>
                        </div>
                    </form>
                </div>
                <div class="panel p-6 space-y-6">
                    <div>
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-semibold text-slate-900">Permissions</p>
                                <p class="text-xs text-slate-500">Record guardian consent</p>
                            </div>
                            <span class="text-xs text-slate-500" v-if="latestConsent">Updated {{ formatDate(latestConsent.signed_at) }}</span>
                        </div>
                        <form class="mt-4 space-y-3" @submit.prevent="saveConsent">
                            <div>
                                <label class="form-label">Guardian</label>
                                <select v-model="consentForm.guardian_id" class="form-input">
                                    <option :value="null">Select guardian</option>
                                    <option v-for="guardian in guardians" :key="guardian.id" :value="guardian.id">
                                        {{ guardian.first_name }} {{ guardian.last_name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Signature</label>
                                <input v-model="consentForm.signature_name" class="form-input" placeholder="Guardian name" />
                            </div>
                            <div class="grid gap-2">
                                <label class="flex items-center gap-2 text-sm text-slate-600">
                                    <input v-model="consentForm.general_attendance" type="checkbox" class="rounded" /> Weekly attendance
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600">
                                    <input v-model="consentForm.offsite_events" type="checkbox" class="rounded" /> Offsite events
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600">
                                    <input v-model="consentForm.media_consent" type="checkbox" class="rounded" /> Media + photos
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600">
                                    <input v-model="consentForm.medical_treatment" type="checkbox" class="rounded" /> Medical treatment
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600">
                                    <input v-model="consentForm.transport" type="checkbox" class="rounded" /> Transport
                                </label>
                            </div>
                            <div class="flex justify-end pt-2">
                                <button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" :disabled="consentForm.processing">
                                    Save permissions
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Consent history</p>
                        <div class="mt-4 space-y-3">
                            <div v-for="consent in youth.consents" :key="consent.id" class="rounded-2xl border border-slate-100 p-3 text-sm">
                                <p class="font-semibold text-slate-900">Signed {{ formatDate(consent.signed_at) }}</p>
                                <div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                                    <span :class="consent.general_attendance ? 'text-emerald-600' : 'text-rose-500'">Weekly</span>
                                    <span :class="consent.offsite_events ? 'text-emerald-600' : 'text-rose-500'">Offsite</span>
                                    <span :class="consent.media_consent ? 'text-emerald-600' : 'text-rose-500'">Media</span>
                                    <span :class="consent.medical_treatment ? 'text-emerald-600' : 'text-rose-500'">Medical</span>
                                    <span :class="consent.transport ? 'text-emerald-600' : 'text-rose-500'">Transport</span>
                                </div>
                            </div>
                            <p v-if="!youth.consents.length" class="text-sm text-slate-500">Awaiting guardian consent.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-3">
                <div class="panel p-6 lg:col-span-2">
                    <p class="text-sm font-semibold text-slate-900">Recent attendance</p>
                    <ul class="mt-4 divide-y divide-slate-100">
                        <li v-for="record in youth.attendance_records" :key="record.id" class="flex items-center justify-between py-3 text-sm">
                            <span class="text-slate-600">{{ formatDate(record.session.session_date) }}</span>
                            <span class="text-sm font-semibold text-slate-900">{{ record.status }}</span>
                        </li>
                        <li v-if="!youth.attendance_records?.length" class="py-4 text-sm text-slate-500">No attendance yet.</li>
                    </ul>
                </div>
                <div class="panel p-6 space-y-4">
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Tokens</p>
                        <p class="text-xs text-slate-500">Current balance</p>
                        <div class="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                            <p class="text-3xl font-semibold text-slate-900">{{ youth.token_account?.balance ?? 0 }}</p>
                            <Link :href="route('admin.tokens.index')" class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                                Token console
                                <Icons.ArrowUpRight class="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-slate-900">Linked guardians</p>
                        <ul class="mt-3 space-y-1 text-sm text-slate-600">
                            <li v-for="guardian in youth.guardians" :key="guardian.id">
                                {{ guardian.first_name }} {{ guardian.last_name }}
                                <span class="text-xs text-slate-400">· {{ guardian.primary_phone }}</span>
                            </li>
                            <li v-if="!youth.guardians.length" class="text-sm text-slate-500">No guardians listed.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>

        <div v-if="guardianDrawerOpen" class="fixed inset-0 z-40 flex">
            <div class="w-full flex-1 bg-slate-900/40" @click="closeGuardianDrawer"></div>
            <div class="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl">
                <div class="flex items-center justify-between border-b border-border px-6 py-4">
                    <div>
                        <p class="text-lg font-semibold text-slate-900">Edit guardian</p>
                        <p class="text-xs text-slate-500">Update contact and permissions</p>
                    </div>
                    <button class="rounded-full border border-slate-200 p-2" @click="closeGuardianDrawer">
                        <Icons.X class="h-4 w-4" />
                    </button>
                </div>
                <form class="space-y-4 px-6 py-6" @submit.prevent="saveGuardian">
                    <div class="grid gap-4 md:grid-cols-2">
                        <div>
                            <label class="form-label">First name</label>
                            <input v-model="guardianForm.first_name" class="form-input" />
                            <p v-if="guardianForm.errors.first_name" class="form-error">{{ guardianForm.errors.first_name }}</p>
                        </div>
                        <div>
                            <label class="form-label">Last name</label>
                            <input v-model="guardianForm.last_name" class="form-input" />
                            <p v-if="guardianForm.errors.last_name" class="form-error">{{ guardianForm.errors.last_name }}</p>
                        </div>
                        <div>
                            <label class="form-label">Preferred name</label>
                            <input v-model="guardianForm.preferred_name" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Relationship</label>
                            <input v-model="guardianForm.relationship" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Primary phone</label>
                            <input v-model="guardianForm.primary_phone" class="form-input" />
                            <p v-if="guardianForm.errors.primary_phone" class="form-error">{{ guardianForm.errors.primary_phone }}</p>
                        </div>
                        <div>
                            <label class="form-label">Secondary phone</label>
                            <input v-model="guardianForm.secondary_phone" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Email</label>
                            <input v-model="guardianForm.email" type="email" class="form-input" />
                            <p v-if="guardianForm.errors.email" class="form-error">{{ guardianForm.errors.email }}</p>
                        </div>
                        <div>
                            <label class="form-label">Preferred contact method</label>
                            <select v-model="guardianForm.preferred_contact_method" class="form-input">
                                <option value="phone">Phone</option>
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="form-label">Address line 1</label>
                            <input v-model="guardianForm.address_line1" class="form-input" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="form-label">Address line 2</label>
                            <input v-model="guardianForm.address_line2" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">City</label>
                            <input v-model="guardianForm.city" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Postcode</label>
                            <input v-model="guardianForm.postcode" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Contact order</label>
                            <input v-model.number="guardianForm.contact_order" type="number" min="1" class="form-input" />
                        </div>
                    </div>
                    <div class="grid gap-2 md:grid-cols-2">
                        <label class="flex items-center gap-2 text-sm text-slate-600">
                            <input v-model="guardianForm.is_primary" type="checkbox" class="rounded" /> Primary contact
                        </label>
                        <label class="flex items-center gap-2 text-sm text-slate-600">
                            <input v-model="guardianForm.receives_notifications" type="checkbox" class="rounded" /> Receives notifications
                        </label>
                        <label class="flex items-center gap-2 text-sm text-slate-600">
                            <input v-model="guardianForm.can_pickup" type="checkbox" class="rounded" /> Can collect child
                        </label>
                        <label class="flex items-center gap-2 text-sm text-slate-600">
                            <input v-model="guardianForm.is_emergency_contact" type="checkbox" class="rounded" /> Emergency contact
                        </label>
                    </div>
                    <div>
                        <label class="form-label">Notes</label>
                        <textarea v-model="guardianForm.notes" rows="3" class="form-input"></textarea>
                    </div>
                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold" @click="closeGuardianDrawer">
                            Cancel
                        </button>
                        <button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" :disabled="guardianForm.processing">
                            Save guardian
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
