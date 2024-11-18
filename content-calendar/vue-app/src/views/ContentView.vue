<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
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

const deleteContent = async () => {
    try {
        const confirm = window.confirm('Are you sure?');
        if (confirm) {
            await axios.delete(`http://localhost:5000/api/content/${contentId}`);
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
        const response = await axios.get(`http://localhost:5000/api/content/${contentId}`);
        state.content = response.data;
    } catch (error) {
        console.log(error);
    } finally {
        state.isLoading = false;
    }
});

</script>

<template>
    <BackButton />
    <section v-if="!state.isLoading">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-lef">
                        <div class="bg-text-gray-500 mb-4">
                            Content Type: {{ state.content.contentType }}
                        </div>
                        <h1>Title: {{ state.content.title }}</h1>
                        <div class="mb-5">
                            Description: {{ state.content.description }}
                        </div>
                        <div class="mb-5">
                            URL: {{ state.content.url }}
                        </div>
                        <div class="mb-5">
                            Created: {{ moment(state.content.dateCreated).format('LLL') }}
                        </div>
                        <div class="mb-5">
                            Updated: {{ moment(state.content.dateUpdated).format('LLL') }}
                        </div>

                    </div>


                </main>
                <aside>
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Content</h3>
                        <RouterLink :to="`/content/edit/${state.content.id}`"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit Content</RouterLink>
                        <button @click="deleteContent"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Content
                        </button>
                    </div>

                </aside>
            </div>
        </div>
    </section>
    <div v-else class="text-center text-gray-500 py-6">
        <PulseLoader />
    </div>
</template>