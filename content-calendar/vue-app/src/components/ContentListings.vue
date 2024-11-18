<script setup>
import { RouterLink } from 'vue-router';
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import ContentListing from './ContentListing.vue';

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false,
    },
});

const state = reactive({
    content: [],
    isLoading: true,
});

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/content');
        state.content = response.data;
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching content', error);
     } finally {
        state.isLoading = false;
    }
});

</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <!-- Show loading spinner while loading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>

            <!-- Show content listing when done loading -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ContentListing v-for="content in state.content.slice(0, limit || state.content.length)"
                    :key="content.id" :content="content" />
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/content" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
            View All Content</RouterLink>
    </section>
</template>