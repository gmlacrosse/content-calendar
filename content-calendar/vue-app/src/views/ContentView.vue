<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted, computed } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import moment from 'moment';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const contentId = route.params.id;

const state = reactive({
    content: {},
    isLoading: true,
});


const API_ENDPOINTS = {
    CONTENT: 'http://localhost:5000/api/content/',
};

const deleteContent = async () => {
    try {
        const confirm = window.confirm('Are you sure?');
        if (confirm) {
            await axios.delete(`${API_ENDPOINTS.CONTENT}/${contentId}`);
            toast.success("Deleted");
            router.push('/content');
        }
    }
    catch (error) {
        console.log(error);
        toast.error("Not Deleted");
    }
}

onMounted(async () => {
    try {
        const response = await axios.get(`${API_ENDPOINTS.CONTENT}${contentId}`);
        state.content = response.data;
    } catch (error) {
        toast.error(`Failed to load content`);
        console.error(error);
    }
    state.isLoading = false;
});

const formattedDateCreated = computed(() => moment(state.content.dateCreated).format('LLL'));
const formattedDateUpdated = computed(() => moment(state.content.dateUpdated).format('LLL'));

</script>

<template>
    <BackButton />
    <div v-show="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
    </div>
    <section v-show="!state.isLoading">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <h1 class="bg-white text-3x1 text-green-500 font-bold mb-4">{{ state.content.title }}</h1>
                        <div class="text-green-500 mb-4">
                            {{ state.content.contentType }}
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 class="text-green-800 text-lg font-bold mb-6">Description</h3>
                            <p class="mb-4">
                                {{ state.content.description }}
                            </p>
                        </div>
                        <div class="mb-5">
                            URL: {{ state.content.url }}
                        </div>
                        <div class="mb-5">
                            Created: {{ formattedDateCreated }}
                        </div>
                        <div v-if="state.content.dateUpdated" class="mb-5">
                            Updated: {{ formattedDateUpdated }}
                        </div>
                        <div class="mb-5">
                            Status: {{ state.content.status }}
                        </div>
                    </div>
                </main>
                <aside>
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Content</h3>
                        <RouterLink :to="`/content/edit/${state.content.id}`"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit Content
                        </RouterLink>
                        <button @click="deleteContent"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Content
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>