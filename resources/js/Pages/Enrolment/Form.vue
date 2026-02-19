<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import * as Icons from 'lucide-vue-next';

const form = useForm({
    guardian: {
        first_name: '',
        last_name: '',
        email: '',
        primary_phone: '',
        secondary_phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        postcode: '',
        relationship: 'Parent/Guardian',
    },
    young_person: {
        first_name: '',
        last_name: '',
        preferred_name: '',
        date_of_birth: '',
        gender: '',
        school_year: '',
        school_name: '',
        allergies: '',
        medications: '',
        medical_notes: '',
        dietary_requirements: '',
    },
    consents: {
        general_attendance: false,
        offsite_events: false,
        media_consent: false,
        medical_treatment: false,
        transport: false,
        signature_name: '',
    },
});

const steps = [
    { id: 1, title: 'Parent / Guardian', icon: 'User' },
    { id: 2, title: 'Young person', icon: 'HeartHandshake' },
    { id: 3, title: 'Consents', icon: 'ShieldCheck' },
];

const currentStep = ref(0);
const isLastStep = computed(() => currentStep.value === steps.length - 1);

const next = () => {
    if (isLastStep.value) {
        submit();
    } else {
        currentStep.value += 1;
    }
};

const previous = () => {
    if (currentStep.value > 0) {
        currentStep.value -= 1;
    }
};

const submit = () => {
    form.post(route('enrolment.store'));
};
</script>

<template>
    <Head title="Join Alive Youth" />
    <div class="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white py-12">
        <div class="mx-auto max-w-5xl space-y-8 px-4">
            <div class="text-center">
                <center><img src="/build/assets/logo.png" alt="Alive Youth" width="350px"/></center>
                <h1 class="mt-2 text-4xl font-semibold text-slate-900">Register your young person</h1>
                <p class="mt-3 text-base text-slate-600">We use this information to keep young people safe and keep you updated.</p>
            </div>

            <div class="panel p-0">
                <div class="flex flex-col gap-4 border-b border-border bg-white/80 p-6 sm:flex-row sm:items-center">
                    <div class="flex flex-1 flex-wrap items-center gap-4">
                        <div
                            v-for="(step, index) in steps"
                            :key="step.id"
                            class="flex items-center gap-3"
                        >
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full border font-semibold"
                                :class="index <= currentStep ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-200 text-slate-400'"
                            >
                                {{ step.id }}
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-wide text-slate-500">Step {{ step.id }}</p>
                                <p class="text-sm font-semibold text-slate-900">{{ step.title }}</p>
                            </div>
                            <Icons.ChevronRight class="hidden h-4 w-4 text-slate-300 sm:block" v-if="index !== steps.length - 1" />
                        </div>
                    </div>
                    <div class="flex items-center gap-4 text-xs text-slate-500">
                        <span>{{ currentStep + 1 }} / {{ steps.length }}</span>
                    </div>
                </div>

                <form class="space-y-6 p-6" @submit.prevent="next">
                    <div v-if="currentStep === 0" class="grid gap-4 md:grid-cols-2">
                        <div>
                            <label class="form-label">First name</label>
                            <input v-model="form.guardian.first_name" class="form-input" />
                            <p class="form-error" v-if="form.errors['guardian.first_name']">{{ form.errors['guardian.first_name'] }}</p>
                        </div>
                        <div>
                            <label class="form-label">Last name</label>
                            <input v-model="form.guardian.last_name" class="form-input" />
                            <p class="form-error" v-if="form.errors['guardian.last_name']">{{ form.errors['guardian.last_name'] }}</p>
                        </div>
                        <div>
                            <label class="form-label">Email</label>
                            <input v-model="form.guardian.email" type="email" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Primary phone</label>
                            <input v-model="form.guardian.primary_phone" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Secondary phone</label>
                            <input v-model="form.guardian.secondary_phone" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Relationship</label>
                            <input v-model="form.guardian.relationship" class="form-input" />
                        </div>
                        <div class="md:col-span-2 grid gap-4 md:grid-cols-2">
                            <div>
                                <label class="form-label">Address line 1</label>
                                <input v-model="form.guardian.address_line1" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">Address line 2</label>
                                <input v-model="form.guardian.address_line2" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">Town/City</label>
                                <input v-model="form.guardian.city" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">Postcode</label>
                                <input v-model="form.guardian.postcode" class="form-input" />
                            </div>
                        </div>
                    </div>

                    <div v-else-if="currentStep === 1" class="grid gap-4 md:grid-cols-2">
                        <div>
                            <label class="form-label">First name</label>
                            <input v-model="form.young_person.first_name" class="form-input" />
                            <p class="form-error" v-if="form.errors['young_person.first_name']">{{ form.errors['young_person.first_name'] }}</p>
                        </div>
                        <div>
                            <label class="form-label">Last name</label>
                            <input v-model="form.young_person.last_name" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Preferred name</label>
                            <input v-model="form.young_person.preferred_name" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Date of birth</label>
                            <input v-model="form.young_person.date_of_birth" type="date" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Gender</label>
                            <select v-model="form.young_person.gender" class="form-input">
                                <option value="">Select</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other / Prefer not to say</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">School year</label>
                            <input v-model="form.young_person.school_year" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">School name</label>
                            <input v-model="form.young_person.school_name" class="form-input" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="form-label">Allergies</label>
                            <textarea v-model="form.young_person.allergies" class="form-input" rows="2"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label class="form-label">Medications</label>
                            <textarea v-model="form.young_person.medications" class="form-input" rows="2"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label class="form-label">Medical / additional notes</label>
                            <textarea v-model="form.young_person.medical_notes" class="form-input" rows="3"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label class="form-label">Dietary requirements</label>
                            <textarea v-model="form.young_person.dietary_requirements" class="form-input" rows="2"></textarea>
                        </div>
                    </div>

                    <div v-else class="space-y-4">
                        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                            <p class="text-sm font-semibold text-slate-900">Permissions</p>
                            <p>Please confirm each consent so we can safely include your young person.</p>
                        </div>
                        <label class="flex items-start gap-3 text-sm text-slate-700">
                            <input v-model="form.consents.general_attendance" type="checkbox" class="mt-1" />
                            <span>Regular Alive Youth sessions (required)</span>
                        </label>
                        <label class="flex items-start gap-3 text-sm text-slate-700">
                            <input v-model="form.consents.offsite_events" type="checkbox" class="mt-1" />
                            <span>Offsite events with Alive Youth leaders</span>
                        </label>
                        <label class="flex items-start gap-3 text-sm text-slate-700">
                            <input v-model="form.consents.media_consent" type="checkbox" class="mt-1" />
                            <span>Use of photos/videos for church communications</span>
                        </label>
                        <label class="flex items-start gap-3 text-sm text-slate-700">
                            <input v-model="form.consents.medical_treatment" type="checkbox" class="mt-1" />
                            <span>Leaders can seek emergency medical help if required</span>
                        </label>
                        <label class="flex items-start gap-3 text-sm text-slate-700">
                            <input v-model="form.consents.transport" type="checkbox" class="mt-1" />
                            <span>Travel in vehicles organised by Alive Youth</span>
                        </label>
                        <div>
                            <label class="form-label">Digital signature (your full name)</label>
                            <input v-model="form.consents.signature_name" class="form-input" />
                        </div>
                    </div>

                    <div class="flex items-center justify-between border-t border-border pt-4">
                        <button type="button" class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold" :disabled="currentStep === 0" @click="previous">
                            Back
                        </button>
                        <button type="submit" class="rounded-2xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white">
                            {{ isLastStep ? 'Submit registration' : 'Continue' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-label {
    @apply mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500;
}
.form-input {
    @apply w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm shadow-inner focus:border-indigo-500 focus:outline-none;
}
.form-error {
    @apply mt-1 text-xs text-rose-600;
}
</style>
