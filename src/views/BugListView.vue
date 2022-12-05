<template>
  <v-list lines="one">
    <v-list-item
      v-for="item in d"
      :key="item.bug_err_md5"
      :title="item.bug_err_txt"
    />
  </v-list>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const d = ref([
  {
    bug_count: 3,
    bug_err_md5: 'faslkdfjalksdjfl',
    bug_err_txt: 'unhandleRejectedPromise'
  }
])
</script>
