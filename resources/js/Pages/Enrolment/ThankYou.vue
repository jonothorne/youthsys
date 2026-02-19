<script setup>
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Thank You" />

    <div class="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div class="max-w-xl rounded-2xl bg-white p-10 text-center shadow">
            <div class="text-6xl">🎉</div>
            <center><img src="/build/assets/logo.png" alt="Alive Youth" width="350px"/></center>
            <h1 class="mt-4 text-3xl font-bold text-slate-900">Thanks for signing up!</h1>
            <p class="mt-3 text-slate-600">
                Our team has received your submission. We will review the details and confirm once everything is approved.
            </p>
            <p class="mt-2 text-slate-500">
                In the meantime feel free to reach out to us at <a href="mailto:youth@alive.church" class="text-blue-600">youth@alive.church</a> if anything changes.
            </p>
            <Link
                class="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-500"
                :href="route('enrolment.form')"
            >
                Submit another young person
            </Link>
        </div>
    </div>
</template>
