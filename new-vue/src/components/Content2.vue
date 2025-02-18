<template>


  <v-data-table :items="items" :headers="headers" @click:row="handleClick" :items-per-page="5">

  </v-data-table>

</template>

<script lang="ts" setup>
import {ref, reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const items = reactive([
  {
    id: 1,
    code: 'ABC8386',
    name: 'Loxodonta africana',
    manager: 'Le Hung',
    status: 1,
  },
  {
    id: 2,
    code: 'ABC8386',
    name: 'Loxodonta africana',
    manager: 'Le Hung',
    status: 1,
  },
  {
    id: 3,
    code: 'ABC8386',
    name: 'Loxodonta africana',
    manager: 'Le Hung',
    status: 1,
  },


])



const handleClick = (click, row) => {
  console.log(row.item.id);
  router.push(`/content2/${row.item.id}`)

};

const headers = [
  {title: 'Mã dự án', value: 'code'},
  {title: 'Tên dự án', value: 'name'},
  {title: 'Người quản lý', value: 'manager'},
  {title: 'Trạng thái', value: 'status'},

]
</script>


<style scoped>

</style>