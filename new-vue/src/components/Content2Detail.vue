

<template>
  <a-button type="primary" @click="goBack">Back</a-button>

</template>

<script setup>


import {useRoute, useRouter} from "vue-router";
import {ref, watchEffect} from "vue";

const router = useRouter();
const route = useRoute();


const projectId = ref(route.params.id);

watchEffect(() => {
  projectId.value = route.params.id;
});

const goBack = () => {
  router.back();
};

</script>

<style scoped>

</style>