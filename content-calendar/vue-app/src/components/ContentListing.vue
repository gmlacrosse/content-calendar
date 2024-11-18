<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
import moment from 'moment';

defineProps({
    content: Object
});

</script>


<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div class="mb-5">
                <h3 class="text-green-500 text-xl font-bold">{{ content.title }}</h3>
            </div>

            <div class="text-green-700 mb-2">
                <div> Description:
                    {{ content.description }}
                </div>
            </div>
            <div class="text-green-700 mb-2">Created: {{ moment(content.createdDate).format('LLL') }}</div>
            <div class="text-green-700 mb-2">URL:{{ content.url }}</div>
            <div class="border border-gray-100 mb-5"></div>

        </div>
        <div class="flex flex-col lg:flex-row justify-between mb-2 ml-2">
            <div class="text-orange-700 mb-2">
                <i class="pi pi-map-marker text-orange-700"></i>
            <RouterLink :to="`/content/${content.id}`"
                class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                Read More
            </RouterLink>
        </div>
        </div>

    </div>
</template>