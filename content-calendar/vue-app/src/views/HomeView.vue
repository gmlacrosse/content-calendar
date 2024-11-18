<script setup>
import ContentListings from '@/components/ContentListings.vue';
import Hero from '@/components/Hero.vue';
</script>

<template>
  <Hero />
  <ContentListings :limit="3" :showButton="true" />
</template>