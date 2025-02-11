

<template>
  <a-layout-sider v-model:collapsed="prop.collapsed" :trigger="null" collapsible>
    <div class="logo" style="padding: 20px 24px">
      <router-link to="/home">
        <img class="logo" src="@/assets/favicon.ico" alt="Logo">
      </router-link>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <router-link to="/issue">
          <user-outlined/>
          <span>Danh sách vấn đề</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/content2">
          <video-camera-outlined/>
          <span>Danh sách dự án</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/content3">
          <upload-outlined/>
          <span>Thống kê</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['1']);
const prop = defineProps<{ collapsed: boolean}>();

</script>


<style scoped>

</style>