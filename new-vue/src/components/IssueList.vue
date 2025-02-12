<template>


  <a-button @click="showModal" type="primary" style="margin-bottom: 10px">Thêm vấn đề</a-button>
  <a-modal v-model:open="open" title="Thông tin vấn đề" @ok="handleOk">
    <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px"
    >
      <a-form-item label="Tên vấn đề" v-model:value="formState.name">
        <a-input >

        </a-input>
      </a-form-item>

      <a-form-item label="Mô tả" v-model:value="formState.description">
        <a-textarea :rows="4" />
      </a-form-item>
      <a-form-item label="Tên dự án">
        <a-select
            v-model:value="formState.projectId"
            style="width: 120px"
            :options="options"
            :field-names="{ label: 'label', value: 'value' }"

            @change="handleChange"
        ></a-select>
      </a-form-item>

      <a-form-item label="Docs">
        <div class="clearfix">
          <a-upload v-model:file-list="docsList" :before-upload="beforeUpload = (file) => beforeUpload(file, 'doc')">
            <a-button>
              <upload-outlined></upload-outlined>
              Select File
            </a-button>
          </a-upload>
        </div>
      </a-form-item>

      <a-form-item label="Image">
        <a-upload
            v-model:file-list="imgList"
            :before-upload="beforeUpload = (file) => beforeUpload(file, 'image')"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Upload png only
          </a-button>
        </a-upload>
      </a-form-item>


    </a-form>
  </a-modal>


  <a-table :columns="columns" :data-source="data" :customRow="customRow" style="cursor: pointer">
    <template #bodyCell="{ column, record }">

      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'severity'">
        <span>
          <a-tag
              v-for="tag in record.severity"
              :key="tag"
              :color="tag === 1 ?  'volcano' :  'green'"
          >
            {{ tag }}
          </a-tag>
        </span>
      </template>

    </template>

  </a-table>
</template>
<script lang="ts" setup>

import {ref, reactive} from "vue";
import {useRouter} from "vue-router";
import {UploadOutlined} from "@ant-design/icons-vue";
import type {UploadProps} from 'ant-design-vue';
import type { SelectProps } from 'ant-design-vue';


interface DataRecord {
  id: string;
  title: string;
  project: string;
  created_by: string;
  date: string;
  name: string;
  age: number;
  address: string;
  severity: Array<number>;
}

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
  },
  {
    title: 'Severity',
    dataIndex: 'severity',
    key: 'severity',
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
    key: 'created_by',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },

];

const formState = {
  name: '',
  description: '',
  projectId: 0,
  docsList: <UploadProps['fileList']>[],
  imageList: <UploadProps['fileList']>[],

}
const options = ref<SelectProps['options']>([
  {
    value: 100,
    label: 'Jack (100)',
  },
  {
    value: 101,
    label: 'Lucy (101)',
  },
]);

// const handleChange: SelectProps['onChange'] = value => {
//
//   formState.projectId = value.;
//
//   console.log(value);
// };

const handleChange: SelectProps['onChange'] = (value, option) => {
  formState.projectId = value; // Gán giá trị thực tế
  console.log("Selected:", option.label); // Hiển thị label được chọn
};


const data = ref<DataRecord[]>([
  {
    id: '1',
    title: 'Error 1',
    project: '1',
    created_by: 'HungNL',
    date: '2014-05-07',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    severity: [1],
  },
  {
    id: '2',
    title: 'Error 2',
    project: '2',
    created_by: 'HungNL',
    date: '2014-05-07',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    severity: [2],
  },

]);
const router = useRouter();

const detail = () => {
  console.log(111);
}

const customRow = (record: DataRecord) => ({
  onClick: () => router.push(`/issue/${record.id}`)

})

const handleOk = () => {
  formState.docsList = docsList;
  formState.imageList = imgList;
  console.log(formState);
  formState.name = '';
  formState.description = '';
  formState.docsList = []
  formState.imageList = [];
  formState.projectId = 0;

  open.value = false;
};


const labelCol = {style: {width: '150px'}};
const wrapperCol = {span: 14};

const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};


const docsList = ref<UploadProps['fileList']>([]);
const imgList = ref<UploadProps['fileList']>([]);

const beforeUpload = (file: UploadProps['fileList'][number], type: 'image' | 'doc') => {
  return false;
};


</script>

<style>
.custom-row:hover {
  cursor: pointer;
}
</style>

