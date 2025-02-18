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

      <v-menu :location="location">

        <template v-slot:activator="{ props }">

          <v-btn v-bind="props" class="text-none">
            <v-badge color="error" content="2">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>

        </template>
        <v-list >
          <v-list-item class="custom-hover" v-for="noti in  notifications">
            <v-list-item-title @click="handleViewNoti(noti['id-issue'])">{{noti.content}}</v-list-item-title>
          </v-list-item>

        </v-list>

      </v-menu>

      <v-menu :location="location">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" color="primary">
            <template v-if="user.avatar != null ">
              <a-avatar :src="user.avatar"/>
            </template>
            <template v-else>
              <a-avatar size="small">
                <template #icon>
                  <UserOutlined/>
                </template>
              </a-avatar>
            </template>
            <h4 style="margin: 0;">{{ user.name }}</h4>

          </v-btn>
        </template>
        <v-list>
          <v-list-item class="custom-hover">
            <v-list-item-title @click="handleChangePass">Đổi mật khẩu</v-list-item-title>
          </v-list-item>
          <v-list-item class="custom-hover">
            <v-list-item-title @click="handleLogout">Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </div>


  </a-layout-header>
</template>

<script lang="ts" setup>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {reactive} from "vue";

const router = useRouter()
const props = defineProps<{ collapsed: boolean }>();
const emit = defineEmits(['handle-open']);

const onOpen = () => {
  emit('handle-open');
}

const notifications = reactive([
  {
    "id": 1,
    "content": "hello",
    "id-issue": 1
  },
  {
    "id": 2,
    "content": "hellooo",
    "id-issue": 2
  }
])

const user = {
  name: "Nguyen Le Hung",
}

const location = 'bottom'

const handleLogout = () => {
  router.push('/login')
}

const handleChangePass = () => {
  router.push('/change-password')
}

const handleViewNoti = (id: number): void => {
router.push(`/issue/${id}`)


  console.log("Notification ID:", id);
};

</script>

<style scoped>

.custom-hover {
  max-width: 400px;
  min-width: 200px;
}

.custom-hover:hover {
  background-color: #e0e0e0; /* Màu nền thay đổi khi hover */
  transition: background-color 0.3s;
  cursor: pointer;

}
</style>