<template>


  <div class="d-flex flex-row mb-2 ">
    <!--    <v-sheet-->
    <!--        v-for="n in 3"-->
    <!--        :key="n"-->
    <!--        class="ma-2 pa-2"-->
    <!--    >-->
    <!--      justify-space-between-->
    <!--    </v-sheet>-->
    <div class="w-25 mr-2 pr-2">
      <v-select
          v-model="model"
          :items="items"
          label="Dự án"
          chips
          multiple
      ></v-select>
      <!--    {{model}}--></div>
    <div class="w-25 mr-2 pr-2">
      <v-select
          v-model="model2"
          :items="items2"
          label="Công nghệ"
          chips
          multiple
      ></v-select>
      <!--    {{model2}}--></div>


  </div>


  <a-input-search v-model:value="keyword" placeholder="Key word" enter-button s/>
  {{ keyword }}
  <br/>
  <br/>

  <a-button @click="showModal" type="primary" style="margin-bottom: 10px">Thêm vấn đề</a-button>
  <a-modal v-model:open="open" title="Thông tin vấn đề" @ok="handleOk">
    <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px"
    >
      <a-form-item label="Tên vấn đề">
        <a-input v-model:value="formState.name">

        </a-input>
      </a-form-item>
      {{ formState.name }}

      <a-form-item label="Mô tả">
        <a-textarea :rows="4" v-model:value="formState.description"/>
      </a-form-item>
      {{ formState.description }}


      <a-form-item
          name="Tên dự án"
          label="Tên dự án"
      >
        <a-select
            v-model:value="formState.projectId"
            mode="multiple"
            :options="optionsProject"

        >
        </a-select>
      </a-form-item>
      {{ formState.projectId }}


      <a-form-item
          name="Bộ phận"
          label="Bộ phận"
      >
        <a-select
            v-model:value="formState.department"
            mode="multiple"
            :options="optionsDepartment"

        >
        </a-select>
      </a-form-item>
      {{ formState.department }}

      <a-form-item label="Công nghệ">
        <a-select
            v-model:value="formState.technology"
            style="width: 120px"
            :options="optionsTechnology"
            :field-names="{ label: 'label', value: 'value' }"
        ></a-select>
      </a-form-item>
      {{ formState.technology }}


      <a-form-item label="Độ nghiêm trọng">
        <a-select
            v-model:value="formState.severity"
            style="width: 120px"
            :options="optionsSeverity"
            :field-names="{ label: 'label', value: 'value' }"
        ></a-select>
      </a-form-item>
      {{ formState.severity }}

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
            Upload image
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

import {ref, reactive, nextTick, watch, onMounted} from "vue";
import {useRouter} from "vue-router";
import {UploadOutlined} from "@ant-design/icons-vue";
import type {UploadProps} from 'ant-design-vue';
import type {SelectProps} from 'ant-design-vue';
import axios from 'axios'


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

interface PagingDTO {
  // Các thuộc tính của PagingDTO, ví dụ:
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

interface FileDto {
  file_name: string;
  file_type: string;
  file_path: string;
  file_size: number;
  created_at: number;
}

interface IssueResponse {
  id: number;
  title: string;
  description: string;
  root_cause: string;
  solution: string;
  status: string;
  created_by_user_id: number;
  created_by_user_name: string;
  reviewed_by_user_id: number;
  reviewed_by_user_name: string;
  tags: string[];
  categories: string[];
  projects: string[];
  files: FileDto[];
  img_paths: string[];
}

interface PagingResponse<T> {
  paging: PagingDTO;
  items: T[];
}

interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}

const data = ref<IssueResponse[]>([]);


const formState = reactive({
  title: 'dasda',
  description: '',
  project_id: [],
  files: [],
  image: [],
  department: [],
  technology: '',
  severity: 0,

})

const items = ref<string[]>(['Gaming', 'Programming', 'Vue', 'Vuetify']);
const model = ref<string[]>([]);

const items2 = ref<string[]>(['Gaming', 'Programming', 'Vue', 'Vuetify']);
const model2 = ref<string[]>([]);


const optionsProject = ref<SelectProps['options']>([
  {
    value: 100,
    label: 'Jack (100)',
  },
  {
    value: 101,
    label: 'Lucy (101)',
  },
]);

const optionsDepartment = ref<SelectProps['options']>([
  {
    value: 'D1',
    label: 'D1',
  },
  {
    value: 'D2',
    label: 'D2',
  }
])

const optionsTechnology = ref<SelectProps['options']>([
  {
    value: 'Java',
    label: 'Java',
  },
  {
    value: 'VueJs',
    label: 'Vuejs',
  }
])

const optionsSeverity = ref<SelectProps['options']>([
  {
    value: 1,
    label: 'Mức 1'
  },
  {
    value: 2,
    label: 'Mức 2'
  }
])

const keyword = ref<string>('');


const router = useRouter();

const detail = () => {
  console.log(111);
}

const customRow = (record: DataRecord) => ({
  onClick: () => router.push(`/issue/${record.id}`)

})

const docsList = ref<UploadProps['fileList']>([]);
const imgList = ref<UploadProps['fileList']>([]);

const handleOk = () => {
  formState.docsList = docsList;
  formState.imageList = imgList;
  console.log(formState.docsList);



  formState.name = '';
  formState.description = '';
  formState.docsList = []
  formState.imageList = [];
  formState.projectId = [];

  open.value = false;
};


const labelCol = {style: {width: '150px'}};
const wrapperCol = {span: 14};

const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};


const beforeUpload = (file: UploadProps['fileList'][number], type: 'image' | 'doc') => {
  return false;


};

onMounted(async () => {
  try {
    // Gọi API lấy danh sách issue. Đường dẫn API được thay đổi cho phù hợp với server của bạn.
    const response = await axios.get<BaseResponse<PagingResponse<IssueResponse>>>('http://localhost:9000/v1/api/issue/list');

    // Kiểm tra dữ liệu trả về và gán items cho biến data
    if (response.data && response.data.data && response.data.data.items) {
      data.value = response.data.data.items;
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
});
</script>

<style>
.custom-row:hover {
  cursor: pointer;
}
</style>

