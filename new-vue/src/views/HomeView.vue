<template>
  <a-layout>
    <NavBar :collapsed="collapsed" />
    <a-layout>
      <Header :collapsed="collapsed" @handle-open="handleOpen"/>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {ref} from "vue";

import NavBar from "@/views/NavBar.vue";
import Header from "@/views/Header.vue";
const collapsed = ref<boolean>(false);

const handleOpen = () => {
  collapsed.value = !collapsed.value;
}

</script>

<style>


</style>
