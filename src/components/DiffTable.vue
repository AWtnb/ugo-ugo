<script setup lang="ts">
import { FromEntry, ToEntry } from "../helpers/diff.js";
import DiffDetail from "./DiffDetail.vue";
const props = defineProps<{
  rows: Array<FromEntry | ToEntry>;
  isLeftSide: boolean;
}>();
</script>

<template>
  <table>
    <tbody>
      <tr v-for="(rowEnt, idx) in props.rows" :key="idx">
        <td v-if="isLeftSide" class="header">
          <div>{{ rowEnt.position }}</div>
        </td>
        <DiffDetail :entry="rowEnt" :as-dest="isLeftSide" />
        <td v-if="!isLeftSide" class="header">
          <div>{{ rowEnt.position }}</div>
        </td>
        <td class="content">{{ rowEnt.text }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table tbody tr:nth-child(odd) {
  background: #efefef;
}
table {
  border: 2px solid #555;
}
td {
  border: none;
  border-right: 1px solid #555;
  border-left: 1px solid #555;
}
/* .header, .diff-info {
  font-size: 0.7em;
}
.content {
  min-width: 5em;
}
.header {
  color: gray;
  width: fit-content;
} */
</style>
