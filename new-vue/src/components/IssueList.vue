<template>
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

import {ref} from "vue";
import {useRouter} from "vue-router";

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

</script>

<style>
.custom-row:hover {
  cursor: pointer;
}
</style>

