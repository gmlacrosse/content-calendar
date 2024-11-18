<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

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
            await axios.delete(`http://localhost:5000/${contentId}`);
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
        <div class="container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-70/30">
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
                            Created: {{ state.content.dateCreated }}
                        </div>
                        <div class="mb-5">
                            Upated: {{ state.content.dateUpdated }}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </section>
    <div v-else class="text-center text-gray-500 py-6">
        <PulseLoader />
    </div>
</template>