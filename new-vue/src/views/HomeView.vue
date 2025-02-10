<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" style="padding: 20px 24px">
        <router-link to="/home">
          <img class="logo" src="@/assets/favicon.ico" alt="Logo">
        </router-link>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/content1">
            <user-outlined/>
            <span>nav 1</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/content2">
            <video-camera-outlined/>
            <span>nav 2</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/content3">
            <upload-outlined/>
            <span>nav 3</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 20px">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
</script>

<style>


</style>
