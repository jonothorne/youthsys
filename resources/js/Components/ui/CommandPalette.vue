<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import * as Icons from 'lucide-vue-next';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    show: Boolean,
});
const emit = defineEmits(['close']);

const query = ref('');
const results = ref([]);
const loading = ref(false);
const highlightIndex = ref(0);
let timeoutId;

watch(query, (value) => {
    clearTimeout(timeoutId);
    if (!value) {
        results.value = [];
        return;
    }
    timeoutId = setTimeout(async () => {
        loading.value = true;
        try {
            const response = await axios.get(route('admin.search'), {
                params: { query: value },
            });
            results.value = response.data.results;
            highlightIndex.value = 0;
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }, 250);
});

const navigate = (item) => {
    emit('close');
    router.visit(item.route);
};

const onKeyDown = (event) => {
    if (!props.show) return;
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        highlightIndex.value = (highlightIndex.value + 1) % Math.max(results.value.length, 1);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        highlightIndex.value = (highlightIndex.value - 1 + Math.max(results.value.length, 1)) % Math.max(results.value.length, 1);
    } else if (event.key === 'Enter' && results.value[highlightIndex.value]) {
        navigate(results.value[highlightIndex.value]);
    }
};
</script>

<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 backdrop-blur" @keydown.stop="onKeyDown">
            <div class="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-4 text-white shadow-2xl">
                <div class="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-4 py-2">
                    <Icons.Search class="h-4 w-4 text-white/70" />
                    <input
                        v-model="query"
                        autofocus
                        type="text"
                        placeholder="Search youth, sessions, tokens"
                        class="flex-1 bg-transparent text-sm placeholder:text-white/60 focus:outline-none"
                    />
                    <span class="text-xs text-white/60">Enter ↵</span>
                </div>
                <div class="mt-4 max-h-80 overflow-y-auto rounded-2xl border border-white/10 bg-white/5">
                    <p v-if="loading" class="p-4 text-sm text-white/80">Searching…</p>
                    <ul v-else>
                        <li
                            v-for="(item, index) in results"
                            :key="item.type + item.id"
                            class="flex cursor-pointer items-center justify-between px-4 py-3"
                            :class="index === highlightIndex ? 'bg-white/10' : 'bg-transparent'"
                            @click="navigate(item)"
                        >
                            <div>
                                <p class="text-sm font-semibold">{{ item.label }}</p>
                                <p class="text-xs text-white/70">{{ item.subtitle }} · {{ item.type }}</p>
                            </div>
                            <Icons.ArrowUpRight class="h-4 w-4 text-white/60" />
                        </li>
                        <li v-if="!results.length" class="px-4 py-4 text-xs text-white/70">Start typing to find records.</li>
                    </ul>
                </div>
                <div class="mt-3 flex items-center justify-between text-xs text-white/60">
                    <span>Esc to close</span>
                    <span>Cmd/Ctrl + K</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
