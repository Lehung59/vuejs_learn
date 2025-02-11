<template>
  <a-button type="primary" @click="goBack">Back</a-button>

  <a-row>
    <a-col :span="16">
      <div class="issue-detail">
        <h2>Issue Detail Name</h2>
        <h2>Các dự án: A B </h2>

        <div class="inline">
          <p>ID: {{ issueId }}</p>
          <p>Level: {{ issueId }}</p>
        </div>
      </div>
    </a-col>
    <a-col :span="6" :offset="1">
      <h2>Ảnh minh họa</h2>
        <a-image
            alt="avatar"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            :style="imgStyle"
        />

    </a-col>
  </a-row>

  <a-button @click="showModal">Thêm đánh giá</a-button>
  <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
    <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px"
    >
      <a-form-item label="TextArea">
        <a-textarea :rows="4" />
      </a-form-item>

      <a-form-item label="Upload">
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>

  <a-row class="comment">
    <a-col :span="16">
      <h2>Đánh giá</h2>
    </a-col>
    <a-col :span="6" :offset="1">
      <h2>Ảnh minh họa chi tiet</h2>
    </a-col>


    <a-row v-for="(cmt, index) in comments" :key="index" class="comment-row">
      <a-col :span="16">
        <div class="inline">
          <p>ID: {{ cmt.id }}</p>
          <p>Level: {{ cmt.level }}</p>
        </div>
      </a-col>

      <a-col :span="6" :offset="1">

          <a-image
              alt="avatar"
              :src="cmt.image"
              class="comment-img"
          />


      </a-col>
    </a-row>


  </a-row>


  <div>


  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref, watchEffect} from "vue";
import { PlusOutlined } from '@ant-design/icons-vue';

import type {CSSProperties} from 'vue';

const route = useRoute();
const router = useRouter();

const issueId = ref(route.params.id);

watchEffect(() => {
  issueId.value = route.params.id;
});

const goBack = () => {
  router.back();
};

const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const cardStyle: CSSProperties = {
  width: '620px',
};
const imgStyle: CSSProperties = {
  display: 'block',
  width: '270px',
};

const comments = [
  {id: "001", level: "High", image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"},
  {id: "002", level: "Medium", image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"},
  {id: "003", level: "Low", image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
]

</script>

<style scoped>
.inline {
  display: flex;
  gap: 25px;
}

.comment {
  background-color: #c9c7c7;
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
}

.comment-img {
  width: 100px;
  height: auto;
  object-fit: cover;
}

.comment-row {
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

</style>