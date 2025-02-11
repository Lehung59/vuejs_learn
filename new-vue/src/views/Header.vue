<template>
  <a-layout-header
      style="background: #fff; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;">
    <!-- Icon mở menu -->
    <div style="display: flex; align-items: center;">
      <menu-unfold-outlined
          v-if="props.collapsed"
          class="trigger"
          @click="onOpen"
      />
      <menu-fold-outlined v-else class="trigger" @click="$emit('handle-open')"/>
    </div>

    <!-- Phần User Info: Avatar + Tên -->
    <div style="display: flex; align-items: center; gap: 10px;">
      <template v-if="user.avatar != null ">
        <a-avatar :src="user.avatar"/>
      </template>
      <template v-else>
        <a-avatar size="small">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </template>
      <h4 style="margin: 0;">{{ user.name }}</h4>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons-vue';

const props = defineProps<{ collapsed: boolean }>();
const emit = defineEmits(['handle-open']);

const onOpen = () => {
  emit('handle-open');
}

const user = {
  name: "Nguyen Le Hung",
}

</script>

<style scoped>

</style>