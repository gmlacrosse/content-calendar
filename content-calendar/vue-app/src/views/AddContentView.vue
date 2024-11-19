<script setup>
import router from '@/router';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import BackButton from '@/components/BackButton.vue';

const form = reactive({
    contentType: '',
    status: '',
    description: '',
    url: ''
});

const toast = useToast();

const handleSubmit = async () => {
    const addContent = {
        title: form.title,
        description: form.description ?? "",
        status: form.status ?? "IDEA",
        contentType: form.contentType ?? "ARTICLE",
        dateCreated: form.dateCreated ?? new Date(),
        dateUpdated: null,
        url: form.url ?? "",
    }

    try {
        const response = await axios.post(`http://localhost:5000/api/content`, addContent);
        toast.success("Added")
        router.push(`/content/${response.data.id}`);
    } catch (error) {
        console.error(error);
        toast.error("Not updated");
    }
};
</script>

<template>
    <BackButton />
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Add Content</h2>
                    <div class="bg-gray mb-5">
                        <label class="block text-gray-700 font-bold mb-2">Content Title</label>
                        <input class="border rounded w-full py-2 px-3 mb-2" type="text" v-model="form.title" id="title"
                            name="title" placeholder="Title" required />
                    </div>
                    <div>
                        <label for="description">Description</label>
                        <textarea id="description" v-model="form.description" class="border rounded w-full py-2 px-3"
                            rows="4" placeholder="Add full Description"></textarea>
                    </div>
                    <div class="mb-4">

                        <label for="contentType">Content Type</label>
                        <select id="contentType" class="border rounded w-full py-2 px-3" v-model="form.contentType"
                            name="contentType" required>
                            <option value="ARTICLE">ARTICLE</option>
                            <option value="VIDEO">VIDEO</option>
                            <option value="PODCAST">PODCAST</option>
                            <option value="EVENT">EVENT</option>
                        </select>
                    </div>
                    <div class="mb-4">

                        <label for="status">Status</label>
                        <select class="border rounded w-full py-2 px-3" v-model="form.status" id="status"
                            name="status" required>
                            <option value="IDEA">IDEA</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="PUBLISHED">PUBLISHED</option>
                        </select>
                    </div>
                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Add Content
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>>
</template>