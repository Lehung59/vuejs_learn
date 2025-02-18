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
        <a-textarea :rows="4"/>
      </a-form-item>

      <a-form-item label="Upload">
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <PlusOutlined/>
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


    <a-comment v-for="(i,index) in formattedData" :key="i.id" style="width: 100%; padding:0 10px">
      <template #actions style="padding:0">
        <span @click="toggleReply(index, i )">Reply to</span>
      </template>
      <template #author style="padding:0">
        <a>{{ i.name }}</a>
        <span>&nbsp;  {{ i.time }}</span>
      </template>
      <template #avatar>
        <a-avatar src="{{i.avatar}}" alt="avt"/>
      </template>
      <template #content>
        <p>
          {{ i.content }}
        </p>
      </template>
      <a-comment v-for="j in i.reply" :key="j.id" style="padding:0 0">
        <template #actions>
          <span @click="toggleReply(index, j)">Reply to</span>
        </template>
        <template #author>
          <a>{{ j.name }}</a>
          <span>&nbsp;  {{ i.time }}</span>
        </template>
        <template #avatar>
          <a-avatar src="{{j.avatar}}" alt="avt"/>
        </template>
        <template #content>
          <p>
            {{ j.content }}
          </p>
        </template>


      </a-comment>

      <v-col
          cols="12"
          sm="6"
          style="padding-left: 0"
          v-show="replyVisible[index]"

      >
        <v-textarea
            class="mx-0"
            label="Trả lời"
            prepend-icon="mdi-comment"
            rows="1"
            v-model="replyTexts[index]"
        >
        </v-textarea>
      </v-col>


    </a-comment>


  </a-row>


  <div>


  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref, watchEffect} from "vue";
import {PlusOutlined} from '@ant-design/icons-vue';

import type {CSSProperties} from 'vue';

const route = useRoute();
const router = useRouter();

const issueId = ref(route.params.id);

watchEffect(() => {
  issueId.value = route.params.id;
});

const goBack = () => {
  router.push('/issue');
};

const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

const labelCol = {style: {width: '150px'}};
const wrapperCol = {span: 14};

const imgStyle: CSSProperties = {
  display: 'block',
  width: '270px',
};

type Comment = {
  id: number;
  userId: number;
  name: string;
  avatar: string;
  content: string;
  tagList: number[];
  time: number | string;
  reply: Comment[];
};

const data = [
  {
    id: 1,
    userId: 1,
    name: "Le Hung",
    avatar: "123",
    content: "Day la cmt 1",
    tagList: [5, 7],
    time: 1739330827862,
    reply: [
      {
        id: 2,
        userId: 7,
        name: "Le Hung 7",
        avatar: "123456",
        content: "Day la cmt 2",
        reply: [],
        tagList: [],
        time: 1739330827862
      },
      {
        id: 3,
        userId: 5,
        name: "Le Hung 5",
        avatar: "123456789",
        content: "Day la cmt 3",
        reply: [],
        tagList: [],
        time: 1739330827862
      }
    ],
  },

  {
    id: 4,
    userId: 1,
    name: "Le Hung 4",
    avatar: "123",
    content: "Day la cmt 4",
    tagList: [5, 7],
    time: 1739330827862,
    reply: [
      {
        id: 5,
        userId: 7,
        name: "Le Hung 7",
        avatar: "123456",
        content: "Day la cmt 5",
        reply: [],
        tagList: [],
        time: 1739330827862
      }
    ]
  }
]
const replyTexts = ref<string[]>(Array(data.length).fill(''));

const replyVisible = ref<number[]>(Array(data.length).fill(0));

const toggleReply = (index: number, comment: Comment): void => {
  replyVisible.value[index] = !replyVisible.value[index];
  console.log(comment.name)
  console.log(replyTexts.value[index]);
  if (replyVisible.value[index] && replyTexts.value[index] === '') {
    replyTexts.value[index] = `@${comment.name}`;
  }
};

const formatTime = (timestamp: number): string =>
    new Date(timestamp).toLocaleString();

const formattedData: Comment[] = data.map(comment => ({
  ...comment,
  time: formatTime(comment.time as number),
  reply: comment.reply.map(reply => ({
    ...reply,
    time: formatTime(reply.time as number),
  })),
}));

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

</style>